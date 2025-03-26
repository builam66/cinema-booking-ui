import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { RootState } from '@/stores';
import {
  setSelectedDate,
  clearCurrentShowtime,
} from '@/stores/slices/showtime-slice';
import { getShowtimesByMovieId, getShowtimeById } from '@/services/showtime-service';
import { toast } from 'sonner';

export const useShowtime = () => {
  const dispatch = useDispatch();
  const { showtimes, currentShowtime, selectedDate, isLoading, error } = useSelector(
    (state: RootState) => state.showtimes
  );
  const [localLoading, setLocalLoading] = useState(false);

  const getShowtimesByMovie = useCallback(async (movieId: string) => {
    try {
      dispatch({ type: 'showtimes/fetchShowtimesByMovieId/pending' });
      setLocalLoading(true);

      const showtimesData = await getShowtimesByMovieId(movieId);
      dispatch({
        type: 'showtimes/fetchShowtimesByMovieId/fulfilled',
        payload: showtimesData
      });

      // If we have showtimes and no selected date, set it to the first date
      if (showtimesData.length > 0 && !selectedDate) {
        dispatch(setSelectedDate(showtimesData[0].date));
      }

      setLocalLoading(false);
      return showtimesData;
    } catch (error) {
      console.error('Error fetching showtimes:', error);
      dispatch({
        type: 'showtimes/fetchShowtimesByMovieId/rejected',
        payload: 'Failed to fetch showtimes. Please try again.'
      });
      setLocalLoading(false);
      toast.error('Error loading showtimes', {
        description: 'Failed to load showtimes. Please try again later.',
      });
      return [];
    }
  }, [dispatch, selectedDate]);

  const getShowtimeById = useCallback(async (showtimeId: string) => {
    try {
      dispatch({ type: 'showtimes/fetchShowtimeById/pending' });
      setLocalLoading(true);

      console.log(`Fetching showtime with ID: ${showtimeId}`);
      const showtimeData = await getShowtimeById(showtimeId);
      console.log('Fetched showtime:', showtimeData);

      dispatch({
        type: 'showtimes/fetchShowtimeById/fulfilled',
        payload: showtimeData
      });

      setLocalLoading(false);
      return showtimeData;
    } catch (error) {
      console.error('Error fetching showtime details:', error);
      dispatch({
        type: 'showtimes/fetchShowtimeById/rejected',
        payload: 'Failed to fetch showtime details. Please try again.'
      });
      setLocalLoading(false);
      toast.error('Error loading showtime details', {
        description: 'Failed to load showtime details. Please try again later.',
      });
      return null;
    }
  }, [dispatch]);

  const selectDate = useCallback((date: string) => {
    dispatch(setSelectedDate(date));
  }, [dispatch]);

  const resetShowtime = useCallback(() => {
    dispatch(clearCurrentShowtime());
  }, [dispatch]);

  const uniqueDates = useCallback(() => {
    const uniqueDatesSet = new Set(showtimes.map(showtime => showtime.date));
    return Array.from(uniqueDatesSet).sort();
  }, [showtimes]);

  const showtimesForSelectedDate = useCallback(() => {
    if (!selectedDate) return [];
    return showtimes.filter(showtime => showtime.date === selectedDate);
  }, [showtimes, selectedDate]);

  const formatDateString = useCallback((dateString: string) => {
    try {
      return format(parseISO(dateString), 'EEEE, MMMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  }, []);

  return {
    showtimes,
    currentShowtime,
    selectedDate,
    isLoading: isLoading || localLoading,
    error,
    getShowtimesByMovie,
    getShowtimeById,
    selectDate,
    resetShowtime,
    uniqueDates,
    showtimesForSelectedDate,
    formatDateString
  };
};
