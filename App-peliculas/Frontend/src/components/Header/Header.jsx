import React, { useState } from 'react';

export const Header = ({ setBusqueda, onAgregarClick }) => {
    const [valor, setValor] = useState('');

    const handleBusqueda = (e) => {
        setValor(e.target.value);
        setBusqueda(e.target.value);
    };

    return (
        <header>
            <button className="btn-agregar" onClick={onAgregarClick}>+ Agregar</button>
            <div className="header-titulo-container">
                <h1 className="titulo">MisPelis</h1>
            </div>
            <input
                type="text"
                className="search"
                placeholder="Buscar..."
                value={valor}
                onChange={handleBusqueda}
            />
        </header>
    );
};
