const config = require('../config')
const nodemailer = require('nodemailer')

const Mailer = {
    sendMail(user) {
        const {gifteeName, pair, pool_id, confirmationCode} = user;
        const {name, email} = pair

        const verifyUrl = `http://localhost:3000/verify/${pool_id}`;
        const signUpUrl = 'http://localhost:3000/signup';

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
            subject: `Ho Ho Ho ${name}! You got a new Secret Santa Pair!`,
            html: `
            <p>You got <strong>${gifteeName}</strong> for Secret Santa!</p>
            <p>Your verification code is: <strong>${confirmationCode}</strong></p>
            <p>Enter it here: <a href=${verifyUrl}>Here</a> to confirm your status in the Secret Santa pool!</p>
            <p>After doing so, <a href=${signUpUrl}>Sign Up</a>. Your email will be your primary username.
            `
        }

        transporter.sendMail(helperOptions, (error, info) => {
            if (error) {
                return error;
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