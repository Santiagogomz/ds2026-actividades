import { Link, useParams } from 'react-router-dom';
import { libros } from '../data/libros';

function LibroDetalle() {
  const { id } = useParams();
  const libro = libros.find((item) => item.id === Number(id));

  if (!libro) {
    return (
      <section className="seccionLibros">
        <div className="container detalleLibro">
          <h1>Libro no encontrado</h1>
          <Link className="btn botonHero mt-3" to="/catalogo">
            Volver al catalogo
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
            <h3 className="precioLibro">{libro.precio}</h3>

            <Link className="btn botonHero mt-4" to="/catalogo">
              Volver al catalogo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LibroDetalle;
