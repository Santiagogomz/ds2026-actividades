# [AI-C16] Persistencia en Librería

Sitio de la Clase 15 con la API de libros y autores persistida en PostgreSQL mediante Prisma 7.

## Puesta en marcha

Desde esta carpeta:

```bash
cp backend/.env.example backend/.env
# Reemplazar los placeholders de backend/.env con valores locales.
docker compose up -d --build
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma generate
docker compose exec api npx prisma db seed
```

Servicios disponibles:

- Frontend: `npm install` y `npm run dev` (puerto 5173).
- API: `http://localhost:3000/api`.
- Prisma Studio: `docker compose exec api npx prisma studio --port 5555 --browser none` y luego `http://localhost:5555`.

Las pruebas CRUD y los casos 404 de ambas entidades están en `backend/api.http`.

## Persistencia

El volumen nombrado `pgdata` conserva PostgreSQL aunque se recree el contenedor. `docker compose down -v` también elimina ese volumen y, por lo tanto, los datos.

El esquema es `backend/prisma/schema.prisma` y la migración descriptiva está versionada en `backend/prisma/migrations/`. El cliente generado y `backend/.env` están ignorados por Git.
