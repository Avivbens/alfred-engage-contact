import alfy from 'alfy'
import { ContactPayload } from './models/contact-payload.model'
import open from 'open'
// import { exec } from 'child_process'
;(async () => {
    const rawInput: string = alfy.input
    const input: ContactPayload = JSON.parse(rawInput)

    const { phoneNumber: inputPhoneNumber, countryCode: inputCountryCode } = input

    const validPhoneNumber: string = inputPhoneNumber.replace(/\D/g, '')

    // take only the last 9 digits
    const phoneNumber: string = validPhoneNumber.slice(-9)

    const isHasCountryCode: boolean = validPhoneNumber.includes('+')
    const withPrefix: string = isHasCountryCode ? validPhoneNumber : `${inputCountryCode}${phoneNumber}`

    const urlNew: string = `whatsapp://send?phone=${withPrefix}`
    open(urlNew)

    // const url: string = `https://api.whatsapp.com/send?phone=${withPrefix}`

    // const command: string = `
    // open -na 'Google Chrome' --args --new-window '${url}' &&
    // (while [ $(osascript -e 'tell application "Google Chrome" to busy of window 1 as string') = "true" ]; do sleep 1; done && sleep 2 && osascript -e 'tell application "Google Chrome" to close window 1') >/dev/null 2>&1`
    // exec(command)
})()
