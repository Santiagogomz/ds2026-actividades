import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar expand="lg" className="navbarCustom">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Libreria React
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
