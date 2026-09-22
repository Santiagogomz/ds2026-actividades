# [AI-C20-B] Autorización en la Librería

Continuación de la integración de C19. La sesión ahora vive en un
`AuthContext`, se rehidrata mediante `GET /api/auth/yo` y la interfaz adapta
sus rutas y acciones al rol del usuario sin reemplazar la autorización del
backend.

## Puesta en marcha

Desde esta carpeta:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
# Completar los placeholders de backend/.env con valores locales.
docker compose up -d --build
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma generate
docker compose exec api npx prisma db seed
npm install
npm run dev
```

Servicios disponibles:

- Frontend: `http://localhost:5173`.
- API: `http://localhost:3000/api`.
- Prisma Studio: `docker compose exec api npx prisma studio --port 5555 --browser none` y luego `http://localhost:5555`.

Usuarios del seed:

- Administrador: `admin@libreria.test` / `Admin1234`
- Cliente: `cliente@libreria.test` / `Cliente1234`

## Autorización frontend

- Sin sesión, `/libros/nuevo` redirige a `/login`.
- Un usuario `CLIENTE` es enviado a `/sin-permiso`.
- Un usuario `ADMIN` puede entrar y ve el enlace **Nuevo libro**.
- Al recargar, el frontend consulta `/auth/yo`; no decodifica el JWT.
- Un `401` recibido con token dispara el cierre de sesión automático.

La protección visual mejora la experiencia, pero la seguridad sigue aplicada
en la API mediante `authenticate` y `authorize`.
