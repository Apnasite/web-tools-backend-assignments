const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/api/interest-calculator', routes);

module.exports = app;
