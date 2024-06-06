import { FastAlfred } from 'fast-alfred'
import type { PhoneNumber } from 'libphonenumber-js'
import { parsePhoneNumber } from 'libphonenumber-js'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import type { ContactPayload } from '../models/contact-payload.model.js'

const execPrm = promisify(exec)

;(async () => {
    const alfredClient = new FastAlfred()

    const input: ContactPayload = JSON.parse(alfredClient.input)

    const { phoneNumber: inputPhoneNumber, countryCode: inputCountryCode } = input

    const { number }: PhoneNumber = parsePhoneNumber(inputPhoneNumber, inputCountryCode)

    const urlNew = `whatsapp://send?phone=${number}`

    await execPrm(`open ${urlNew}`)
})()
