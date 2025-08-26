import { useState, useEffect } from "react";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Listado } from "./components/Peliculas/Listado";
import { Crear } from "./components/Peliculas/Crear";
import { Editar } from "./components/Peliculas/Editar";

// Array inicial de películas (descripciones cortas y en español)
const peliculasIniciales = [
  {
    id: 1,
    imagen: "https://image.tmdb.org/t/p/w1280/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    titulo: "Wonder Woman 1984",
    descripcion: "Diana lucha en la Guerra Fría.",
  },
  {
    id: 2,
    imagen: "https://es.web.img3.acsta.net/pictures/20/03/24/14/59/1973735.jpg",
    titulo: "Soul",
    descripcion: "Un músico busca su pasión.",
  },
  {
    id: 3,
    imagen:
      "https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/61979865-270b-460d-b209-915dd7706095/05579befc77304cad710721fd2e09e1b28c88a89.jpg?host=wbd-images.prod-vod.h264.io&partner=beamcom",
    titulo: "Tenet",
    descripcion: "Un agente viaja en el tiempo.",
  },
  {
    id: 4,
    imagen: "https://images.booksense.com/images/609/754/9781419754609.jpg",
    titulo: "The Avengers",
    descripcion: "Héroes salvan al mundo.",
  },
  {
    id: 5,
    imagen:
      "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg",
    titulo: "Interstellar",
    descripcion: "Viaje espacial para salvar la humanidad.",
  },
  {
    id: 6,
    imagen:
      "https://m.media-amazon.com/images/S/pv-target-images/6d3d1461d50778271845ce7ec81ba2c5d76a20f7f84e5061cd099aabaedc77f9.jpg",
    titulo: "John Wick 4",
    descripcion: "John Wick busca venganza.",
  },
  {
    id: 7,
    imagen:
      "https://http2.mlstatic.com/D_NQ_NP_684616-MLU70799697792_082023-O.webp",
    titulo: "Black Adam",
    descripcion: "Un antiguo dios despierta.",
  },
  {
    id: 8,
    imagen: "https://es.web.img2.acsta.net/pictures/22/06/01/16/31/2334771.jpg",
    titulo: "Bullet Train",
    descripcion: "Asesinos en un tren rápido.",
  },
  {
    id: 9,
    imagen:
      "https://m.media-amazon.com/images/M/MV5BNmQxNjZlZTctMWJiMC00NGMxLWJjNTctNTFiNjA1Njk3ZDQ5XkEyXkFqcGc@._V1_.jpg",
    titulo: "Avatar",
    descripcion: "Un soldado explora Pandora.",
  },
  {
    id: 10,
    imagen:
      "https://images.cdn2.buscalibre.com/fit-in/360x360/1d/0b/1d0bd605d43308f3421d4a3f1cda034b.jpg",
    titulo: "Spider-Man: No Way Home",
    descripcion: "Peter Parker enfrenta nuevos retos.",
  },
  {
    id: 11,
    imagen: "https://pics.filmaffinity.com/Capitana_Marvel-457800899-large.jpg",
    titulo: "Captain Marvel",
    descripcion: "Carol Danvers obtiene poderes.",
  },
  {
    id: 12,
    imagen:
      "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg",
    titulo: "Avengers: Endgame",
    descripcion: "Los Vengadores luchan contra Thanos.",
  },
  {
    id: 13,
    imagen:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBZmmwH_e5AL5ctBT8TcCe3cjekaBS_22PokVAuvTQYQgYafNM3OwRK1RE6REINBAnTSSEl7vVnhzC_P_vXE70darSGqTER627xQk2J1bejXIZzTgHBbqPEQNCsyAcL7TOwY0_Tl8htxeDLQb1ZluTyl3b0KtNAINBoleEhyphenhyphengLozuDSERSo8BnbcgP9mI/s1037/Guas%C3%B3n2folie%C3%A0deux.jpg",
    titulo: "Joker",
    descripcion: "La vida de un comediante perturbado.",
  },
  {
    id: 14,
    imagen: "https://i.ytimg.com/vi/5fExaDWYEGc/maxresdefault.jpg",
    titulo: "The Batman",
    descripcion: "Batman enfrenta la corrupción en Gotham.",
  },
  {
    id: 15,
    imagen:
      "https://m.media-amazon.com/images/M/MV5BMDMyNDIzYzMtZTMyMy00NjUyLWI3Y2MtYzYzOGE1NzQ1MTBiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    titulo: "The Matrix Resurrections",
    descripcion: "Neo regresa a la Matrix.",
  },
];

function App() {
  const [listadoState, setListadoState] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editarPelicula, setEditarPelicula] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  // Cargar películas desde localStorage o iniciales
  useEffect(() => {
    const peliculasGuardadas = JSON.parse(localStorage.getItem("peliculas"));
    if (peliculasGuardadas && peliculasGuardadas.length > 0) {
      setListadoState(peliculasGuardadas);
    } else {
      setListadoState(peliculasIniciales);
      localStorage.setItem("peliculas", JSON.stringify(peliculasIniciales));
    }
  }, []);

  // Guardar en localStorage cada vez que cambia el listado
  useEffect(() => {
    localStorage.setItem("peliculas", JSON.stringify(listadoState));
  }, [listadoState]);

  return (
    <>
      <Header
        setBusqueda={setBusqueda}
        onAgregarClick={() => setMostrarFormulario(true)}
      />

      {mostrarFormulario && (
        <div className="modal-overlay">
          <Crear
            setListadoState={setListadoState}
            onClose={() => setMostrarFormulario(false)}
          />
        </div>
      )}
      <main>
        <Listado
          listadoState={listadoState}
          busqueda={busqueda}
          setListadoState={setListadoState}
          setEditarPelicula={setEditarPelicula}
        />
      </main>

      {editarPelicula && (
        <div className="modal-overlay">
          <Editar
            pelicula={editarPelicula}
            setEditarPelicula={setEditarPelicula}
            setListadoState={setListadoState}
            conseguirPeliculas={() =>
              JSON.parse(localStorage.getItem("peliculas"))
            }
          />
        </div>
      )}

      <Footer />
    </>
  );
}

export default App;
