import type { AlfredScriptFilter } from 'fast-alfred'
import { FastAlfred } from 'fast-alfred'
import type { CountryCode } from 'libphonenumber-js'
import { DEFAULT_MAX_RESULTS_COUNT } from '@common/constants.js'
import { Variables } from '@common/variables.js'
import type { ContactPayload } from '@models/contact-payload.model.js'
import type { IContact } from '@models/contact.model.js'
import { SUPPORTED_PLATFORMS, type SupportedPlatform } from '@models/platform.model.js'
import { getContacts } from '@services/contacts.service.js'
import { searchContacts } from '@services/search.service.js'

;(() => {
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

    const contacts: IContact[] = getContacts(alfredClient)

    const filteredContacts = searchContacts(contacts, searchTerm, sliceAmount)

    const items: AlfredScriptFilter['items'] = filteredContacts
        .map(({ firstName, lastName, phoneNumbers, emailAddresses }: IContact) => {
            const payload: ContactPayload = {
                phoneNumber: phoneNumbers[0],
                emailAddress: emailAddresses[0],
                countryCode,
                platform: platform as SupportedPlatform,
            }

            const subtitle =
                phoneNumbers.length > 0
                    ? `Phone: ${phoneNumbers[0]}`
                    : emailAddresses.length > 0
                      ? `Email: ${emailAddresses[0]}`
                      : ''

            return {
                title: `${firstName} ${lastName}`,
                subtitle,
                arg: JSON.stringify(payload),
            }
        })
        .filter(({ subtitle }) => subtitle)

    alfredClient.output({ items })
})()
