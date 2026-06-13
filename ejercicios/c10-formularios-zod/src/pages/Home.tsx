import { Link } from 'react-router-dom';
import LibroCard from '../components/LibroCard';
import type { Libro } from '../types/libro';

function Hero() {
  return (
    <div className="hero">
      <div className="heroTexto">
        <h1>Bienvenido a la Librería</h1>
        <p>Descubrí nuevos autores y aventuras.</p>
        <Link className="btn botonHero" to="/catalogo">
          Explorar libros
        </Link>
      </div>
    </div>
  );
}

type HomeProps = {
  libros: Libro[];
};

function Home({ libros }: HomeProps) {
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
