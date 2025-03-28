import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState, AppDispatch } from '@/stores';
import { Card } from '@/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs';
import { Separator } from '@/components/separator';
import { Button } from '@/components/button';
import { Skeleton } from '@/components/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useSeatSelection } from '@/hooks/use-seat-selection';
import { useBooking } from '@/hooks/use-booking';
import { useShowtime } from '@/hooks/use-showtime';
import { fetchMovieById } from '@/stores/slices/movie-slice';
import AppLayout from '@/components/layout/app-layout';
import SeatMap from './components/seat-map';
import SeatLegend from './components/seat-legend';
import { Film, Clock, MapPin, CreditCard, Info } from 'lucide-react';
import { toast as sonnerToast } from 'sonner';
import { getSeatsByShowtimeId } from '@/services/seat-service';

const SeatSelection = () => {
  const { showtimeId } = useParams<{ showtimeId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const { currentShowtime, isLoading: showtimeLoading } = useSelector((state: RootState) => state.showtimes);
  const { currentMovie, isLoading: movieLoading } = useSelector((state: RootState) => state.movies);

  const { selectedSeats, availableSeats, totalPrice, handleSeatClick, resetSeatSelection, initializeSeats } = useSeatSelection();
  const { submitBooking, paymentProcessing } = useBooking();
  const { getShowtimeById } = useShowtime();

  const [activeTab, setActiveTab] = useState<string>('seats');

  useEffect(() => {
    if (showtimeId) {
      getShowtimeById(showtimeId);
    }
  }, [showtimeId, getShowtimeById]);

  useEffect(() => {
    if (currentShowtime && currentShowtime.movieId) {
      dispatch(fetchMovieById(currentShowtime.movieId));
    }
  }, [currentShowtime, dispatch]);

  useEffect(() => {
    const loadSeats = async () => {
      if (showtimeId) {
        try {
          const seats = await getSeatsByShowtimeId(showtimeId);
          initializeSeats(seats);

          sonnerToast('Select your seats', {
            description: 'You can select up to 8 seats for this showing',
            icon: <Info className="h-4 w-4" />
          });
        } catch (error) {
          console.error('Error loading seats:', error);
          toast({
            title: "Error loading seats",
            description: "Failed to load seat information. Please try again.",
            variant: "destructive"
          });
        }
      }
    };

    loadSeats();
  }, [showtimeId, initializeSeats, toast]);

  const handleContinueToPayment = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "No seats selected",
        description: "Please select at least one seat to continue.",
        variant: "destructive"
      });
      return;
    }
    setActiveTab('payment');
  };

  const isLoading = showtimeLoading || movieLoading;

  return (
    <AppLayout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-12 w-60" />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Skeleton className="h-[400px] w-full" />
              </div>
              <div>
                <Skeleton className="h-[400px] w-full" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <motion.h1
              className="text-3xl font-bold mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentMovie ? currentMovie.title : 'Select Your Seats'}
            </motion.h1>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 mb-8">
                    <TabsTrigger value="seats">
                      Select Seats
                    </TabsTrigger>
                    <TabsTrigger value="payment" disabled={selectedSeats.length === 0}>
                      Payment
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="seats" className="space-y-6">
                    <Card className="p-6">
                      {currentShowtime && (
                        <div className="flex justify-between items-center mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Film size={16} className="text-primary" />
                              <h2 className="font-semibold">{currentMovie?.title}</h2>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                              <div className="flex items-center gap-1">
                                <MapPin size={14} className="text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">{currentShowtime.theater}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={14} className="text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">{currentShowtime.date} • {currentShowtime.startTime}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <Separator className="my-4" />

                      <div className="relative mb-8">
                        <motion.div
                          className="h-6 bg-primary/10 rounded-t-full mx-auto w-4/5 mb-2"
                          initial={{ scale: 0.9, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }}
                        />
                        <p className="text-center text-xs text-muted-foreground">SCREEN</p>
                      </div>

                      <SeatMap seats={availableSeats} />

                      <SeatLegend />

                      <div className="mt-6 flex justify-end">
                        <Button
                          onClick={handleContinueToPayment}
                          disabled={selectedSeats.length === 0}
                          className="px-6"
                        >
                          <span>Continue to Payment</span>
                          <CreditCard className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default SeatSelection;
