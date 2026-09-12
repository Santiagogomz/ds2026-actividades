import { z } from 'zod';

export const libroSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(1, 'El título es obligatorio'),

  autorId: z.coerce
    .number()
    .int('El autor debe ser un número entero')
    .positive('El autor es obligatorio'),

  descripcion: z
    .string()
    .trim()
    .min(1, 'La descripción es obligatoria'),

  imagen: z
    .string()
    .trim()
    .min(1, 'La foto es obligatoria'),

  precio: z.coerce
    .number()
    .int('El precio debe ser un número entero')
    .positive('El precio debe ser mayor a 0'),

  disponible: z.boolean(),
});

export type LibroValidado = z.infer<typeof libroSchema>;
