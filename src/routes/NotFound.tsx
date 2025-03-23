import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="max-w-md mx-auto text-center py-10">
      <h2 className="text-3xl font-bold mb-2">404</h2>
      <h3 className="text-xl mb-4">Page Not Found</h3>
      <p className="mb-6">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
