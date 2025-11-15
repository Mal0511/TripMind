import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 1. Import "Người quản lý" từ file bạn vừa tạo
import { AuthProvider } from './Context/AuthContext' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Bọc <App /> của bạn bằng <AuthProvider /> */}
    {/* Bằng cách này, mọi component bên trong App đều có thể "đọc" được bảng thông báo */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)