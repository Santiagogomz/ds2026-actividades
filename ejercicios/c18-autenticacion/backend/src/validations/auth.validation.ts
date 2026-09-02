import { z } from 'zod';

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email('Email inválido'));

export const registroSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre puede tener como máximo 100 caracteres'),

  email: emailSchema,

  password: z
    .string()
    .min(8, 'La contraseña necesita al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña necesita al menos una mayúscula')
    .regex(/[0-9]/, 'La contraseña necesita al menos un número'),
});

export const loginSchema = z.object({
  email: emailSchema,

  password: z
    .string()
    .min(1, 'La contraseña es obligatoria'),
});

export type Registro = z.infer<typeof registroSchema>;
export type Login = z.infer<typeof loginSchema>;