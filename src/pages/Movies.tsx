import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContentCarousel } from '@/components/ContentCarousel';
import { MovieCard } from '@/components/MovieCard';
import api from '@/services/api';
import type { Movie } from '@/data/database';

export function Movies() {
  const [movies, setMovies] = useState<(Movie & { genres: string[] })[]>([]);
  const [trending, setTrending] = useState<(Movie & { genres: string[] })[]>([]);
  const [newReleases, setNewReleases] = useState<(Movie & { genres: string[] })[]>([]);
  const [topRated, setTopRated] = useState<(Movie & { genres: string[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const allMovies = api.getMovies();
      const trendingMovies = api.getTrendingMovies();
      const newMovies = api.getNewReleases();
      const sortedByRating = [...allMovies].sort((a, b) => b.rating - a.rating).slice(0, 10);
      
      setMovies(allMovies);
      setTrending(trendingMovies);
      setNewReleases(newMovies);
      setTopRated(sortedByRating);
      setIsLoading(false);
    }, 500);
  }, []);

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
        <div className="relative h-[40vh] md:h-[50vh] mb-8">
          <div className="absolute inset-0">
            <img
              src={movies[0]?.backdrop_url || ''}
              alt="Movies Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
          </div>
          <div className="relative h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <span className="text-red-600 font-semibold mb-2">PELÍCULAS</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Descubre el mejor cine
            </h1>
            <p className="text-gray-300 max-w-xl text-lg">
              Desde clásicos atemporales hasta los últimos estrenos. 
              Explora nuestra colección de películas premiadas.
            </p>
          </div>
        </div>

        {/* Carousels */}
        <div className="space-y-2 md:space-y-4">
          <ContentCarousel 
            title="Tendencias" 
            items={trending} 
          />
          
          <ContentCarousel 
            title="Nuevos lanzamientos" 
            items={newReleases} 
            variant="large"
          />
          
          <ContentCarousel 
            title="Mejor valorados" 
            items={topRated} 
            variant="large"
          />
        </div>

        {/* All Movies Grid */}
        <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-white mb-6">Todas las películas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} content={movie} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Movies;
