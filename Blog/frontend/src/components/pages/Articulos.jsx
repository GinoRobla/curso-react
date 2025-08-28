import React, { useEffect, useState } from 'react'
import { global } from '../../helpers/global';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';

export const Articulos = () => {

  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    const url = global.url + "listar";
    const { datos, cargando } = await Peticion(url, "GET");

    if (datos.status === "success") {
      setArticulos(datos.articles)
    }

    setCargando(false);
  }



  return (
    <div className="fade-in-up">
      {cargando ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando artículos...</p>
        </div>
      ) : (
        articulos.length >= 1 ? (
          <Listado articulos={articulos} setArticulos={setArticulos} />
        ) : (
          <div className="form-container" style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <h1 className="form-title">No hay artículos</h1>
            <p className="form-subtitle">
              Comienza creando tu primer artículo y comparte tus ideas con el mundo.
            </p>
          </div>
        )
      )}
    </div>
  )
}
