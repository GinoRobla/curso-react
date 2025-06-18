import React from 'react';

export const PeliculaCard = ({ titulo, imagen, overview }) => (
    <div className="movie">
        <h3 className="movie-title">{titulo}</h3>
        <img src={imagen} alt={titulo} />
        <div className="overview">
            <h3>Overview</h3>
            {overview}
        </div>
    </div>
);
