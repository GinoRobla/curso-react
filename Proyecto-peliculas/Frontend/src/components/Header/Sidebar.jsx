import React from 'react';

export const Sidebar = ({ open, onClose, onOptionClick }) => (
    <div className={`sidebar ${open ? 'open' : ''}`}>
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="sidebar-options">
            <button onClick={() => onOptionClick('agregar')}>Agregar película</button>
            <button onClick={() => onOptionClick('editar')}>Editar película</button>
            <button onClick={() => onOptionClick('borrar')}>Borrar película</button>
        </div>
    </div>
);