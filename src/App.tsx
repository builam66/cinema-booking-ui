import { Toaster as Sonner } from "@/components/sonner";
import { Provider } from "react-redux";
import { store } from "@/stores";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/features/home";
import NotFound from "@/features/common/not-found";
import Movies from "@/features/movies";
import MovieDetails from "@/features/movie-detail";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Sonner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
