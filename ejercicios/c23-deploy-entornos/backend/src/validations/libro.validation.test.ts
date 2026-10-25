import { describe, it, expect } from 'vitest';
import { libroCreateSchema } from './libro.validation';
const libro = { titulo: 'Rayuela', precio: 7000, imagen: 'rayuela.jpg', descripcion: 'Novela', autorId: 1 };
describe('libroCreateSchema', () => {
  it('rechaza un precio negativo e identifica el campo', () => {
    const resultado = libroCreateSchema.safeParse({ ...libro, precio: -5 });
    expect(resultado.success).toBe(false);
    if (!resultado.success) expect(resultado.error.issues[0].path).toEqual(['precio']);
  });
  it('recorta los espacios del título de un libro válido', () => {
    const resultado = libroCreateSchema.safeParse({ ...libro, titulo: '  Rayuela  ' });
    expect(resultado.success).toBe(true);
    if (resultado.success) expect(resultado.data.titulo).toBe('Rayuela');
  });
});
