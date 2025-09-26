import { Link } from "react-router-dom";
import { apiFetch } from "../config/api";
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
      <h2 className="mb-4 text-6xl font-extrabold text-blue-600">404</h2>
      <p className="mb-2 text-2xl font-semibold text-gray-800">Oops! Page not found</p>
      <p className="mb-8 text-gray-500">
        The page you are looking for might have been removed or doesn’t exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
      >
        Back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
