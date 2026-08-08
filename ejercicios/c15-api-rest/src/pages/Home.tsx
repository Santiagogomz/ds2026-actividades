import { Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LibroCard from '../components/LibroCard';
import { useLibros } from '../hooks/useLibros';

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

function Home() {
  const { libros, loading, error } = useLibros();

  return (
    <>
      <Hero />

      <div className="seccionLibros">
        <div className="container">
          <h1 className="mb-5">Libros Recomendados</h1>

          {loading && (
            <div className="estadoCarga">
              <Spinner animation="border" />
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && !error && (
            <div className="row g-4">
              {libros.map((libro) => (
                <div className="col-md-4" key={libro.id}>
                  <LibroCard libro={libro} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
