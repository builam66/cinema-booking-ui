import axios from './axios';
import { Movie } from '@/types';
import {
  getMovies as getMockMovies,
  searchMovies as searchMockMovies,
  getMovieById as getMockMovieById,
} from '@/testing/mock-data';

// Mock API responses for development
const MOCK_MODE = true;
const MOCK_DELAY = 800;

// Mock implementations
const mockGetMovies = (): Promise<Movie[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const movies = getMockMovies();
      if (movies) {
        resolve(movies);
      } else {
        reject(new Error('Movies not found'));
      }
    }, MOCK_DELAY);
  });
};

const mockSearchMovies = (query: string): Promise<Movie[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const movies = searchMockMovies(query);
      if (movies) {
        resolve(movies);
      } else {
        reject(new Error('Movies not found'));
      }
    }, MOCK_DELAY);
  });
};

const mockGetMovieById = (id: string): Promise<Movie> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const movie = getMockMovieById(id);
      if (movie) {
        resolve(movie);
      } else {
        reject(new Error('Movie not found'));
      }
    }, MOCK_DELAY);
  });
};

// Actual API implementations
export const getMovies = async (): Promise<Movie[]> => {
  if (MOCK_MODE) return mockGetMovies();

  const response = await axios.get('/movies');
  return response.data;
};

export const getMovieById = async (id: string): Promise<Movie> => {
  if (MOCK_MODE) return mockGetMovieById(id);

  const response = await axios.get(`/movies/${id}`);
  return response.data;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (MOCK_MODE) return mockSearchMovies(query);

  const response = await axios.get(`/movies/search?q=${query}`);
  return response.data;
};
