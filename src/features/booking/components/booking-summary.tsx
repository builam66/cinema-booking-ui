import React from 'react';
import { format } from 'date-fns';
import { Separator } from '@/components/separator';
import { Button } from '@/components/button';
import { Movie } from '@/types/movie';
import { Showtime } from '@/types/showtime';
import { Seat } from '@/types/seat';

interface BookingSummaryProps {
  movie: Movie | null;
  showtime: Showtime | null;
  selectedSeats: Seat[];
  totalPrice: number;
  onProceedToPayment: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  movie,
  showtime,
  selectedSeats,
  totalPrice,
  onProceedToPayment
}) => {
  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'EEEE, MMMM d, yyyy');
  };

  // Format seat labels
  const formatSeatLabels = () => {
    if (selectedSeats.length === 0) return 'No seats selected';

    // Sort seats by row and number
    const sortedSeats = [...selectedSeats].sort((a, b) => {
      if (a.row !== b.row) return a.row.localeCompare(b.row);
      return a.number - b.number;
    });

    return sortedSeats.map(seat => `${seat.row}${seat.number}`).join(', ');
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Movie</p>
          <p className="font-medium">{movie?.title || 'Loading...'}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Date & Time</p>
          <p className="font-medium">{formatDate(showtime?.date)} • {showtime?.startTime}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Theater</p>
          <p className="font-medium">{showtime?.theater || 'Loading...'}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Seats ({selectedSeats.length})</p>
          <p className="font-medium">{formatSeatLabels()}</p>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between mb-6">
        <p className="font-medium">Total</p>
        <p className="text-lg font-bold">{formatPrice(totalPrice)}</p>
      </div>

      <Button
        className="w-full"
        size="lg"
        disabled={selectedSeats.length === 0}
        onClick={onProceedToPayment}
      >
        Proceed to Payment
      </Button>

      <p className="text-xs text-muted-foreground text-center mt-4">
        By proceeding, you agree to our terms and conditions.
      </p>
    </div>
  );
};

export default BookingSummary;
