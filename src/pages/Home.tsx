import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { ContentCarousel } from '@/components/ContentCarousel';
import { Footer } from '@/components/Footer';
import api from '@/services/api';
import type { Movie, Series } from '@/data/database';

export function Home() {
  const [trendingMovies, setTrendingMovies] = useState<((Movie | Series) & { genres: string[] })[]>([]);
  const [newReleases, setNewReleases] = useState<((Movie | Series) & { genres: string[] })[]>([]);
  const [popularMovies, setPopularMovies] = useState<((Movie | Series) & { genres: string[] })[]>([]);
  const [popularSeries, setPopularSeries] = useState<((Movie | Series) & { genres: string[] })[]>([]);
  const [topRated, setTopRated] = useState<((Movie | Series) & { genres: string[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const loadData = async () => {
    try {
      setIsLoading(true);
      
      // Esperar a que se resuelvan las Promises
      const trending = await api.getTrendingMovies();
      const newMovies = await api.getNewReleases();
      const allMovies = await api.getMovies();
      const allSeries = await api.getSeries();
      
      // Ahora sí son arrays, puedes hacer spread
      const allContent = [...(allMovies || []), ...(allSeries || [])];
      const sortedByRating = allContent
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 10);
      
      // Asignar datos
      setTrendingMovies(trending || []);
      setNewReleases(newMovies || []);
      setPopularMovies((allMovies || []).slice(0, 10));
      setPopularSeries((allSeries || []).slice(0, 10));
      setTopRated(sortedByRating);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setIsLoading(false);
    }
  };
  
  loadData();
}, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f]">
        <Navbar />
        <div className="h-[60vh] bg-gray-800 animate-pulse" />
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-8 w-48 bg-gray-800 rounded animate-pulse mb-4" />
          <div className="flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-[200px] h-[300px] bg-gray-800 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <HeroBanner autoPlayInterval={8000} />

        {/* Content Carousels */}
        <div className="space-y-2 md:space-y-4 pb-8">
          <ContentCarousel 
            title="Lo más popular" 
            items={popularMovies} 
          />
          
          <ContentCarousel 
            title="Estrenos" 
            items={newReleases} 
          />
          
          <ContentCarousel 
            title="Tendencias" 
            items={trendingMovies} 
          />
          
          <ContentCarousel 
            title="Series populares" 
            items={popularSeries} 
            variant="large"
          />
          
          <ContentCarousel 
            title="Mejor valorados" 
            items={topRated} 
            variant="large"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
