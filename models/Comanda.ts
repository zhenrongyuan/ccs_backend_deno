import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";
import { Cliente } from "./Cliente.ts";
import { Mesa } from "./Mesa.ts";
import { Tipo_comanda } from "./TipoComanda.ts";
import { Personal } from './Personal.ts';
import { Producto } from './Producto.ts';
import { Cuenta } from './Cuenta.ts';
import { Detalle } from './Detalle.ts';

export interface Comanda {
    _id: Bson.ObjectId;
    cliente: Cliente;
    mesa?: Mesa;
    tipo: Tipo_comanda;
    personal: [Personal];
    detalle: [Detalle];
    cuenta?: Cuenta;
    comentario?: string;
}