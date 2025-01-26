import React from 'react';

interface ErrorProps {
  error: string | null;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full bg-gray-100">
      <div className="bg-red-500 text-white p-6 rounded-md shadow-md max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-4">Oops! Something went wrong.</h2>
        {error ? (
          <p className="text-lg">{error}</p>
        ) : (
          <p className="text-lg">An unexpected error occurred.</p>
        )}
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-white text-red-500 rounded-md shadow-md hover:bg-red-100 focus:outline-none"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
