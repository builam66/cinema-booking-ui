import { Seat } from '@/types/seat';

// Function to generate a random seat layout
export const generateSeatLayout = (availableSeats: number, totalSeats: number): Seat[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
  const seatsPerRow = 12;
  const seats: Seat[] = [];

  // Calculate how many seats should be unavailable
  const unavailableSeatsCount = totalSeats - availableSeats;

  // Generate all seats
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    for (let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
      // Determine seat type based on position
      let type: 'standard' | 'premium' | 'vip';
      if (rowIndex < 3) {
        type = 'standard';
      } else if (rowIndex < 7) {
        type = 'premium';
      } else {
        type = 'vip';
      }

      // Determine seat price based on type
      let price: number;
      switch (type) {
        case 'standard':
          price = 12;
          break;
        case 'premium':
          price = 18;
          break;
        case 'vip':
          price = 25;
          break;
      }

      seats.push({
        id: `${row}${seatNumber}`,
        row,
        number: seatNumber,
        type,
        isAvailable: true,
        price
      });
    }
  }

  // Randomly mark seats as unavailable
  const shuffledIndexes = shuffleArray([...Array(seats.length).keys()]);
  for (let i = 0; i < unavailableSeatsCount && i < shuffledIndexes.length; i++) {
    const index = shuffledIndexes[i];
    seats[index].isAvailable = false;
  }

  return seats;
};

// Helper function to shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
