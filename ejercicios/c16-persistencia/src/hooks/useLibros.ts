import { useMemo, useState } from 'react';
import type { Libro } from '../types/libro';
import { obtenerLibrosAgregados } from '../utils/librosStorage';
import { useFetch } from './useFetch';

export function useLibros() {
  const { data, loading, error } = useFetch<Libro[]>('/libros.json');
  const [librosAgregados] = useState<Libro[]>(obtenerLibrosAgregados);

  const libros = useMemo(() => [...(data ?? []), ...librosAgregados], [data, librosAgregados]);

  return { libros, loading, error };
}
