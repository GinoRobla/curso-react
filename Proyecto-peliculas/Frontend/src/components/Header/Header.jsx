import React from 'react';

export const Header = ({ onMenuClick }) => (
    <header className="header">
        <div className="header-left">
            <button className="menu-btn" onClick={onMenuClick} aria-label="Abrir menú">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
        </div>
        <div className="header-center">
            <span className="titulo">MisPelis</span>
        </div>
        <form id="form">
            <input type="text" className="search" placeholder="Buscar..." />
        </form>
    </header>
);