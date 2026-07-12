import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT ?? 3000;
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';

app.use(cors({ origin: frontendUrl }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'API de Librería funcionando',
    db: process.env.POSTGRES_DB ?? 'libreria_db',
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
