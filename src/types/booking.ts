import { Movie } from "@/types/movie.ts";
import { Showtime } from "@/types/showtime.ts";
import { Seat } from "@/types/seat.ts";

export interface Booking {
  id: string;
  userId: string;
  movieId: string;
  showtimeId: string;
  seats: string[]; // array of seat IDs
  totalPrice: number;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface BookingDetails {
  movie: Movie;
  showtime: Showtime;
  selectedSeats: Seat[];
  totalPrice: number;
  paymentDetails: {
    fullName: string;
    email: string;
    phone: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

export interface CreateBookingRequest {
  movieId: string;
  showtimeId: string;
  seatIds: string[];
  userId: string;
  paymentDetails: {
    fullName: string;
    email: string;
    phone: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

export interface BookingDetailsResponse {
  id: string;
  booking: Booking;
  movie: Movie;
  showtime: Showtime;
  seats: Seat[];
}
