import type { Libro } from '../types/libro.types.js';

const libros: Libro[] = [
  {
    id: 1,
    titulo: 'El Eternauta',
    autor: 'Héctor Germán Oesterheld',
    imagen: '/img/eternauta.jpg',
    descripcion: 'Una clásica historia de ciencia ficción argentina donde un grupo de sobrevivientes enfrenta una invasión desconocida en Buenos Aires.',
    precio: 18500,
    disponible: true,
  },
  {
    id: 2,
    titulo: 'Martín Fierro',
    autor: 'José Hernández',
    imagen: '/img/mfierro.jpg',
    descripcion: 'Poema narrativo fundamental de la literatura argentina que relata la vida del gaucho Martín Fierro.',
    precio: 12900,
    disponible: true,
  },
  {
    id: 3,
    titulo: 'El Aleph',
    autor: 'Jorge Luis Borges',
    imagen: '/img/aleph.jpg',
    descripcion: 'Una colección de relatos fantásticos y filosóficos donde Borges explora el infinito, el tiempo y los laberintos.',
    precio: 15200,
    disponible: true,
  },
  {
    id: 4,
    titulo: 'La Ciudad de los Geómetras',
    autor: 'Gabriel Darrigran',
    imagen: '/img/cg.jpg',
    descripcion: 'Un recorrido por la fundación, el diseño y la planificación de la ciudad de La Plata.',
    precio: 10800,
    disponible: false,
  },
  {
    id: 5,
    titulo: 'Los Doce Trabajos de Hércules',
    autor: 'Enrique de Villena',
    imagen: '/img/hercules.jpg',
    descripcion: 'Adaptación literaria inspirada en la mitología griega y las legendarias pruebas de Hércules.',
    precio: 13700,
    disponible: true,
  },
  {
    id: 6,
    titulo: 'Ficciones',
    autor: 'Jorge Luis Borges',
    imagen: '/img/ficciones.png',
    descripcion: 'Cuentos llenos de simbolismo, bibliotecas infinitas y realidades imposibles.',
    precio: 16400,
    disponible: true,
  },
];

let proximoId = 7;

export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) return libros;
  return libros.filter((libro) => libro.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find((libro) => libro.id === id);
}

export function create(datos: Omit<Libro, 'id'>): Libro {
  const nuevo = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, 'id'>): Libro | undefined {
  const indice = libros.findIndex((libro) => libro.id === id);
  if (indice === -1) return undefined;

  libros[indice] = { id, ...datos };
  return libros[indice];
}

export function remove(id: number): boolean {
  const indice = libros.findIndex((libro) => libro.id === id);
  if (indice === -1) return false;

  libros.splice(indice, 1);
  return true;
}
