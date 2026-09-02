import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import {
  JWT_EXPIRES_IN,
  JWT_SECRET,
  SALT_ROUNDS,
} from '../config/env';
import type {
  Login,
  Registro,
} from '../validations/auth.validation';

export async function registrar(datos: Registro) {
  const passwordHash = await bcrypt.hash(
    datos.password,
    SALT_ROUNDS,
  );

  return prisma.usuario.create({
    data: {
      nombre: datos.nombre,
      email: datos.email,
      passwordHash,
    },
    select: {
      id: true,
      email: true,
      nombre: true,
      rol: true,
      creadoEn: true,
    },
  });
}

export async function login(datos: Login) {
  const usuario = await prisma.usuario.findUnique({
    where: {
      email: datos.email,
    },
    omit: {
      passwordHash: false,
    },
  });

  if (!usuario) {
    return null;
  }

  const coincide = await bcrypt.compare(
    datos.password,
    usuario.passwordHash,
  );

  if (!coincide) {
    return null;
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      rol: usuario.rol,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    },
  );

  const { passwordHash: _passwordHash, ...usuarioPublico } =
    usuario;

  return {
    token,
    usuario: usuarioPublico,
  };
}

export async function findById(id: number) {
  return prisma.usuario.findUnique({
    where: {
      id,
    },
  });
}