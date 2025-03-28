import React from 'react';
import { motion } from 'framer-motion';
import { Seat } from '@/types/seat';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip';
import { Check, X } from 'lucide-react';

interface SeatItemProps {
  seat: Seat;
  isSelected: boolean;
  onClick: () => void;
}

const SeatItem: React.FC<SeatItemProps> = ({ seat, isSelected, onClick }) => {
  // Determine seat style based on type and availability
  const getSeatStyles = () => {
    if (!seat.isAvailable) {
      return "bg-muted text-muted-foreground cursor-not-allowed opacity-50";
    }

    if (isSelected) {
      return "bg-primary text-primary-foreground hover:bg-primary/90";
    }

    switch (seat.type) {
      case 'standard':
        return "bg-green-500/50 hover:bg-green-500/80 text-secondary-foreground";
      case 'premium':
        return "bg-orange-500/50 hover:bg-orange-500/80 text-secondary-foreground";
      case 'vip':
        return "bg-purple-500/50 hover:bg-purple-500/80 text-secondary-foreground";
      default:
        return "bg-secondary/50 hover:bg-secondary/80 text-secondary-foreground";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          type="button"
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-md text-xs font-medium transition-colors",
            getSeatStyles()
          )}
          onClick={onClick}
          disabled={!seat.isAvailable}
          aria-label={`Seat ${seat.row}${seat.number} - ${seat.isAvailable ? 'Available' : 'Unavailable'}`}
          whileHover={{ scale: seat.isAvailable ? 1.1 : 1 }}
          whileTap={{ scale: seat.isAvailable ? 0.95 : 1 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isSelected ? (
            <Check className="h-3 w-3" />
          ) : !seat.isAvailable ? (
            <X className="h-3 w-3" />
          ) : (
            seat.number
          )}
        </motion.button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">
        <p>Seat {seat.row}{seat.number}</p>
        <p className="font-semibold">{formatPrice(seat.price)}</p>
        <p className="capitalize">{seat.type}</p>
        {!seat.isAvailable && <p className="text-destructive">Unavailable</p>}
        {isSelected && <p className="text-primary">Selected</p>}
      </TooltipContent>
    </Tooltip>
  );
};

export default SeatItem;
