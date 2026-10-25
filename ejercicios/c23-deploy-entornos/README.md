# [AI-C23] Deploy en la Librería

Trabajo individual basado en AI-C21, publicado en Render con PostgreSQL en Neon.

## URLs públicas

- Frontend: https://libreria-ai-c23-web.onrender.com
- Backend: https://libreria-ai-c23-api.onrender.com
- API: https://libreria-ai-c23-api.onrender.com/api
- Health check: https://libreria-ai-c23-api.onrender.com/api/health

Servicios gratuitos en Render y proyecto Neon en AWS Ohio. No se necesita el entorno local encendido para usar la aplicación pública. El backend gratuito puede tardar en despertar tras estar inactivo.

## Estado

- Código de producción preparado.
- Verificación local: builds correctos y 14 tests aprobados (11 backend y 3 frontend).
- Imagen Docker de producción construida y probada con PostgreSQL temporal: migraciones, seed, login de ambos roles, CRUD completo, persistencia y permisos correctos. Los recursos temporales de prueba se retiraron al terminar.
- Verificación pública del 25/10/2026: catálogo con tres libros, login ADMIN/CLIENTE, CRUD completo, persistencia, CORS y restricciones 401/403 correctos. Se retiró el libro temporal creado para la prueba.
- Verificación en navegador: login de administrador, catálogo y recarga directa de `/catalogo` sin 404.
- Render configurado con Auto-Deploy On Commit desde main.
- Pendiente del estudiante: aviso de entrega en Discord, hilo `[AI-C23] Deploy en la Librería`.

## Arquitectura

Navegador → frontend estático (Render) → API Express (Render, Docker) → PostgreSQL (Neon).

El frontend usa `VITE_API_URL`. El backend usa `FRONTEND_URL` para CORS y `DATABASE_URL` para Prisma. Los secretos se cargan en la plataforma; no se guardan en Git.

## Desarrollo local (Git Bash)

Desde la raíz de este repositorio:

```bash
cd ejercicios/c23-deploy-entornos
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
docker compose up -d --build
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma db seed
cd frontend
npm ci
npm run dev
```

Frontend: http://localhost:5173. API: http://localhost:3000/api.
Reemplazar el `JWT_SECRET` de ejemplo por un valor aleatorio para cualquier entorno compartido.

## Verificaciones

Desde la carpeta de esta actividad:

```bash
cd backend
npm ci
npx prisma generate
npm run build
npm test
cd ../frontend
npm ci
VITE_API_URL=http://localhost:3000/api npm run build
npm test
```

El frontend falla con un mensaje claro si se intenta compilar sin una `VITE_API_URL` HTTP/HTTPS. En producción, esta variable debe apuntar al backend público y terminar en `/api`; sus valores quedan incorporados en el build.

Para construir la imagen de producción, desde `backend/`:

```bash
docker build -f Dockerfile.prod -t ds2026-ai-c23:local .
```

El Dockerfile genera Prisma y compila TypeScript en una etapa. La imagen final ejecuta las migraciones versionadas y luego `node dist/index.js`. No usa el servidor de desarrollo ni incluye el código fuente de la aplicación.

## Deploy: Neon → backend → frontend → CORS → seed

### 1. Neon

Crear un proyecto PostgreSQL, preferentemente AWS us-east-1, y obtener la conexión directa desde Connect, desactivando Connection pooling, según la consigna. Conservar todos los parámetros de la URL que entregue Neon, incluido SSL.

### 2. Backend en Render

Crear un Web Service conectado a este repositorio:

| Campo | Valor |
| --- | --- |
| Branch | main |
| Language | Docker |
| Root Directory | ejercicios/c23-deploy-entornos/backend |
| Dockerfile Path | Dockerfile.prod |
| Docker Build Context | . |
| Instance Type | Free |
| Region | Ohio (misma región que el proyecto Neon creado) |
| Health Check Path | /api/health |
| Docker Command | vacío: usa el CMD del Dockerfile |

Variables:

| Variable | Configuración |
| --- | --- |
| DATABASE_URL | Conexión directa de Neon, con SSL |
| JWT_SECRET | Valor aleatorio generado en Render |
| FRONTEND_URL | Inicialmente http://localhost:5173; reemplazar por el origen público del frontend |
| PORT | Lo proporciona Render |
| NODE_ENV | La imagen lo define como production |

Las migraciones se ejecutan con `npx prisma migrate deploy` al arrancar. No usar `migrate dev` ni `db push` para esta base pública. Guardar la URL asignada por Render. Verificar `https://DOMINIO-DEL-BACKEND/api/health`.

El health check comprueba que el proceso HTTP responde; no reemplaza la prueba de consultas a la base.

### 3. Frontend en Render

Crear un Static Site del mismo repositorio:

| Campo | Valor |
| --- | --- |
| Branch | main |
| Root Directory | ejercicios/c23-deploy-entornos/frontend |
| Build Command | npm ci && npm run build |
| Publish Directory | dist |
| VITE_API_URL | https://DOMINIO-DEL-BACKEND/api |

Configurar antes del build la URL real del backend. Nunca poner `DATABASE_URL` ni `JWT_SECRET` en variables `VITE_`.

Agregar la regla de rutas:

| Source | Destination | Action |
| --- | --- | --- |
| /* | /index.html | Rewrite |

### 4. CORS

En el backend reemplazar `FRONTEND_URL` por el origen exacto del frontend público: HTTPS, sin barra final ni rutas. Aplicar el cambio y redeployar el backend.

### 5. Seed de Neon (Git Bash)

Desde la carpeta de esta actividad, con Docker Desktop funcionando y `backend/.env` local creado:

```bash
docker compose build api
read -r -s -p "URL completa de Neon: " DATABASE_URL
printf '\n'
export DATABASE_URL
docker compose run --rm --no-deps -e DATABASE_URL api npx prisma db seed
unset DATABASE_URL
```

La URL ingresada no se muestra en pantalla ni se escribe literalmente en el historial. El seed elimina los libros existentes y vuelve a cargar los ejemplos: usarlo para inicializar la base nueva, no repetirlo si se quieren conservar libros agregados.

### Alternativa: Blueprint

Los servicios actuales fueron creados con `render.yaml` desde Render → New → Blueprint, seleccionando como Blueprint Path:

```text
ejercicios/c23-deploy-entornos/render.yaml
```

El Blueprint se llama `libreria-ai-c23`. No crear servicios duplicados: para actualizar, usar el Blueprint existente. La variable `DATABASE_URL`, marcada `sync: false`, se configura únicamente en Render; el archivo no contiene credenciales. Las URLs del frontend y de la API son públicas y están versionadas. `JWT_SECRET` se genera automáticamente.

## Comprobación de la entrega

- Abrir el frontend desde otro dispositivo o con el entorno local detenido.
- Verificar login, catálogo y un CRUD completo con el administrador.
- Verificar que un cliente no pueda crear, editar ni borrar libros.
- Verificar persistencia tras refrescar.
- Abrir una ruta interna y presionar F5: no debe devolver 404.
- Verificar `/api/health` y `/api/libros` en el backend público.
- Las URLs públicas verificadas están al comienzo de este README.
- Avisar en Discord → #actividades → hilo [AI-C23] Deploy en la Librería, con las dos URLs y el repositorio. Compartir credenciales de prueba por el canal que indique la cátedra, no agregar secretos al README.

GitHub Pages es opcional. Fecha límite de la consigna: 15/11/2026.

## Documentación

- https://render.com/docs/docker
- https://render.com/docs/static-sites
- https://render.com/docs/redirects-rewrites
- https://render.com/docs/blueprint-spec
- https://render.com/docs/monorepo-support
- https://neon.com/docs/connect/connect-from-any-app
