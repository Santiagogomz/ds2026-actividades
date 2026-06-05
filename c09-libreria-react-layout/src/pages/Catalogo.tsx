import LibroCard from '../components/LibroCard';
import { libros } from '../data/libros';

function Catalogo() {
  return (
    <section className="seccionLibros">
      <div className="container">
        <h1 className="catalogoTitulo mb-5">Catalogo de libros</h1>

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
