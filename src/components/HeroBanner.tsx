import { useState, useEffect, useCallback } from 'react';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import api from '@/services/api';
import type { Movie, Series } from '@/data/database';

interface HeroBannerProps {
  autoPlayInterval?: number;
}

export function HeroBanner({ autoPlayInterval = 8000 }: HeroBannerProps) {
  const [featuredContent, setFeaturedContent] = useState<((Movie | Series) & { genres: string[] })[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const content = api.getFeaturedContent();
    setFeaturedContent(content);
  }, []);

  const goToNext = useCallback(() => {
    if (featuredContent.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
      setIsTransitioning(false);
    }, 300);
  }, [featuredContent.length]);

  const goToPrev = useCallback(() => {
    if (featuredContent.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + featuredContent.length) % featuredContent.length);
      setIsTransitioning(false);
    }, 300);
  }, [featuredContent.length]);

  // Auto-play
  useEffect(() => {
    if (featuredContent.length <= 1) return;
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [goToNext, autoPlayInterval, featuredContent.length]);

  if (featuredContent.length === 0) return null;

  const currentContent = featuredContent[currentIndex];
  const isMovie = currentContent.type === 'movie';
  const duration = isMovie 
    ? `${(currentContent as Movie).duration} min` 
    : `${(currentContent as Series).total_seasons} temporadas`;
  const directorOrCreator = isMovie 
    ? (currentContent as Movie).director 
    : (currentContent as Series).creator;

  return (
    <div className="relative w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] overflow-hidden">
      {/* Background Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <img
          src={currentContent.backdrop_url}
          alt={currentContent.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-[#0f0f0f]/30" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-2xl pt-16">
          <div
            className={`transition-all duration-500 ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Badges */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 text-xs font-semibold bg-red-600 text-white rounded">
                {isMovie ? 'PELÍCULA' : 'SERIE'}
              </span>
              {currentContent.featured && (
                <span className="px-2 py-1 text-xs font-semibold bg-white/20 text-white rounded backdrop-blur-sm">
                  DESTACADO
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {currentContent.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 text-sm text-gray-300">
              <span className="text-green-400 font-semibold">
                {currentContent.rating.toFixed(1)} de valoración
              </span>
              <span className="w-1 h-1 bg-gray-500 rounded-full" />
              <span>{currentContent.release_year}</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full" />
              <span>{duration}</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full hidden sm:inline" />
              <span className="hidden sm:inline text-gray-400">
                {directorOrCreator}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-4">
              {currentContent.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 text-xs bg-white/10 text-gray-300 rounded-full backdrop-blur-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-300 mb-6 line-clamp-3 max-w-xl">
              {currentContent.description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={`/watch/${currentContent.type}/${currentContent.id}`}
              >
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 font-semibold gap-2"
                >
                  <Play className="w-5 h-5 fill-black" />
                  Reproducir
                </Button>
              </Link>
              <Link
                to={`/${currentContent.type}/${currentContent.id}`}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm gap-2"
                >
                  <Info className="w-5 h-5" />
                  Más información
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {featuredContent.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {featuredContent.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {featuredContent.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  }, 300);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-6 bg-white'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroBanner;
