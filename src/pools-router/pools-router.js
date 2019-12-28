const express = require('express');
const PoolsService = require('./pools-service');

const poolsRouter = express.Router();
const jsonParser = express.json();

const serializePool = pool => ({
    pool_name: pool.pool_name,
    admin_email: pool.admin_email,
    pool_id: pool.pool_id
})

poolsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        PoolsService.getAllPools(knexInstance)
            .then(pool => {
                res.json(pool)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const {admin_email, pool_name} = req.body;
        const newPool = {admin_email, pool_name};

        PoolsService.insertPool(
            req.app.get('db'),
            newPool
        )
        .then(pool =>{
            console.log(pool)
            res.status(201).json(serializePool(pool))
        })
        .catch(next)
    })


module.exports = poolsRouter;