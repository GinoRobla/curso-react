import React from 'react';
import { GuardarEnStorage } from '../../helpers/GuardarEnStorage';

export const Crear = ({ setListadoState, onClose }) => {

    const conseguirDatosForm = (e) => {
        e.preventDefault();
        
        let target = e.target;
        let titulo = target.title.value;    
        let descripcion = target.description.value.slice(0, 60);
        let imagen = target.image.value;
        
        let pelicula = {
            id: new Date().getTime(),
            titulo,
            descripcion,
            imagen
        };
        
        // Guardar la película en localStorage
        GuardarEnStorage("peliculas", pelicula);
        
        // Actualizar el estado del listado
        setListadoState(elemento => {
            return [pelicula, ...elemento];
        });
        
        // Limpiar el formulario
        target.reset();
        
        // Cerrar el modal o formulario
        if (onClose) onClose();
    };

    return (
        <div className="form-agregar-pelicula">
            <h2>Agregar Película</h2>
            <form onSubmit={conseguirDatosForm}>
                <input type="text" id="title" placeholder="Titulo" required />
                <textarea
                    id="description"
                    placeholder="Descripción"
                    maxLength="60"
                    required
                ></textarea>
                <input type="text" id="image" placeholder="URL Imagen" required />
                <div className="botons">
                    <button type="submit" className="btn-agregar">Agregar</button>
                    <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};