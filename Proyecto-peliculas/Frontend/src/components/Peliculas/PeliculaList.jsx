import React from 'react';
import { PeliculaCard } from './PeliculaCard';

// Ahora recibe las películas por props
export const Peliculas = ({ peliculas }) => (
    <>
        {peliculas.map((peli) => (
            <PeliculaCard
                key={peli.id}
                imagen={peli.imagen}
                titulo={peli.titulo}
                overview={peli.overview}
            />
        ))}
    </>
);