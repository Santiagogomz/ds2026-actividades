
export type Autor = {
  id: number;
  nombre: string;
  nacionalidad: string;
};

export type Libro = {
  id: number;
  titulo: string;
  autorId: number;
  autor: Autor;
  imagen: string;
  precio: number;
  disponible: boolean;
};
