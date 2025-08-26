import React from 'react';

export const PeliculaCard = ({ titulo, descripcion }) => (
    <div className="movie">
        <h3 className="movie-title">{titulo}</h3>
        <p>{descripcion}</p>
    </div>
);
