const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./util/error-handler');
const ensureAuth = require('./util/ensure-auth')();

require('./models/register-plugins');
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.json());

const auth = require('./routes/auth');
const goals = require('./routes/goals');
const users = require('./routes/users');

app.use('/api/auth', auth);
app.use('/api/me/goals', ensureAuth, goals);
app.use('/api/users', ensureAuth, users);

app.use((req, res) => {
    res.sendFile('index.html', { root: './public' });
});

app.use(errorHandler());

module.exports = app;