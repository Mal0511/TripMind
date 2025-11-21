
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Login from './Pages/login'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* App layout: tất cả các trang chính */}
        <Route path="/*" element={<App />} />

        {/*  Trang login tách hoàn toàn, độc lập */}
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
