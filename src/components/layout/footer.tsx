import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div>
              <Link to="/" className="text-xl font-semibold tracking-tight">
                <span className="text-primary">Cinema Booking</span>
              </Link>
              <p className="mt-2 text-sm text-gray-500">
                Premium cinema experience with elegant design and seamless booking.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
                <span className="sr-only">GitHub</span>
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 tracking-wider uppercase">Movies</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/movies" className="text-gray-500 hover:text-gray-900 transition-colors">All Movies</Link></li>
              <li><Link to="/movies?filter=now-showing" className="text-gray-500 hover:text-gray-900 transition-colors">Now Showing</Link></li>
              <li><Link to="/movies?filter=coming-soon" className="text-gray-500 hover:text-gray-900 transition-colors">Coming Soon</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 tracking-wider uppercase">Information</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-gray-500 hover:text-gray-900 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-gray-900 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-500 hover:text-gray-900 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/privacy" className="text-gray-500 hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-500 hover:text-gray-900 transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-500 hover:text-gray-900 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Cinema Booking. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
