import app from './app';
const port = process.env.PORT ?? 3000;
app.listen(Number(port), '0.0.0.0', () => console.log(`API escuchando en puerto ${port}`));
