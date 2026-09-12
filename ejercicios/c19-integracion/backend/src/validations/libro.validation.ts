import { z } from 'zod';

export const libroCreateSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(1, 'El título es obligatorio')
    .max(200, 'El título puede tener como máximo 200 caracteres'),

  precio: z
    .number()
    .int('El precio debe ser un número entero')
    .positive('El precio debe ser mayor a 0'),

  imagen: z
    .string()
    .trim()
    .min(1, 'La imagen es obligatoria'),

  descripcion: z
    .string()
    .trim()
    .min(1, 'La descripción es obligatoria'),

  disponible: z.boolean().optional(),

  autorId: z
    .number()
    .int('El autor debe ser un número entero')
    .positive('El autor es obligatorio'),
});

export const libroUpdateSchema = libroCreateSchema.partial();

export type LibroCreate = z.infer<typeof libroCreateSchema>;
export type LibroUpdate = z.infer<typeof libroUpdateSchema>;