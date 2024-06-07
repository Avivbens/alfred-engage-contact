export const SUPPORTED_PLATFORMS = ['whatsapp', 'sms', 'call'] as const
export type SupportedPlatform = (typeof SUPPORTED_PLATFORMS)[number]
