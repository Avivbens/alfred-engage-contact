import type { ScriptFilterItem } from 'alfy'
import alfy from 'alfy'
import type { CountryCode } from 'libphonenumber-js'
import { MAX_RESULTS_COUNT } from './common/constants.js'
import { Variables } from './common/variables.js'
import type { ContactPayload } from './models/contact-payload.model.js'
import type { IContact } from './models/contact.model.js'
import { searchContacts } from './services/search-contacts.service.js'

;(() => {
    const input = alfy.input
    const data: IContact[] = searchContacts(input)
    const countryCode: CountryCode = (process.env[Variables.COUNTRY_CODE] as CountryCode) ?? 'US'

    const items: ScriptFilterItem[] = data.map(({ firstName, lastName, phoneNumbers }: IContact) => {
        const payload: ContactPayload = { phoneNumber: phoneNumbers[0], countryCode }

        return {
            title: `${firstName} ${lastName}`,
            subtitle: `Phone: ${phoneNumbers[0]}`,
            arg: JSON.stringify(payload),
        }
    })

    const sliced = items.slice(0, MAX_RESULTS_COUNT - 1)

    alfy.output(sliced)
})()
