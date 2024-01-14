// @ts-expect-error
import contacts from 'node-mac-contacts'
import alfy from 'alfy'
import { CACHE_CONTACTS_KEY, CACHE_TTL } from '../common/constants'
import { AuthStatus } from '../models/auth-status.enum'
import { IContact } from '../models/contact.model'
import { SEARCH_FIELDS_CONFIG } from './search-contacts.config'

export function isAuth(): boolean {
    const status: AuthStatus = contacts.getAuthStatus()
    return status === AuthStatus.Authorized
}

export function requestAuth(): void {
    contacts.requestAccess()
}

export function searchContacts(searchTerm: string): IContact[] {
    const isHasAccess: boolean = isAuth()
    if (!isHasAccess) {
        requestAuth()
        return []
    }

    const lookFor = searchTerm.toLowerCase()

    // when in debug mode - always fetch contacts from the system
    const allContacts: IContact[] = alfy.debug
        ? contacts.getAllContacts()
        : alfy.cache.get(CACHE_CONTACTS_KEY) ?? contacts.getAllContacts()

    alfy.cache.set(CACHE_CONTACTS_KEY, allContacts, { maxAge: CACHE_TTL })

    const res = allContacts.filter((contact) => {
        const isMatchSome: boolean = SEARCH_FIELDS_CONFIG.some((fieldKey) => {
            const field = contact[fieldKey]
            if (typeof field === 'string') {
                return field.toLowerCase().includes(lookFor)
            }
            if (Array.isArray(field)) {
                return field.some((item) => item.toLowerCase().includes(lookFor))
            }
        })

        return isMatchSome
    })

    return res
}
