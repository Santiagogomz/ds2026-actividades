import type {
  NextFunction,
  Request,
  Response,
} from 'express';
import { ZodError } from 'zod';
import { Prisma } from '../generated/prisma/client';

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: 'Datos inválidos',
      detalles: error.issues.map((issue) => ({
        campo: issue.path.join('.'),
        mensaje: issue.message,
      })),
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: 'Ya existe un registro con ese valor',
      });
    }

    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'No encontrado',
      });
    }

    if (error.code === 'P2003') {
      return res.status(409).json({
        error: 'Hay registros relacionados',
      });
    }
  }

  console.error(error);

  return res.status(500).json({
    error: 'Error interno del servidor',
  });
}