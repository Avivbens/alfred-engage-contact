// @ts-ignore
import contacts from 'node-mac-contacts'
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

    const allContacts: IContact[] = contacts.getAllContacts()
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
