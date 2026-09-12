import express from 'express';
import cors from 'cors';

import autorRoutes from './routes/autor.routes';
import libroRoutes from './routes/libro.routes';
import { errorHandler } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';

const app = express();
const port = process.env.PORT ?? 3000;

const corsOptions = {
  origin: [process.env.FRONTEND_URL ?? 'http://localhost:5173'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/autores', autorRoutes);

// 404 en JSON
app.use((_req, res) => {
  return res.status(404).json({
    error: 'Ruta no encontrada',
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});