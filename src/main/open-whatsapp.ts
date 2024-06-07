import { FastAlfred } from 'fast-alfred'
import type { PhoneNumber } from 'libphonenumber-js'
import { parsePhoneNumber } from 'libphonenumber-js'
import { execPromise } from '@common/utils.js'
import type { ContactPayload } from '@models/contact-payload.model.js'

;(async () => {
    const alfredClient = new FastAlfred()

    const input: ContactPayload = JSON.parse(alfredClient.input)

    const { phoneNumber: inputPhoneNumber, countryCode: inputCountryCode } = input

    const { number }: PhoneNumber = parsePhoneNumber(inputPhoneNumber, inputCountryCode)

    const urlNew = `whatsapp://send?phone=${number}`

    await execPromise(`open ${urlNew}`)
})()
