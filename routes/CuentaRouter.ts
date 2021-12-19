'use strict'

let express = require('express');
let controller = require('../controllers/CuentaController');

let api = express.Router();

api.get('/cuenta/:id', controller.calcularCuenta);
module.exports = api;