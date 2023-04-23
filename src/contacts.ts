import alfy, { ScriptFilterItem } from 'alfy'
import { IContact } from './models/contact.model'
import { searchContacts } from './services/search-contacts.service'
import { Variables } from './common/variables'
import { ContactPayload } from './models/contact-payload.model'
import type { CountryCode } from 'libphonenumber-js'
import { MAX_RESULTS_COUNT } from './common/constants'
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
