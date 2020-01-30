const config = require('../config')
const nodemailer = require('nodemailer')

const Mailer = {
    sendMail(user) {
        const {gifteeName, pair, pool_id, confirmationCode} = user;
        const {name, email} = pair

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
            to: email,
            subject: `Hello ${name}! You got a new Secret Santa Pair!`,
            html: `
            <p>You got <strong>${gifteeName}</strong> for Secret Santa!</p>
            <p>Your verification code is: <strong>${confirmationCode}</strong></p>
            <p>Enter it here: <a href=${url}>Here</a></p>
            `
        }

        transporter.sendMail(helperOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
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