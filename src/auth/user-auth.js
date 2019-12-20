const express = require('express');
const UserAuthService = require('./user-auth-service');

const userAuthRouter = express.Router();
const jsonParser = express.json();

const serializeUser = user => ({
    name: user.name,
    email: user.email,
    password: user.password
})

userAuthRouter
    .route('/login')
    .post(jsonParser, (req, res, next) => {
        const { email, password } = req.body;
        const loginUser = { email, password };

        for (const [key, value] of Object.entries(loginUser))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })

        UserAuthService.getUserWithEmail(
            req.app.get('db'),
            loginUser.email
        )
            .then(dbUser => {

                if (!dbUser)
                    return res.status(400).json({
                        error: 'Incorrect email or password'
                    })

                return UserAuthService.comparePasswords(loginUser.password, dbUser.password)
                    .then(compareMatch => {
                        if (!compareMatch)
                            return res.status(400).json({
                                error: 'Incorrect email or password'
                            })

                        const sub = dbUser.email;
                        const payload = { user_id: dbUser.id };
                        res.send({
                            authToken: UserAuthService.createJwt(sub, payload)
                        })
                    })
            })
            .catch(next)

    })

userAuthRouter
    .route('/register')
    .post(jsonParser, (req, res, next) => {
        const { email, password, name } = req.body;
        const newUser = { email, password, name };

        UserAuthService.insertUser(
            req.app.get('db'),
            newUser
        )
            .then(user => {
                res.status(201).json(serializeUser(user))
            })
            .catch(next)
    })

module.exports = userAuthRouter;
