import React from 'react';
import { GuardarEnStorage } from '../../helpers/GuardarEnStorage';

export const AddPelicula = ({ onAgregar, onClose }) => {
    const conseguirDatosForm = (e) => {
        e.preventDefault();

        let target = e.target;
        let titulo = target.titulo.value;
        let imagen = target.imagen.value;
        let overview = target.overview.value;

        let nuevaPelicula = {
            id: new Date().getTime(), // Generar un ID único basado en la fecha
            titulo,
            imagen,
            overview
        };

        // Guardar en localStorage
        GuardarEnStorage('peliculas', nuevaPelicula);

        // Llamar a la función para agregar en pantalla
        if (onAgregar) onAgregar(nuevaPelicula);

        // Limpiar el formulario
        e.target.reset();
    };

    return (
        <form onSubmit={conseguirDatosForm} className='form-agregar-pelicula'>
            <h2>Agregar Película</h2>
            <input
                type="text"
                name="titulo"
                placeholder="Título"
                required
            />
            <input
                type="text"
                name="imagen"
                placeholder="URL de la imagen"
                required
            />
            <textarea
                name="overview"
                placeholder="Descripción"
                required
            />
            <div className='botones'>
                <button type="submit" className='btn-agregar'>
                    Agregar
                </button>
                <button
                    type="button"
                    className='btn-cerrar'
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </form>
    );
};
