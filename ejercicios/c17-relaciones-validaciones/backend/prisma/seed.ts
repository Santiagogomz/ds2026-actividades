import { prisma } from '../src/config/prisma';

const autores = [
  {
    nombre: 'Héctor Germán Oesterheld',
    nacionalidad: 'Argentina',
  },
  {
    nombre: 'José Hernández',
    nacionalidad: 'Argentina',
  },
  {
    nombre: 'Jorge Luis Borges',
    nacionalidad: 'Argentina',
  },
];

const categorias = [
  { nombre: 'Ciencia ficción' },
  { nombre: 'Literatura argentina' },
  { nombre: 'Cuentos' },
];

const libros = [
  {
    titulo: 'El Eternauta',
    autor: 'Héctor Germán Oesterheld',
    categorias: ['Ciencia ficción', 'Literatura argentina'],
    precio: 18500,
    imagen: '/img/eternauta.jpg',
    descripcion:
      'Una historia de ciencia ficción argentina ambientada en Buenos Aires.',
    disponible: true,
  },
  {
    titulo: 'Martín Fierro',
    autor: 'José Hernández',
    categorias: ['Literatura argentina'],
    precio: 12900,
    imagen: '/img/mfierro.jpg',
    descripcion:
      'Poema narrativo fundamental de la literatura argentina.',
    disponible: true,
  },
  {
    titulo: 'Ficciones',
    autor: 'Jorge Luis Borges',
    categorias: ['Cuentos', 'Literatura argentina'],
    precio: 16400,
    imagen: '/img/ficciones.png',
    descripcion:
      'Cuentos sobre bibliotecas infinitas, laberintos y realidades imposibles.',
    disponible: true,
  },
];

async function main() {
  await prisma.libro.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.autor.deleteMany();

  await prisma.autor.createMany({
    data: autores,
  });

  await prisma.categoria.createMany({
    data: categorias,
  });

  for (const { autor, categorias, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: {
          connect: {
            nombre: autor,
          },
        },
        categorias: {
          connect: categorias.map((nombre) => ({
            nombre,
          })),
        },
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });