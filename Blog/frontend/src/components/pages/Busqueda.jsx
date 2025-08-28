import React, { useEffect, useState } from 'react'
import { global } from '../../helpers/global';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';
import { useParams } from 'react-router-dom';

export const Busqueda = () => {

  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const parametros = useParams();

  useEffect(() => {
    conseguirArticulos();
  }, []);
  useEffect(() => {
    conseguirArticulos();
  }, [parametros]);

  const conseguirArticulos = async () => {
    const url = global.url + "search/" + parametros.busqueda;
    const { datos, cargando } = await Peticion(url, "GET");

    if (datos.status === "success") {
      setArticulos(datos.articles)
    } else {
      setArticulos([]);
    }

    setCargando(false);
  }



  return (
    <>
      {cargando ? "Cargando... " :
        (
          articulos.length >= 1 ? <Listado articulos={articulos} setArticulos={setArticulos} />
            : (<h1>No hay articulos</h1>)
        )
      }



    </>
  )
}
