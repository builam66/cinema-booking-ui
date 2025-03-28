import axios from './axios';
import { Seat } from '@/types/seat';
import { generateSeatLayout } from '@/utils/seat-utils';
import {
  getShowtimeById as getMockShowtimeById,
} from '@/testing/mock-data';

// Mock API responses for development
const MOCK_MODE = true;
const MOCK_DELAY = 1000;

// Mock implementations
const mockGetSeatsByShowtimeId = (showtimeId: string): Promise<Seat[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Get the showtime to determine available and total seats
        const showtime = getMockShowtimeById(showtimeId);
        if (!showtime) {
          reject(new Error('Showtime not found'));
          return;
        }

        // Generate seat layout based on available and total seats
        const seats = generateSeatLayout(showtime.availableSeats, showtime.totalSeats);
        console.log(`Generated ${seats.length} seats for showtime ${showtimeId}`);
        resolve(seats);
      } catch (error) {
        console.error('Error generating seats:', error);
        reject(error);
      }
    }, MOCK_DELAY);
  });
};

// Actual API implementations
export const getSeatsByShowtimeId = async (showtimeId: string): Promise<Seat[]> => {
  if (MOCK_MODE) return mockGetSeatsByShowtimeId(showtimeId);

  const response = await axios.get(`/seats/showtime/${showtimeId}`);
  return response.data;
};

export const reserveSeats = async (showtimeId: string, seatIds: string[]): Promise<boolean> => {
  if (MOCK_MODE) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), MOCK_DELAY);
    });
  }

  const response = await axios.post(`/seats/reserve`, { showtimeId, seatIds });
  return response.data.success;
};
