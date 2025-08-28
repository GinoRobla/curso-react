const fs = require("fs");
const path = require("path");
const validator = require("validator");
const Articulo = require("../modelos/Articulo");

const crear = async (req, res) => {
    try {
        const parametros = req.body;

        // Validar datos de entrada
        const validarTitulo = !validator.isEmpty(parametros.titulo || "");
        const validarContenido = !validator.isEmpty(parametros.contenido || "");

        if (!validarTitulo || !validarContenido) {
            return res.status(400).json({
                status: "error",
                mensaje: "Título y contenido son requeridos"
            });
        }

        // Crear y guardar artículo
        const articulo = new Articulo(parametros);
        const articuloGuardado = await articulo.save();

        return res.status(201).json({
            status: "success",
            mensaje: "Artículo creado correctamente",
            articulo: articuloGuardado
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al crear el artículo"
        });
    }
};

const listar = async (req, res) => {
    try {
        const articulos = await Articulo.find().sort({ fechaCreacion: -1 });

        return res.status(200).json({
            status: "success",
            total: articulos.length,
            articles: articulos
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener los artículos"
        });
    }
};

const listarId = async (req, res) => {
    try {
        const { id } = req.params;
        const articulo = await Articulo.findById(id);

        if (!articulo) {
            return res.status(404).json({
                status: "error",
                mensaje: "Artículo no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            article: articulo
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al obtener el artículo"
        });
    }
};

const borrarId = async (req, res) => {
    try {
        const { id } = req.params;
        const articulo = await Articulo.findByIdAndDelete(id);

        if (!articulo) {
            return res.status(404).json({
                status: "error",
                mensaje: "Artículo no encontrado"
            });
        }

        // Eliminar imagen asociada si existe
        if (articulo.imagen && articulo.imagen !== "default.png") {
            const rutaImagen = path.join(__dirname, "../imagenes/articulos/", articulo.imagen);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
            }
        }

        return res.status(200).json({
            status: "success",
            mensaje: "Artículo eliminado correctamente",
            articulo
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al eliminar el artículo"
        });
    }
};

const editarId = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        // Validar datos si se proporcionan
        if (datos.titulo && validator.isEmpty(datos.titulo)) {
            return res.status(400).json({
                status: "error",
                mensaje: "El título no puede estar vacío"
            });
        }

        if (datos.contenido && validator.isEmpty(datos.contenido)) {
            return res.status(400).json({
                status: "error",
                mensaje: "El contenido no puede estar vacío"
            });
        }

        const articuloActualizado = await Articulo.findByIdAndUpdate(
            id, 
            datos, 
            { new: true, runValidators: true }
        );

        if (!articuloActualizado) {
            return res.status(404).json({
                status: "error",
                mensaje: "Artículo no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            mensaje: "Artículo actualizado correctamente",
            articulo: articuloActualizado
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al editar el artículo"
        });
    }
};

const subirImg = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha proporcionado ninguna imagen"
            });
        }

        const { id } = req.params;
        const archivo = req.file.originalname;
        const extension = path.extname(archivo).toLowerCase();
        const extensionesPermitidas = ['.png', '.jpg', '.jpeg', '.gif'];

        if (!extensionesPermitidas.includes(extension)) {
            // Eliminar archivo no válido
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                status: "error",
                mensaje: "Formato de imagen no válido. Use PNG, JPG, JPEG o GIF"
            });
        }

        // Buscar artículo anterior para eliminar imagen previa
        const articuloAnterior = await Articulo.findById(id);
        
        const articuloActualizado = await Articulo.findByIdAndUpdate(
            id,
            { imagen: req.file.filename },
            { new: true, runValidators: true }
        );

        if (!articuloActualizado) {
            // Eliminar archivo si el artículo no existe
            fs.unlinkSync(req.file.path);
            return res.status(404).json({
                status: "error",
                mensaje: "Artículo no encontrado"
            });
        }

        // Eliminar imagen anterior si existe
        if (articuloAnterior && articuloAnterior.imagen && articuloAnterior.imagen !== "default.png") {
            const rutaImagenAnterior = path.join(__dirname, "../imagenes/articulos/", articuloAnterior.imagen);
            if (fs.existsSync(rutaImagenAnterior)) {
                fs.unlinkSync(rutaImagenAnterior);
            }
        }

        return res.status(200).json({
            status: "success",
            mensaje: "Imagen subida correctamente",
            articulo: articuloActualizado,
            imagen: req.file.filename
        });

    } catch (error) {
        // Limpiar archivo en caso de error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        return res.status(500).json({
            status: "error",
            mensaje: "Error al subir la imagen"
        });
    }
};

const buscarImg = async (req, res) => {
    try {
        const { fichero } = req.params;
        const rutaImagen = path.join(__dirname, "../imagenes/articulos/", fichero);

        if (fs.existsSync(rutaImagen)) {
            return res.sendFile(path.resolve(rutaImagen));
        } else {
            return res.status(404).json({
                status: "error",
                mensaje: "Imagen no encontrada"
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al buscar la imagen"
        });
    }
};

const buscador = async (req, res) => {
    try {
        const { busqueda } = req.params;

        if (!busqueda || busqueda.trim().length < 2) {
            return res.status(400).json({
                status: "error",
                mensaje: "El término de búsqueda debe tener al menos 2 caracteres"
            });
        }

        const articulosEncontrados = await Articulo.find({
            $or: [
                { titulo: { $regex: busqueda, $options: "i" } },
                { contenido: { $regex: busqueda, $options: "i" } }
            ]
        }).sort({ fechaCreacion: -1 });

        return res.status(200).json({
            status: "success",
            total: articulosEncontrados.length,
            termino: busqueda,
            articles: articulosEncontrados
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al buscar artículos"
        });
    }
};

module.exports = {
    crear,
    listar,
    listarId,
    borrarId,
    editarId,
    subirImg,
    buscarImg,
    buscador
};