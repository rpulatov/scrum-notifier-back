const nodemailer = require('nodemailer')

const OPTIONS = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
}

module.exports = async (receiver, payload) => {
    try {
        const transporter = nodemailer.createTransport(OPTIONS)
        const data = {
            to: receiver,
            from: process.env.EMAIL_USERNAME,
            ...payload,
        }

        const info = await transporter.sendMail(data)

        console.log('Successful email sending', { data, info })
        return true
    } catch (error) {
        console.log('Error sending email', { error })
        return false
    }
}
