import { searchContacts } from './services/search-contacts.service'
;(() => {
    const res = searchContacts('אבא')
    console.log(`🚀 ~ file: index.ts:4 ~ res`, res)
})()
