import alfy, { ScriptFilterItem } from 'alfy'
import { IContact } from './models/contact.model'
import { searchContacts } from './services/search-contacts.service'
;(() => {
    const input = alfy.input
    const data: IContact[] = searchContacts(input)

    const items: ScriptFilterItem[] = data.map(({ firstName, lastName, phoneNumbers }: IContact) => ({
        title: `${firstName} ${lastName}`,
        subtitle: `Phone: ${phoneNumbers[0]}`,
        arg: JSON.stringify({ phoneNumber: phoneNumbers[0] }),
        // mods: {
        //     cmd: {
        //         subtitle: `Open in Incognito Mode`,
        //         arg: JSON.stringify({ url, profile, incognito: true }),
        //     },
        // },
    }))

    const sliced = items.slice(0, 9)

    alfy.output(sliced)
})()
