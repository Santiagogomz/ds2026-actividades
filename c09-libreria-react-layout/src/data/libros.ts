import type { Libro } from '../types/libro';

export const libros: Libro[] = [
  {
    id: 1,
    titulo: 'El Eternauta',
    autor: 'Hector German Oesterheld',
    imagen: '/img/eternauta.jpg',
    descripcion: 'Una historieta argentina de ciencia ficcion sobre una invasion y la resistencia colectiva.',
    precio: '$18.500',
  },
  {
    id: 2,
    titulo: 'Martin Fierro',
    autor: 'Jose Hernandez',
    imagen: '/img/mfierro.jpg',
    descripcion: 'El poema gauchesco clasico que retrata la vida, la injusticia y la identidad rural argentina.',
    precio: '$12.900',
  },
  {
    id: 3,
    titulo: 'El Aleph',
    autor: 'Jorge Luis Borges',
    imagen: '/img/aleph.jpg',
    descripcion: 'Cuentos donde Borges combina filosofia, infinito, memoria y literatura fantastica.',
    precio: '$15.200',
  },
  {
    id: 4,
    titulo: 'La Ciudad de los Geometras',
    autor: 'Gabriel Darrigran',
    imagen: '/img/cg.jpg',
    descripcion: 'Una aventura literaria con enigmas, ciudad y pensamiento matematico.',
    precio: '$10.800',
  },
  {
    id: 5,
    titulo: 'Los Doce Trabajos de Hercules',
    autor: 'Enrique de Villena',
    imagen: '/img/hercules.jpg',
    descripcion: 'Una version narrativa de las pruebas mitologicas del heroe griego.',
    precio: '$13.700',
  },
  {
    id: 6,
    titulo: 'Ficciones',
    autor: 'Jorge Luis Borges',
    imagen: '/img/ficciones.png',
    descripcion: 'Relatos fundamentales de la literatura argentina con laberintos, bibliotecas y dobles.',
    precio: '$16.400',
  },
];
