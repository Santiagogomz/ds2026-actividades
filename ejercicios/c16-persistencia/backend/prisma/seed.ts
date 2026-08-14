import { prisma } from '../src/config/prisma';

const libros = [
  {
    titulo: 'El Eternauta',
    autor: 'Héctor Germán Oesterheld',
    imagen: '/img/eternauta.jpg',
    descripcion: 'Una clásica historia de ciencia ficción argentina donde un grupo de sobrevivientes enfrenta una invasión desconocida en Buenos Aires.',
    precio: 18500,
    disponible: true,
  },
  {
    titulo: 'Martín Fierro',
    autor: 'José Hernández',
    imagen: '/img/mfierro.jpg',
    descripcion: 'Poema narrativo fundamental de la literatura argentina que relata la vida del gaucho Martín Fierro.',
    precio: 12900,
    disponible: true,
  },
  {
    titulo: 'El Aleph',
    autor: 'Jorge Luis Borges',
    imagen: '/img/aleph.jpg',
    descripcion: 'Una colección de relatos fantásticos y filosóficos donde Borges explora el infinito, el tiempo y los laberintos.',
    precio: 15200,
    disponible: true,
  },
  {
    titulo: 'La Ciudad de los Geómetras',
    autor: 'Gabriel Darrigran',
    imagen: '/img/cg.jpg',
    descripcion: 'Un recorrido por la fundación, el diseño y la planificación de la ciudad de La Plata.',
    precio: 10800,
    disponible: false,
  },
  {
    titulo: 'Los Doce Trabajos de Hércules',
    autor: 'Enrique de Villena',
    imagen: '/img/hercules.jpg',
    descripcion: 'Adaptación literaria inspirada en la mitología griega y las legendarias pruebas de Hércules.',
    precio: 13700,
    disponible: true,
  },
  {
    titulo: 'Ficciones',
    autor: 'Jorge Luis Borges',
    imagen: '/img/ficciones.png',
    descripcion: 'Cuentos llenos de simbolismo, bibliotecas infinitas y realidades imposibles.',
    precio: 16400,
    disponible: true,
  },
];

const autores = [
  { nombre: 'Héctor Germán Oesterheld', nacionalidad: 'Argentina' },
  { nombre: 'José Hernández', nacionalidad: 'Argentina' },
  { nombre: 'Jorge Luis Borges', nacionalidad: 'Argentina' },
  { nombre: 'Gabriel Darrigran', nacionalidad: 'Argentina' },
  { nombre: 'Enrique de Villena', nacionalidad: 'España' },
];

async function main() {
  await prisma.$transaction([
    prisma.libro.deleteMany(),
    prisma.autor.deleteMany(),
    prisma.libro.createMany({ data: libros }),
    prisma.autor.createMany({ data: autores }),
  ]);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
