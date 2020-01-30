const express = require('express');
const PairingsService = require('./pairings-service');
const Mailer = require('../mailer/mailer');
const MailerService = require('../mailer/mailer-service')

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
        const {users, admin_email, pool_name} = req.body;
        const newPool = {admin_email, pool_name}
        const poolOfUsers = PairingsService.generatePairings(users)

        PairingsService.insertPool(
            req.app.get('db'),
            newPool
        )
        .then(pool => {
            const {pool_id} = pool;

            poolOfUsers.forEach((pair) => {
                const newPairings = {
                    pool_id,
                    email: pair.email,
                    giftee: pair.giftee,
                    confirmation: false,
                    confirmation_code: MailerService.generateCode()
                }
                PairingsService.getGifteeName(
                    req.app.get('db'),
                    pair.giftee
                )
                .then(gifteeName => {      
                    const userMailInfo = {
                        gifteeName: gifteeName[0].name,
                        pair,
                        pool_id,
                        confirmationCode: newPairings.confirmation_code
                    }
                    Mailer.sendMail(
                        userMailInfo
                    )
                })

                PairingsService.insertPair(
                    req.app.get('db'),
                    newPairings
                )
                .then(result => {
                    res.status(201)
                })
                .catch(next)
            })
            res.send({pool_id})
            res.end()
        })

    })

pairingsRouter
    .route('/:poolId')
    .all((req, res, next) => {

        PairingsService.getAllPairs(
            req.app.get('db'),
            req.params.poolId
        )
            .then(pairs => {
                if (!pairs) {
                    return res.status(404).json({
                        error: { message: `Pairings don't exist` }
                    })
                }
                res.pairs = pairs
                next();
            })
            .catch(next)

    })
    .get((req, res, next) => {
        res.send(res.pairs)
    })




module.exports = pairingsRouter;