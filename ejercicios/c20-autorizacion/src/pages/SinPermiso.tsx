import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SinPermiso() {
  return (
    <section className="seccionLibros">
      <div className="container py-5">
        <Alert variant="warning">
          <Alert.Heading>Sin permiso</Alert.Heading>
          <p>No tenés permisos para acceder a esta página.</p>
          <Link to="/catalogo" className="alert-link">
            Volver al catálogo
          </Link>
        </Alert>
      </div>
    </section>
  );
}

export default SinPermiso;
