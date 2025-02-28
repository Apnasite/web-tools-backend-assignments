const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use('/api/age-calculator', routes);

module.exports = app;
