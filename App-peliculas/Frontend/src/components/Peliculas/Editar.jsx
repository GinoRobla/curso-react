import React from "react";

export const Editar = ({ pelicula, conseguirPeliculas, setEditarPelicula, setListadoState }) => {
    const guardarEdicion = (e) => {
        e.preventDefault();

        // Obtener los datos del formulario
        let target = e.target;

        //buscar el indice de la película a editar
        let peliculas = conseguirPeliculas();
        let indice = peliculas.findIndex(p => p.id === pelicula.id);

        // Crear un nuevo objeto con los datos actualizados
        let peliculaActualizada = {
            ...peliculas[indice], // Mantener los demás campos
            titulo: target.titulo.value,
            descripcion: target.descripcion.value
        };

        // Actualizar la película en el array
        peliculas[indice] = peliculaActualizada;

        // Guardar los cambios en el localStorage
        localStorage.setItem("peliculas", JSON.stringify(peliculas));

        // Actualizar el estado del listado
        setListadoState(peliculas);

        // Cerrar el modal de edición
        setEditarPelicula(null);
    }
    return (
        <div className="form-agregar-pelicula">
            <h2>Editar Película</h2>
            <form onSubmit={guardarEdicion}>
                <input
                    type="text"
                    name="titulo"
                    defaultValue={pelicula.titulo}
                    required
                />
                <textarea
                    name="descripcion"
                    defaultValue={pelicula.descripcion}
                    maxLength="60"
                    required
                ></textarea>
                <div className="botons">
                    <button type="submit" className="btn-editar">Guardar</button>
                    <button type="button" className="btn-cancelar" onClick={() => setEditarPelicula(null)}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};