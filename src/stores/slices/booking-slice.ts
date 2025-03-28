import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit';
import { Booking, BookingDetails, CreateBookingRequest } from '@/types/booking';
import { createBooking, getUserBookings } from '@/services/booking-service';

// Create a proper action creator for the fetch bookings success action
export const fetchUserBookingsSuccess = createAction<Booking[]>('bookings/fetchUserBookingsSuccess');

interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
  paymentProcessing: boolean;
}

// Async thunk to create a booking
export const storeBooking = createAsyncThunk(
  'bookings/storeBooking',
  async (bookingDetails: BookingDetails, { rejectWithValue }) => {
    try {
      const request: CreateBookingRequest = {
        movieId: bookingDetails.movie.id,
        showtimeId: bookingDetails.showtime.id,
        seatIds: bookingDetails.selectedSeats.map(seat => seat.id),
        userId: 'user-1', // In a real app, this would come from authentication
        paymentDetails: bookingDetails.paymentDetails
      };

      return await createBooking(request);
    } catch (error) {
      return rejectWithValue('Failed to create booking');
    }
  }
);

// Async thunk to fetch user bookings
export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await getUserBookings(userId);
    } catch (error) {
      return rejectWithValue('Failed to fetch booking history');
    }
  }
);

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
  paymentProcessing: false
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    setCurrentBooking: (state, action: PayloadAction<Booking>) => {
      state.currentBooking = action.payload;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    setPaymentProcessing: (state, action: PayloadAction<boolean>) => {
      state.paymentProcessing = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // createBooking cases
      .addCase(storeBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(storeBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.isLoading = false;
        state.bookings.push(action.payload);
        state.currentBooking = action.payload;
      })
      .addCase(storeBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to create booking';
      })
      // fetchUserBookings cases
      .addCase(fetchUserBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to fetch booking history';
      })
      // Handle user action for successful bookings fetch - using the proper action creator
      .addCase(fetchUserBookingsSuccess, (state, action) => {
        state.bookings = action.payload;
        state.isLoading = false;
      });
  }
});

export const {
  addBooking,
  setCurrentBooking,
  clearCurrentBooking,
  setPaymentProcessing
} = bookingSlice.actions;

export default bookingSlice.reducer;
