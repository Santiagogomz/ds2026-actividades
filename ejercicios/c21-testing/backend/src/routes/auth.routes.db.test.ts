// REQUIERE DB: PostgreSQL levantado, migraciones aplicadas y usuarios del seed.
// Se ejecuta explícitamente con npm run test:db, fuera de la suite sin DB.
import { afterAll, describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';
import { prisma } from '../config/prisma';
afterAll(async () => { await prisma.$disconnect(); });
describe('login contra la DB del seed', () => {
  it('devuelve token y usuario público para credenciales válidas', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'cliente@libreria.test', password: 'Cliente1234' });
    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.usuario).toMatchObject({ email: 'cliente@libreria.test', rol: 'CLIENTE' });
    expect(res.body.usuario).not.toHaveProperty('passwordHash');
  });
  it('no revela si el email existe ante credenciales inválidas', async () => {
    const passwordMal = await request(app).post('/api/auth/login').send({ email: 'cliente@libreria.test', password: 'Incorrecta1' });
    const emailInexistente = await request(app).post('/api/auth/login').send({ email: 'nadie@libreria.test', password: 'Incorrecta1' });
    expect(passwordMal.status).toBe(401);
    expect(emailInexistente.status).toBe(401);
    expect(passwordMal.body).toEqual({ error: 'Credenciales inválidas' });
    expect(emailInexistente.body).toEqual(passwordMal.body);
  });
});
