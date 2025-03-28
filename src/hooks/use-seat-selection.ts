import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores';
import {
  selectSeat,
  deselectSeat,
  clearSelectedSeats,
  setAvailableSeats,
} from '@/stores/slices/seat-slice';
import { Seat } from '@/types/seat';
import { toast } from 'sonner';
import { getSeatsByShowtimeId } from '@/services/seat-service';

export const useSeatSelection = (showtimeId?: string) => {
  const dispatch = useDispatch();
  const { selectedSeats, availableSeats, totalPrice } = useSelector(
    (state: RootState) => state.seat
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch seats if showtimeId is provided
  useEffect(() => {
    if (showtimeId) {
      void loadSeats(showtimeId);
    }
  }, [showtimeId]);

  const loadSeats = async (showtimeId: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Loading seats for showtime: ${showtimeId}`);
      const seats = await getSeatsByShowtimeId(showtimeId);
      console.log(`Loaded ${seats.length} seats`);
      dispatch(setAvailableSeats(seats));
      setLoading(false);
    } catch (err) {
      console.error('Error loading seats:', err);
      setError('Failed to load seats. Please try again.');
      setLoading(false);
      toast.error('Error loading seats', {
        description: 'Failed to load seats. Please try again later.',
      });
    }
  };

  const handleSeatClick = useCallback((seat: Seat) => {
    if (!seat.isAvailable) {
      toast.error("This seat is not available", {
        description: "Please select an available seat",
        position: "top-center",
      });
      return;
    }

    // Check if seat is already selected
    const isSelected = selectedSeats.some(s => s.id === seat.id);

    if (isSelected) {
      dispatch(deselectSeat(seat.id));
      toast.info(`Seat ${seat.row}${seat.number} deselected`, {
        duration: 2000,
        position: "top-center",
      });
    } else {
      // Check if max seats reached
      if (selectedSeats.length >= 8) {
        toast.error("Maximum seats reached", {
          description: "You can only select up to 8 seats per booking.",
          position: "top-center",
        });
        return;
      }

      dispatch(selectSeat(seat));
      toast.success(`Seat ${seat.row}${seat.number} selected`, {
        duration: 2000,
        position: "top-center",
      });
    }
  }, [dispatch, selectedSeats]);

  const initializeSeats = useCallback((seats: Seat[]) => {
    console.log('Initializing seats in Redux store:', seats.length);
    dispatch(setAvailableSeats(seats));
  }, [dispatch]);

  const resetSeatSelection = useCallback(() => {
    dispatch(clearSelectedSeats());
  }, [dispatch]);

  const isSeatSelected = useCallback((seatId: string) => {
    return selectedSeats.some(s => s.id === seatId);
  }, [selectedSeats]);

  return {
    selectedSeats,
    availableSeats,
    totalPrice,
    loading,
    error,
    handleSeatClick,
    initializeSeats,
    loadSeats,
    resetSeatSelection,
    isSeatSelected
  };
};
