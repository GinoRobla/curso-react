import React, { useEffect } from "react";

export const Listado = ({ listadoState, busqueda, setListadoState, setEditarPelicula }) => {
    useEffect(() => {
        // Cargar listado desde localStorage al iniciar el componente
        conseguirPeliculas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const conseguirPeliculas = () => {
        let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
        setListadoState(peliculas);
        return peliculas;
    };

    const borrarPelicula = (id) => {
        let listado = conseguirPeliculas();
        let nuevoListado = listado.filter(pelicula => pelicula.id !== id);
        setListadoState(nuevoListado);
        localStorage.setItem("peliculas", JSON.stringify(nuevoListado));
    };

    // Filtrado visual según búsqueda
    const peliculasFiltradas = listadoState.filter(pelicula =>
        pelicula.titulo.toLowerCase().includes((busqueda || "").toLowerCase())
    );

    return (
        <>
            {peliculasFiltradas.length > 0 ? (
                peliculasFiltradas.map((pelicula) => (
                    <article key={pelicula.id} className="movie">
                        <img
                            src={pelicula.imagen}
                            alt={pelicula.titulo}
                        />
                        <div>
                            <h3 className="movie-title">{pelicula.titulo}</h3>
                            <p className="description">{pelicula.descripcion}</p>
                            <div className="botons">
                                <button className="edit" onClick={() => setEditarPelicula(pelicula)}>
                                    Editar
                                </button>
                                <button className="delete" onClick={() => borrarPelicula(pelicula.id)}>
                                    Borrar
                                </button>
                            </div>
                        </div>
                    </article>
                ))
            ) : (
                <h2>No hay películas para mostrar</h2>
            )}
        </>
    );
};
