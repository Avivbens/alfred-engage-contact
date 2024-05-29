import alfy from 'alfy'
import type { PhoneNumber } from 'libphonenumber-js'
import { parsePhoneNumber } from 'libphonenumber-js'
import type { ContactPayload } from './models/contact-payload.model.js'
import { promisify } from 'node:util'
import { exec } from 'node:child_process'

const execPrm = promisify(exec)

;(async () => {
    const rawInput: string = alfy.input
    const input: ContactPayload = JSON.parse(rawInput)

    const { phoneNumber: inputPhoneNumber, countryCode: inputCountryCode } = input

    const { number }: PhoneNumber = parsePhoneNumber(inputPhoneNumber, inputCountryCode)

    const urlNew = `whatsapp://send?phone=${number}`

    await execPrm(`open ${urlNew}`)

    // const url: string = `https://api.whatsapp.com/send?phone=${number}`

    // const command: string = `
    // open -na 'Google Chrome' --args --new-window '${url}' &&
    // (while [ $(osascript -e 'tell application "Google Chrome" to busy of window 1 as string') = "true" ]; do sleep 1; done && sleep 2 && osascript -e 'tell application "Google Chrome" to close window 1') >/dev/null 2>&1`
    // exec(command)
})()
