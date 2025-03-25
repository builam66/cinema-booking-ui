import React from 'react';
import AppLayout from '@/components/layout/app-layout';
import { mockMovies } from '@/testing/mock-data';
import { Button } from '@/components/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MovieCarousel from "./components/movie-carousel";
import MovieGrid from "@/features/movies/components/movie-grid";

const Home = () => {
  const featuredMovies = mockMovies.slice(-3);
  const nowShowingMovies = mockMovies.slice(0, 4);

  return (
    <AppLayout>
      <div className="pt-0">
        {/* Hero Carousel */}
        <MovieCarousel movies={featuredMovies} />

        {/* Now Showing Section */}
        <section className="section">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-medium">Now Showing</h2>
              <Link to="/movies">
                <Button variant="ghost" className="text-gray-600 hover:text-primary group">
                  View All
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Movie Grid */}
            <MovieGrid movies={nowShowingMovies} />
          </div>
        </section>

        {/* Features Section */}
        <section className="section bg-gray-50 border-y border-gray-100">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-medium mb-3">A Premium Cinema Experience</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Enjoy the ultimate moviegoing experience with state-of-the-art technology and exceptional comfort.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="subtle-card p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Cutting-edge Technology</h3>
                <p className="text-gray-500 text-sm">
                  Experience movies with the latest projection and sound systems for unparalleled quality.
                </p>
              </div>

              <div className="subtle-card p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Seamless Booking</h3>
                <p className="text-gray-500 text-sm">
                  Book your tickets online with our easy-to-use platform and skip the queues.
                </p>
              </div>

              <div className="subtle-card p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Premium Comfort</h3>
                <p className="text-gray-500 text-sm">
                  Relax in our luxurious seats with ample legroom and convenient amenities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-primary text-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-medium mb-4">Ready for an Unforgettable Cinema Experience?</h2>
            <p className="text-white/90 max-w-xl mx-auto mb-8">
              Book your tickets now and enjoy the latest movies in a premium environment.
            </p>
            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90 button-hover">
              Explore Movies
            </Button>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Home;
