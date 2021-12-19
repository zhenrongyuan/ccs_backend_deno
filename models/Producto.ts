import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";
import { Tipo_producto } from './TipoProducto.ts';
import { Estado_producto } from './EstadoProducto.ts';

export interface Producto {
    _id: Bson.ObjectId;
    nombre: String,
    descripcion: String,
    precio: Number,
    popularidad: Number,
    tipo: Tipo_producto,
    estado: Estado_producto
}