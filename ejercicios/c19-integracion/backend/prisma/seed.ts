import bcrypt from 'bcrypt';
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
      'Cuentos sobre bibliotecas infinitas y realidades imposibles.',
    disponible: true,
  },
];

const usuarios = [
  {
    email: 'admin@libreria.test',
    nombre: 'Administrador',
    rol: 'ADMIN' as const,
    password: 'Admin1234',
  },
  {
    email: 'cliente@libreria.test',
    nombre: 'Cliente',
    rol: 'CLIENTE' as const,
    password: 'Cliente1234',
  },
];

async function main() {
  await prisma.libro.deleteMany();

  await prisma.autor.createMany({
    data: autores,
    skipDuplicates: true,
  });

  await prisma.categoria.createMany({
    data: categorias,
    skipDuplicates: true,
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

  for (const { password, ...datos } of usuarios) {
    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.usuario.upsert({
      where: {
        email: datos.email,
      },
      update: {},
      create: {
        ...datos,
        passwordHash,
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