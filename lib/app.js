const express = require('express');
const morgan = require('morgan');
const { resolve } = require('path');
const app = express();
const errorHandler = require('./util/error-handler');
const ensureAuth = require('./util/ensure-auth')();

require('./models/register-plugins');
const redirectHttp = require('./util/redirect-http');
const checkConnection = require('./util/check-connection');

if(process.env.NODE_ENV === 'production') {
    app.use(redirectHttp());
}

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

const auth = require('./routes/auth');
const goals = require('./routes/goals');
const users = require('./routes/users');

if(process.env.NODE_ENV !== 'production') {
    app.use(checkConnection());
}

app.use('/api/auth', auth);
app.use('/api/me/goals', ensureAuth, goals);
app.use('/api/users', ensureAuth, users);

app.use((req, res) => {
    res.sendFile('index.html', {
        root: resolve(__dirname + '/../public/')
    });
});

app.use(errorHandler());

module.exports = app;