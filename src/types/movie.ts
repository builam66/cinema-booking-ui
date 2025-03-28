export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  bannerUrl: string;
  releaseDate: string;
  duration: number; // in minutes
  genre: string[];
  director: string;
  cast: string[];
  synopsis: string;
  rating: number; // out of 10
  trailerUrl?: string;
}
