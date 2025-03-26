import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './slices/movie-slice';

const store = configureStore({
  reducer: {
    movies: movieSlice.reducer,
  },
  devTools: true
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export { store };
