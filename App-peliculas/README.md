# 🎬 App de Películas

Una aplicación web moderna para gestionar un catálogo personal de películas, construida con React y Vite.

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)

## ✨ Características

- 📱 **Interfaz Responsive**: Diseño adaptable para todos los dispositivos
- 🔍 **Búsqueda en Tiempo Real**: Filtra películas por título instantáneamente
- ➕ **Agregar Películas**: Formulario modal para añadir nuevas películas
- ✏️ **Editar Películas**: Modifica información de películas existentes
- 🗑️ **Eliminar Películas**: Borra películas del catálogo
- 💾 **Persistencia Local**: Los datos se guardan automáticamente en el navegador
- 🎨 **Diseño Moderno**: Interfaz limpia y atractiva

## 🚀 Demo en Vivo

[Ver Demo](https://curso-react-mauve-omega.vercel.app/) 

## 📸 Capturas de Pantalla

*Las capturas se añadirán después del deploy*

## 🛠️ Tecnologías

- **Frontend**: React 19.1.0 con Hooks
- **Build Tool**: Vite 6.3.5
- **Linting**: ESLint con configuración para React
- **Persistencia**: localStorage del navegador
- **Estilos**: CSS personalizado

## 🏁 Inicio Rápido

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/ginorobla/app-peliculas.git
   cd app-peliculas
   ```

2. **Navega al directorio Frontend**
   ```bash
   cd Frontend
   ```

3. **Instala las dependencias**
   ```bash
   npm install
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   
   Visita `http://localhost:5173` para ver la aplicación.

## 📋 Scripts Disponibles

En el directorio `Frontend/`, puedes ejecutar:

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea una build de producción
- `npm run preview` - Vista previa de la build de producción  
- `npm run lint` - Ejecuta el linter para verificar el código

## 📁 Estructura del Proyecto

```
App-peliculas/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   │   └── Header.jsx
│   │   │   ├── Footer/
│   │   │   │   └── Footer.jsx
│   │   │   └── Peliculas/
│   │   │       ├── Listado.jsx
│   │   │       ├── Crear.jsx
│   │   │       ├── Editar.jsx
│   │   │       └── PeliculaCard.jsx
│   │   ├── helpers/
│   │   │   └── GuardarEnStorage.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
├── README.md
└── CLAUDE.md
```

## 🎯 Funcionalidades Principales

### Gestión de Películas
- **Agregar**: Formulario con campos para título, imagen (URL) y descripción
- **Editar**: Modifica cualquier película existente
- **Eliminar**: Borra películas con confirmación implícita
- **Buscar**: Filtro en tiempo real por título de película

### Persistencia de Datos
- Los datos se guardan automáticamente en `localStorage`
- Incluye un conjunto de películas iniciales como demo
- Los cambios persisten entre sesiones del navegador

### Interfaz de Usuario
- Diseño de tarjetas para mostrar películas
- Modales para formularios de creación y edición
- Header con funcionalidad de búsqueda
- Footer informativo


## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@ginorobla](https://github.com/ginorobla)

---

⭐️ ¡Dale una estrella a este repo si te fue útil!