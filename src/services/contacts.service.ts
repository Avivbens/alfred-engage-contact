import type { FastAlfred } from 'fast-alfred'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import contacts from 'node-mac-contacts'
import { CACHE_CONTACTS_KEY, CACHE_TTL } from '@common/constants.js'
import { AuthStatus } from '@models/auth-status.enum.js'
import type { IContact } from '@models/contact.model.js'

export function isAuth(): boolean {
    const status: AuthStatus = contacts.getAuthStatus()
    return status === AuthStatus.Authorized
}

export function requestAuth(): void {
    contacts.requestAccess()
}

export function getContacts(alfredClient: FastAlfred): IContact[] {
    const isHasAccess: boolean = isAuth()
    if (!isHasAccess) {
        requestAuth()
        return []
    }

    const cacheContacts: IContact[] | null = alfredClient.cache.get(CACHE_CONTACTS_KEY)
    if (cacheContacts) {
        return cacheContacts
    }

    const fetchedContacts = contacts.getAllContacts()
    alfredClient.cache.setWithTTL(CACHE_CONTACTS_KEY, fetchedContacts, { maxAge: CACHE_TTL })

    return fetchedContacts
}
