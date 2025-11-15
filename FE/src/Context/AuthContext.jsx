import React, { createContext, useState, useContext } from "react";

// 1. Tạo "Bảng thông báo"
const AuthContext = createContext();

// 2. Tạo "Người quản lý" bảng thông báo
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] =useState(null); // Ban đầu, chưa ai đăng nhập

  // Hàm để đăng nhập (sau này sẽ gọi API)
  const login = (userData) => {
    setCurrentUser(userData);
  };

  // Hàm để đăng xuất
  const logout = () => {
    setCurrentUser(null);
  };

  // Giá trị sẽ được "dán" lên bảng thông báo
  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Tạo một "Hook" tùy chỉnh để dễ dàng "đọc" bảng thông báo
export function useAuth() {
  return useContext(AuthContext);
}