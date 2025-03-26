import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays, parseISO } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs';
import { Badge } from '@/components/badge';
import { Skeleton } from '@/components/skeleton';
import { useShowtime } from '@/hooks/use-showtime';
import { motion } from 'framer-motion';

interface ShowtimeSelectorProps {
  movieId: string;
}

const ShowtimeSelector: React.FC<ShowtimeSelectorProps> = ({ movieId }) => {
  const navigate = useNavigate();
  const {
    getShowtimesByMovie,
    showtimes,
    selectedDate,
    selectDate,
    uniqueDates,
    showtimesForSelectedDate,
    formatDateString,
    isLoading
  } = useShowtime();

  useEffect(() => {
    if (movieId) {
      void getShowtimesByMovie(movieId);
    }
  }, [movieId, getShowtimesByMovie]);

  const handleSelectShowtime = (showtimeId: string) => {
    navigate(`/booking/${showtimeId}`);
  };

  // If loading, show skeleton
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // If no showtimes, show message
  if (showtimes.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No showtimes available for this movie.</p>
      </Card>
    );
  }

  const dates = uniqueDates();

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue={selectedDate || (dates.length > 0 ? dates[0] : '')}
        onValueChange={selectDate}
        className="w-full"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Select Date</h3>
        </div>

        <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 h-auto mb-6">
          {dates.map((date: string) => (
            <TabsTrigger
              key={date}
              value={date}
              className="h-full py-3 flex flex-col gap-1"
            >
              <span className="text-xs text-muted-foreground">
                {format(parseISO(date), 'EEE')}
              </span>
              <span className="text-lg font-semibold">
                {format(parseISO(date), 'd')}
              </span>
              <span className="text-xs">
                {format(parseISO(date), 'MMM')}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {dates.map((date: string) => (
          <TabsContent key={date} value={date} className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">Showtimes for {formatDateString(date)}</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {showtimesForSelectedDate().map((showtime, index) => (
                  <motion.div
                    key={showtime.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-auto flex flex-col items-center justify-center gap-1 py-3"
                      onClick={() => handleSelectShowtime(showtime.id)}
                    >
                      <span className="text-base font-medium">{showtime.startTime}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {showtime.theater}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {showtime.availableSeats} seats
                        </span>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ShowtimeSelector;
