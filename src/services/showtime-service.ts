import axios from './axios';
import { Showtime } from '@/types';
import {
  getShowtimesByMovieId as getMockShowtimesByMovieId,
  getShowtimeById as getMockShowtimeById,
} from '@/testing/mock-data';

// Mock API responses for development
const MOCK_MODE = true;
const MOCK_DELAY = 800;

// Mock implementations
const mockGetShowtimesByMovieId = (movieId: string): Promise<Showtime[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const showtimes = getMockShowtimesByMovieId(movieId);
      console.log(`Found ${showtimes.length} showtimes for movie ${movieId}`);
      resolve(showtimes);
    }, MOCK_DELAY);
  });
};

const mockGetShowtimeById = (id: string): Promise<Showtime> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const showtime = getMockShowtimeById(id);
      console.log(`Getting showtime details for: ${id}`, showtime);
      if (showtime) {
        resolve(showtime);
      } else {
        reject(new Error(`Showtime not found with id: ${id}`));
      }
    }, MOCK_DELAY);
  });
};

// Actual API implementations
export const getShowtimesByMovieId = async (movieId: string): Promise<Showtime[]> => {
  if (MOCK_MODE) return mockGetShowtimesByMovieId(movieId);

  const response = await axios.get(`/showtimes/movie/${movieId}`);
  return response.data;
};

export const getShowtimeById = async (id: string): Promise<Showtime> => {
  if (MOCK_MODE) return mockGetShowtimeById(id);

  const response = await axios.get(`/showtimes/${id}`);
  return response.data;
};
