import { useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import { useLibros } from '../hooks/useLibros';

function Catalogo() {
  const { libros, loading, error } = useLibros();

  useEffect(() => {
    document.title = `Catálogo (${libros.length})`;
  }, [libros.length]);

  if (loading) {
    return (
      <section className="seccionLibros">
        <div className="container estadoCarga">
          <Spinner animation="border" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="seccionLibros">
        <div className="container estadoCarga">
          <Alert variant="danger">{error}</Alert>
        </div>
      </section>
    );
  }

  return (
    <section className="seccionLibros">
      <div className="container">
        <h1 className="catalogoTitulo mb-5">Catálogo de libros</h1>

        <div className="row g-4">
          {libros.map((libro) => (
            <div className="col-md-4" key={libro.id}>
              <LibroCard libro={libro} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Catalogo;
