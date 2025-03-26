import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/stores';
import { fetchMovieById } from '@/stores/slices/movie-slice';
import { ArrowLeft, Clock, CalendarDays, Star, Film, Users } from 'lucide-react';
import { AspectRatio } from '@/components/aspect-ratio';
import { Button } from '@/components/button';
import { Separator } from '@/components/separator';
import { Badge } from '@/components/badge';
import { Skeleton } from '@/components/skeleton';
import AppLayout from '@/components/layout/app-layout';
import ShowtimeSelector from './components/showtime-selector';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentMovie, isLoading, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [id, dispatch]);

  // Convert minutes to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Render loading skeleton
  const renderSkeleton = () => (
    <div className="animate-pulse space-y-8">
      <div className="flex items-center">
        <Skeleton className="h-6 w-24 mr-2" />
        <Skeleton className="h-6 w-40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Skeleton className="h-[450px] w-full rounded-xl" />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-10 w-3/4" />

          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>

          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>

          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />

          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );

  // If movie not found
  if (!isLoading && !currentMovie) {
    return (
      <AppLayout>
        <div className="container max-w-7xl mx-auto px-4 py-16">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
            <p className="text-gray-500 mb-6">The movie you're looking for doesn't exist or has been removed.</p>
            <Link to="/movies">
              <Button>Browse Movies</Button>
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          renderSkeleton()
        ) : (
          <>
            <Link to="/movies" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft size={16} className="mr-1" />
              Back to movies
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Movie Poster */}
              <div className="lg:col-span-1">
                <AspectRatio ratio={2/3} className="bg-muted overflow-hidden rounded-xl">
                  <img
                    src={currentMovie?.posterUrl}
                    alt={currentMovie?.title}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>

              {/* Movie Details */}
              <div className="lg:col-span-2 space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold">{currentMovie?.title}</h1>

                <div className="flex flex-wrap gap-2">
                  {currentMovie?.genre.map(genre => (
                    <Badge key={genre} variant="secondary">{genre}</Badge>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>{currentMovie?.rating}/10</span>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{formatDuration(currentMovie?.duration || 0)}</span>
                  </div>

                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{new Date(currentMovie?.releaseDate || '').getFullYear()}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">{currentMovie?.synopsis}</p>

                <div className="space-y-4">
                  <div className="flex gap-6">
                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">Director</span>
                      <span className="font-medium">{currentMovie?.director}</span>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">Cast</span>
                      <span className="font-medium">{currentMovie?.cast.slice(0, 3).join(', ')}</span>
                    </div>
                  </div>
                </div>

                {currentMovie?.trailerUrl && (
                  <Button className="flex items-center gap-2">
                    <Film className="h-4 w-4" />
                    Watch Trailer
                  </Button>
                )}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Showtimes section */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Showtimes</h2>

              {id && <ShowtimeSelector movieId={id} />}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default MovieDetails;
