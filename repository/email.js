const nodemailer_transport = require('../lib/nodemailer')

class EmailRepository {
    constructor() {

    }
    async SendEmail(subject, recipient, text, html) {
        // send email with transporter
        await nodemailer_transport.sendMail({
            from: `"${process.env.MAILER_SENDER_NAME}" <${process.env.MAILER_SENDER_EMAIL}>`, // sender address
            to: recipient, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        })
    }
}

module.exports = EmailRepository