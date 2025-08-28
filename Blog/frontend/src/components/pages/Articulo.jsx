import React, { useEffect, useState } from 'react'
import { global } from '../../helpers/global';
import { Peticion } from '../../helpers/Peticion';
import { useParams } from 'react-router-dom';

export const Articulo = () => {

  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);
  const parametros = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {
    const url = global.url + "articulo/" + parametros.id;
    console.log("URL a consultar:", url);
    console.log("ID del parámetro:", parametros.id);
    
    try {
      const { datos } = await Peticion(url, "GET");
      console.log("Datos recibidos:", datos);
      
      if (datos && datos.status === "success" && datos.article) {
        setArticulo(datos.article);
        console.log("Artículo establecido:", datos.article);
      } else {
        console.error("Error en la respuesta:", datos);
      }
    } catch (error) {
      console.error("Error al obtener artículo:", error);
    }
    
    setCargando(false);
  }



  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <div className="fade-in-up">
      {cargando ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando artículo...</p>
        </div>
      ) : articulo && articulo.titulo ? (
        <article className="article-detail">
          <div className="article-header">
            <h1 className="article-detail-title">{articulo.titulo}</h1>
            <div className="article-detail-meta">
              <span>✦ {formatearFecha(articulo.fechaCreacion)}</span>
            </div>
          </div>
          
          <div className="article-detail-image">
            {articulo.imagen && articulo.imagen !== "default.png" ? (
              <img 
                src={global.url + "image/" + articulo.imagen} 
                alt={articulo.titulo}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop&crop=center&auto=format&q=80";
                }}
              />
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop&crop=center&auto=format&q=80" 
                alt={articulo.titulo || "Artículo"}
              />
            )}
          </div>
          
          <div className="article-detail-content">
            <p>{articulo.contenido}</p>
          </div>
        </article>
      ) : (
        <div className="form-container" style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <h1 className="form-title">❌ Artículo no encontrado</h1>
          <p className="form-subtitle">
            El artículo que buscas no existe o no se pudo cargar.
          </p>
          <div style={{ marginTop: 'var(--space-6)' }}>
            <a href="/articulos" className="btn btn-primary btn-lg">
              Ver todos los artículos
            </a>
          </div>
        </div>
      )}
    </div>
  );

}
