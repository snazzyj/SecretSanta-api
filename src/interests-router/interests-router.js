const express = require('express');
const InterestsService = require('./interests-service');

const interestsRouter = express.Router();
const jsonParser = express.json();

const serializeInterest = user => ({
    interest: user.interest,
    email: user.email
})

interestsRouter
    .route('/:user_email')
    .all( (req, res, next) => {

        InterestsService.getInterest(
            req.app.get('db'),
            req.params.user_email
        )
        .then(interests => {
            if(!interests) {
                return res.status(404).json({
                    error: {message: `Interest doesn't exist`}
                })
            }
            res.interests = interests
            next();
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.send(res.interests)
    })
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
    .delete(jsonParser, (req, res, next) => {
        const interestToDelete = req.body.interest;
        console.log({interestToDelete})
        console.log('req body: ', req.body)
        console.log('req params: ', req.params)
        InterestsService.deleteInterest(
            req.app.get('db'),
            interestToDelete,
            req.params.user_email
        )
        .then( () => {
            res.status(204).end()
        })
        .catch(next)
    })

module.exports = interestsRouter;