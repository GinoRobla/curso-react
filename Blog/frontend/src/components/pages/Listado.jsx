import React, { useState } from 'react'
import { global } from '../../helpers/global'
import { Peticion } from '../../helpers/Peticion'
import { Link } from 'react-router-dom'

export const Listado = ({ articulos, setArticulos }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [articuloAEliminar, setArticuloAEliminar] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  
  // Configuración de paginación
  const articulosPorPagina = 6;
  const totalPaginas = Math.ceil(articulos.length / articulosPorPagina);
  
  // Calcular artículos para la página actual
  const indiceInicio = (paginaActual - 1) * articulosPorPagina;
  const indiceFin = indiceInicio + articulosPorPagina;
  const articulosPagina = articulos.slice(indiceInicio, indiceFin);

  const confirmarEliminacion = (articulo) => {
    setArticuloAEliminar(articulo);
    setMostrarModal(true);
  };

  const eliminar = async () => {
    if (articuloAEliminar) {
      let { datos } = await Peticion(global.url + "articulo/" + articuloAEliminar._id, "DELETE");
      if (datos.status === "success") {
        let articulosActualizados = articulos.filter(articulo => articulo._id !== articuloAEliminar._id);
        setArticulos(articulosActualizados);
        
        // Ajustar página actual si es necesario
        const nuevasPaginas = Math.ceil(articulosActualizados.length / articulosPorPagina);
        if (paginaActual > nuevasPaginas && nuevasPaginas > 0) {
          setPaginaActual(nuevasPaginas);
        }
      }
    }
    setMostrarModal(false);
    setArticuloAEliminar(null);
  };

  const cancelarEliminacion = () => {
    setMostrarModal(false);
    setArticuloAEliminar(null);
  };

  // Funciones de paginación
  const irAPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const irAPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  const truncarTexto = (texto, limite = 180) => {
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite) + '...';
  }

  const tiempoLectura = (contenido) => {
    const palabras = contenido.split(' ').length;
    const minutos = Math.ceil(palabras / 200);
    return `${minutos} min de lectura`;
  }

  return (
    <div className="articles-section">
      <h2 className="section-title">Artículos Recientes</h2>
      
      <div className="articles-grid">
        {articulosPagina.map((articulo, index) => {
          return (
            <article className="article-card fade-in-up" key={articulo._id} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="article-content">
                <div className='article-image'>
                  {articulo.imagen && articulo.imagen !== "default.png" ? (
                    <img 
                      src={global.url + "image/" + articulo.imagen} 
                      alt={articulo.titulo}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop&crop=center&auto=format&q=80";
                      }}
                    />
                  ) : (
                    <img 
                      src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop&crop=center&auto=format&q=80" 
                      alt={articulo.titulo} 
                    />
                  )}
                </div>
                
                <div className='article-info'>
                  <div>
                    <h3 className="article-title">
                      <Link to={"/articulo/" + articulo._id}>
                        {articulo.titulo}
                      </Link>
                    </h3>
                    
                    <p className="article-excerpt">
                      {truncarTexto(articulo.contenido)}
                    </p>
                    
                    <div className="article-meta">
                      <span>✦ {formatearFecha(articulo.fechaCreacion)}</span>
                      <span>◇ {tiempoLectura(articulo.contenido)}</span>
                    </div>
                  </div>
                  
                  <div className="article-actions">
                    <Link to={"/articulo/" + articulo._id} className="btn btn-primary btn-sm">
                      Leer más
                    </Link>
                    <Link to={"/editar/" + articulo._id} className="btn btn-warning btn-sm">
                      Editar
                    </Link>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => confirmarEliminacion(articulo)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
      
      {/* Controles de paginación */}
      {totalPaginas > 1 && (
        <div className="pagination-container">
          <div className="pagination-info">
            <p>
              Mostrando {indiceInicio + 1}-{Math.min(indiceFin, articulos.length)} de {articulos.length} artículos
            </p>
            <p>
              Página {paginaActual} de {totalPaginas}
            </p>
          </div>
          
          <div className="pagination-controls">
            <button 
              className={`btn btn-outline ${paginaActual === 1 ? 'disabled' : ''}`}
              onClick={irAPaginaAnterior}
              disabled={paginaActual === 1}
            >
              ← Anterior
            </button>
            
            <div className="pagination-numbers">
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(numeroPagina => (
                <button
                  key={numeroPagina}
                  className={`btn btn-page ${paginaActual === numeroPagina ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => irAPagina(numeroPagina)}
                >
                  {numeroPagina}
                </button>
              ))}
            </div>
            
            <button 
              className={`btn btn-outline ${paginaActual === totalPaginas ? 'disabled' : ''}`}
              onClick={irAPaginaSiguiente}
              disabled={paginaActual === totalPaginas}
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}
      
      {articulos.length === 0 && (
        <div className="form-container" style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <h3 className="form-title">Aún no hay artículos</h3>
          <p className="form-subtitle">
            Comienza creando tu primer artículo y comparte tus ideas con el mundo.
          </p>
          <div style={{ marginTop: 'var(--space-6)' }}>
            <Link to="/crear-articulo" className="btn btn-primary btn-lg">
              Crear mi primer artículo
            </Link>
          </div>
        </div>
      )}
      
      {/* Modal de confirmación */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={cancelarEliminacion}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-icon">🗑️</span>
              <h2 className="modal-title">¿Eliminar artículo?</h2>
              <p className="modal-message">
                ¿Estás seguro de que deseas eliminar "<strong>{articuloAEliminar?.titulo}</strong>"?
                <br />
                Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-secondary" 
                onClick={cancelarEliminacion}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-danger" 
                onClick={eliminar}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
