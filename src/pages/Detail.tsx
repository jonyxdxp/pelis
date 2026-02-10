import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, Plus, ThumbsUp, Share2, ChevronLeft, Star, Clock, Calendar, Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContentCarousel } from '@/components/ContentCarousel';
import api from '@/services/api';
import type { Movie, Series, Episode } from '@/data/database';

export function Detail() {
  const { type, id } = useParams<{ type: 'movie' | 'series'; id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<((Movie | Series) & { genres: string[] }) | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [seasons, setSeasons] = useState<number[]>([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [similarContent, setSimilarContent] = useState<((Movie | Series) & { genres: string[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!type || !id) {
      navigate('/');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const contentId = parseInt(id);
      const foundContent = api.getContentById(type, contentId);
      
      if (foundContent) {
        setContent(foundContent);
        
        // Get similar content
        const similar = api.getSimilarContent(type, contentId, 6);
        setSimilarContent(similar);
        
        // If series, get episodes and seasons
        if (type === 'series') {
          const allSeasons = api.getAllSeasons(contentId);
          setSeasons(allSeasons);
          if (allSeasons.length > 0) {
            setSelectedSeason(allSeasons[0]);
            const seasonEpisodes = api.getEpisodes(contentId, allSeasons[0]);
            setEpisodes(seasonEpisodes);
          }
        }
      }
      
      setIsLoading(false);
    }, 300);
  }, [type, id, navigate]);

  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
    if (content && type === 'series') {
      const seasonEpisodes = api.getEpisodes(content.id, season);
      setEpisodes(seasonEpisodes);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f]">
        <Navbar />
        <div className="h-[50vh] bg-gray-800 animate-pulse" />
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-8 w-64 bg-gray-800 rounded animate-pulse mb-4" />
          <div className="h-4 w-full max-w-2xl bg-gray-800 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-[#0f0f0f]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold text-white mb-4">Contenido no encontrado</h1>
          <p className="text-gray-400 mb-6">El contenido que buscas no existe o ha sido eliminado.</p>
          <Link to="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isMovie = content.type === 'movie';
  const duration = isMovie 
    ? `${(content as Movie).duration} min` 
    : `${(content as Series).total_seasons} temporadas`;
  const directorOrCreator = isMovie 
    ? (content as Movie).director 
    : (content as Series).creator;

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />

      <main>
        {/* Hero Section */}
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src={content.backdrop_url}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-end h-full pb-8 md:pb-12">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="absolute top-20 left-4 sm:left-6 lg:left-8 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <div className="max-w-3xl">
                {/* Type Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded ${isMovie ? 'bg-blue-600' : 'bg-purple-600'} text-white`}>
                    {isMovie ? 'PELÍCULA' : 'SERIE'}
                  </span>
                  {content.featured && (
                    <span className="px-3 py-1 text-xs font-semibold bg-red-600 text-white rounded">
                      DESTACADO
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {content.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 text-sm">
                  <span className="flex items-center gap-1 text-green-400 font-semibold">
                    <Star className="w-4 h-4 fill-green-400" />
                    {content.rating.toFixed(1)}
                  </span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full" />
                  <span className="text-gray-300">{content.release_year}</span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full" />
                  <span className="flex items-center gap-1 text-gray-300">
                    <Clock className="w-4 h-4" />
                    {duration}
                  </span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full hidden sm:inline" />
                  <span className="hidden sm:flex items-center gap-1 text-gray-300">
                    <Globe className="w-4 h-4" />
                    {content.country}
                  </span>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {content.genres.map((genre) => (
                    <Link
                      key={genre}
                      to={`/genre/${genre.toLowerCase()}`}
                      className="px-3 py-1 text-sm bg-white/10 text-gray-300 rounded-full hover:bg-white/20 transition-colors"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link to={`/watch/${type}/${content.id}`}>
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-white/90 font-semibold gap-2"
                    >
                      <Play className="w-5 h-5 fill-black" />
                      {isMovie ? 'Reproducir' : 'Ver temporada 1'}
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-white/10 gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Mi lista
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-white/10"
                  >
                    <ThumbsUp className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-white/10"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Left Column - Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Sinopsis</h2>
                <p className="text-gray-300 leading-relaxed">
                  {content.description}
                </p>
              </section>

              {/* Episodes (for series) */}
              {!isMovie && seasons.length > 0 && (
                <section>
                  <Tabs value={selectedSeason.toString()} onValueChange={(v) => handleSeasonChange(parseInt(v))}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-white">Episodios</h2>
                      <TabsList className="bg-gray-800">
                        {seasons.map((season) => (
                          <TabsTrigger
                            key={season}
                            value={season.toString()}
                            className="data-[state=active]:bg-gray-700"
                          >
                            Temp. {season}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                    
                    {seasons.map((season) => (
                      <TabsContent key={season} value={season.toString()} className="mt-0">
                        <div className="space-y-3">
                          {episodes.map((episode) => (
                            <Link
                              key={episode.id}
                              to={`/watch/series/${content.id}?season=${season}&episode=${episode.episode_number}`}
                              className="flex gap-4 p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group"
                            >
                              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-gray-700 rounded group-hover:bg-gray-600 transition-colors">
                                <span className="text-lg font-semibold text-gray-400 group-hover:text-white">
                                  {episode.episode_number}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h3 className="text-white font-medium truncate">
                                    {episode.title}
                                  </h3>
                                  <span className="text-sm text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {episode.duration} min
                                  </span>
                                </div>
                                <p className="text-sm text-gray-400 line-clamp-2">
                                  {episode.description}
                                </p>
                              </div>
                              <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full">
                                  <Play className="w-4 h-4 text-black fill-black" />
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </section>
              )}

              {/* Cast */}
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Reparto</h2>
                <div className="flex flex-wrap gap-3">
                  {content.cast.slice(0, 6).map((actor) => (
                    <div
                      key={actor}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full"
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <span className="text-sm text-gray-300">{actor}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div className="p-6 bg-gray-800/50 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Detalles</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500 mb-1">
                      {isMovie ? 'Director' : 'Creador'}
                    </dt>
                    <dd className="text-white">{directorOrCreator}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 mb-1">Géneros</dt>
                    <dd className="text-white">{content.genres.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 mb-1">Año</dt>
                    <dd className="text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {content.release_year}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 mb-1">País</dt>
                    <dd className="text-white flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      {content.country}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 mb-1">Idioma</dt>
                    <dd className="text-white">{content.language}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 mb-1">Valoración</dt>
                    <dd className="text-white flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {content.rating.toFixed(1)}/10
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Content */}
        {similarContent.length > 0 && (
          <div className="pb-8">
            <ContentCarousel
              title="Títulos similares"
              items={similarContent}
              variant="large"
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Detail;
