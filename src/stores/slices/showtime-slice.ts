import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Showtime } from '@/types/showtime';
import { getShowtimesByMovieId, getShowtimeById } from '@/services/showtime-service';

interface ShowtimeState {
  showtimes: Showtime[];
  currentShowtime: Showtime | null;
  selectedDate: string | null;
  isLoading: boolean;
  error: string | null;
}

// Async thunk to fetch showtimes by movie ID
export const fetchShowtimesByMovieId = createAsyncThunk(
  'showtimes/fetchShowtimesByMovieId',
  async (movieId: string, { rejectWithValue }) => {
    try {
      return await getShowtimesByMovieId(movieId);
    } catch (error) {
      return rejectWithValue('Failed to fetch showtimes');
    }
  }
);

// Async thunk to fetch showtime by ID
export const fetchShowtimeById = createAsyncThunk(
  'showtimes/fetchShowtimeById',
  async (showtimeId: string, { rejectWithValue }) => {
    try {
      return await getShowtimeById(showtimeId);
    } catch (error) {
      return rejectWithValue('Failed to fetch showtime details');
    }
  }
);

const initialState: ShowtimeState = {
  showtimes: [],
  currentShowtime: null,
  selectedDate: null,
  isLoading: false,
  error: null
};

const showtimeSlice = createSlice({
  name: 'showtimes',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    clearCurrentShowtime: (state) => {
      state.currentShowtime = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchShowtimesByMovieId cases
      .addCase(fetchShowtimesByMovieId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchShowtimesByMovieId.fulfilled, (state, action: PayloadAction<Showtime[]>) => {
        state.isLoading = false;
        state.showtimes = action.payload;
      })
      .addCase(fetchShowtimesByMovieId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to fetch showtimes';
      })
      // fetchShowtimeById cases
      .addCase(fetchShowtimeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchShowtimeById.fulfilled, (state, action: PayloadAction<Showtime>) => {
        state.isLoading = false;
        state.currentShowtime = action.payload;
      })
      .addCase(fetchShowtimeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to fetch showtime details';
      });
  }
});

export const { setSelectedDate, clearCurrentShowtime } = showtimeSlice.actions;
export default showtimeSlice.reducer;
