import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Cinema Booking</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:underline">About</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4 flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-100 border-t">
        <div className="container mx-auto p-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Cinema Booking App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
