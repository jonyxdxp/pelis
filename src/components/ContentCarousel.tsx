import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MovieCard } from './MovieCard';
import type { Movie, Series } from '@/data/database';

interface ContentCarouselProps {
  title: string;
  items: ((Movie | Series) & { genres: string[] })[];
  variant?: 'default' | 'large';
}

export function ContentCarousel({ title, items, variant = 'default' }: ContentCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollButtons);
      return () => scrollElement.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  useEffect(() => {
    checkScrollButtons();
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = variant === 'large' ? 600 : 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <section 
      className="relative py-4 md:py-6"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white">
            {title}
          </h2>
          <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
            Ver todo
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-0 bottom-0 z-10 w-12 md:w-16 flex items-center justify-center bg-gradient-to-r from-[#0f0f0f] to-transparent transition-opacity duration-300 ${
              canScrollLeft && isHovering ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Desplazar izquierda"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-colors">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-0 bottom-0 z-10 w-12 md:w-16 flex items-center justify-center bg-gradient-to-l from-[#0f0f0f] to-transparent transition-opacity duration-300 ${
              canScrollRight && isHovering ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Desplazar derecha"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-colors">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </button>

          {/* Scrollable Content */}
          <div
            ref={scrollRef}
            className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {items.map((item) => (
              <MovieCard key={`${item.type}-${item.id}`} content={item} variant={variant} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default ContentCarousel;
