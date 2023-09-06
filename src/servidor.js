const express = require('express');
const cubosBank = require('./rotas');

const app = express();

app.use(express.json());

app.use(cubosBank);

module.exports = app;