const {conexion} = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");

//inicializar app
console.log("app de nodejs arrancada"); 

//conectar a la base de datos
conexion();

//crear el servidor nodejs
const app = express();
const puerto = 3900;

//configurar el cors
app.use(cors());

//convertir body a json
app.use(express.json()); // convertir el body a json
app.use(express.urlencoded({extended: true})); // convertir el body a urlencoded

// ruta de prueba directa
app.get("/api/test", (req, res) => {
    console.log("Ruta /api/test llamada");
    res.json({ message: "API funcionando" });
});

// rutas
const ArticuloRutas = require("./rutas/Articulo");

// cargar rutas
console.log("Cargando rutas de artículos...");
app.use("/api", ArticuloRutas);
console.log("Rutas de artículos cargadas");


//crear servidor y escuchar peticiones
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto " + puerto);
});