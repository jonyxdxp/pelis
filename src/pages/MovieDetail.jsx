import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, type Movie, type VidlinkResponse } from '@/services/api';
import VidlinkPlayer from '@/components/VidlinkPlayer';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [player, setPlayer] = useState<VidlinkResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const movieData = await api.getMovieById(id);
        setMovie(movieData);
        
        // Track view
        await api.trackView(id, 'movie');
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Error cargando la película');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error || !movie) return <div>{error || 'Película no encontrada'}</div>;

  return (
    <div className="movie-detail">
      <div className="movie-header">
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        <div className="meta">
          <span>⭐ {movie.rating.toFixed(1)}</span>
          <span>📅 {movie.releaseYear}</span>
          <span>⏱️ {movie.duration}min</span>
        </div>
      </div>

      <div className="player-section">
        <h2>Ver ahora</h2>
        {movie.tmdbId ? (
          <VidlinkPlayer contentId={movie.id} type="movie" />
        ) : (
          <div>Este contenido no está disponible para reproducir</div>
        )}
      </div>
    </div>
  );
}