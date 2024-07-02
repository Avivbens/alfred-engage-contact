import type { AlfredScriptFilter } from 'fast-alfred'
import { FastAlfred } from 'fast-alfred'
import type { CountryCode } from 'libphonenumber-js'
import { DEFAULT_MAX_RESULTS_COUNT } from '@common/constants'
import { Variables } from '@common/variables'
import type { ContactPayload } from '@models/contact-payload.model'
import type { IContact } from '@models/contact.model'
import { SUPPORTED_PLATFORMS, type SupportedPlatform } from '@models/platform.model'
import { getContacts } from '@services/contacts.service'
import { searchContacts } from '@services/search.service'

;(async () => {
    const alfredClient = new FastAlfred()

    const [searchTerm, platform] = alfredClient.inputs

    if (!SUPPORTED_PLATFORMS.includes(platform as SupportedPlatform)) {
        const errorMassage = `Unsupported platform: ${platform}, Supported platforms: ${SUPPORTED_PLATFORMS.join(', ')}`
        const error = new Error(errorMassage)

        alfredClient.error(error)
        return
    }

    const countryCode: CountryCode = alfredClient.env.getEnv<CountryCode>(Variables.COUNTRY_CODE, {
        defaultValue: 'US',
    })

    const sliceAmount: number = alfredClient.env.getEnv(Variables.SLICE_AMOUNT, {
        defaultValue: DEFAULT_MAX_RESULTS_COUNT,
        parser: Number,
    })

    const fuzzyThreshold: number = alfredClient.env.getEnv(Variables.FUZZY_THRESHOLD, {
        defaultValue: 0.4,
        parser: (input) => Number(input) / 10,
    })

    const contacts: IContact[] = getContacts(alfredClient)

    const filteredContacts = await searchContacts(contacts, searchTerm, sliceAmount, fuzzyThreshold)

    const items: AlfredScriptFilter['items'] = filteredContacts
        .map(({ firstName, lastName, phoneNumbers, emailAddresses }: IContact) => {
            const payload: ContactPayload = {
                phoneNumber: phoneNumbers[0],
                emailAddress: emailAddresses[0],
                countryCode,
                platform: platform as SupportedPlatform,
            }

            const emailSubtitle = emailAddresses.length ? `Email: ${emailAddresses[0]}` : ''
            const phoneSubtitle = phoneNumbers.length ? `Phone: ${phoneNumbers[0]}` : ''

            const subtitle = [phoneSubtitle, emailSubtitle].filter(Boolean).join(' | ')
            const arg = JSON.stringify(payload)

            return {
                title: `${firstName} ${lastName}`,
                subtitle,
                arg,
                uid: arg,
            } satisfies AlfredScriptFilter['items'][number]
        })
        .filter(({ subtitle }) => subtitle)

    alfredClient.output({ items })
})()
