# [AI-C21] Testing en la Librería

Copia de C20 con frontend/ y backend/. Mantiene autenticación, roles y rutas de la librería.

## Testing sin base de datos

```bash
cd backend
npm ci
npx prisma generate
npm test
npx tsc --noEmit
cd ../frontend
npm ci
npm test
npx tsc -p tsconfig.app.json --noEmit
npm run build
```

En ambos proyectos `npm run test:watch` vuelve a ejecutar los tests al editar.
La suite principal no necesita Docker ni PostgreSQL. Backend configura un JWT_SECRET
exclusivo de pruebas y transforma el host `db` de DATABASE_URL a `localhost`.
Sin .env usa una URL local de desarrollo, sin conexión en los tests sin DB.

Cubre validación de precio y normalización del título, authorize con vi.fn(),
authenticate con un JWT real, seis casos de integración de permisos con Express y
supertest, y el Header para invitado, CLIENTE y ADMIN (incluido cerrar sesión).
Los tests están incluidos en las comprobaciones de TypeScript.
Solo se agregan herramientas de testing como devDependencies; ninguna dependencia de producción.

## Pruebas con DB (separadas)

`backend/src/routes/auth.routes.db.test.ts` requiere PostgreSQL, migraciones y seed.
No se incluye en `npm test`. Para ejecutarlo:

```bash
cp backend/.env.example backend/.env
# Completar las credenciales locales y JWT_SECRET.
docker compose up -d --build
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma db seed
cd backend
npm run test:db
```

Comprueba el login válido sin passwordHash y el mismo 401 para email inexistente
y contraseña incorrecta. No modifica datos.

## Desarrollo

Desde la raíz del ejercicio, levantar Docker como arriba; desde frontend/ ejecutar
`npm run dev`. API: localhost:3000, frontend: localhost:5173.
`app.ts` configura y exporta Express; `index.ts` escucha el puerto, manteniendo
`npm run dev` en Docker. Después de instalar dependencias hay que generar Prisma.

Usuarios del seed: admin@libreria.test / Admin1234 y cliente@libreria.test / Cliente1234.

## Entrega

Avisar manualmente en #actividades, hilo [AI-C21] Testing en la Librería, con el enlace
al commit. El aviso en Discord queda a cargo del estudiante.
