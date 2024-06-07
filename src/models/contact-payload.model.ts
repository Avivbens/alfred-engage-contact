import type { CountryCode } from 'libphonenumber-js'
import type { SupportedPlatform } from './platform.model.js'

export interface ContactPayload {
    phoneNumber: string
    countryCode: CountryCode
    platform: SupportedPlatform
}
