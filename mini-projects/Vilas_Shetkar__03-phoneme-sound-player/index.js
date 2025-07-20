require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Phoneme Sound Player running on http://localhost:${PORT}`);
});