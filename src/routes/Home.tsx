import { useState } from 'react';
import { useQuery } from '../lib/api';

const Home = () => {
  const [count, setCount] = useState(0);
  const { data, loading, error } = useQuery('/api/example');

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Welcome to Cinema Booking</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="mb-4">This template includes:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Client-side rendering</li>
          <li>React Router and Vite</li>
          <li>Hot Module Replacement (HMR)</li>
          <li>Asset bundling and optimization</li>
          <li>Data loading and mutations</li>
          <li>TypeScript by default</li>
          <li>TailwindCSS for styling</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Counter Example</h3>
        <p className="mb-2">Count: {count}</p>
        <button
          onClick={() => setCount(count + 1)}
          className="btn btn-primary mr-2"
        >
          Increment
        </button>
        <button
          onClick={() => setCount(0)}
          className="btn bg-gray-500 text-white hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Data Fetching Example</h3>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {data && (
          <div className="bg-gray-100 p-4 rounded">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
