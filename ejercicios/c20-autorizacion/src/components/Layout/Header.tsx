import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { usuario, logout, tieneRol } = useAuth();

  const manejarSesion = () => {
    if (usuario) {
      logout();
      navigate('/');
      return;
    }

    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="navbarCustom">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Librería React
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-libreria" />

        <Navbar.Collapse id="navbar-libreria">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/catalogo">
              Libros
            </Nav.Link>
            {tieneRol('ADMIN') && (
              <Nav.Link as={Link} to="/libros/nuevo">
                Nuevo libro
              </Nav.Link>
            )}
            {usuario && (
              <Navbar.Text className="ms-lg-3">
                Hola, {usuario.nombre}
              </Navbar.Text>
            )}
            <button
              type="button"
              className="btn btn-link nav-link ms-lg-2"
              onClick={manejarSesion}
            >
              {usuario ? 'Salir' : 'Ingresar'}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
