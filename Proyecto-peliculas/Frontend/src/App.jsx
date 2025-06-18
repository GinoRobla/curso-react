import { useState } from "react";
import { useEffect } from "react";
import { Peliculas } from "./components/Peliculas/PeliculaList.jsx";
import { Header } from "./components/Header/Header.jsx";
import { Sidebar } from "./components/Header/Sidebar.jsx";
import { Footer } from "./components/Footer.jsx";
import { AddPelicula } from "./components/Peliculas/AddPelicula.jsx";
import { DeletePelicula } from "./components/Peliculas/DeletePelicula.jsx";

// Array inicial de películas
const peliculasIniciales = [
  {
    id: 1,
    imagen: "https://image.tmdb.org/t/p/w1280/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    titulo: "Wonder Woman 1984",
    overview: "Diana Prince comes into conflict with the Soviet Union during the Cold War in the 1980s."
  },
  {
    id: 2,
    imagen: "https://es.web.img3.acsta.net/pictures/20/03/24/14/59/1973735.jpg",
    titulo: "Soul",
    overview: "A musician who has lost his passion for music is transported out of his body and must find his way back."
  },
  {
    id: 3,
    imagen: "https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/61979865-270b-460d-b209-915dd7706095/05579befc77304cad710721fd2e09e1b28c88a89.jpg?host=wbd-images.prod-vod.h264.io&partner=beamcom",
    titulo: "Tenet",
    overview: "Armed with only one word, Tenet, and fighting for the survival of the entire world."
  },
  {
    id: 4,
    imagen: "https://images.booksense.com/images/609/754/9781419754609.jpg",
    titulo: "The Avengers",
    overview: "Earth's mightiest heroes must come together to stop a global threat."
  },
  {
    id: 5,
    imagen: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg",
    titulo: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space in an attempt to save humanity."
  },
  {
    id: 6,
    imagen: "https://m.media-amazon.com/images/S/pv-target-images/6d3d1461d50778271845ce7ec81ba2c5d76a20f7f84e5061cd099aabaedc77f9.jpg",
    titulo: "John Wick 4",
    overview: "John Wick uncovers a path to defeating The High Table."
  },
  {
    id: 7,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_684616-MLU70799697792_082023-O.webp",
    titulo: "Black Adam",
    overview: "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods."
  },
  {
    id: 8,
    imagen: "https://es.web.img2.acsta.net/pictures/22/06/01/16/31/2334771.jpg",
    titulo: "Bullet Train",
    overview: "Five assassins aboard a fast moving bullet train find out their missions have something in common."
  },
  {
    id: 9,
    imagen: "https://m.media-amazon.com/images/M/MV5BNmQxNjZlZTctMWJiMC00NGMxLWJjNTctNTFiNjA1Njk3ZDQ5XkEyXkFqcGc@._V1_.jpg",
    titulo: "Avatar",
    overview: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn."
  },
  {
    id: 10,
    imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/1d/0b/1d0bd605d43308f3421d4a3f1cda034b.jpg",
    titulo: "Spider-Man: No Way Home",
    overview: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help."
  },
  {
    id: 11,
    imagen: "https://pics.filmaffinity.com/Capitana_Marvel-457800899-large.jpg",
    titulo: "Captain Marvel",
    overview: "Carol Danvers becomes one of the universe's most powerful heroes."
  },
  {
    id: 12,
    imagen: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg",
    titulo: "Avengers: Endgame",
    overview: "After the devastating events of Infinity War, the universe is in ruins."
  },
  {
    id: 13,
    imagen: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBZmmwH_e5AL5ctBT8TcCe3cjekaBS_22PokVAuvTQYQgYafNM3OwRK1RE6REINBAnTSSEl7vVnhzC_P_vXE70darSGqTER627xQk2J1bejXIZzTgHBbqPEQNCsyAcL7TOwY0_Tl8htxeDLQb1ZluTyl3b0KtNAINBoleEhyphenhyphengLozuDSERSo8BnbcgP9mI/s1037/Guas%C3%B3n2folie%C3%A0deux.jpg",
    titulo: "Joker",
    overview: "During the 1980s, a mentally troubled comedian embarks on a downward spiral."
  },
  {
    id: 14,
    imagen: "https://i.ytimg.com/vi/5fExaDWYEGc/maxresdefault.jpg",
    titulo: "The Batman",
    overview: "In his second year of fighting crime, Batman uncovers corruption in Gotham and connects it to his own family."
  },
  {
    id: 15,
    imagen: "https://m.media-amazon.com/images/M/MV5BMDMyNDIzYzMtZTMyMy00NjUyLWI3Y2MtYzYzOGE1NzQ1MTBiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    titulo: "The Matrix Resurrections",
    overview: "Return to a world of two realities: one, everyday life; the other, what lies behind it."
  }
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [opcion, setOpcion] = useState(null);

  // Estado para las películas
  const [peliculas, setPeliculas] = useState(() => {
    const guardadas = localStorage.getItem('peliculas');
    return guardadas ? JSON.parse(guardadas) : peliculasIniciales;
  });

  useEffect(() => {
    localStorage.setItem('peliculas', JSON.stringify(peliculas));
  }, [peliculas]);

  // Función para agregar una película
  const handleAgregar = (nuevaPelicula) => {
    setPeliculas([nuevaPelicula, ...peliculas]);
    setOpcion(null); // Oculta el formulario después de agregar
  };

  // Función para borrar una película
  const handleBorrar = (id) => {
    // Borra del estado
    setPeliculas(peliculas.filter(peli => peli.id !== id));
    // Borra del localStorage
    const guardadas = JSON.parse(localStorage.getItem('peliculas')) || [];
    const actualizadas = guardadas.filter(peli => peli.id !== id);
    localStorage.setItem('peliculas', JSON.stringify(actualizadas));
    setOpcion(null); // Oculta el formulario después de borrar
  };

  // Maneja el clic en una opción del sidebar
  const handleOptionClick = (op) => {
    setOpcion(op);
    setSidebarOpen(false);
  };

  return (
    <>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOptionClick={handleOptionClick}
      />
      <main id="main">
        {(opcion === "agregar") && (
          <div className="modal-overlay">
            <AddPelicula
              onAgregar={handleAgregar}
              onClose={setOpcion}
            />
          </div>
        )}
        {opcion === "borrar" && (
          <div className="modal-overlay">
            <DeletePelicula
              peliculas={peliculas}
              onDelete={handleBorrar}
              onClose={() => setOpcion(null)}
            />
          </div>
        )}
        <Peliculas peliculas={peliculas} />
      </main>
      <Footer />
    </>
  );
}

export default App;