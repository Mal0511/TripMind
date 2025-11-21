import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../interface.css"; // giữ nguyên CSS cũ

export default function Login() { 
  const [isLogin, setIsLogin] = useState(true);
  const [loginMessage, setLoginMessage] = useState(""); // thêm state hiển thị lỗi
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const usernameInput = e.target.LoginUsername.value.trim();
    const password = e.target.LoginPassword.value.trim();

    if (!usernameInput || !password) {
      setLoginMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const response = await fetch("http://localhost:1105/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput, password }),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", usernameInput);
        navigate("/"); // quay về Home

      } else {
        setLoginMessage(result.message || "Login failed");
      }
    } catch (error) {
      setLoginMessage("Lỗi kết nối tới server!");
      console.error(error);
    }
  };


  const register = (e) => {
    e.preventDefault();
    const email = e.target.regEmail.value;
    const phone = e.target.regPhone.value;
    const fullname = e.target.regFullname.value;
    const username = e.target.regUsername.value;
    const password = e.target.regPassword.value;
    console.log("Register", { email, phone, fullname, username, password });
    // Gọi API đăng ký ở đây
  };

  const forgotpass = (e) => {
    e.preventDefault();
    alert("Reset password flow");
  };

  return (
    <div className="login-body">
      <div className={`container ${isLogin ? "" : "log-in"}`}>
        <div className="container-forms">
          <div className="container-info">
            <div className="info-item">
              <p>Have an account?</p>
              <button className="btn" onClick={() => setIsLogin(true)}>Log in</button>
            </div>
            <div className="info-item">
              <p>Don't have an account?</p>
              <button className="btn" onClick={() => setIsLogin(false)}>Sign up</button>
            </div>
          </div>

          <div className="container-form">
            <form className="form-item log-in" onSubmit={login}>
              <h1>Login</h1>
              <input id="LoginUsername" name="LoginUsername" placeholder="User name" type="text" />
              <input id="LoginPassword" name="LoginPassword" placeholder="Password" type="password" />
              <div id="LoginMessage"></div>
              <button className="btn" type="submit">Login</button>
              <button className="btn1" onClick={forgotpass}>Forgot Password</button>
            </form>

            <form className="form-item sign-up" onSubmit={register}>
              <h1>Sign up</h1>
              <input type="email" id="regEmail" placeholder="Email" name="regEmail" />
              <input type="text" id="regPhone" name="regPhone" placeholder="Phone number" />
              <input type="text" id="regFullname" name="regFullname" placeholder="Full name" />
              <input type="text" id="regUsername" name="regUsername" placeholder="User name" />
              <input type="password" name="regPassword" placeholder="Password" id="regPassword" />
              <div id="regMessage"></div>
              <button className="btn" type="submit">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
