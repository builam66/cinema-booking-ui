import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores';
import {
  addBooking,
  setCurrentBooking,
  clearCurrentBooking,
  setPaymentProcessing,
  fetchUserBookingsSuccess,
} from '@/stores/slices/booking-slice';
import { Booking, BookingDetails, CreateBookingRequest } from '@/types/booking';
import { useSeatSelection } from './use-seat-selection';
import { useToast } from './use-toast';
import {
  createBooking as createBookingApi,
  getUserBookings as getUserBookingsApi,
} from '@/services/booking-service';

export const useBooking = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { resetSeatSelection } = useSeatSelection();
  const [loadingUserBookings, setLoadingUserBookings] = useState(false);

  const {
    bookings,
    currentBooking,
    isLoading,
    error,
    paymentProcessing
  } = useSelector((state: RootState) => state.booking);

  const submitBooking = useCallback(async (bookingDetails: BookingDetails) => {
    try {
      dispatch(setPaymentProcessing(true));

      const request: CreateBookingRequest = {
        movieId: bookingDetails.movie.id,
        showtimeId: bookingDetails.showtime.id,
        seatIds: bookingDetails.selectedSeats.map(seat => seat.id),
        userId: 'user-1', // In a real app, this would come from authentication
        paymentDetails: bookingDetails.paymentDetails
      };

      const newBooking = await createBookingApi(request);

      dispatch(addBooking(newBooking));
      dispatch(setCurrentBooking(newBooking));
      dispatch(setPaymentProcessing(false));

      resetSeatSelection();
      return newBooking;
    } catch (error) {
      console.error('Error creating booking:', error);
      dispatch(setPaymentProcessing(false));
      toast({
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "An error occurred during booking.",
        variant: "destructive"
      });
      return null;
    }
  }, [dispatch, resetSeatSelection, toast]);

  const getUserBookings = useCallback(async (userId: string) => {
    try {
      setLoadingUserBookings(true);
      const userBookings = await getUserBookingsApi(userId);
      dispatch(fetchUserBookingsSuccess(userBookings));
      setLoadingUserBookings(false);
      return userBookings;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      setLoadingUserBookings(false);
      toast({
        title: "Error",
        description: "Failed to load booking history. Please try again.",
        variant: "destructive"
      });
      return [];
    }
  }, [dispatch, toast]);

  const setBookingPaymentProcessing = useCallback((isProcessing: boolean) => {
    dispatch(setPaymentProcessing(isProcessing));
  }, [dispatch]);

  return {
    bookings,
    currentBooking,
    isLoading,
    loadingUserBookings,
    error,
    paymentProcessing,
    addNewBooking: (booking: Booking) => dispatch(addBooking(booking)),
    setActiveBooking: (booking: Booking) => dispatch(setCurrentBooking(booking)),
    resetCurrentBooking: () => dispatch(clearCurrentBooking()),
    submitBooking,
    getUserBookings,
    setBookingPaymentProcessing
  };
};

// Add the AppDispatch type for TypeScript
type AppDispatch = typeof import('@/stores').store.dispatch;
