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

                        let pool_id = UserAuthService.getPoolId(
                            req.app.get('db'),
                            dbUser.email
                        )
                        .then(id => {
                                // console.log(id)
                                
                                const sub = dbUser.email;
                                const payload = { user_id: dbUser.id };
                                const user = {
                                    id: dbUser.id,
                                    email: dbUser.email,
                                    name: dbUser.name,
                                    pool_id: id
                                }
                                res.send({
                                    authToken: UserAuthService.createJwt(sub, payload),
                                    user
                                })
                        });

                    })
            })
            .catch(next)

    })

userAuthRouter
    .route('/register')
    .post(jsonParser, (req, res, next) => {
        const { email, password, name } = req.body;
        UserAuthService.hasUserWithEmail(
            req.app.get('db'),
            email
        )
            .then(hasUserWithEmail => {
                if (hasUserWithEmail) {
                    return res.status(400).json({ error: `Email already taken` })
                }

                return UserAuthService.hashPassword(password)
                    .then(hashedPassword => {
                        const newUser = {
                            email,
                            password: hashedPassword,
                            name
                        }

                        return UserAuthService.insertUser(
                            req.app.get('db'),
                            newUser
                        )
                            .then(user => {
                                res.status(201).json(serializeUser(user))
                            })
                    })
            })
            .catch(next)
    })

module.exports = userAuthRouter;
