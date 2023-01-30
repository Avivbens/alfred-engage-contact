import alfy from 'alfy'
import { exec } from 'child_process'
;(async () => {
    const { input } = alfy
    const validPhoneNumber = input.replace(/\D/g, '')

    // TODO handle country code
    const withPrefix = `972${validPhoneNumber.slice(1)}`

    const url = `https://api.whatsapp.com/send?phone=${withPrefix}`

    const command = `open -na 'Google Chrome' '${url}'`
    exec(command)
})()
