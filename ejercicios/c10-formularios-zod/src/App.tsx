import { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import { libros as librosIniciales } from './data/libros';
import Catalogo from './pages/Catalogo';
import Home from './pages/Home';
import LibroDetalle from './pages/LibroDetalle';
import LibroNuevo from './pages/LibroNuevo';
import type { Libro } from './types/libro';

const LIBROS_STORAGE_KEY = 'libreria-react-libros';

function obtenerLibrosGuardados() {
  const librosGuardados = localStorage.getItem(LIBROS_STORAGE_KEY);

  if (!librosGuardados) {
    return librosIniciales;
  }

  try {
    return JSON.parse(librosGuardados) as Libro[];
  } catch {
    return librosIniciales;
  }
}

function App() {
  const [libros, setLibros] = useState<Libro[]>(obtenerLibrosGuardados);

  useEffect(() => {
    localStorage.setItem(LIBROS_STORAGE_KEY, JSON.stringify(libros));
  }, [libros]);

  const agregarLibro = (nuevoLibro: Libro) => {
    setLibros([...libros, nuevoLibro]);
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home libros={libros} />} />
          <Route path="/catalogo" element={<Catalogo libros={libros} />} />
          <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
          <Route path="/libros/:id" element={<LibroDetalle libros={libros} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
