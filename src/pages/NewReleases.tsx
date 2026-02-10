import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MovieCard } from '@/components/MovieCard';
import { Calendar, Sparkles, TrendingUp } from 'lucide-react';
import api from '@/services/api';
import type { Movie, Series } from '@/data/database';

export function NewReleases() {
  const [newMovies, setNewMovies] = useState<(Movie & { genres: string[] })[]>([]);
  const [newSeries, setNewSeries] = useState<(Series & { genres: string[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const movies = api.getNewReleases();
      const series = api.getSeries()
        .sort((a, b) => b.release_year - a.release_year)
        .slice(0, 10);
      
      setNewMovies(movies);
      setNewSeries(series);
      setIsLoading(false);
    }, 500);
  }, []);

  const currentYear = new Date().getFullYear();
  const thisYearMovies = newMovies.filter(m => m.release_year === currentYear);
  const lastYearMovies = newMovies.filter(m => m.release_year === currentYear - 1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f]">
        <Navbar />
        <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
          <div className="h-10 w-48 bg-gray-800 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-gray-800 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />

      <main className="pt-20 pb-12">
        {/* Hero Section */}
        <div className="relative h-[35vh] md:h-[40vh] mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-purple-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
          <div className="relative h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <span className="text-yellow-500 font-semibold">NOVEDADES</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Estrenos recientes
            </h1>
            <p className="text-gray-300 max-w-xl text-lg">
              Los últimos lanzamientos de películas y series. 
              No te pierdas lo más nuevo del entretenimiento.
            </p>
          </div>
        </div>

        {/* This Year Section */}
        {thisYearMovies.length > 0 && (
          <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-5 h-5 text-red-600" />
              <h2 className="text-2xl font-bold text-white">Lanzamientos de {currentYear}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {thisYearMovies.map((movie) => (
                <MovieCard key={movie.id} content={movie} variant="large" />
              ))}
            </div>
          </section>
        )}

        {/* Last Year Section */}
        {lastYearMovies.length > 0 && (
          <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <h2 className="text-2xl font-bold text-white">Lanzamientos de {currentYear - 1}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {lastYearMovies.map((movie) => (
                <MovieCard key={movie.id} content={movie} />
              ))}
            </div>
          </section>
        )}

        {/* New Series Section */}
        <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="text-2xl font-bold text-white">Series recientes</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {newSeries.map((series) => (
              <MovieCard key={series.id} content={series} variant="large" />
            ))}
          </div>
        </section>

        {/* All New Movies */}
        <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">Todas las novedades</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {newMovies.map((movie) => (
              <MovieCard key={movie.id} content={movie} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default NewReleases;
