require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
const usersRouter = require('./users-router/users-router');
const registerRouter = require('./register-router/register-router');
const loginRouter = require('./login-router/login-router');
const poolsRouter = require('./pools-router/pools-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/users', usersRouter); // locates user profile
app.use('/api/pools', poolsRouter); //post req for creating pool
//app.use('/api/pairings') // get + post req for pairings
//app.use('/api/interests') // get + post req for user interests

//move register + login into /auth/
app.use('/api/register', registerRouter) // post req for sign up 
app.use('/api/login', loginRouter) // post req for login
//refresh to get new token


app.get('/', (req, res) => {
    res.send('Hello, world!')
});


app.use(function errorHandler(error, req, res, next) {
    let response;

    if(NODE_ENV === 'production') {
        response = {error: {message: 'server error'}}
    } else {
        response = {message: error.message, error}
    }

    console.error(error)
    res.status(500).json(response);
});

module.exports = app