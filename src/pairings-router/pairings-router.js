const express = require('express');
const PairingsService = require('./pairings-service');
const uuid = require('uuid/v4')

const pairingsRouter = express.Router();
const jsonParser = express.json();

const serializePairings = pair => ({
    pool_id: pair.pool_id,
    email: pair.email,
    giftee: pair.giftee,
    confirmation: pair.confirmation
})

pairingsRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const {users, pool_id} = req.body;
        const poolOfNames  = PairingsService.generatePairings(users);
        console.log({users})

        console.log({poolOfNames})
        poolOfNames.map((pair) => {
            const newPairings = {
                pool_id,
                email: pair.email,
                giftee: pair.giftee,
                confirmation: false
            }

            console.log({newPairings})
            PairingsService.insertPairs(
                req.app.get('db'),
                newPairings
            )
            .then(pair => {
                res.status(201)
            })
            .catch(next)
        })

    })

pairingsRouter
    .route('/:pool_id')
    .all((req, res, next) => {

        PairingsService.getAllPairs(
            req.app.get('db'),
            req.params.pool_id
        )
        .then(pairs => {
            if(!pairs) {
                return res.status(404).json({
                    error: {message: `Pairings don't exist`}
                })
            }
            res.pairs = pairs
            next();
        })
        .catch(next)

    })
    .get((req, res, next) => {
        console.log('Response pairs: ', res.pairs)
        res.send(res.pairs)
    })




module.exports = pairingsRouter;