import { FastAlfred } from 'fast-alfred'
import type { PhoneNumber } from 'libphonenumber-js'
import { parsePhoneNumber } from 'libphonenumber-js'
import { execPromise } from '@common/utils.js'
import type { ContactPayload } from '@models/contact-payload.model.js'
import { buildOpenUrl } from '@services/platform-url-builder.service.js'

;(async () => {
    const alfredClient = new FastAlfred()

    try {
        const input: ContactPayload = JSON.parse(alfredClient.input)

        const { phoneNumber: inputPhoneNumber, countryCode: inputCountryCode, platform } = input

        const { number }: PhoneNumber = parsePhoneNumber(inputPhoneNumber, inputCountryCode)

        const parsedInput = {
            ...input,
            phoneNumber: number,
        }

        const openUrl = buildOpenUrl(platform, parsedInput)

        await execPromise(`open ${openUrl}`)
    } catch (error) {
        alfredClient.error(error)
    }
})()
