import { Provider } from "react-redux";
import { store } from "@/stores/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/features/home";
import NotFound from "@/features/common/not-found";
import Movies from "@/features/movies";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
