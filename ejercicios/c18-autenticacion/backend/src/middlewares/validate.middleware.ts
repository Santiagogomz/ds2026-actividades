import type {
  NextFunction,
  Request,
  Response,
} from 'express';
import type { ZodType } from 'zod';

export const validate =
  (schema: ZodType) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      next(resultado.error);
      return;
    }

    req.body = resultado.data;
    next();
  };

export const validateParams =
  (schema: ZodType) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const resultado = schema.safeParse(req.params);

    if (!resultado.success) {
      next(resultado.error);
      return;
    }

    next();
  };