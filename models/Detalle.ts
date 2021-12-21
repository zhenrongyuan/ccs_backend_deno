import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";
import { Cliente } from "./Cliente.ts";
import { Mesa } from "./Mesa.ts";
import { Tipo_comanda } from "./TipoComanda.ts";
import { Personal } from './Personal.ts';
import { Producto } from './Producto.ts';

export interface Detalle {
    producto: Producto;
    cantidad: number;
    monto_neto: number;
    comentario?: string;
}