import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. Import hook để "viết" vào context
import { useAuth } from "../Context/AuthContext";

export default function Login() {
  // 2. Tạo state để lưu trữ email và password người dùng nhập
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 3. Lấy hàm login từ context
  const { login } = useAuth();
  
  // 4. Lấy công cụ để điều hướng (chuyển trang)
  const navigate = useNavigate();

  // 5. Hàm xử lý khi người dùng nhấn nút "Sign In"
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trình duyệt tải lại trang

    // --- PHẦN GIẢ LẬP BACK-END ---
    // Vì chưa có Back-end, chúng ta chỉ cần kiểm tra xem người dùng có nhập gì không
    if (email && password) {
      
      // 6. Tạo dữ liệu người dùng (giả)
      const fakeUserData = {
        name: email.split('@')[0], // Lấy tên từ phần trước dấu @ của email
        email: email,
      };
      
      // 7. Gọi hàm login() từ Context và truyền dữ liệu vào
      login(fakeUserData);

      // 8. Đăng nhập thành công, điều hướng về trang chủ
      navigate("/");
      
    } else {
      setError("Vui lòng nhập email và mật khẩu");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back!
        </h2>
        
        {/* 9. Kết nối form với hàm handleSubmit */}
        <form className="space-y-6" onSubmit={handleSubmit}>
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
              // 10. Kết nối input với state
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
              // 10. Kết nối input với state
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
            Sign In
          </button>
        </form>

        {/* Link to Register (Giữ nguyên) */}
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}