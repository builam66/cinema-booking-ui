import { format, parseISO } from 'date-fns';
import { Seat } from '@/types/seat';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  try {
    const date = parseISO(dateString);
    return format(date, 'EEEE, MMMM d, yyyy');
  } catch (error) {
    return dateString;
  }
};

export const formatTime = (timeString?: string): string => {
  if (!timeString) return 'N/A';

  // If it's a full ISO date string, extract the time part
  if (timeString.includes('T')) {
    try {
      const date = parseISO(timeString);
      return format(date, 'h:mm a');
    } catch (error) {
      return timeString;
    }
  }

  // If it's just a time string like "14:30", convert to AM/PM format
  if (timeString.includes(':')) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  return timeString;
};

export const formatBookingDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM d, yyyy • h:mm a');
  } catch (error) {
    return dateString;
  }
};

export const formatSeatLabels = (seats: Seat[]): string => {
  if (!seats || seats.length === 0) return 'No seats selected';

  const seatLabels = seats.map(seat => `${seat.row}${seat.number}`);
  return seatLabels.join(', ');
};
