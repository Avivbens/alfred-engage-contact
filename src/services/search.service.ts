import Fuse from 'fuse.js'
import type { IContact } from '@models/contact.model.js'
import { SEARCH_FIELDS_CONFIG } from './search.config.js'

export function searchContacts(contacts: IContact[], searchTerm: string, limit: number): IContact[] {
    const fuse = new Fuse(contacts, {
        keys: SEARCH_FIELDS_CONFIG,
        isCaseSensitive: false,
        shouldSort: true,
        threshold: 0.4,
    })

    const res = fuse.search(searchTerm, { limit })

    return res.map((item) => item.item)
}
