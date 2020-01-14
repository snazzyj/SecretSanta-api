const express = require('express');
const VerifyService = require('./verify-service');

const verifyRouter = express.Router();
const jsonParser = express.json();

verifyRouter
    .route('/:pool_id')
    .patch(jsonParser, (req, res, next) => {
        const userCode = req.body.code
        // const userCode = "123";
            
        VerifyService.updateConfirmation(
            req.app.get('db'),
            userCode,
            req.params.pool_id
        )
        .then(numRowsAffected => {
            if(numRowsAffected !== 1) {
                res.status(404).json({
                    error: 'Verification Code not found'
                })
            }
            res.status(204).end()
        })
        .catch(next)
            

    })

module.exports = verifyRouter