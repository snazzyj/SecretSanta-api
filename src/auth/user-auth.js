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

                        UserAuthService.getPoolData(
                            req.app.get('db'),
                            dbUser.email
                        )
                            .then(poolData => {
                                const userPairData = poolData
                                const pairs = [];

                                userPairData.forEach(pool_id => {
                                    UserAuthService.getUserPairs(
                                        req.app.get('db'),
                                        dbUser.email,
                                        pool_id
                                    )
                                        .then(userPairs => {
                                            pairs.push(userPairs[0])
                                            if (pairs.length === poolData.length) {

                                                const sub = dbUser.email;
                                                const payload = { user_id: dbUser.id };
                                                const user = {
                                                    id: dbUser.id,
                                                    email: dbUser.email,
                                                    name: dbUser.name,
                                                    pairData: pairs,
                                                    poolData
                                                }
                                                res.send({
                                                    authToken: UserAuthService.createJwt(sub, payload),
                                                    user
                                                })
                                            }
                                        })

                                })

                            })


                    })


            })
            .catch(next)
    })

    

userAuthRouter
    .route('/register')
    .post(jsonParser, (req, res, next) => {
        const { email, password, name } = req.body;

        UserAuthService.getUserWithEmail(
            req.app.get('db'),
            email
        )
            .then(user => {
                if (!user) {
                    return UserAuthService.hashPassword(password)
                        .then(hashedPassword => {
                            const newUser = {
                                email,
                                password: hashedPassword,
                                name
                            }
                            console.log({ newUser })
                            return UserAuthService.insertUser(
                                req.app.get('db'),
                                newUser
                            )
                                .then(user => {
                                    res.status(201).json(serializeUser(user))
                                })
                        })
                }
                return UserAuthService.hashPassword(password)
                    .then(hashedPassword => {
                        const updateUser = {
                            email,
                            password: hashedPassword,
                            name
                        }
                        return UserAuthService.updateUser(
                            req.app.get('db'),
                            updateUser
                        )
                    })
                    .then(user => {
                        console.log({ user })
                        res.status(201).json(serializeUser(user))
                    })
            })
            .catch(next)
    })

module.exports = userAuthRouter;
