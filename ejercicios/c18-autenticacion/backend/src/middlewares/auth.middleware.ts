import type {
  NextFunction,
  Request,
  Response,
} from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

type Rol = 'ADMIN' | 'CLIENTE';

interface PayloadToken extends jwt.JwtPayload {
  id: number;
  rol: Rol;
}

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Falta el token',
    });
    return;
  }

  const token = authorization.slice(7);

  try {
    const payload = jwt.verify(
      token,
      JWT_SECRET,
    ) as PayloadToken;

    req.usuario = {
      id: payload.id,
      rol: payload.rol,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        error: 'Token expirado',
      });
      return;
    }

    res.status(401).json({
      error: 'Token inválido',
    });
  }
}

export function authorize(...roles: Rol[]) {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.usuario) {
      res.status(401).json({
        error: 'No autenticado',
      });
      return;
    }

    if (!roles.includes(req.usuario.rol)) {
      res.status(403).json({
        error: 'No tenés permiso para esta operación',
      });
      return;
    }

    next();
  };
}