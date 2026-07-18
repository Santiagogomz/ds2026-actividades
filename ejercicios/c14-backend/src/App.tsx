import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Catalogo from './pages/Catalogo';
import Home from './pages/Home';
import LibroDetalle from './pages/LibroDetalle';
import LibroNuevo from './pages/LibroNuevo';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/libros/nuevo" element={<LibroNuevo />} />
          <Route path="/libros/:id" element={<LibroDetalle />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
