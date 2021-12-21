import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

import { db } from "../mongo/client.ts";
import { Comanda } from "../models/Comanda.ts";
import { Detalle } from '../models/Detalle.ts';
import { Estado_cuenta } from '../models/EstadoCuenta.ts';
import { Cuenta } from '../models/Cuenta.ts';
import { Medio_de_pago } from '../models/MedioDePago.ts';

const comandas = await db.collection<Comanda>("comandas");
const estados_cuentas = await db.collection<Estado_cuenta>("estados_cuentas");

const getComandaCalculada = async ({
    params,
    response,
}: {
    params: { id: string };
    response: any;
}) => {
    const oid = new Bson.ObjectId(params.id);
    const comanda = await comandas.findOne({
        _id: oid
    });

    if (comanda) {
        let cuentaOutput: Cuenta;
        if (!comanda.cuenta) {
            cuentaOutput = cuentaInicial;
            comanda.cuenta = cuentaOutput;
        }
        let comandaOutput = calcularCuenta(comanda, comanda.cuenta);
        response.status = 200;
        response.body = {
            success: true,
            comanda: comandaOutput,
            //comanda: comanda
        };
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: "Comanda no encontrada.",
        };
    }
};

const estadoCuentaInicial = await estados_cuentas.findOne({ clave: 'SOL' });

const cuentaInicial: Cuenta = {
    _id: new Bson.ObjectId(),
    subtotal: 0,
    descuento: 0,
    propina: 0,
    total: 0,
    medio_de_pago: <Medio_de_pago>{},
    estado: <Estado_cuenta>estadoCuentaInicial,
    comentario: ''
};

function calcularCuenta(comanda: Comanda, cuenta: Cuenta): Comanda {
    comanda.detalle.forEach(function (detalle: Detalle) {
        detalle.monto_neto = detalle.producto.precio * detalle.cantidad;
        cuenta.subtotal = cuenta.subtotal + detalle.monto_neto;
    });
    cuenta.total = cuenta.subtotal - cuenta.descuento + cuenta.propina;
    comanda.cuenta = cuenta;
    return comanda;
}

export {
    getComandaCalculada
};
