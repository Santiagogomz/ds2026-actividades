import type { Request, Response } from 'express';
import * as autorService from '../services/autor.service.js';

const errorInterno = { error: 'Error interno del servidor' };

export async function getAll(_req: Request, res: Response) {
  try {
    return res.json(await autorService.findAll());
  } catch {
    return res.status(500).json(errorInterno);
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const autor = await autorService.findById(Number(req.params.id));
    if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
    return res.json(autor);
  } catch {
    return res.status(500).json(errorInterno);
  }
}

export async function create(req: Request, res: Response) {
  try {
    const nuevo = await autorService.create(req.body);
    return res.status(201).json(nuevo);
  } catch {
    return res.status(500).json(errorInterno);
  }
}

export async function update(req: Request, res: Response) {
  try {
    const actualizado = await autorService.update(Number(req.params.id), req.body);
    if (!actualizado) return res.status(404).json({ error: 'Autor no encontrado' });
    return res.json(actualizado);
  } catch {
    return res.status(500).json(errorInterno);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const borrado = await autorService.remove(Number(req.params.id));
    if (!borrado) return res.status(404).json({ error: 'Autor no encontrado' });
    return res.status(204).send();
  } catch {
    return res.status(500).json(errorInterno);
  }
}
