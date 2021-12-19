import { Application } from "https://deno.land/x/oak/mod.ts";

import clienteRouter from "./routes/ClienteRouter.ts";
import comandaRouter from "./routes/ComandaRouter.ts";
import mesaRouter from "./routes/MesaRouter.ts";
import perfilRouter from "./routes/PerfilRouter.ts";
import personalRouter from "./routes/PersonalRouter.ts";
import productoRouter from "./routes/ProductoRouter.ts";
import reservaRouter from "./routes/ReservaRouter.ts";
import usuarioRouter from "./routes/UsuarioRouter.ts";

import estadoComandaRouter from "./routes/EstadoComandaRouter.ts";
import estadoCuentaRouter from "./routes/EstadoCuentaRouter.ts";
import estadoProductoRouter from "./routes/EstadoProductoRouter.ts";
import estadoReservaRouter from "./routes/EstadoReservaRouter.ts";
import estadoUsuarioRouter from "./routes/EstadoUsuarioRouter.ts";

import medioDePagoRouter from "./routes/MedioDePagoRouter.ts";

import tipoComandaRouter from "./routes/TipoComandaRouter.ts";
import tipoProductoRouter from "./routes/TipoProductoRouter.ts";

const PORT = 3800;

const app = new Application();

app.use(clienteRouter.routes());
app.use(clienteRouter.allowedMethods());

app.use(comandaRouter.routes());
app.use(comandaRouter.allowedMethods());

app.use(mesaRouter.routes());
app.use(mesaRouter.allowedMethods());

app.use(perfilRouter.routes());
app.use(perfilRouter.allowedMethods());

app.use(personalRouter.routes());
app.use(personalRouter.allowedMethods());

app.use(productoRouter.routes());
app.use(productoRouter.allowedMethods());

app.use(reservaRouter.routes());
app.use(reservaRouter.allowedMethods());

app.use(estadoComandaRouter.routes());
app.use(estadoComandaRouter.allowedMethods());

app.use(estadoCuentaRouter.routes());
app.use(estadoCuentaRouter.allowedMethods());

app.use(estadoProductoRouter.routes());
app.use(estadoProductoRouter.allowedMethods());

app.use(estadoReservaRouter.routes());
app.use(estadoReservaRouter.allowedMethods());

app.use(estadoUsuarioRouter.routes());
app.use(estadoUsuarioRouter.allowedMethods());

app.use(medioDePagoRouter.routes());
app.use(medioDePagoRouter.allowedMethods());

app.use(tipoComandaRouter.routes());
app.use(tipoComandaRouter.allowedMethods());

app.use(tipoProductoRouter.routes());
app.use(tipoProductoRouter.allowedMethods());

app.use(usuarioRouter.routes());
app.use(usuarioRouter.allowedMethods());

console.log(`Servidor escuchando en el puerto: ${PORT}`);

await app.listen({ port: PORT });