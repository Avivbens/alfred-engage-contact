import type { CountryCode } from 'libphonenumber-js'
import type { SupportedPlatform } from './platform.model'

export interface ContactPayload {
    phoneNumber: string
    emailAddress: string
    countryCode: CountryCode
    platform: SupportedPlatform
}
