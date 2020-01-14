const config = require('../config')
const nodemailer = require('nodemailer')
const MailerService = require('./mailer-service');

const Mailer = {
    async sendMail(gifteeName, pair, pool_id, confirmationCode) {

        const url = `http://localhost:3000/api/verify/${pool_id}`

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 25,
            auth: {
                user: 'secret.santa.pairings@gmail.com',
                pass: config.EMAIL_PASS
            }
        });

        let helperOptions = {
            from: ' "Secret Santa" <secret.santa.pairings@gmail.com> ',
            to: pair.email,
            subject: 'Hello World!',
            html: `
            <p>You got <strong>${gifteeName[0].name}</strong> for Secret Santa!</p>
            <p>Your verification code is: <strong>${confirmationCode}</strong></p>
            <p>Enter it here: <a href=${url}>Here</a></p>
            `
        }

        transporter.sendMail(helperOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('message was sent!')
            console.log(info)
        })

    }
}
module.exports = Mailer;


/*
    // 5 Digit code
    // click here (https://..../verify)
    // enter 5 digit code
    // on submission check members_pool for code
    // if same PUT / PATCH confirmation to true
*/