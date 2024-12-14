require('dotenv').config()
const {Sender, Recipient, EmailParams, MailerSend} = require('mailersend')

async function sendEmail ({subject = '', message = '', to = '', html=''} = {}) {

    const sender = new Sender('wajeeh@trial-yzkq3409jo34d796.mlsender.net', "Syed Wajeeh Ahsan")
    const recipient = [
        new Recipient(to)
    ]

    const emailParams = new EmailParams()
    .setFrom(sender)
    .setTo(recipient)
    .setReplyTo(sender)
    .setSubject(subject)
    .setText(message)

    try {
        await new MailerSend({apiKey: process.env.MAILERSEND_API_KEY}).email.send(emailParams)        
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendEmail