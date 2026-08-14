import type { Request, Response } from 'express';
import * as libroService from '../services/libro.service.js';

const errorInterno = { error: 'Error interno del servidor' };

export async function getAll(req: Request, res: Response) {
  try {
    const disponible = req.query.disponible;
    const filtro = disponible === undefined ? undefined : disponible === 'true';
    return res.json(await libroService.findAll(filtro));
  } catch {
    return res.status(500).json(errorInterno);
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const libro = await libroService.findById(Number(req.params.id));
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
    return res.json(libro);
  } catch {
    return res.status(500).json(errorInterno);
  }
}

export async function create(req: Request, res: Response) {
  try {
    const nuevo = await libroService.create(req.body);
    return res.status(201).json(nuevo);
  } catch {
    return res.status(500).json(errorInterno);
  }
}

export async function update(req: Request, res: Response) {
  try {
    const actualizado = await libroService.update(Number(req.params.id), req.body);
    if (!actualizado) return res.status(404).json({ error: 'Libro no encontrado' });
    return res.json(actualizado);
  } catch {
    return res.status(500).json(errorInterno);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const borrado = await libroService.remove(Number(req.params.id));
    if (!borrado) return res.status(404).json({ error: 'Libro no encontrado' });
    return res.status(204).send();
  } catch {
    return res.status(500).json(errorInterno);
  }
}
