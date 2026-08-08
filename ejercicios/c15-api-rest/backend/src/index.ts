import cors from 'cors';
import express from 'express';
import autorRoutes from './routes/autor.routes.js';
import libroRoutes from './routes/libro.routes.js';

const app = express();
const port = process.env.PORT ?? 3000;
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';

app.use(cors({ origin: frontendUrl }));
app.use(express.json());
app.use('/api/libros', libroRoutes);
app.use('/api/autores', autorRoutes);

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
