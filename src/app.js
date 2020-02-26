require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
const usersRouter = require('./users-router/users-router');
const poolsRouter = require('./pools-router/pools-router');
const pairingRouter = require('./pairings-router/pairings-router');
const interestsRouter = require('./interests-router/interests-router');
const verifyRouter = require('./verify-router/verify-router');
const userAuth = require('./auth/user-auth');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors())
// app.use(cors({
//     origin: 'https://secretsanta.snazzyj.now.sh'
// }));

app.use('/api/users', usersRouter); // locates user profile
app.use('/api/pools', poolsRouter); //post req for creating pool
app.use('/api/pairings', pairingRouter) // get + post req for pairings
app.use('/api/interests', interestsRouter) // get + post req for user interests
app.use('/api/auth', userAuth) // post req for login in and sign up
app.use('/api/verify', verifyRouter) // patch for verifying status in pool

app.use(function errorHandler(error, req, res, next) {
    let response;

    if(NODE_ENV === 'production') {
        response = {error: {message: error}}
    } else {
        response = {message: error.message, error}
    }
    res.status(500).json(response);
});

module.exports = app