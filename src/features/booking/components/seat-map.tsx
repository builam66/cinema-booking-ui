import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Seat } from '@/types/seat';
import SeatItem from './seat-item';
import { useSeatSelection } from '@/hooks/use-seat-selection';

interface SeatMapProps {
  seats: Seat[];
}

const SeatMap: React.FC<SeatMapProps> = ({ seats }) => {
  const { handleSeatClick, isSeatSelected, initializeSeats } = useSeatSelection();

  // Initialize seats when component mounts
  useEffect(() => {
    initializeSeats(seats);
  }, [seats, initializeSeats]);

  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  // Get all rows in alphabetical order
  const rows = Object.keys(seatsByRow).sort();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="space-y-3 py-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {rows.map((row, rowIndex) => (
        <motion.div key={row} className="flex items-center" variants={item}>
          <div className="w-8 text-center font-medium text-sm">{row}</div>
          <div className="flex flex-1 flex-wrap gap-1 justify-center">
            {seatsByRow[row].map((seat) => {
              const isSelected = isSeatSelected(seat.id);
              return (
                <SeatItem
                  key={seat.id}
                  seat={seat}
                  isSelected={isSelected}
                  onClick={() => handleSeatClick(seat)}
                />
              );
            })}
          </div>
          <div className="w-8 text-center font-medium text-sm">{row}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SeatMap;
