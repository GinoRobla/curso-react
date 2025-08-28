const express = require("express");
const multer = require("multer");
const ArticuloControlador = require("../controladores/Articulo");
const { subirImg } = require("../controladores/Articulo");

const router = express.Router();

// Configuración del almacenamiento
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./imagenes/articulos/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const subidor = multer({ storage: almacenamiento });

//rutas de prueba
router.get("/articulos", (req, res) => {
    res.json({ status: "success", message: "Ruta funcionando", articles: [] });
});

//rutas 
router.post("/crear", ArticuloControlador.crear);
router.get("/listar", ArticuloControlador.listar);
router.get("/listarId/:id", ArticuloControlador.listarId);
router.get("/articulo/:id", ArticuloControlador.listarId); // Alias para el frontend
router.delete("/borrarId/:id", ArticuloControlador.borrarId);
router.delete("/articulo/:id", ArticuloControlador.borrarId); // Alias para el frontend
router.put("/editarId/:id", ArticuloControlador.editarId);
router.put("/articulo/:id", ArticuloControlador.editarId); // Alias para el frontend
router.post("/subirImg/:id",[subidor.single("imagen")], ArticuloControlador.subirImg);
router.post("/upload-image/:id",[subidor.single("imagen")], ArticuloControlador.subirImg); // Alias para el frontend
router.get("/buscarImg/:fichero", ArticuloControlador.buscarImg);
router.get("/image/:fichero", ArticuloControlador.buscarImg); // Alias para el frontend
router.get("/buscador/:busqueda", ArticuloControlador.buscador);
router.get("/search/:busqueda", ArticuloControlador.buscador); // Alias para el frontend

module.exports = router;