import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Libro } from '../types/libro';
import { formatearPrecio } from '../utils/formato';

type LibroCardProps = {
  libro: Libro;
};

function LibroCard({ libro }: LibroCardProps) {
  const [likes, setLikes] = useState<number>(0);

  return (
    <div className="card h-100">
      <img src={libro.imagen} className="card-img-top" alt={libro.titulo} />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{libro.titulo}</h5>
        <p className="card-text">{libro.autor}</p>
        <p className="card-text precioCard">{formatearPrecio(libro.precio)}</p>
        <p className={libro.disponible ? 'estadoDisponible' : 'estadoNoDisponible'}>
          {libro.disponible ? 'Disponible' : 'Sin stock'}
        </p>

        <div className="mt-auto d-flex justify-content-between align-items-center gap-3">
          <button className="likeBtn" onClick={() => setLikes(likes + 1)}>
            <i className="bi bi-hand-thumbs-up"></i>
            <span>{likes}</span>
          </button>

          <Link className="btn botonHero" to={`/libros/${libro.id}`}>
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LibroCard;
