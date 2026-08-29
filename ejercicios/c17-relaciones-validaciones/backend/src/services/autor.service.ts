import { prisma } from '../config/prisma.js';
import type { Autor } from '../types/autor.types.js';

export async function findAll(): Promise<Autor[]> {
  return prisma.autor.findMany({ orderBy: { id: 'asc' } });
}

export async function findById(id: number): Promise<Autor | null> {
  return prisma.autor.findUnique({ where: { id } });
}

export async function create(datos: Omit<Autor, 'id'>): Promise<Autor> {
  return prisma.autor.create({ data: datos });
}

export async function update(id: number, datos: Omit<Autor, 'id'>): Promise<Autor | null> {
  const existe = await prisma.autor.findUnique({ where: { id } });
  if (!existe) return null;
  return prisma.autor.update({ where: { id }, data: datos });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.autor.findUnique({ where: { id } });
  if (!existe) return false;
  await prisma.autor.delete({ where: { id } });
  return true;
}
