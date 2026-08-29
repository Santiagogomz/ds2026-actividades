import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.coerce
    .number()
    .int('El id debe ser un número entero')
    .positive('El id debe ser un número positivo'),
});