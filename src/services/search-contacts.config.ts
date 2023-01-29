import { IContact } from '../models/contact.model'

export const SEARCH_FIELDS_CONFIG: (keyof IContact)[] = ['firstName', 'lastName', 'phoneNumbers']
