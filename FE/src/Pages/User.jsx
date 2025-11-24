import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  const handleLogout = async () => {
    try {
      // Gọi API logout backend nếu có
      await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });

      // Xóa thông tin đăng nhập client-side
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.clear();
      window.dispatchEvent(new Event("user-logout"));
      // Chuyển về trang home
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (!user) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-3xl font-bold text-red-600">Bạn chưa đăng nhập</h1>
        <p className="mt-4 text-lg text-gray-600">
          Vui lòng đăng nhập để xem thông tin tài khoản.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Đăng nhập ngay
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-purple-600 text-center">
        User Profile
      </h1>

      <div className="mt-6 bg-white shadow-lg rounded-xl p-6 space-y-4">
        {/* Profile Info */}
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-2xl font-bold">
            {user.fullName ? user.fullName[0] : "U"}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {user.fullName}
            </h2>
            <p className="text-gray-600">@{user.userName}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 mt-4">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
