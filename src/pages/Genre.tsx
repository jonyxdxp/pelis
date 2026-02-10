import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MovieCard } from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Film } from 'lucide-react';
import api from '@/services/api';
import { genres, type Movie, type Series } from '@/data/database';

export function Genre() {
  const { genreName } = useParams<{ genreName: string }>();
  const [movies, setMovies] = useState<(Movie & { genres: string[] })[]>([]);
  const [series, setSeries] = useState<(Series & { genres: string[] })[]>([]);
  const [genreInfo, setGenreInfo] = useState<typeof genres[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'movies' | 'series'>('all');

  useEffect(() => {
    if (!genreName) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const decodedGenre = decodeURIComponent(genreName);
      const foundGenre = genres.find(g => 
        g.name.toLowerCase() === decodedGenre.toLowerCase()
      );
      
      if (foundGenre) {
        setGenreInfo(foundGenre);
        const genreMovies = api.getMoviesByGenre(foundGenre.name);
        const genreSeries = api.getSeriesByGenre(foundGenre.name);
        setMovies(genreMovies);
        setSeries(genreSeries);
      }
      
      setIsLoading(false);
    }, 300);
  }, [genreName]);

  const allContent = [...movies, ...series];
  const displayContent = activeTab === 'all' 
    ? allContent 
    : activeTab === 'movies' 
      ? movies 
      : series;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f]">
        <Navbar />
        <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
          <div className="h-10 w-48 bg-gray-800 rounded animate-pulse mb-4" />
          <div className="h-4 w-96 bg-gray-800 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-gray-800 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!genreInfo) {
    return (
      <div className="min-h-screen bg-[#0f0f0f]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold text-white mb-4">Género no encontrado</h1>
          <p className="text-gray-400 mb-6">El género que buscas no existe.</p>
          <Link to="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />

      <main className="pt-20 pb-12">
        {/* Header */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{genreInfo.name}</h1>
          </div>
          <p className="text-gray-400 max-w-2xl">{genreInfo.description}</p>
          
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span>{movies.length} películas</span>
            <span>•</span>
            <span>{series.length} series</span>
            <span>•</span>
            <span>{allContent.length} títulos en total</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center gap-2 border-b border-gray-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'all' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Todo
              {activeTab === 'all' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('movies')}
              className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'movies' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Películas
              {activeTab === 'movies' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('series')}
              className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'series' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Series
              {activeTab === 'series' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
              )}
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          {displayContent.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {displayContent.map((item) => (
                <MovieCard key={`${item.type}-${item.id}`} content={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400">No hay contenido disponible en esta categoría.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Genre;
