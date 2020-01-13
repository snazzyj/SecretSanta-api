const express = require('express');
const VerifyService = require('./verify-service');

const verifyRouter = express.Router();
const jsonParser = express.json();

verifyRouter
    .route('/:pool_id')
    .patch(jsonParser, (req, res, next) => {     
        const userCode = req.body.code
        
        VerifyService.updateConfirmation(
            req.app.get('db'),
            userCode,
            req.params.pool_id
        )
        .then(() => {
            res.status(204).end()
        })
        .catch(next)

    })

module.exports = verifyRouter