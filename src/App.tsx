import { Toaster as Sonner } from "@/components/sonner";
import { Provider } from "react-redux";
import { store } from "@/stores";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/features/home";
import NotFound from "@/features/common/not-found";
import Movies from "@/features/movies";
import MovieDetails from "@/features/movie-detail";
import SeatSelection from "@/features/booking";
import { TooltipProvider } from "@/components/tooltip";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <TooltipProvider>
          <Sonner />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/booking/:showtimeId" element={<SeatSelection />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
