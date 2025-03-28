import axios from './axios';
import { Booking, CreateBookingRequest } from '@/types/booking';
import {
  createBooking as createMockBooking,
  getUserBookings as getMockUserBookings,
  getBookingById as getMockBookingById,
} from '@/testing/mock-data';
import { v4 as uuidv4 } from 'uuid';

// Mock API responses for development
const MOCK_MODE = true;
const MOCK_DELAY = 1000;

// Mock implementations
const mockCreateBooking = (request: CreateBookingRequest): Promise<Booking> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newBooking: Booking = {
        id: uuidv4(),
        userId: request.userId,
        movieId: request.movieId,
        showtimeId: request.showtimeId,
        seats: request.seatIds,
        totalPrice: Math.floor(Math.random() * 100) + 50, // Random price for demo
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };

      createMockBooking(newBooking);
      resolve(newBooking);
    }, MOCK_DELAY);
  });
};

const mockGetUserBookings = (userId: string): Promise<Booking[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userBookings = getMockUserBookings(userId);
      if (userBookings) {
        resolve(userBookings);
      } else {
        reject(new Error('Bookings not found'));
      }
    }, MOCK_DELAY);
  });
};

const mockGetBookingById = (bookingId: string): Promise<Booking> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const booking = getMockBookingById(bookingId);
      if (booking) {
        resolve(booking);
      } else {
        reject(new Error('Booking not found'));
      }
    }, MOCK_DELAY);
  });
};

// Actual API implementations
export const createBooking = async (request: CreateBookingRequest): Promise<Booking> => {
  if (MOCK_MODE) return mockCreateBooking(request);

  const response = await axios.post(`/booking`, request);
  return response.data;
};

export const getUserBookings = async (userId: string): Promise<Booking[]> => {
  if (MOCK_MODE) return mockGetUserBookings(userId);

  const response = await axios.get(`/booking/user/${userId}`);
  return response.data;
};

export const getBookingById = async (bookingId: string): Promise<Booking | null> => {
  if (MOCK_MODE) return mockGetBookingById(bookingId);

  const response = await axios.get(`/booking/${bookingId}`);
  return response.data;
};
