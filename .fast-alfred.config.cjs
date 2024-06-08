const { author, description, homepage } = require('./package.json')

const README = `
Search contacts and engage with them via Alfred ✨

Supported apps:
- SMS
- Call
- WhatsApp
- Email

See the workflow codebase in here:
${homepage}
`.trim()

/**
 * @type {import('fast-alfred').FastAlfredConfig}
 */
module.exports = {
    bundlerOptions: {
        /**
         * Essential to include the native module
         *
         * This library hard-code the assets path to the native module
         * `node_modules/node-mac-contacts/index.js`
         *
         * We have to change the build & assets path in order the script would be able to load the native module
         */
        assets: ['./src/assets/contacts.node'],
        assetsDir: 'Release',
        targetDir: 'build',
    },
    workflowMetadata: {
        name: 'Engage Contact',
        category: 'Tools',
        createdby: author.name,
        webaddress: homepage,
        description,
        readme: README,
    },
    tabSize: 4,
}
