import React, { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { Peticion } from '../../helpers/Peticion';
import { global } from '../../helpers/global';
import { useParams } from 'react-router-dom';

export const Editar = () => {
  const [articulo, setArticulo] = useState({});
  const { formulario, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const parametros = useParams();


  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {
    const url = global.url + "articulo/" + parametros.id;
    console.log("URL para editar:", url);
    console.log("ID del parámetro:", parametros.id);
    
    try {
      const { datos } = await Peticion(url, "GET");
      console.log("Datos para editar:", datos);
      
      if (datos && datos.status === "success" && datos.article) {
        setArticulo(datos.article);
        console.log("Artículo para editar establecido:", datos.article);
      } else {
        console.error("Error en la respuesta para editar:", datos);
      }
    } catch (error) {
      console.error("Error al obtener artículo para editar:", error);
    }
  }

  const editarArticulo = async (e) => {
    e.preventDefault();

    let nuevoArticulo = formulario;

    const { datos } = await Peticion(global.url + 'articulo/' + parametros.id, "PUT", nuevoArticulo);
    if (datos.status === "success") {
      setResultado("guardado");
    }
    else {
      setResultado("error");
    }
    console.log(datos);

    //subir imagen
    const fileInput = document.querySelector("#file");

    const formData = new FormData();
    formData.append('file0', fileInput.files[0]);

    const subida = await Peticion(global.url + "upload-image/" + datos.articulo._id, "POST", formData, true);
    console.log(subida.datos);


  }


  return (
    <div className="fade-in-up">
      {!articulo || !articulo.titulo ? (
        <div className="form-container" style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <h1 className="form-title">❌ Artículo no encontrado</h1>
          <p className="form-subtitle">
            El artículo que intentas editar no existe o no se pudo cargar.
          </p>
          <div style={{ marginTop: 'var(--space-6)' }}>
            <a href="/articulos" className="btn btn-primary btn-lg">
              Ver todos los artículos
            </a>
          </div>
        </div>
      ) : (
        <div className='form-container'>
          <h1 className="form-title">Editar Artículo</h1>
          <p className="form-subtitle">
            Modifica el contenido de "{articulo.titulo}" y actualiza tu artículo.
          </p>

        {resultado === "guardado" && (
          <div className="alert alert-success">
            <span>🎉</span>
            <div>
              <strong>¡Artículo actualizado con éxito!</strong><br />
              Los cambios se han guardado correctamente.
            </div>
          </div>
        )}
        
        {resultado === "error" && (
          <div className="alert alert-error">
            <span>⚠️</span>
            <div>
              <strong>Error al actualizar el artículo</strong><br />
              Verifica que todos los campos estén completos y vuelve a intentarlo.
            </div>
          </div>
        )}

        <form onSubmit={editarArticulo} style={{ marginTop: 'var(--space-8)' }}>
          <div className='form-group'>
            <label htmlFor='titulo' className="form-label">
              Título del Artículo
            </label>
            <input 
              type='text' 
              name='titulo' 
              id='titulo'
              onChange={cambiado} 
              defaultValue={articulo.titulo}
              className="form-input"
              placeholder="Un título que capture la atención de tus lectores..."
              required
            />
          </div>
          
          <div className='form-group'>
            <label htmlFor='contenido' className="form-label">
              Contenido del Artículo
            </label>
            <textarea 
              name='contenido' 
              id='contenido'
              onChange={cambiado} 
              defaultValue={articulo.contenido}
              className="form-textarea"
              rows="12"
              placeholder="Desarrolla tu idea aquí..."
              required
            ></textarea>
          </div>
          
          <div className='form-group'>
            <label htmlFor='file0' className="form-label">
              Imagen Principal (Opcional)
            </label>
            
            {articulo.imagen && (
              <div className="current-image" style={{
                marginBottom: 'var(--space-4)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                maxWidth: '300px'
              }}>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-gray-600)',
                  marginBottom: 'var(--space-2)'
                }}>
                  Imagen actual:
                </p>
                <img 
                  src={articulo.imagen !== "default.png" 
                    ? global.url + "image/" + articulo.imagen 
                    : "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=300&h=200&fit=crop&crop=center&auto=format&q=80"
                  } 
                  alt="Imagen actual"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 'var(--radius-lg)'
                  }}
                />
              </div>
            )}
            
            <div className="form-file">
              <input 
                type='file' 
                name='file0' 
                id='file'
                accept="image/*"
                style={{ 
                  width: '100%', 
                  padding: 'var(--space-4)',
                  border: 'none',
                  background: 'transparent',
                  fontSize: 'var(--text-base)'
                }}
              />
              <div style={{ 
                marginTop: 'var(--space-3)', 
                fontSize: 'var(--text-sm)', 
                color: 'var(--color-gray-500)',
                textAlign: 'center' 
              }}>
                <strong>Formatos admitidos:</strong> JPG, PNG, GIF • <strong>Tamaño máximo:</strong> 5MB
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type='submit' className='btn btn-primary btn-lg'>
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
      )}
    </div>
  );
}
