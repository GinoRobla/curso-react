import React, { useState } from 'react';

export const DeletePelicula = ({ peliculas, onDelete, onClose }) => {
    const [idSeleccionado, setIdSeleccionado] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (idSeleccionado) {
            onDelete(Number(idSeleccionado));
            setIdSeleccionado('');
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-agregar-pelicula">
            <h2>Eliminar Película</h2>
            <select
                value={idSeleccionado}
                onChange={e => setIdSeleccionado(e.target.value)}
                required
            >
                <option value="">Selecciona una película</option>
                {peliculas.map(peli => (
                    <option key={peli.id} value={peli.id}>
                        {peli.titulo}
                    </option>
                ))}
            </select>
            <div className='botones'>
                <button type="submit" className="btn-agregar">
                    Borrar
                </button>
                <button
                    type="button"
                    className="btn-cerrar"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </form>
    );
};