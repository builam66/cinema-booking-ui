import React, { useState, useEffect } from 'react';
import { Movie } from '@/types';
import { Button } from '@/components/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FeaturedMovie from './featured-movie';

interface MovieCarouselProps {
  movies: Movie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to navigate to the next slide
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Function to navigate to the previous slide
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex, movies.length]);

  if (movies.length === 0) return null;

  return (
    <div className="relative overflow-hidden">
      <div
        className="transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="flex">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="w-full flex-shrink-0"
              style={{ display: index === currentIndex ? 'block' : 'none' }}
            >
              <FeaturedMovie movie={movie} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm p-2 h-10 w-10 rounded-full"
        disabled={isAnimating}
      >
        <ChevronLeft size={20} />
      </Button>

      <Button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm p-2 h-10 w-10 rounded-full"
        disabled={isAnimating}
      >
        <ChevronRight size={20} />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setCurrentIndex(index);
              setTimeout(() => setIsAnimating(false), 500);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
