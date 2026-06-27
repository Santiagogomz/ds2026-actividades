import type { Libro } from '../types/libro';

const LIBROS_STORAGE_KEY = 'libreria-react-libros-c11';

export function obtenerLibrosAgregados() {
  const librosGuardados = localStorage.getItem(LIBROS_STORAGE_KEY);

  if (!librosGuardados) {
    return [];
  }

  try {
    return JSON.parse(librosGuardados) as Libro[];
  } catch {
    return [];
  }
}

export function guardarLibroAgregado(libro: Libro) {
  const librosActuales = obtenerLibrosAgregados();

  localStorage.setItem(LIBROS_STORAGE_KEY, JSON.stringify([...librosActuales, libro]));
}
