const express = require('express');
const RegisterService = require('./register-service');

const registerRouter = express.Router();
const jsonParser = express.json();

const serializeUser = user => ({
    name: user.name,
    email: user.email,
    password: user.password
})

registerRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const {email, password, name} = req.body;
        const newUser = {email, password, name};

        RegisterService.insertUser(
            req.app.get('db'),
            newUser
        )
        .then(user => {
            res.status(201).json(serializeUser(user))
        })
        .catch(next)
    })


module.exports = registerRouter;