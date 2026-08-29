import express from 'express';
import autorRoutes from './routes/autor.routes';
import libroRoutes from './routes/libro.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/api/libros', libroRoutes);
app.use('/api/autores', autorRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
