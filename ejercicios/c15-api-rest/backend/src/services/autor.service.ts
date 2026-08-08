import type { Autor } from '../types/autor.types.js';

const autores: Autor[] = [
  { id: 1, nombre: 'Héctor Germán Oesterheld', nacionalidad: 'Argentina' },
  { id: 2, nombre: 'José Hernández', nacionalidad: 'Argentina' },
  { id: 3, nombre: 'Jorge Luis Borges', nacionalidad: 'Argentina' },
  { id: 4, nombre: 'Gabriel Darrigran', nacionalidad: 'Argentina' },
  { id: 5, nombre: 'Enrique de Villena', nacionalidad: 'España' },
];

let proximoId = 6;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find((autor) => autor.id === id);
}

export function create(datos: Omit<Autor, 'id'>): Autor {
  const nuevo = { id: proximoId++, ...datos };
  autores.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Autor, 'id'>): Autor | undefined {
  const indice = autores.findIndex((autor) => autor.id === id);
  if (indice === -1) return undefined;

  autores[indice] = { id, ...datos };
  return autores[indice];
}

export function remove(id: number): boolean {
  const indice = autores.findIndex((autor) => autor.id === id);
  if (indice === -1) return false;

  autores.splice(indice, 1);
  return true;
}
