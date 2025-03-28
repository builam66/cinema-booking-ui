import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Seat } from '@/types/seat';

interface SeatState {
  selectedSeats: Seat[];
  availableSeats: Seat[];
  totalPrice: number;
}

const initialState: SeatState = {
  selectedSeats: [],
  availableSeats: [],
  totalPrice: 0
};

const seatSlice = createSlice({
  name: 'seat',
  initialState,
  reducers: {
    selectSeat: (state, action: PayloadAction<Seat>) => {
      const seat = action.payload;
      state.selectedSeats.push(seat);
      state.totalPrice += seat.price;
    },
    deselectSeat: (state, action: PayloadAction<string>) => {
      const seatId = action.payload;
      const seatIndex = state.selectedSeats.findIndex(seat => seat.id === seatId);

      if (seatIndex !== -1) {
        const seatPrice = state.selectedSeats[seatIndex].price;
        state.selectedSeats.splice(seatIndex, 1);
        state.totalPrice -= seatPrice;
      }
    },
    clearSelectedSeats: (state) => {
      state.selectedSeats = [];
      state.totalPrice = 0;
    },
    setAvailableSeats: (state, action: PayloadAction<Seat[]>) => {
      state.availableSeats = action.payload;
    },
    toggleSeatSelection: (state, action: PayloadAction<string>) => {
      const seatId = action.payload;
      const seatIndex = state.selectedSeats.findIndex(seat => seat.id === seatId);

      if (seatIndex !== -1) {
        // Deselect seat
        const seatPrice = state.selectedSeats[seatIndex].price;
        state.selectedSeats.splice(seatIndex, 1);
        state.totalPrice -= seatPrice;
      } else {
        // Select seat
        const seat = state.availableSeats.find(seat => seat.id === seatId);
        if (seat && seat.isAvailable) {
          state.selectedSeats.push(seat);
          state.totalPrice += seat.price;
        }
      }
    }
  }
});

export const {
  selectSeat,
  deselectSeat,
  clearSelectedSeats,
  setAvailableSeats,
  toggleSeatSelection,
} = seatSlice.actions;

export default seatSlice.reducer;
