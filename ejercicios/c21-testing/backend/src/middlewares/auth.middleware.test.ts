import { describe, it, expect, vi } from 'vitest';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authenticate, authorize } from './auth.middleware';
import { JWT_SECRET } from '../config/env';
function mocks(req: Partial<Request> = {}) {
  const res = { status: vi.fn().mockReturnThis(), json: vi.fn().mockReturnThis() };
  const next = vi.fn();
  return { req: req as Request, res, next };
}
describe('authorize', () => {
  it('rechaza CLIENTE en una operación de ADMIN sin llamar next', () => {
    const { req, res, next } = mocks({ usuario: { id: 2, rol: 'CLIENTE' } });
    authorize('ADMIN')(req, res as unknown as Response, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
  it('permite ADMIN y llama next una sola vez', () => {
    const { req, res, next } = mocks({ usuario: { id: 1, rol: 'ADMIN' } });
    authorize('ADMIN')(req, res as unknown as Response, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});
describe('authenticate', () => {
  it('carga el usuario de un token válido', () => {
    const token = jwt.sign({ id: 7, rol: 'CLIENTE' }, JWT_SECRET, { expiresIn: '1h' });
    const { req, res, next } = mocks({ headers: { authorization: `Bearer ${token}` } });
    authenticate(req, res as unknown as Response, next);
    expect(req.usuario).toEqual({ id: 7, rol: 'CLIENTE' });
    expect(next).toHaveBeenCalledTimes(1);
  });
});
