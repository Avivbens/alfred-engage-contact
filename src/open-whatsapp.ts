import alfy from 'alfy'
import { exec } from 'child_process'
;(async () => {
    const { input } = alfy
    const validPhoneNumber = input.replace(/\D/g, '')

    // take only the last 9 digits
    const phoneNumber = validPhoneNumber.slice(-9)
    const withPrefix = `972${phoneNumber}`

    const url = `https://api.whatsapp.com/send?phone=${withPrefix}`

    const command = `
    open -na 'Google Chrome' --args --new-window '${url}' &&
    (while [ $(osascript -e 'tell application "Google Chrome" to busy of window 1 as string') = "true" ]; do sleep 1; done && sleep 1 && osascript -e 'tell application "Google Chrome" to close window 1') >/dev/null 2>&1`
    exec(command)
})()
