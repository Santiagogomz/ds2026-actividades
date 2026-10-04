// Integración sin DB: las solicitudes se cortan antes del controller.
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import { JWT_SECRET } from '../config/env';
const cliente = jwt.sign({ id: 2, rol: 'CLIENTE' }, JWT_SECRET);
const admin = jwt.sign({ id: 1, rol: 'ADMIN' }, JWT_SECRET);
describe('matriz de permisos', () => {
  it('POST sin token devuelve 401', async () => {
    const res = await request(app).post('/api/libros').send({});
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Falta el token' });
  });
  it('CLIENTE recibe 403 antes de validar un body inválido', async () => {
    const res = await request(app).post('/api/libros').set('Authorization', `Bearer ${cliente}`).send({ precio: -5 });
    expect(res.status).toBe(403);
  });
  it('ADMIN con precio negativo recibe 400 y detalle de precio', async () => {
    const res = await request(app).post('/api/libros').set('Authorization', `Bearer ${admin}`).send({ precio: -5 });
    expect(res.status).toBe(400);
    expect(res.body.detalles).toContainEqual({ campo: 'precio', mensaje: 'El precio debe ser mayor a 0' });
  });
  it('token firmado con otro secret devuelve 401', async () => {
    const token = jwt.sign({ id: 1, rol: 'ADMIN' }, 'otro-secret');
    const res = await request(app).post('/api/libros').set('Authorization', `Bearer ${token}`).send({});
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Token inválido' });
  });
  it('CLIENTE no puede borrar libros', async () => {
    const res = await request(app).delete('/api/libros/1').set('Authorization', `Bearer ${cliente}`);
    expect(res.status).toBe(403);
  });
  it('ruta inexistente devuelve 404 en JSON', async () => {
    const res = await request(app).get('/api/no-existe');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Ruta no encontrada' });
  });
});
