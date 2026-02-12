# API Examples - Streaming Backend

## Base URL
```
http://localhost:3000/api/v1
```

---

## Películas

### Listar todas las películas
```bash
curl http://localhost:3000/api/v1/movies
```

**Response:**
```json
{
  "success": true,
  "data": {
    "movies": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 8,
      "pages": 1
    }
  },
  "timestamp": "2025-02-10T15:30:00Z"
}
```

### Filtrar películas
```bash
# Por género y rating mínimo
curl "http://localhost:3000/api/v1/movies?genres=Sci-Fi,Action&rating_min=8"

# Por año y ordenado por rating
curl "http://localhost:3000/api/v1/movies?year_from=2010&sort=rating&order=desc"

# Búsqueda por texto
curl "http://localhost:3000/api/v1/movies?search=matrix"

# Paginación
curl "http://localhost:3000/api/v1/movies?page=2&limit=10"
```

### Obtener película por slug
```bash
curl http://localhost:3000/api/v1/movies/the-matrix
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "The Matrix",
    "slug": "the-matrix",
    "description": "...",
    "genres": ["Sci-Fi", "Action"],
    "releaseYear": 1999,
    "director": "Lana Wachowski, Lilly Wachowski",
    "cast": [...],
    "rating": 8.7,
    "duration": 136,
    "posterUrl": "...",
    "backdropUrl": "...",
    "videoUrl": "...",
    "videoType": "mp4"
  },
  "timestamp": "2025-02-10T15:30:00Z"
}
```

### Películas trending
```bash
curl http://localhost:3000/api/v1/movies/trending?limit=10
```

### Nuevos lanzamientos
```bash
curl http://localhost:3000/api/v1/movies/new?limit=10
```

### Mejor valoradas
```bash
curl http://localhost:3000/api/v1/movies/rated?limit=10&min_votes=1000
```

---

## Series

### Listar todas las series
```bash
curl http://localhost:3000/api/v1/series
```

### Filtrar series
```bash
# Por estado
curl "http://localhost:3000/api/v1/series?status=ended"

# Por género
curl "http://localhost:3000/api/v1/series?genres=Drama,Crime"
```

### Obtener serie por slug
```bash
curl http://localhost:3000/api/v1/series/breaking-bad
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Breaking Bad",
    "slug": "breaking-bad",
    "description": "...",
    "genres": ["Crime", "Drama", "Thriller"],
    "creator": "Vince Gilligan",
    "cast": [...],
    "totalSeasons": 5,
    "totalEpisodes": 62,
    "seasons": [...],
    "status": "ended"
  },
  "timestamp": "2025-02-10T15:30:00Z"
}
```

### Obtener episodios de una temporada
```bash
curl http://localhost:3000/api/v1/series/breaking-bad/seasons/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "series": { ... },
    "season": {
      "seasonNumber": 1,
      "episodeCount": 7,
      "airDate": "2008-01-20T00:00:00.000Z"
    },
    "episodes": [
      {
        "id": "uuid",
        "episodeNumber": 1,
        "title": "Pilot",
        "slug": "breaking-bad-s01e01-pilot",
        "description": "...",
        "duration": 58,
        "videoUrl": "...",
        "videoType": "mp4"
      }
    ]
  },
  "timestamp": "2025-02-10T15:30:00Z"
}
```

---

## Búsqueda

### Búsqueda global
```bash
curl "http://localhost:3000/api/v1/search?q=matrix"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "movies": [...],
    "series": [...],
    "total": 5
  },
  "timestamp": "2025-02-10T15:30:00Z"
}
```

### Autocomplete / Sugerencias
```bash
curl "http://localhost:3000/api/v1/search/suggestions?q=the&limit=5"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "suggestions": [
      { "text": "The Matrix", "type": "movie", "slug": "the-matrix" },
      { "text": "The Dark Knight", "type": "movie", "slug": "the-dark-knight" },
      { "text": "The Mandalorian", "type": "series", "slug": "the-mandalorian" }
    ]
  },
  "timestamp": "2025-02-10T15:30:00Z"
}
```

### Búsqueda avanzada
```bash
curl "http://localhost:3000/api/v1/search/advanced?q=action&genres=Sci-Fi&rating_min=8&sort_by=rating&limit=10"
```

---

## Géneros

### Listar todos los géneros
```bash
curl http://localhost:3000/api/v1/genres
```

**Response:**
```json
{
  "success": true,
  "data": {
    "genres": [
      {
        "id": "uuid",
        "name": "Action",
        "slug": "action",
        "description": "...",
        "color": "#FF4444",
        "movieCount": 15,
        "seriesCount": 8
      }
    ]
  },
  "timestamp": "2025-02-10T15:30:00Z"
}
```

### Obtener contenido por género
```bash
curl http://localhost:3000/api/v1/genres/sci-fi
```

### Películas por género
```bash
curl "http://localhost:3000/api/v1/genres/action/movies?page=1&limit=20"
```

### Series por género
```bash
curl "http://localhost:3000/api/v1/genres/drama/series?page=1&limit=20"
```

---

## Home

### Página de inicio completa
```bash
curl http://localhost:3000/api/v1/home
```

**Response:**
```json
{
  "success": true,
  "data": {
    "hero": {
      "title": "Featured Content",
      "items": [...]
    },
    "carousels": [
      {
        "title": "Lo más popular",
        "slug": "trending",
        "items": [...]
      },
      {
        "title": "Estrenos",
        "slug": "new-releases",
        "items": [...]
      }
    ]
  },
  "timestamp": "2025-02-10T15:30:00Z"
}
```

### Solo hero banner
```bash
curl http://localhost:3000/api/v1/hero
```

### Solo carruseles
```bash
curl http://localhost:3000/api/v1/carousels
```

---

## Recomendaciones

### Recomendaciones para contenido
```bash
curl "http://localhost:3000/api/v1/content/uuid/recommendations?type=movie&limit=10"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "id": "uuid",
        "title": "The Matrix Reloaded",
        "reason": "same_director",
        "score": 0.9,
        "contentType": "movie"
      }
    ]
  },
  "timestamp": "2025-02-10T15:30:00Z"
}
```

### Contenido trending
```bash
curl http://localhost:3000/api/v1/trending?limit=20
```

---

## Analytics

### Registrar visualización
```bash
curl -X POST http://localhost:3000/api/v1/analytics/view \
  -H "Content-Type: application/json" \
  -d '{
    "contentId": "uuid",
    "contentType": "movie",
    "deviceType": "web"
  }'
```

### Estadísticas de contenido
```bash
curl "http://localhost:3000/api/v1/analytics/content/uuid/stats?type=movie&days=30"
```

### Contenido popular
```bash
curl "http://localhost:3000/api/v1/analytics/popular?type=all&limit=20&days=30"
```

### Dashboard stats
```bash
curl http://localhost:3000/api/v1/analytics/dashboard
```

**Response:**
```json
{
  "success": true,
  "data": {
    "content": {
      "movies": 8,
      "series": 5,
      "episodes": 3,
      "total": 13
    },
    "views": {
      "total": 1250,
      "last24Hours": 45
    }
  },
  "timestamp": "2025-02-10T15:30:00Z"
}
```

---

## Health Check

```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-02-10T15:30:00Z",
  "version": "1.0.0"
}
```

---

## Códigos de Error

| Código | HTTP | Descripción |
|--------|------|-------------|
| MOVIE_NOT_FOUND | 404 | Película no encontrada |
| SERIES_NOT_FOUND | 404 | Serie no encontrada |
| GENRE_NOT_FOUND | 404 | Género no encontrado |
| VALIDATION_ERROR | 400 | Error de validación |
| RATE_LIMIT_EXCEEDED | 429 | Límite de peticiones excedido |
| INTERNAL_SERVER_ERROR | 500 | Error interno del servidor |

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "MOVIE_NOT_FOUND",
    "message": "Movie with slug 'invalid-slug' not found"
  },
  "timestamp": "2025-02-10T15:30:00Z"
}
```
