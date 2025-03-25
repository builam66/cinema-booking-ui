import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '@/types';
import { mockMovies } from '@/testing/mock-data';

interface MovieState {
  movies: Movie[];
  currentMovie: Movie | null;
  isLoading: boolean;
  error: string | null;
}

// Async thunk to fetch all movies
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // Use the movies from mockData directly
      return mockMovies;
    } catch (error) {
      return rejectWithValue('Failed to fetch movies');
    }
  }
);

// Async thunk to fetch a single movie
export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (movieId: string, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const movie = mockMovies.find(m => m.id === movieId);
      if (!movie) {
        throw new Error('Movie not found');
      }
      return movie;
    } catch (error) {
      return rejectWithValue('Failed to fetch movie details');
    }
  }
);

const initialState: MovieState = {
  movies: [],
  currentMovie: null,
  isLoading: false,
  error: null
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchMovies cases
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.isLoading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // fetchMovieById cases
      .addCase(fetchMovieById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.isLoading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearCurrentMovie } = movieSlice.actions;

export default movieSlice;
