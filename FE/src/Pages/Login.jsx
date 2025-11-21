import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../interface.css"; // giữ nguyên CSS cũ

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginMessage, setLoginMessage] = useState(""); // thêm state hiển thị lỗi
  const navigate = useNavigate();

  const regUsernameRef = useRef();
  const regPasswordRef = useRef();
  const regEmailRef = useRef();
  const regFullnameRef = useRef();
  const regPhoneRef = useRef();

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


  const register = async (e) => {
    e.preventDefault();

    const username = regUsernameRef.current.value.trim();
    const password = regPasswordRef.current.value.trim();
    const email = regEmailRef.current.value.trim();
    const fullname = regFullnameRef.current.value.trim();
    const phone = regPhoneRef.current.value.trim();


    let lowerCaseLetter = /[a-z]/g;
    let upperCaseLetter = /[A-Z]/g;
    let numbers = /[0-9]/g;

    // Lấy thẻ hiển thị lỗi từ React (nên là state nhưng tạm thời vẫn dùng id)
    const regMessage = document.getElementById("regMessage");

    // Validate
    if (!username || !password || !email || !fullname || !phone) {
      regMessage.innerText = "Please fill in all fields";
      regMessage.style.color = "red";
      return;
    }

    if (password.length < 8) {
      regMessage.innerText = "Password must be at least 8 characters.";
      regMessage.style.color = "red";
      return;
    }
    if (!lowerCaseLetter.test(password)) {
      regMessage.innerText = "Password must contain a lowercase letter.";
      regMessage.style.color = "red";
      return;
    }
    if (!upperCaseLetter.test(password)) {
      regMessage.innerText = "Password must contain an uppercase letter.";
      regMessage.style.color = "red";
      return;
    }
    if (!numbers.test(password)) {
      regMessage.innerText = "Password must contain a number.";
      regMessage.style.color = "red";
      return;
    }

    // Gọi API BE
    let response = await fetch("http://localhost:1105/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname,  regUsername: username, password, email, phone }),
    });

    let result = await response.json();
    regMessage.innerText = result.message;
    regMessage.style.color = response.ok ? "green" : "red";
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
              <button type="button" className="btn1" onClick={forgotpass}>Forgot Password</button>
            </form>

            {!isLogin && (
              <form className="form-item sign-up" onSubmit={register}>
                <h1>Sign up</h1>
                <input ref={regEmailRef} name="regEmail" placeholder="Email" />
                <input ref={regPhoneRef} name="regPhone" placeholder="Phone" />
                <input ref={regFullnameRef} name="regFullname" placeholder="Full name" />
                <input ref={regUsernameRef} name="regUsername" placeholder="User name" />
                <input ref={regPasswordRef} name="regPassword" placeholder="Password" type="password" />
                <div id="regMessage"></div>
                <button type="submit" className="btn">Sign up</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
