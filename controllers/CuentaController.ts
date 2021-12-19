'use strict'
let ModeloObjeto = require('../models/Comanda');
let EstadoCuenta = require('../models/EstadoCuenta');

async function obtenerEstado(valor) {
    let estado = await EstadoCuenta.findOne({ clave: valor }).exec();
    return estado;
}
let estado_cuenta = obtenerEstado('SOL');
let cuenta = {
    subtotal: 0,
    descuento: 0,
    propina: 0,
    total: 0,
    comentario: '',
    estado: { estado_cuenta }
};

async function calcularCuenta(request, response) {
    let modeloObtenidoId = request.params.id;

    ModeloObjeto.findById(modeloObtenidoId).exec(async(error, modeloObtenido) => {
        if (error) {
            onServerError(response, error);
        } else {
            if (modeloObtenido) {;
                let comanda_calculada = calcular(modeloObtenido);
                let estadoSolicitada = await EstadoCuenta.findOne({ clave: 'SOL' }).exec();
                estadoSolicitada = estadoSolicitada;
                comanda_calculada.cuenta.estado.clave = estadoSolicitada.clave;
                comanda_calculada.cuenta.estado.glosa = estadoSolicitada.glosa;
                return response.status(200).send({
                    comanda_calculada
                })
            } else {
                onNotFound(response);
            }
        }
    });
}

function calcular(comanda) {
    comanda.cuenta.subtotal = 0;
    comanda.cuenta.propina = 0;
    comanda.cuenta.descuento = 1000;
    comanda.detalle.forEach(function(det) {
        det.producto.monto_neto = det.producto.precio * det.cantidad;

        comanda.cuenta.subtotal += det.producto.monto_neto;
    });
    //comanda.cuenta.total = 1000000 + subtotal;
    let cuentaConDescuento = comanda.cuenta.subtotal - comanda.cuenta.descuento;
    comanda.cuenta.propina = cuentaConDescuento * 0.1;
    comanda.cuenta.total = cuentaConDescuento + comanda.cuenta.propina;
    return comanda;
}

function onNotFound(response) {
    response.status(404).send({
        message: 'No existe comanda.'
    });
}

function onServerError(response, error) {
    response.status(500).send({
        message: 'Error en el servidor.',
        error
    });
}

module.exports = {
    calcularCuenta
};