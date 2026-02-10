import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, SlidersHorizontal, Star, Film, Tv } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MovieCard } from '@/components/MovieCard';
import api from '@/services/api';
import type { Movie, Series } from '@/data/database';
import { genres } from '@/data/database';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<((Movie | Series) & { genres: string[] })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('relevance');

  const performSearch = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const searchResults = api.search({
        query: query || undefined,
        genre: selectedGenre || undefined,
        year: selectedYear ? parseInt(selectedYear) : undefined,
        type: selectedType as 'movie' | 'series' || undefined,
        minRating: minRating > 0 ? minRating : undefined,
        sortBy: sortBy as 'rating' | 'newest' | 'oldest' || undefined,
      });
      
      setResults(searchResults);
      setIsLoading(false);
    }, 300);
  }, [query, selectedGenre, selectedYear, selectedType, minRating, sortBy]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
    performSearch();
  };

  const clearFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedType('');
    setMinRating(0);
    setSortBy('relevance');
  };

  const hasActiveFilters = selectedGenre || selectedYear || selectedType || minRating > 0 || sortBy !== 'relevance';

  // Generate year options (from current year down to 1970)
  const yearOptions = Array.from({ length: new Date().getFullYear() - 1969 }, (_, i) => 
    (new Date().getFullYear() - i).toString()
  );

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Type Filter */}
      <div>
        <label className="text-sm font-medium text-white mb-3 block">Tipo</label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 cursor-pointer transition-colors">
            <input
              type="radio"
              name="type"
              value=""
              checked={selectedType === ''}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-4 h-4 accent-red-600"
            />
            <span className="text-gray-300">Todos</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 cursor-pointer transition-colors">
            <input
              type="radio"
              name="type"
              value="movie"
              checked={selectedType === 'movie'}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-4 h-4 accent-red-600"
            />
            <Film className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">Películas</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 cursor-pointer transition-colors">
            <input
              type="radio"
              name="type"
              value="series"
              checked={selectedType === 'series'}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-4 h-4 accent-red-600"
            />
            <Tv className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300">Series</span>
          </label>
        </div>
      </div>

      {/* Genre Filter */}
      <div>
        <label className="text-sm font-medium text-white mb-3 block">Género</label>
        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Seleccionar género" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="">Todos los géneros</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={genre.name}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Year Filter */}
      <div>
        <label className="text-sm font-medium text-white mb-3 block">Año</label>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Seleccionar año" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 max-h-[200px]">
            <SelectItem value="">Todos los años</SelectItem>
            {yearOptions.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="text-sm font-medium text-white mb-3 block">
          Valoración mínima: {minRating > 0 ? `${minRating}+` : 'Cualquiera'}
        </label>
        <Slider
          value={[minRating]}
          onValueChange={(value) => setMinRating(value[0])}
          max={10}
          step={0.5}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="text-sm font-medium text-white mb-3 block">Ordenar por</label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="relevance">Relevancia</SelectItem>
            <SelectItem value="rating">Mejor valorados</SelectItem>
            <SelectItem value="newest">Más recientes</SelectItem>
            <SelectItem value="oldest">Más antiguos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
          onClick={clearFilters}
        >
          <X className="w-4 h-4 mr-2" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {query ? `Resultados para "${query}"` : 'Explorar contenido'}
            </h1>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar películas, series..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-6 bg-gray-800 border-gray-700 text-white text-lg placeholder:text-gray-500 focus:border-red-600"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </form>

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="lg:hidden border-gray-600 text-white hover:bg-gray-800"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filtros
                    {hasActiveFilters && (
                      <span className="ml-2 w-5 h-5 bg-red-600 rounded-full text-xs flex items-center justify-center">
                        !
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-[#0f0f0f] border-gray-800 w-[320px]">
                  <SheetHeader>
                    <SheetTitle className="text-white">Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop Filter Toggle */}
              <Button
                variant="outline"
                className="hidden lg:flex border-gray-600 text-white hover:bg-gray-800"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
              </Button>

              {/* Active Filter Badges */}
              {selectedType && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {selectedType === 'movie' ? 'Películas' : 'Series'}
                  <button onClick={() => setSelectedType('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedGenre && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {selectedGenre}
                  <button onClick={() => setSelectedGenre('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedYear && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {selectedYear}
                  <button onClick={() => setSelectedYear('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  <Star className="w-3 h-3" />
                  {minRating}+
                  <button onClick={() => setMinRating(0)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            {showFilters && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <h2 className="text-lg font-semibold text-white mb-4">Filtros</h2>
                  <FilterContent />
                </div>
              </aside>
            )}

            {/* Results Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : results.length > 0 ? (
                <>
                  <p className="text-gray-400 mb-4">
                    {results.length} {results.length === 1 ? 'resultado' : 'resultados'} encontrados
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {results.map((item) => (
                      <MovieCard key={`${item.type}-${item.id}`} content={item} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-800 rounded-full">
                    <Search className="w-10 h-10 text-gray-500" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    No se encontraron resultados
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Intenta con otros términos de búsqueda o ajusta los filtros
                  </p>
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-gray-800"
                      onClick={clearFilters}
                    >
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SearchPage;
