import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MovieCard } from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { Heart, Film, ArrowRight } from 'lucide-react';
import api from '@/services/api';
import type { Movie, Series } from '@/data/database';

export function MyList() {
  const [myList, setMyList] = useState<((Movie | Series) & { genres: string[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading from local storage or API
    setTimeout(() => {
      // For demo purposes, show some featured content as "my list"
      const featured = api.getFeaturedContent().slice(0, 6);
      setMyList(featured);
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
            {[...Array(5)].map((_, i) => (
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

      <main className="pt-24 pb-12">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Mi Lista</h1>
          </div>
          <p className="text-gray-400 mb-8">
            Tu colección personal de películas y series guardadas.
          </p>

          {myList.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {myList.map((item) => (
                <MovieCard key={`${item.type}-${item.id}`} content={item} variant="large" />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-800 rounded-full">
                <Heart className="w-10 h-10 text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Tu lista está vacía
              </h2>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Agrega películas y series a tu lista para verlas más tarde. 
                Haz clic en el botón "+" en cualquier título.
              </p>
              <Link to="/">
                <Button className="bg-red-600 hover:bg-red-700">
                  <Film className="w-4 h-4 mr-2" />
                  Explorar contenido
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyList;
