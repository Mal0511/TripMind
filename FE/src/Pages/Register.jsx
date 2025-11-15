import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. Import hook để "viết" vào context
import { useAuth } from "../Context/AuthContext";

export default function Register() {
  // 2. Tạo state cho các ô nhập liệu
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 3. Lấy hàm login từ context (để tự động đăng nhập sau khi đăng ký)
  const { login } = useAuth();
  const navigate = useNavigate();

  // 4. Hàm xử lý khi người dùng nhấn "Sign Up"
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trang tải lại

    // --- PHẦN GIẢ LẬP BACK-END ---
    // Kiểm tra xem người dùng đã nhập đủ thông tin chưa
    if (username && email && password) {
      
      // 5. Tạo dữ liệu người dùng mới (giả)
      const newUserData = {
        name: username,
        email: email,
      };

      // 6. Gọi hàm login() để tự động đăng nhập cho người dùng mới
      login(newUserData);

      // 7. Đăng ký thành công, điều hướng về trang chủ
      navigate("/");

    } else {
      setError("Vui lòng điền đầy đủ thông tin");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        
        {/* 8. Kết nối form với hàm handleSubmit */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div>
            <label 
              htmlFor="username" 
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your_username"
              // 9. Kết nối input với state
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              // 9. Kết nối input với state
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label 
              htmlFor="password" 
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              // 9. Kết nối input với state
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Hiển thị lỗi nếu có */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Login (Giữ nguyên) */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}