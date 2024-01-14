import type { IContact } from '../models/contact.model.js'

export const SEARCH_FIELDS_CONFIG: (keyof IContact)[] = ['firstName', 'lastName', 'phoneNumbers']
