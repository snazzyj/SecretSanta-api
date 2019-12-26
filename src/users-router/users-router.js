const express = require('express');
const UsersService = require('./users-service');

const usersRouter = express.Router();

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