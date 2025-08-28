const mongoose = require('mongoose');
const Articulo = require('./modelos/Articulo');

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const articulos = [
    {
        titulo: "Introducción a React: El Framework que Revolucionó el Desarrollo Web",
        contenido: "React ha transformado la forma en que desarrollamos aplicaciones web modernas. Creado por Facebook, este framework de JavaScript se basa en componentes reutilizables que permiten crear interfaces de usuario dinámicas y eficientes. En este artículo exploraremos los conceptos fundamentales de React, desde los componentes y el JSX hasta el manejo del estado con hooks. También veremos cómo React facilita la creación de aplicaciones escalables mediante su arquitectura basada en componentes y su virtual DOM, que optimiza las actualizaciones de la interfaz de usuario.",
        fechaCreacion: new Date('2024-01-15'),
        imagen: "default.png"
    },
    {
        titulo: "Node.js vs Deno: El Futuro del JavaScript en el Servidor",
        contenido: "El ecosistema de JavaScript en el servidor ha evolucionado significativamente. Mientras Node.js sigue siendo el rey indiscutible, Deno emerge como una alternativa moderna que promete solucionar muchos de los problemas de Node.js. En este análisis profundo, comparamos ambas plataformas: Node.js con su vasto ecosistema NPM y su madurez empresarial, versus Deno con su enfoque en la seguridad, TypeScript nativo y su sistema de módulos moderno. Examinaremos casos de uso, rendimiento, y cuándo elegir cada uno para tus próximos proyectos.",
        fechaCreacion: new Date('2024-02-03'),
        imagen: "default.png"
    },
    {
        titulo: "CSS Grid vs Flexbox: Cuándo Usar Cada Uno",
        contenido: "El diseño web moderno nos ofrece herramientas poderosas como CSS Grid y Flexbox. Aunque ambos son sistemas de layout, tienen propósitos diferentes y casos de uso específicos. Flexbox es perfecto para layouts unidimensionales: alinear elementos en una fila o columna, distribuir espacio, y crear navegaciones responsive. CSS Grid, por otro lado, brilla en layouts bidimensionales complejos, permitiendo crear diseños de página completos con facilidad. En este artículo aprenderás cuándo usar cada uno, con ejemplos prácticos y casos de estudio reales que te ayudarán a tomar la decisión correcta en tus proyectos.",
        fechaCreacion: new Date('2024-02-18'),
        imagen: "default.png"
    },
    {
        titulo: "Introducción a TypeScript: JavaScript con Superpoderes",
        contenido: "TypeScript ha ganado una adopción masiva en el desarrollo web moderno, y por buenas razones. Este superset de JavaScript añade tipado estático opcional que ayuda a detectar errores en tiempo de desarrollo, mejora la experiencia del desarrollador con autocompletado inteligente, y facilita el mantenimiento de proyectos grandes. En este tutorial completo, aprenderás los fundamentos de TypeScript: tipos básicos, interfaces, genéricos, y cómo integrar TypeScript en proyectos existentes. También exploraremos las mejores prácticas y cómo TypeScript puede hacer que tu código sea más robusto y mantenible.",
        fechaCreacion: new Date('2024-03-05'),
        imagen: "default.png"
    },
    {
        titulo: "El Futuro de la Web: Web Components y su Impacto",
        contenido: "Los Web Components representan una revolución silenciosa en el desarrollo web. Esta tecnología nativa del navegador permite crear elementos HTML personalizados, encapsulados y reutilizables sin depender de frameworks externos. Compuestos por Custom Elements, Shadow DOM, y HTML Templates, los Web Components ofrecen una forma estándar de crear componentes que funcionan en cualquier framework o vanilla JavaScript. En este artículo exploramos cómo crear tu primer Web Component, las ventajas del encapsulamiento del Shadow DOM, y cómo esta tecnología está cambiando el panorama del desarrollo frontend. También analizamos su adopción en grandes empresas y su futuro en el ecosistema web.",
        fechaCreacion: new Date('2024-03-20'),
        imagen: "default.png"
    },
    {
        titulo: "Optimización de Performance en Aplicaciones React",
        contenido: "La performance es crucial en aplicaciones React modernas. Los usuarios esperan interfaces rápidas y responsivas, y React ofrece múltiples herramientas para optimizar el rendimiento. En este artículo profundo, exploraremos técnicas avanzadas: React.memo para prevenir re-renders innecesarios, useMemo y useCallback para optimizar cálculos costosos, lazy loading de componentes con Suspense, y code splitting para reducir el bundle inicial. También cubriremos el profiler de React DevTools para identificar cuellos de botella, técnicas de virtualización para listas grandes, y patrones de estado que mejoran el rendimiento general de tu aplicación.",
        fechaCreacion: new Date('2024-04-08'),
        imagen: "default.png"
    },
    {
        titulo: "GraphQL: La Revolución en las APIs Modernas",
        contenido: "GraphQL ha cambiado la forma en que pensamos sobre las APIs. A diferencia de REST, GraphQL permite a los clientes solicitar exactamente los datos que necesitan, nada más, nada menos. Esta flexibilidad elimina problemas como el over-fetching y under-fetching de datos. En este artículo comprensivo, aprenderás los conceptos fundamentales de GraphQL: schemas, queries, mutations, y subscriptions. Exploraremos cómo implementar un servidor GraphQL con Apollo Server, cómo consumir APIs GraphQL desde el frontend, y las mejores prácticas para diseñar schemas escalables. También compararemos GraphQL con REST para ayudarte a decidir cuándo usar cada enfoque.",
        fechaCreacion: new Date('2024-04-25'),
        imagen: "default.png"
    },
    {
        titulo: "Microservicios con Node.js: Arquitectura Escalable",
        contenido: "Los microservicios han revolucionado la forma en que construimos aplicaciones empresariales. Esta arquitectura divide aplicaciones monolíticas en servicios pequeños, independientes y especializados que se comunican entre sí. Node.js, con su naturaleza asíncrona y liviana, es ideal para microservicios. En este tutorial avanzado, aprenderás a diseñar una arquitectura de microservicios desde cero: comunicación entre servicios con REST y mensajería, manejo de datos distribuidos, implementación de circuit breakers para resiliencia, y orquestación con Docker y Kubernetes. También cubriremos patrones esenciales como API Gateway, Event Sourcing, y CQRS para crear sistemas verdaderamente escalables.",
        fechaCreacion: new Date('2024-05-12'),
        imagen: "default.png"
    },
    {
        titulo: "JAMstack: La Nueva Era del Desarrollo Web Estático",
        contenido: "JAMstack (JavaScript, APIs, y Markup) representa un cambio paradigmático en el desarrollo web. Esta arquitectura moderna combina sitios estáticos pre-construidos con JavaScript dinámico y APIs externas para crear aplicaciones web rápidas, seguras y escalables. En este artículo exploramos los pilares de JAMstack: generadores de sitios estáticos como Gatsby y Next.js, CDNs globales para distribución ultrarrápida, y servicios serverless para funcionalidad dinámica. Analizaremos casos de uso ideales, desde blogs personales hasta e-commerce empresarial, y cómo JAMstack puede reducir costos de hosting mientras mejora significativamente la experiencia del usuario con tiempos de carga súper rápidos.",
        fechaCreacion: new Date('2024-06-01'),
        imagen: "default.png"
    },
    {
        titulo: "Inteligencia Artificial en JavaScript: TensorFlow.js y Más Allá",
        contenido: "La inteligencia artificial ya no es exclusiva de Python. TensorFlow.js ha democratizado el machine learning en JavaScript, permitiendo ejecutar modelos de IA directamente en el navegador o Node.js. Este artículo explora el fascinante mundo del ML en JavaScript: desde redes neuronales básicas hasta modelos de visión computacional y procesamiento de lenguaje natural. Aprenderás a entrenar modelos, implementar transfer learning, y crear aplicaciones web inteligentes que pueden reconocer imágenes, procesar texto, y tomar decisiones automáticas. También exploraremos otras librerías como Brain.js y ML5.js, y cómo la IA en el cliente puede mejorar la privacidad y reducir la latencia en aplicaciones modernas.",
        fechaCreacion: new Date('2024-06-18'),
        imagen: "default.png"
    }
];

async function seedDatabase() {
    try {
        console.log('🌱 Iniciando seed de la base de datos...');
        
        // Limpiar artículos existentes
        await Articulo.deleteMany({});
        console.log('🗑️  Artículos existentes eliminados');
        
        // Insertar nuevos artículos
        const articulosCreados = await Articulo.insertMany(articulos);
        console.log(`✅ ${articulosCreados.length} artículos creados exitosamente`);
        
        // Mostrar artículos creados
        console.log('\n📚 Artículos creados:');
        articulosCreados.forEach((articulo, index) => {
            console.log(`${index + 1}. ${articulo.titulo}`);
            console.log(`   ID: ${articulo._id}`);
            console.log(`   Fecha: ${articulo.fechaCreacion.toLocaleDateString('es-ES')}`);
            console.log('');
        });
        
        console.log('🎉 ¡Seed completado exitosamente!');
        
    } catch (error) {
        console.error('❌ Error durante el seed:', error);
    } finally {
        // Cerrar conexión
        mongoose.connection.close();
        console.log('🔌 Conexión cerrada');
    }
}

// Ejecutar seed
seedDatabase();