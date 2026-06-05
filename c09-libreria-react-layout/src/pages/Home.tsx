import { Link } from 'react-router-dom';
import LibroCard from '../components/LibroCard';
import { libros } from '../data/libros';

function Hero() {
  return (
    <div className="hero">
      <div className="heroTexto">
        <h1>Bienvenido a la Libreria</h1>
        <p>Descubri nuevos autores y aventuras.</p>
        <Link className="btn botonHero" to="/catalogo">
          Explorar libros
        </Link>
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />

      <div className="seccionLibros">
        <div className="container">
          <h1 className="mb-5">Libros Recomendados</h1>

          <div className="row g-4">
            {libros.map((libro) => (
              <div className="col-md-4" key={libro.id}>
                <LibroCard libro={libro} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
