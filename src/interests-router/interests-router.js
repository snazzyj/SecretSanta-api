const express = require('express');
const InterestsService = require('./interests-service');

const interestsRouter = express.Router();
const jsonParser = express.json();

const serializeInterest = user => ({
    interest: user.interest,
    email: user.email
})

interestsRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const {interest, email} = req.body;
        const newInterest = {interest, email};

        InterestsService.insertInterest(
            req.app.get('db'),
            newInterest
        )
        .then(interest => {
            res.status(201).json(serializeInterest(interest))
        })
        .catch(next)
    })

interestsRouter
    .route('/:user_email')
    .all( (req, res, next) => {

        InterestsService.getInterest(
            req.app.get('db'),
            req.params.user_email
        )
        .then(interest => {
            if(!interest) {
                return res.status(404).json({
                    error: {message: `Interest doesn't exist`}
                })
            }
            res.interest = interest
            next();
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.send(res.interest)
    })

module.exports = interestsRouter;