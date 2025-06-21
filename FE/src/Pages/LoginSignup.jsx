import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./CSS/LoginSignup.css";

const LoginSignup = ({ setIsLoggedIn, setFullname }) => { // Nhận từ App
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
  });

  useEffect(() => {
    console.log("REACT_APP_API_URL:", process.env.REACT_APP_API_URL);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        { username: formData.username, password: formData.password }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("fullname", res.data.fullname); // Lưu fullname
      localStorage.setItem("role", res.data.role);

      alert("Đăng nhập thành công!");
      setIsLoggedIn(true); // Cập nhật login cho App
      // setFullname(res.data.fullname); // Cập nhật fullname lên App
      navigate("/");
    } catch (err) {
      console.error("Lỗi đăng nhập:", err.response ? err.response.data : err.message);
      alert("Sai tên người dùng hoặc mật khẩu!");
    }
  };

  const handleSignup = async () => {
    try {
      console.log('Dữ liệu gửi đi:', formData);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        {
          username: formData.username,
          password: formData.password,
          fullname: formData.fullname,
          email: formData.email
        }
      );
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      setState("Login");
      setFormData({ username: "", password: "", fullname: "", email: "" });
    } catch (err) {
      console.error("Lỗi đăng ký:", err.response ? err.response.data : err.message);
      alert("Đăng ký thất bại. Vui lòng thử lại hoặc kiểm tra thông tin.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === "Sign Up") {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="User Name"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </>
          )}
          {state === "Login" && (
            <input
              type="text"
              placeholder="User Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit}>
          {state === "Sign Up" ? "Continue" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => {
              setState("Login");
              setFormData({ username: "", password: "", fullname: "", email: "" });
            }}>
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => {
              setState("Sign Up");
              setFormData({ username: "", password: "", fullname: "", email: "" });
            }}>
              Sign Up here
            </span>
          </p>
        )}

        {state === "Sign Up" && (
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
