export const SUPPORTED_PLATFORMS = ['whatsapp', 'sms', 'call', 'mail'] as const
export type SupportedPlatform = (typeof SUPPORTED_PLATFORMS)[number]
