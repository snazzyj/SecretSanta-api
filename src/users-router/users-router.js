const express = require('express');
const generatePassword = require('password-generator');
const UsersService = require('./users-service');
const UserAuthService = require('../auth/user-auth-service');
const MailerService = require('../mailer/mailer-service');

const usersRouter = express.Router();
const jsonParser = express.json();

const serializeUser = user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password
})

usersRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        UsersService.getAllUsers(knexInstance)
            .then(users => {
                res.json(users.map(serializeUser))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { users } = req.body;

        //filter users by email to see who already has an account
        UsersService.getAllUsers(req.app.get('db'))
            .then(dbUsers => {

                const filteredUsers = users.filter(user =>
                    !dbUsers.find(dbUser => (dbUser.email === user.email))
                    )
                return filteredUsers
                    
            })
            .then(newUsers => {

                newUsers.forEach((user) => {

                    newUser = {
                        name: user.name,
                        email: user.email
                    }

                    return UsersService.insertUsers(
                        req.app.get('db'),
                        newUser
                    )
                    .then(user => {
                        res.status(201)
                    })
                })

                res.send({users})
            })
            .catch(next)
    })

usersRouter
    .route('/:user_id')
    .all((req, res, next) => {

        UsersService.getById(
            req.app.get('db'),
            req.params.user_id
        )
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User doesn't exist` }
                    })
                }
                res.user = user;
                next();
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.send(res.user)
    })

module.exports = usersRouter;