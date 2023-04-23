import type { CountryCode } from 'libphonenumber-js'

export interface ContactPayload {
    phoneNumber: string
    countryCode: CountryCode
}
