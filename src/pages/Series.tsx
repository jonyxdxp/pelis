import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContentCarousel } from '@/components/ContentCarousel';
import { MovieCard } from '@/components/MovieCard';
import api from '@/services/api';
import type { Series as SeriesType } from '@/data/database';

export function Series() {
  const [series, setSeries] = useState<(SeriesType & { genres: string[] })[]>([]);
  const [trending, setTrending] = useState<(SeriesType & { genres: string[] })[]>([]);
  const [featured, setFeatured] = useState<(SeriesType & { genres: string[] })[]>([]);
  const [topRated, setTopRated] = useState<(SeriesType & { genres: string[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const allSeries = api.getSeries();
      const trendingSeries = api.getTrendingSeries();
      const featuredSeries = api.getFeaturedSeries();
      const sortedByRating = [...allSeries].sort((a, b) => b.rating - a.rating).slice(0, 10);
      
      setSeries(allSeries);
      setTrending(trendingSeries);
      setFeatured(featuredSeries);
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
              src={series[0]?.backdrop_url || ''}
              alt="Series Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
          </div>
          <div className="relative h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <span className="text-purple-600 font-semibold mb-2">SERIES</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Series que enganchan
            </h1>
            <p className="text-gray-300 max-w-xl text-lg">
              Desde dramas épicos hasta comedias adictivas. 
              Descubre series que te mantendrán pegado a la pantalla.
            </p>
          </div>
        </div>

        {/* Carousels */}
        <div className="space-y-2 md:space-y-4">
          <ContentCarousel 
            title="Series destacadas" 
            items={featured} 
            variant="large"
          />
          
          <ContentCarousel 
            title="Tendencias" 
            items={trending} 
          />
          
          <ContentCarousel 
            title="Mejor valoradas" 
            items={topRated} 
            variant="large"
          />
        </div>

        {/* All Series Grid */}
        <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-white mb-6">Todas las series</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {series.map((s) => (
              <MovieCard key={s.id} content={s} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Series;
