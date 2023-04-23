import alfy, { ScriptFilterItem } from 'alfy'
import { IContact } from './models/contact.model'
import { searchContacts } from './services/search-contacts.service'
import { Variables } from './common/variables'
import { ContactPayload } from './models/contact-payload.model'
;(() => {
    const input = alfy.input
    const data: IContact[] = searchContacts(input)
    const countryCode: string = process.env[Variables.COUNTRY_CODE] ?? '1'

    const items: ScriptFilterItem[] = data.map(({ firstName, lastName, phoneNumbers }: IContact) => {
        const payload: ContactPayload = { phoneNumber: phoneNumbers[0], countryCode }

        return {
            title: `${firstName} ${lastName}`,
            subtitle: `Phone: ${phoneNumbers[0]}`,
            arg: JSON.stringify(payload),
            // mods: {
            //     cmd: {
            //         subtitle: `Open in Incognito Mode`,
            //         arg: JSON.stringify({ url, profile, incognito: true }),
            //     },
            // },
        }
    })

    const sliced = items.slice(0, 9)

    alfy.output(sliced)
})()
