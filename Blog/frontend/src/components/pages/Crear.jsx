import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Peticion } from '../../helpers/Peticion';
import { global } from '../../helpers/global';

export const Crear = () => {
    const { formulario, cambiado } = useForm({});
    const [resultado, setResultado] = useState("no_enviado");

    const guardarArticulo = async (e) => {
        e.preventDefault();

        let nuevoArticulo = formulario;
        console.log("Datos a enviar:", nuevoArticulo);

        const { datos } = await Peticion(global.url + 'crear', "POST", nuevoArticulo);
        console.log("Respuesta del servidor:", datos);
        
        if (datos.status === "success") {
            setResultado("guardado");
            
            //subir imagen solo si el artículo se guardó correctamente
            const fileInput = document.querySelector("#file");
            
            if (fileInput && fileInput.files[0]) {
                const formData = new FormData();
                formData.append('imagen', fileInput.files[0]);

                const subida = await Peticion(global.url + "upload-image/" + datos.articulo._id, "POST", formData, true);
                console.log(subida.datos);
            }
        }
        else {
            setResultado("error");
            console.log("Error al crear artículo:", datos.mensaje);
        }
    }


    return (
        <div className="fade-in-up">
            <div className='form-container'>
                <h1 className="form-title">Crear Nuevo Artículo</h1>
                <p className="form-subtitle">
                    Comparte tus ideas, experiencias y conocimientos con nuestra comunidad de lectores.
                </p>

                {resultado === "guardado" && (
                    <div className="alert alert-success">
                        <span>🎉</span>
                        <div>
                            <strong>¡Artículo publicado con éxito!</strong><br />
                            Tu contenido está ahora disponible para todos los lectores.
                        </div>
                    </div>
                )}
                
                {resultado === "error" && (
                    <div className="alert alert-error">
                        <span>⚠️</span>
                        <div>
                            <strong>Error al guardar el artículo</strong><br />
                            Verifica que todos los campos estén completos y vuelve a intentarlo.
                        </div>
                    </div>
                )}

                <form onSubmit={guardarArticulo} style={{ marginTop: 'var(--space-8)' }}>
                    <div className='form-group'>
                        <label htmlFor='titulo' className="form-label">
                            Título del Artículo
                        </label>
                        <input 
                            type='text' 
                            name='titulo' 
                            id='titulo' 
                            placeholder="Un título que capture la atención de tus lectores..."
                            onChange={cambiado}
                            className="form-input"
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
                            placeholder="Desarrolla tu idea aquí. Comparte tus conocimientos, experiencias y perspectivas únicas..."
                            onChange={cambiado}
                            className="form-textarea"
                            rows="12"
                            required
                        ></textarea>
                    </div>
                    
                    <div className='form-group'>
                        <label htmlFor='file' className="form-label">
                            Imagen Principal (Opcional)
                        </label>
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
                            Publicar Artículo
                        </button>
                        <Link to="/articulos" className="btn btn-secondary btn-lg">
                            Cancelar
                        </Link>
                    </div>
                </form>

                <div style={{
                    marginTop: 'var(--space-12)',
                    padding: 'var(--space-6)',
                    background: 'rgba(99, 102, 241, 0.05)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid rgba(99, 102, 241, 0.1)',
                    textAlign: 'center'
                }}>
                    <h4 style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: '600',
                        color: 'var(--color-gray-800)',
                        marginBottom: 'var(--space-3)'
                    }}>
                        💡 Consejos para un gran artículo
                    </h4>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'var(--space-4)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-gray-600)'
                    }}>
                        <div>✨ <strong>Título llamativo:</strong> Despierta curiosidad</div>
                        <div>📖 <strong>Contenido valioso:</strong> Aporta información útil</div>
                        <div>🖼️ <strong>Imagen atractiva:</strong> Complementa tu mensaje</div>
                        <div>🎯 <strong>Estructura clara:</strong> Facilita la lectura</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
