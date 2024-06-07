import type { SupportedPlatform } from '@models/platform.model.js'

const PLATFORMS_URLS: Record<SupportedPlatform, (phoneNumber: string) => string> = {
    whatsapp: (phoneNumber: string) => `whatsapp://send?phone=${phoneNumber}`,
    sms: (phoneNumber: string) => `sms:${phoneNumber}`,
    call: (phoneNumber: string) => `tel:${phoneNumber}`,
}

export function buildOpenUrl(platform: SupportedPlatform, phoneNumber: string): string {
    const urlBuilder = PLATFORMS_URLS[platform]

    if (!urlBuilder) {
        throw new Error(`Unsupported platform: ${platform}`)
    }

    const res = urlBuilder(phoneNumber)
    return res
}
