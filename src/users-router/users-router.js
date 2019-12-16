const path = require('path');
const express = require('express');
const UsersService = require('./users-service');

const usersRouter = express.Router();
const jsonParser = express.json();

const serializeUser = user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    interests: user.interests
})

usersRouter
    .route('/')
    .get((req, res, next) => {
        console.log(req.body)
})

module.exports = usersRouter;