import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

type LibroCardProps = {
  titulo: string;
  autor: string;
  imagen: string;
};

function LibroCard({ titulo, autor, imagen }: LibroCardProps) {

  const [likes, setLikes] = useState<number>(0);

  return (
    <div className="card h-100">
      <img src={imagen} className="card-img-top" alt={titulo} />

      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{autor}</p>

       <button
        className="likeBtn"
        onClick={() => setLikes(likes + 1)}
      >
       <i className="bi bi-hand-thumbs-up"></i>

      <span>{likes}</span>
      </button>

      </div>
    </div>
  );
}

function NavbarLibreria() {
  return (
    <nav className="navbar navbar-expand-lg navbarCustom">
      <div className="container">
        <span className="navbar-brand">
          Librería React
        </span>

        <div>
          <a className="text-white me-3" href="#">
            Inicio
          </a>

          <a className="text-white me-3" href="#">
            Libros
          </a>

          <a className="text-white" href="#">
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
}
function Hero() {
  return (
    <div className="hero">

      <div className="heroTexto">

        <h1>
          Bienvenido a la Librería
        </h1>

        <p>
          Descubrí nuevos autores y aventuras.
        </p>

        <button className="btn botonHero">
          Explorar libros
        </button>

      </div>
    </div>
  );
}
function Footer() {
  return (
    <footer className="footerCustom">

      <p className="mb-0">
        Librería React - 2026
      </p>

    </footer>
  );
}
function App() {
  return (
    <>
      <NavbarLibreria />

      <Hero />

      <div className="seccionLibros">

        <div className="container">

          <h1 className="mb-5">
            Libros Recomendados
          </h1>

          <div className="row g-4">

            <div className="col-md-4">
              <LibroCard
                titulo="El Eternauta"
                autor="Héctor Germán Oesterheld"
                imagen="/img/eternauta.jpg"
              />
            </div>

            <div className="col-md-4">
              <LibroCard
                titulo="Martín Fierro"
                autor="José Hernández"
                imagen="/img/mfierro.jpg"
              />
            </div>

            <div className="col-md-4">
              <LibroCard
                titulo="El Aleph"
                autor="Jorge Luis Borges"
                imagen="/img/aleph.jpg"
              />
            </div>

            <div className="col-md-4">
              <LibroCard
                titulo="La Ciudad de los Geómetras"
                autor="Gabriel Darrigran"
                imagen="/img/cg.jpg"
              />
            </div>

            <div className="col-md-4">
              <LibroCard
                titulo="Los Doce Trabajos de Hércules"
                autor="Enrique de Villena"
                imagen="/img/hercules.jpg"
              />
            </div>

            <div className="col-md-4">
              <LibroCard
                titulo="Ficciones"
                autor="Jorge Luis Borges"
                imagen="/img/ficciones.png"
              />
            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default App;