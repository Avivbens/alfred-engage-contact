import type { FastAlfred } from 'fast-alfred'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import contacts from 'node-mac-contacts'
import { CACHE_CONTACTS_KEY, CACHE_TTL } from '../common/constants.js'
import { AuthStatus } from '../models/auth-status.enum.js'
import type { IContact } from '../models/contact.model.js'
import { SEARCH_FIELDS_CONFIG } from './search-contacts.config.js'

export function isAuth(): boolean {
    const status: AuthStatus = contacts.getAuthStatus()
    return status === AuthStatus.Authorized
}

export function requestAuth(): void {
    contacts.requestAccess()
}

export function searchContacts(alfredClient: FastAlfred): IContact[] {
    const isHasAccess: boolean = isAuth()
    if (!isHasAccess) {
        requestAuth()
        return []
    }

    const lookFor = alfredClient.input.toLowerCase()

    // when in debug mode - always fetch contacts from the system
    const allContacts: IContact[] = alfredClient.alfredInfo.isDebug()
        ? contacts.getAllContacts()
        : alfredClient.cache.get(CACHE_CONTACTS_KEY) ?? contacts.getAllContacts()

    alfredClient.cache.setWithTTL(CACHE_CONTACTS_KEY, allContacts, { maxAge: CACHE_TTL })

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
