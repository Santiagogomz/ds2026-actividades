import { useEffect, useState } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error('Error al cargar los datos');
        }

        setData(await respuesta.json());
      } catch (errorDesconocido) {
        setError(errorDesconocido instanceof Error ? errorDesconocido.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [url]);

  return { data, loading, error };
}
