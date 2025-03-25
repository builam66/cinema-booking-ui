import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '@/types';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Clock, Calendar, Star } from 'lucide-react';

interface FeaturedMovieProps {
  movie: Movie;
}

const FeaturedMovie: React.FC<FeaturedMovieProps> = ({ movie }) => {
  // Format release date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format duration to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="relative overflow-hidden rounded-0 shadow-subtle-lg">
      {/* Background image with gradient overlay */}
      <div className="relative h-[500px] md:h-[600px] w-full">
        <img
          src={movie.bannerUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:gap-8">
            {/* Movie poster */}
            <div className="hidden md:block relative w-48 h-72 shrink-0 rounded-lg overflow-hidden shadow-lg">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Movie details */}
            <div className="flex-1 text-white">
              <div className="mb-2 flex items-center space-x-3">
                <Badge className="bg-primary/90 hover:bg-primary border-none text-sm py-1">FEATURED</Badge>

                {/* Rating badge */}
                <div className="flex items-center">
                  <Badge variant="secondary" className="bg-white/90 text-black font-medium">
                    <Star size={10} className="text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{movie.rating.toFixed(1)}</span>
                  </Badge>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 text-white">
                {movie.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genre.map((genre, index) => (
                  <Badge key={index} variant="secondary" className="bg-black/30 text-white backdrop-blur-sm border-none">
                    {genre}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-200 mb-5">
                <div className="flex items-center">
                  <Clock size={14} className="mr-1.5" color="gray" />
                  <span className="text-gray-300">{formatDuration(movie.duration)}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1.5" color="gray" />
                  <span className="text-gray-300">{formatDate(movie.releaseDate)}</span>
                </div>
              </div>

              <p className="mb-6 text-gray-300 line-clamp-2 md:line-clamp-3">
                {movie.synopsis}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary hover:bg-primary/90 text-white button-hover" size="lg">
                  Book Tickets
                </Button>
                <Link to={`/movies/${movie.id}`}>
                  <Button variant="outline" className="border-white/30 bg-black/30 text-white backdrop-blur-sm hover:bg-white/10 button-hover" size="lg">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;
