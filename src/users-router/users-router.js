const express = require('express');
const UsersService = require('./users-service');
const generatePassword = require('password-generator');

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
        const {users} = req.body;

        users.forEach((user) => {

            let password = "";
            password = generatePassword(6, false)

            user = {
                name: user.name,
                email: user.email,
                password: password
            }
            
            UsersService.insertUsers(
                req.app.get('db'),
                user
            )

            .then(user => {
                res.status(201)
            })
            .catch(next)
        })
    })

usersRouter
    .route('/:user_id')
    .all((req, res, next) => {
       
        UsersService.getById(
            req.app.get('db'),
            req.params.user_id
        )
        .then(user => {
            console.log("user:", user)
            if (!user) {
                return res.status(404).json({
                    error: {message: `User doesn't exist`}
                })
            }
            res.user = user;
            next();
        })
        .catch(next)
    })
    .get((req, res, next) => {
        console.log("user in GET request", res.user)
        res.send(res.user)
    })

usersRouter
    .route('/email/:user_email')
    .all((req, res, next) => {
       
        UsersService.getByEmail(
            req.app.get('db'),
            req.params.user_email
        )
        .then(user => {
            console.log("user:", user)
            if (!user) {
                return res.status(404).json({
                    error: {message: `User doesn't exist`}
                })
            }
            res.user = user;
            next();
        })
        .catch(next)
    })
    .get((req, res, next) => {
        console.log("user in GET request", res.user)
        res.send(res.user)
    })


module.exports = usersRouter;