import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import type { Movie, Series } from '@/data/database';

interface MovieCardProps {
  content: (Movie | Series) & { genres: string[] };
  variant?: 'default' | 'large';
}

export function MovieCard({ content, variant = 'default' }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determinar si es película o serie (Movie tiene 'duration', Series tiene 'totalSeasons')
  const isMovie = 'duration' in content;
  const contentType = isMovie ? 'movie' : 'series';
  const duration = isMovie
    ? `${(content as Movie).duration} min`
    : `${(content as Series).totalSeasons} temp.`;

  const isLarge = variant === 'large';
  
  // Validar que el contenido tenga datos necesarios
  if (!content || !content.id) return null;

  return (
    <div
      className={`relative flex-shrink-0 ${isLarge ? 'w-[200px] md:w-[240px] lg:w-[280px]' : 'w-[140px] md:w-[180px] lg:w-[200px]'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/${contentType}/${content.id}`}>
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 group">
          {/* Poster Image */}
          {content.posterUrl && (
            <img
              src={content.posterUrl}
              alt={content.title || 'Unknown'}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              loading="lazy"
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hover Content */}
          <div className={`absolute inset-0 flex flex-col justify-end p-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            {/* Quick Actions */}
            <div className="flex items-center gap-2 mb-2">
              <Link
                to={`/watch/${contentType}/${content.id}`}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-white/90 transition-colors"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <Play className="w-4 h-4 text-black fill-black" />
              </Link>
              <button
                className="w-8 h-8 flex items-center justify-center border-2 border-white/70 rounded-full hover:border-white hover:bg-white/10 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
              <button
                className="w-8 h-8 flex items-center justify-center border-2 border-white/70 rounded-full hover:border-white hover:bg-white/10 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <ThumbsUp className="w-4 h-4 text-white" />
              </button>
              <button
                className="w-8 h-8 flex items-center justify-center border-2 border-white/70 rounded-full hover:border-white hover:bg-white/10 transition-colors ml-auto"
                onClick={(e) => e.preventDefault()}
              >
                <ChevronDown className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                {content.rating && (
                  <span className="text-green-400 font-semibold">{(content.rating).toFixed(1)}</span>
                )}
                {content.releaseYear && (
                  <span className="text-gray-300">{content.releaseYear}</span>
                )}
                <span className="text-gray-300">{duration}</span>
              </div>
              {content.genres && content.genres.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {content.genres.slice(0, 2).map((genre) => (
                    <span key={genre} className="text-[10px] text-gray-400">
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Type Badge */}
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${isMovie ? 'bg-blue-600' : 'bg-purple-600'} text-white`}>
              {isMovie ? 'PELÍCULA' : 'SERIE'}
            </span>
          </div>
        </div>
      </Link>

      {/* Title */}
      <Link to={`/${contentType}/${content.id}`}>
        <h3 className={`mt-2 text-sm font-medium text-gray-200 hover:text-white transition-colors line-clamp-1 ${isLarge ? 'md:text-base' : ''}`}>
          {content.title || 'Unknown'}
        </h3>
      </Link>
    </div>
  );
}

export default MovieCard;