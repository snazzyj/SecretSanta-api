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

const shuffle = (array) => {
    let poolOfNames = [];
    while (array.length !== 0) {
        let randomIndex;
        randomIndex = Math.floor(Math.random() * array.length);
        poolOfNames.push(array[randomIndex]);
        array.splice(randomIndex, 1);
    }
    return poolOfNames;
}

pairingsRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const {users, pool_id} = req.body;
        // console.log(users)

        console.log(pool_id)
        let userList = users.map(obj => {
            let newObject = {};

            Object.keys(obj).forEach(properyKey => {
                newObject[properyKey] = obj[properyKey]
            });

            return newObject;
        })
        userList.map(obj => obj.pairName = "")

        const poolOfNames = shuffle(userList);
        poolOfNames.map(obj => obj.pool_id = pool_id)

        let left = poolOfNames.slice(0, poolOfNames.length / 2)
        let right = poolOfNames.slice(Math.ceil(poolOfNames.length / 2))

        left.forEach((leftItem, i) => {
            let rightItem = right[i]
            let leftUser = poolOfNames
                .find(user => leftItem.email === user.email)

            let rightUser = poolOfNames
                .find(user => rightItem.email === user.email)

            leftUser.pairName = rightUser.email;
            rightUser.pairName = leftUser.email;
        })

        console.log(poolOfNames)
        poolOfNames.map((pair) => {
            const newPairings = {
                pool_id : pair.pool_id,
                email: pair.email,
                giftee: pair.pairName,
                confirmation: false
            }

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
        res.send(res.pairs)
    })




module.exports = pairingsRouter;