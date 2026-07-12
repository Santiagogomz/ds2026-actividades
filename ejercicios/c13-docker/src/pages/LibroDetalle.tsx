import { Alert, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useLibros } from '../hooks/useLibros';
import { formatearPrecio } from '../utils/formato';

function LibroDetalle() {
  const { id } = useParams();
  const { libros, loading, error } = useLibros();
  const libro = libros.find((item) => item.id === Number(id));

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

  if (!libro) {
    return (
      <section className="seccionLibros">
        <div className="container detalleLibro">
          <h1>Libro no encontrado</h1>
          <Link className="btn botonHero mt-3" to="/catalogo">
            Volver al catálogo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="seccionLibros">
      <div className="container detalleLibro">
        <div className="row g-4 align-items-center">
          <div className="col-md-5">
            <img className="img-fluid rounded" src={libro.imagen} alt={libro.titulo} />
          </div>

          <div className="col-md-7">
            <h1>{libro.titulo}</h1>
            <h4>{libro.autor}</h4>
            <p className="mt-4">{libro.descripcion}</p>
            <h3 className="precioLibro">{formatearPrecio(libro.precio)}</h3>
            <p className={libro.disponible ? 'estadoDisponible' : 'estadoNoDisponible'}>
              {libro.disponible ? 'Disponible' : 'Sin stock'}
            </p>

            <div className="accionesDetalle mt-4">
              <button className="btn botonHero" disabled={!libro.disponible}>
                Comprar
              </button>

              <Link className="btn botonSecundario" to="/catalogo">
                Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LibroDetalle;
