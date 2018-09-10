const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./utils/error-handler');
require('./models/register-plugins');

// const ensureAuth = require('./auth/ensure-auth')();

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.json());

const auth = require('./routes/auth');
const goals = require('./routes/goals');
const users = require('./routes/users');

app.use('/api/auth', auth);
app.use('/api/me/goals', goals);
app.use('/api/users', users);


app.use((req, res) => {
    res.sendFile('index.html', { root: './public'} );
});

app.use(errorHandler());

module.exports = app;