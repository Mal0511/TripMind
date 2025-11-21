import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Lấy username khi component mount
    const user = localStorage.getItem("username");
    if (user) setUsername(user);

    // Lắng nghe thay đổi storage (nếu login ở tab khác)
    const handleStorageChange = () => {
      const newUser = localStorage.getItem("username");
      setUsername(newUser || "");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="shadow-md">
      <div className="flex items-center justify-between px-12 py-4 bg-white">
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
          TRIP <span className="text-blue-600">MIND✈</span>
        </h1>

        {/* Right side */}
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

          {/* Username / Login */}
          {username ? (
            <span className="px-4 py-2 text-gray-700">Hi, {username}</span>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* Menu */}
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
