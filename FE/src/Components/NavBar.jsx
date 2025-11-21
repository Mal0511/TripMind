import { NavLink } from "react-router-dom";

export default function Navbar() {
  
  return (
    <div className="shadow-md">
      {/* Top Header */}
      <div className="flex items-center justify-between px-12 py-4 bg-white">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
          TRIP <span className="text-blue-600">MIND✈</span>
        </h1>

        {/* Search */}
        <div className="flex items-center w-1/2 max-w-lg">
          <input
            type="text"
            placeholder="Search Location"
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-l-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-5 py-2 text-white transition bg-red-500 rounded-r-full hover:bg-red-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
            </svg>
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-8">
          {/* Cart */}
          <div className="relative transition-transform cursor-pointer hover:scale-110">
            <svg
              className="text-gray-700 transition w-7 h-7 hover:text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h14l-1.5 8H6.1L3 6h18"
              />
            </svg>
            <span className="absolute -top-2 -right-2 px-1.5 text-xs text-white bg-red-500 rounded-full shadow">
              2
            </span>
          </div>
               

            {/* Login Button */}
            <NavLink
              to="/login"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              Login
            </NavLink>

         
        </div>
      </div>

      <div className="flex justify-center py-3 space-x-12 text-sm font-semibold tracking-wide text-white bg-blue-600">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-gray-200"}>HOME</NavLink>
        <NavLink to="/plan" className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-gray-200"}>PLAN</NavLink>
        <NavLink to="/place-weather" className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-gray-200"}>PLACE & WEATHER</NavLink>
        <NavLink to="/booking" className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-gray-200"}>BOOKING</NavLink>
        <NavLink to="/user" className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-gray-200"}>USER</NavLink>
        <NavLink to="/setting" className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-gray-200"}>SETTING</NavLink>
      </div>
    </div>
  );
}