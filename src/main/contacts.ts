import type { AlfredScriptFilter } from 'fast-alfred'
import { FastAlfred } from 'fast-alfred'
import type { CountryCode } from 'libphonenumber-js'
import { DEFAULT_MAX_RESULTS_COUNT } from '@common/constants.js'
import { Variables } from '@common/variables.js'
import type { ContactPayload } from '@models/contact-payload.model.js'
import type { IContact } from '@models/contact.model.js'
import { getContacts } from '@services/contacts.service.js'
import { searchContacts } from '@services/search.service.js'

;(() => {
    const alfredClient = new FastAlfred()

    const countryCode: CountryCode = alfredClient.env.getEnv<CountryCode>(Variables.COUNTRY_CODE, {
        defaultValue: 'US',
    })

    const sliceAmount: number = alfredClient.env.getEnv(Variables.SLICE_AMOUNT, {
        defaultValue: DEFAULT_MAX_RESULTS_COUNT,
        parser: Number,
    })

    const contacts: IContact[] = getContacts(alfredClient)

    const filteredContacts = searchContacts(contacts, alfredClient.input, sliceAmount)

    const items: AlfredScriptFilter['items'] = filteredContacts.map(
        ({ firstName, lastName, phoneNumbers }: IContact) => {
            const payload: ContactPayload = { phoneNumber: phoneNumbers[0], countryCode }

            return {
                title: `${firstName} ${lastName}`,
                subtitle: `Phone: ${phoneNumbers[0]}`,
                arg: JSON.stringify(payload),
            }
        },
    )

    alfredClient.output({ items })
})()
