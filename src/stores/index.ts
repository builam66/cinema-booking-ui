import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movie-slice';
import showtimeReducer from "./slices/showtime-slice";
import seatReducer from "./slices/seat-slice";
import bookingReducer from "./slices/booking-slice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    showtimes: showtimeReducer,
    seat: seatReducer,
    booking: bookingReducer,
  },
  devTools: true
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export { store };
