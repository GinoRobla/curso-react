# 🚀 API Documentation - Elegant Blog

Documentación completa de la API REST del proyecto **Elegant Blog**. Esta API permite gestionar artículos de blog con funcionalidades CRUD completas, búsqueda y gestión de imágenes.

## 📋 Información General

**URL Base:** `http://localhost:3900/api`  
**Formato:** JSON  
**Métodos HTTP:** GET, POST, PUT, DELETE  
**Autenticación:** Ninguna (en esta versión)

## 🗂️ Esquema de Datos

### Modelo de Artículo

```javascript
{
  "_id": "ObjectId",
  "titulo": "String (requerido)",
  "contenido": "String (requerido)", 
  "fechaCreacion": "Date (automático)",
  "imagen": "String (default: 'default.png')",
  "__v": "Number"
}
```

## 📚 Endpoints

### 1. 📖 Listar Artículos

Obtiene todos los artículos ordenados por fecha de creación (más recientes primero).

**Endpoint:** `GET /api/listar`

**Respuesta Exitosa (200):**
```json
{
  "status": "success",
  "total": 10,
  "articles": [
    {
      "_id": "68b0658608356ffbed0ef523",
      "titulo": "Introducción a React",
      "contenido": "React ha transformado la forma...",
      "fechaCreacion": "2024-01-15T00:00:00.000Z",
      "imagen": "default.png",
      "__v": 0
    }
  ]
}
```

**Casos de Error:**
- **500** - Error interno del servidor

### 2. 📄 Obtener Artículo por ID

Obtiene un artículo específico por su ID único.

**Endpoint:** `GET /api/articulo/:id`

**Parámetros:**
- `id` (string, requerido) - ID del artículo (ObjectId de MongoDB)

**Respuesta Exitosa (200):**
```json
{
  "status": "success",
  "article": {
    "_id": "68b0658608356ffbed0ef523",
    "titulo": "Introducción a React",
    "contenido": "React ha transformado la forma...",
    "fechaCreacion": "2024-01-15T00:00:00.000Z",
    "imagen": "default.png",
    "__v": 0
  }
}
```

**Casos de Error:**
- **404** - Artículo no encontrado
- **500** - Error interno del servidor

### 3. ✏️ Crear Artículo

Crea un nuevo artículo de blog.

**Endpoint:** `POST /api/crear`

**Cuerpo de la Petición:**
```json
{
  "titulo": "Nuevo Artículo",
  "contenido": "Contenido del artículo..."
}
```

**Validaciones:**
- `titulo`: Requerido, no puede estar vacío
- `contenido`: Requerido, no puede estar vacío

**Respuesta Exitosa (201):**
```json
{
  "status": "success",
  "mensaje": "Artículo creado correctamente",
  "articulo": {
    "_id": "68b0658608356ffbed0ef52d",
    "titulo": "Nuevo Artículo",
    "contenido": "Contenido del artículo...",
    "fechaCreacion": "2024-08-28T13:45:22.123Z",
    "imagen": "default.png",
    "__v": 0
  }
}
```

**Casos de Error:**
- **400** - Título y contenido son requeridos
- **500** - Error al crear el artículo

### 4. 🔄 Actualizar Artículo

Actualiza un artículo existente.

**Endpoint:** `PUT /api/articulo/:id`

**Parámetros:**
- `id` (string, requerido) - ID del artículo a actualizar

**Cuerpo de la Petición:**
```json
{
  "titulo": "Título Actualizado",
  "contenido": "Contenido actualizado..."
}
```

**Validaciones:**
- Si se proporciona `titulo`, no puede estar vacío
- Si se proporciona `contenido`, no puede estar vacío

**Respuesta Exitosa (200):**
```json
{
  "status": "success",
  "mensaje": "Artículo actualizado correctamente",
  "articulo": {
    "_id": "68b0658608356ffbed0ef523",
    "titulo": "Título Actualizado",
    "contenido": "Contenido actualizado...",
    "fechaCreacion": "2024-01-15T00:00:00.000Z",
    "imagen": "default.png",
    "__v": 0
  }
}
```

**Casos de Error:**
- **400** - El título/contenido no puede estar vacío
- **404** - Artículo no encontrado
- **500** - Error al editar el artículo

### 5. 🗑️ Eliminar Artículo

Elimina un artículo y su imagen asociada (si existe).

**Endpoint:** `DELETE /api/articulo/:id`

**Parámetros:**
- `id` (string, requerido) - ID del artículo a eliminar

**Respuesta Exitosa (200):**
```json
{
  "status": "success",
  "mensaje": "Artículo eliminado correctamente",
  "articulo": {
    "_id": "68b0658608356ffbed0ef523",
    "titulo": "Artículo Eliminado",
    "contenido": "Contenido del artículo eliminado...",
    "fechaCreacion": "2024-01-15T00:00:00.000Z",
    "imagen": "1756387650461-ejemplo.png",
    "__v": 0
  }
}
```

**Casos de Error:**
- **404** - Artículo no encontrado
- **500** - Error al eliminar el artículo

### 6. 📸 Subir Imagen

Sube una imagen para un artículo específico.

**Endpoint:** `POST /api/upload-image/:id`

**Parámetros:**
- `id` (string, requerido) - ID del artículo

**Cuerpo de la Petición:**
- Tipo: `multipart/form-data`
- Campo: `imagen` (archivo)

**Formatos Permitidos:**
- PNG (.png)
- JPEG (.jpg, .jpeg)
- GIF (.gif)

**Tamaño Máximo:** 5MB (configurado en Multer)

**Respuesta Exitosa (200):**
```json
{
  "status": "success",
  "mensaje": "Imagen subida correctamente",
  "articulo": {
    "_id": "68b0658608356ffbed0ef523",
    "titulo": "Artículo con Imagen",
    "contenido": "Contenido del artículo...",
    "fechaCreacion": "2024-01-15T00:00:00.000Z",
    "imagen": "1756387650461-mi-imagen.png",
    "__v": 0
  },
  "imagen": "1756387650461-mi-imagen.png"
}
```

**Casos de Error:**
- **400** - No se ha proporcionado ninguna imagen
- **400** - Formato de imagen no válido. Use PNG, JPG, JPEG o GIF
- **404** - Artículo no encontrado
- **500** - Error al subir la imagen

### 7. 🖼️ Obtener Imagen

Obtiene una imagen específica del servidor.

**Endpoint:** `GET /api/image/:fichero`

**Parámetros:**
- `fichero` (string, requerido) - Nombre del archivo de imagen

**Respuesta Exitosa (200):**
- Devuelve el archivo de imagen directamente
- Content-Type apropiado según el tipo de imagen

**Casos de Error:**
- **404** - Imagen no encontrada
- **500** - Error al buscar la imagen

### 8. 🔍 Buscar Artículos

Busca artículos por título o contenido usando expresiones regulares.

**Endpoint:** `GET /api/search/:busqueda`

**Parámetros:**
- `busqueda` (string, requerido) - Término de búsqueda (mínimo 2 caracteres)

**Características de Búsqueda:**
- Case-insensitive (no distingue mayúsculas/minúsculas)
- Busca en título Y contenido
- Utiliza regex de MongoDB
- Ordena por fecha de creación (más recientes primero)

**Respuesta Exitosa (200):**
```json
{
  "status": "success",
  "total": 3,
  "termino": "react",
  "articles": [
    {
      "_id": "68b0658608356ffbed0ef523",
      "titulo": "Introducción a React",
      "contenido": "React ha transformado...",
      "fechaCreacion": "2024-01-15T00:00:00.000Z",
      "imagen": "default.png",
      "__v": 0
    }
  ]
}
```

**Casos de Error:**
- **400** - El término de búsqueda debe tener al menos 2 caracteres
- **500** - Error al buscar artículos

## 🔄 Rutas Alternativas (Alias)

Para mayor flexibilidad, algunos endpoints tienen rutas alternativas:

| Función | Ruta Principal | Ruta Alternativa |
|---------|---------------|------------------|
| Obtener por ID | `/api/articulo/:id` | `/api/listarId/:id` |
| Eliminar | `/api/articulo/:id` | `/api/borrarId/:id` |
| Actualizar | `/api/articulo/:id` | `/api/editarId/:id` |
| Subir Imagen | `/api/upload-image/:id` | `/api/subirImg/:id` |
| Obtener Imagen | `/api/image/:fichero` | `/api/buscarImg/:fichero` |
| Buscar | `/api/search/:busqueda` | `/api/buscador/:busqueda` |

## 📝 Ejemplos de Uso

### Ejemplo con cURL

**Crear un artículo:**
```bash
curl -X POST http://localhost:3900/api/crear \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Mi Primer Artículo",
    "contenido": "Este es el contenido de mi primer artículo de blog."
  }'
```

**Obtener todos los artículos:**
```bash
curl http://localhost:3900/api/listar
```

**Buscar artículos:**
```bash
curl http://localhost:3900/api/search/react
```

**Subir una imagen:**
```bash
curl -X POST http://localhost:3900/api/upload-image/68b0658608356ffbed0ef523 \
  -F "imagen=@mi-imagen.png"
```

### Ejemplo con JavaScript (Fetch)

```javascript
// Crear artículo
const crearArticulo = async () => {
  const response = await fetch('http://localhost:3900/api/crear', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      titulo: 'Mi Artículo desde JS',
      contenido: 'Contenido creado con JavaScript'
    })
  });
  
  const data = await response.json();
  console.log(data);
};

// Obtener artículos
const obtenerArticulos = async () => {
  const response = await fetch('http://localhost:3900/api/listar');
  const data = await response.json();
  console.log(data.articles);
};

// Subir imagen
const subirImagen = async (id, archivo) => {
  const formData = new FormData();
  formData.append('imagen', archivo);
  
  const response = await fetch(`http://localhost:3900/api/upload-image/${id}`, {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  console.log(data);
};
```

## ⚡ Códigos de Estado HTTP

| Código | Descripción | Cuándo se usa |
|--------|-------------|---------------|
| **200** | OK | Operación exitosa (GET, PUT, DELETE) |
| **201** | Created | Recurso creado exitosamente (POST) |
| **400** | Bad Request | Datos inválidos o faltantes |
| **404** | Not Found | Recurso no encontrado |
| **500** | Internal Server Error | Error interno del servidor |

## 🔒 Consideraciones de Seguridad

### Validaciones Actuales
- ✅ Validación de datos de entrada con Validator.js
- ✅ Sanitización de parámetros de URL
- ✅ Control de tipos de archivo para imágenes
- ✅ Validación de IDs de MongoDB
- ✅ Limpieza automática de archivos en caso de error

### Recomendaciones para Producción
- [ ] **Autenticación JWT** para proteger endpoints
- [ ] **Rate Limiting** para prevenir abuso
- [ ] **HTTPS** para todas las comunicaciones
- [ ] **Validación de tamaño** de archivos más estricta
- [ ] **Logs de auditoría** para operaciones críticas
- [ ] **Variables de entorno** para configuración sensible

## 🐛 Manejo de Errores

Todos los endpoints siguen un formato consistente para los errores:

```json
{
  "status": "error",
  "mensaje": "Descripción del error específico"
}
```

**Errores Comunes:**
- **Conexión a MongoDB falló**: Verificar que el servicio esté corriendo
- **ID no válido**: Asegúrate de usar un ObjectId válido de MongoDB
- **Archivo no encontrado**: El archivo de imagen no existe en el servidor
- **Datos faltantes**: Verificar que todos los campos requeridos estén presentes

## 📊 Rendimiento

### Optimizaciones Implementadas
- **Ordenamiento en BD**: Los artículos se ordenan en MongoDB (no en aplicación)
- **Validación temprana**: Errores de validación se detectan antes del procesamiento
- **Limpieza automática**: Archivos huérfanos se eliminan automáticamente
- **Respuestas JSON optimizadas**: Solo se envían los datos necesarios

### Métricas de Referencia
- **Crear artículo**: ~50ms
- **Listar artículos**: ~30ms
- **Búsqueda**: ~100ms (depende del tamaño de BD)
- **Subir imagen**: ~200ms (depende del tamaño del archivo)

## 🔄 Versionado

**Versión Actual:** v1.0.0

**Cambios de Versión:**
- **v1.0.0**: Release inicial con funcionalidades CRUD completas

**Próximas Versiones:**
- **v1.1.0**: Autenticación y autorización
- **v1.2.0**: Paginación en backend
- **v1.3.0**: Categorías y etiquetas

---

📞 **Soporte**: Si tienes preguntas sobre la API, revisa el README.md o contacta al desarrollador.