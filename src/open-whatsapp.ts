import alfy from 'alfy'
import { exec } from 'child_process'
import { ContactPayload } from './models/contact-payload.model'
;(async () => {
    const rawInput: string = alfy.input
    const input: ContactPayload = JSON.parse(rawInput)

    const { phoneNumber: inputPhoneNumber, countryCode: inputCountryCode } = input

    const validPhoneNumber: string = inputPhoneNumber.replace(/\D/g, '')

    // take only the last 9 digits
    const phoneNumber: string = validPhoneNumber.slice(-9)

    const isHasCountryCode: boolean = validPhoneNumber.includes('+')
    const withPrefix: string = isHasCountryCode ? validPhoneNumber : `${inputCountryCode}${phoneNumber}`

    const url: string = `https://api.whatsapp.com/send?phone=${withPrefix}`

    const command: string = `
    open -na 'Google Chrome' --args --new-window '${url}' &&
    (while [ $(osascript -e 'tell application "Google Chrome" to busy of window 1 as string') = "true" ]; do sleep 1; done && sleep 1 && osascript -e 'tell application "Google Chrome" to close window 1') >/dev/null 2>&1`
    exec(command)
})()
