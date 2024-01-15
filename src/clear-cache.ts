import alfy from 'alfy'
import { CACHE_CONTACTS_KEY } from './common/constants.js'
;(() => {
    alfy.cache.set(CACHE_CONTACTS_KEY, null)

    alfy.output([
        {
            title: 'Cache Cleared ✅',
            subtitle: 'Contacts will be re-fetched on next use',
        },
    ])
})()
