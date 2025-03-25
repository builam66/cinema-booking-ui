import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/app-layout';
import MovieGrid from './components/movie-grid';
import { mockMovies } from '@/testing/mock-data';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Card, CardContent } from '@/components/card';
import { Search, Filter, X, SlidersHorizontal, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 8;

  // Extract all genres from movies
  const allGenres = Array.from(
    new Set(mockMovies.flatMap(movie => movie.genre))
  ).sort();

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate loading when changing filters
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedGenre, currentPage]);

  // Filter movies based on search query and selected genre
  const filteredMovies = mockMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || movie.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const currentMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenre]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppLayout>
      <div className="pt-20 pb-16">
        {/* Hero Section */}
        <div className="bg-gray-50 border-b border-gray-100 py-12">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-medium mb-4">Explore Movies</h1>
              <p className="text-gray-600 mb-6">
                Discover the latest blockbusters and timeless classics in our movie collection.
              </p>

              {/* Search Input */}
              <div className="relative max-w-md mx-auto">
                <Input
                  type="text"
                  placeholder="Search for movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 text-base"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchQuery('')}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-8">
          {/* Filters */}
          <Card className="mb-8 shadow-sm border-0">
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center text-sm font-medium">
                  <SlidersHorizontal size={16} className="mr-2" />
                  <span>Filter Movies</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFiltersVisible(!filtersVisible)}
                  className="text-xs"
                >
                  {filtersVisible ? 'Hide' : 'Show'}
                </Button>
              </div>

              <AnimatePresence>
                {filtersVisible && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center mb-3">
                          <Tag size={14} className="mr-2 text-gray-500" />
                          <h3 className="text-sm font-medium">Genres</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant={selectedGenre === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedGenre('all')}
                            className="text-sm rounded-full"
                          >
                            All
                          </Button>

                          {allGenres.map((genre) => (
                            <Button
                              key={genre}
                              variant={selectedGenre === genre ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setSelectedGenre(genre)}
                              className="text-sm rounded-full"
                            >
                              {genre}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Results count */}
          <div className="mb-6 text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <span className="mb-2 sm:mb-0">
              {!isLoading
                ? `Showing ${Math.min(currentMovies.length, itemsPerPage)} of ${filteredMovies.length} movies`
                : 'Loading movies...'}
            </span>
            {filteredMovies.length > 0 && !isLoading && (
              <span>Page {currentPage} of {totalPages}</span>
            )}
          </div>

          {/* Movie Grid */}
          <MovieGrid
            movies={currentMovies}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />

          {/* No results message */}
          {filteredMovies.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">No movies found</p>
              <p className="text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              {searchQuery || selectedGenre !== 'all' ? (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedGenre('all');
                  }}
                >
                  Clear filters
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Movies;
