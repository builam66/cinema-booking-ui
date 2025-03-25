import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '@/types';
import { Badge } from '@/components/badge';
import { Clock, Calendar } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
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
    <Link
      to={`/movies/${movie.id}`}
      className="group relative block overflow-hidden rounded-xl bg-white transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-black font-medium">
            {movie.rating.toFixed(1)}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg mb-1 line-clamp-1">{movie.title}</h3>

        <div className="flex flex-wrap gap-1 mb-2">
          {movie.genre.slice(0, 2).map((genre, index) => (
            <Badge key={index} variant="outline" className="text-xs font-normal">
              {genre}
            </Badge>
          ))}
          {movie.genre.length > 2 && (
            <Badge variant="outline" className="text-xs font-normal">
              +{movie.genre.length - 2}
            </Badge>
          )}
        </div>

        <div className="flex items-center text-sm text-gray-500 gap-3">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{formatDuration(movie.duration)}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(movie.releaseDate)}</span>
          </div>
        </div>
      </div>

      {/* Hidden Book button that appears on hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/80 text-white text-center py-3 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        Book Tickets
      </div>
    </Link>
  );
};

export default MovieCard;
