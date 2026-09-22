import { z } from 'zod';

export const autorCreateSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, 'El nombre es obligatorio')
    .max(120, 'El nombre puede tener como máximo 120 caracteres'),

  nacionalidad: z
    .string()
    .trim()
    .min(1, 'La nacionalidad es obligatoria')
    .max(100, 'La nacionalidad puede tener como máximo 100 caracteres'),
});

export const autorUpdateSchema = autorCreateSchema.partial();

export type AutorCreate = z.infer<typeof autorCreateSchema>;
export type AutorUpdate = z.infer<typeof autorUpdateSchema>;