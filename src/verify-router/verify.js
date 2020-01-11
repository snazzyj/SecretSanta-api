const express = require('express');

const verifyRouter = express.Router();

verifyRouter
    .route('/pool_id')
    .patch((req, res, next) => {
        
    })

module.exports = verifyRouter