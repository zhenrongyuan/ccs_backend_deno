import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";
import { Estado_cuenta } from './EstadoCuenta.ts';
import { Medio_de_pago } from './MedioDePago.ts';

export interface Cuenta {
    _id: Bson.ObjectId;
    subtotal: number,
    descuento: number,
    propina: number,
    total: number,
    medio_de_pago: Medio_de_pago,
    estado: Estado_cuenta,
    comentario: string,
}