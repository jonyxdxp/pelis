# Streaming Backend API

Backend completo para plataforma de streaming tipo Netflix con PostgreSQL, Prisma ORM y Express.js.

## Características

- ✅ REST API completa para películas y series
- ✅ Base de datos PostgreSQL con Prisma ORM
- ✅ Búsqueda avanzada con filtros
- ✅ Sistema de recomendaciones
- ✅ Analytics de visualización
- ✅ Rate limiting y seguridad
- ✅ Docker Compose para desarrollo
- ✅ Seeders con datos reales

## Stack Tecnológico

- **Node.js 18+** - Runtime
- **Express.js 4.x** - Framework web
- **Prisma ORM 5.x** - Database ORM
- **PostgreSQL 14+** - Base de datos
- **Redis** - Caching (opcional)
- **Joi** - Validación
- **Winston** - Logging

## Instalación Rápida

### 1. Clonar y configurar

```bash
cd streaming-backend
cp .env.example .env
npm install
```

### 2. Iniciar PostgreSQL con Docker

```bash
docker-compose up -d postgres
```

### 3. Configurar base de datos

```bash
# Crear migraciones
npx prisma migrate dev --name init

# Generar cliente Prisma
npx prisma generate

# Ejecutar seeders
npm run db:seed
```

### 4. Iniciar servidor

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints API

### Películas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/movies` | Listar películas (con filtros) |
| GET | `/api/v1/movies/trending` | Películas más populares |
| GET | `/api/v1/movies/new` | Estrenos recientes |
| GET | `/api/v1/movies/rated` | Mejor valoradas |
| GET | `/api/v1/movies/featured` | Destacadas en home |
| GET | `/api/v1/movies/:slug` | Detalle de película |

### Series

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/series` | Listar series (con filtros) |
| GET | `/api/v1/series/trending` | Series más populares |
| GET | `/api/v1/series/:slug` | Detalle de serie |
| GET | `/api/v1/series/:slug/seasons/:number` | Episodios de temporada |

### Búsqueda

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/search?q=matrix` | Búsqueda global |
| GET | `/api/v1/search/suggestions?q=mat` | Autocomplete |
| GET | `/api/v1/search/advanced` | Búsqueda avanzada |

### Géneros

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/genres` | Listar géneros |
| GET | `/api/v1/genres/:slug` | Contenido por género |

### Home

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/home` | Página de inicio completa |
| GET | `/api/v1/hero` | Banner destacado |
| GET | `/api/v1/carousels` | Carruseles |

### Recomendaciones

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/content/:id/recommendations?type=movie` | Recomendaciones |
| GET | `/api/v1/trending` | Contenido trending |

## Filtros de Búsqueda

### Películas

```
GET /api/v1/movies?page=1&limit=20&sort=rating&genres=action,sci-fi&rating_min=7&year_from=2010&year_to=2023&search=matrix
```

Parámetros:
- `page` - Página (default: 1)
- `limit` - Items por página (default: 20, max: 100)
- `sort` - Ordenar por: `rating`, `release_date`, `views`, `added`, `title`
- `order` - `asc` o `desc`
- `genres` - Filtrar por géneros (comma-separated)
- `rating_min` - Rating mínimo (0-10)
- `year_from` / `year_to` - Rango de años
- `search` - Búsqueda por texto

### Series

```
GET /api/v1/series?page=1&limit=20&status=ended&genres=drama
```

Parámetros adicionales:
- `status` - `returning`, `ended`, `cancelled`, `planned`

## Respuesta de Ejemplo

```json
{
  "success": true,
  "data": {
    "movies": [
      {
        "id": "uuid",
        "title": "The Matrix",
        "slug": "the-matrix",
        "shortDescription": "A hacker discovers reality is a simulation",
        "genres": ["Sci-Fi", "Action"],
        "releaseYear": 1999,
        "rating": 8.7,
        "duration": 136,
        "posterUrl": "https://cdn.../poster.jpg",
        "posterBlurhash": "L9C?%D~qIT?b-;RjRjt757oJodS$"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 450,
      "pages": 23
    }
  },
  "timestamp": "2025-02-10T15:30:00Z"
}
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar con nodemon
npm start                # Iniciar en producción

# Base de datos
npm run db:migrate       # Crear migración
npm run db:generate      # Generar cliente Prisma
npm run db:seed          # Ejecutar seeders
npm run db:reset         # Resetear BD y reseed
npm run prisma:studio    # Abrir Prisma Studio

# Testing
npm test                 # Ejecutar tests
```

## Estructura de Carpetas

```
backend/
├── src/
│   ├── config/          # Configuración (DB, env, logger)
│   ├── controllers/     # Controladores de rutas
│   ├── middleware/      # Middleware (auth, validation, errors)
│   ├── routes/          # Definición de rutas
│   ├── services/        # Lógica de negocio
│   ├── utils/           # Utilidades
│   └── seeds/           # Datos iniciales
├── prisma/
│   └── schema.prisma    # Esquema de base de datos
├── docker-compose.yml   # Configuración Docker
└── package.json
```

## Variables de Entorno

```env
# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/streaming_db

# Redis (opcional)
REDIS_URL=redis://localhost:6379
REDIS_ENABLED=false

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:5173

# Analytics
ANALYTICS_ENABLED=true
```

## Docker

```bash
# Iniciar todos los servicios
docker-compose up -d

# Solo PostgreSQL
docker-compose up -d postgres

# Ver logs
docker-compose logs -f postgres

# Detener
docker-compose down

# Eliminar volúmenes
docker-compose down -v
```

## Licencia

MIT
