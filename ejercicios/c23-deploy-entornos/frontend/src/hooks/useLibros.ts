import type { Libro } from '../types/libro';
import { useFetch } from './useFetch';

export function useLibros() {
  const { data, loading, error } = useFetch<Libro[]>('/libros');

  const libros = data ?? [];

  return { libros, loading, error };
}
