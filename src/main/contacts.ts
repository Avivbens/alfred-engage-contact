import type { AlfredScriptFilter } from 'fast-alfred'
import { FastAlfred } from 'fast-alfred'
import type { CountryCode } from 'libphonenumber-js'
import { DEFAULT_MAX_RESULTS_COUNT } from '../common/constants.js'
import { Variables } from '../common/variables.js'
import type { ContactPayload } from '../models/contact-payload.model.js'
import type { IContact } from '../models/contact.model.js'
import { searchContacts } from '../services/search-contacts.service.js'

;(() => {
    const alfredClient = new FastAlfred()

    const data: IContact[] = searchContacts(alfredClient)
    const countryCode: CountryCode = alfredClient.env.getEnv<CountryCode>(Variables.COUNTRY_CODE, {
        defaultValue: 'US',
    })

    const sliceAmount: number = alfredClient.env.getEnv(Variables.SLICE_AMOUNT, {
        defaultValue: DEFAULT_MAX_RESULTS_COUNT,
        parser: Number,
    })

    const items: AlfredScriptFilter['items'] = data.map(({ firstName, lastName, phoneNumbers }: IContact) => {
        const payload: ContactPayload = { phoneNumber: phoneNumbers[0], countryCode }

        return {
            title: `${firstName} ${lastName}`,
            subtitle: `Phone: ${phoneNumbers[0]}`,
            arg: JSON.stringify(payload),
        }
    })

    const sliced = items.slice(0, sliceAmount)

    alfredClient.output({ items: sliced })
})()
