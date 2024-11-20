import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import loginImg from "../../assets/login.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = ({ onRegister, onReset, onTogglePassword, onShowPassword }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("http://localhost:8000/api/auth/login/", {
        username,
        password,
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
      // Log successful login
      console.log("Login Successful!");
      setError("");
    } catch (error) {
      console.log(error);
      setError("Invalid credentials");
    }
  };

  return (
    <div className= "Auth-page --flex-center">
      <div className="img-container">
        <img src={loginImg} alt="login" />
      </div>
      <div className="form-container">
        <form className="--form-control" onSubmit={handleLogin}>
          <h2 className="--color-danger --text-center">Login</h2>
          <input
            type="text"
            className="--width-100"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="password">
            <input
              type={onShowPassword ? "text" : "password"}
              className="--width-100"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="icon" onClick={onTogglePassword}>
              {onShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <button className="--btn --btn-primary --btn-block" type="submit">
            Login
          </button>
          <button
            type="button"
            className="--text-sm --btn-link"
            onClick={onRegister}
          >
            Register
          </button>
          <button
            type="button"
            className="--text-sm --btn-link"
            onClick={onReset}
          >
            Reset Password
          </button>
          {error && <p className="--color-danger">{error}</p>}
          <span className="--text-sm --block">
            Don't have an account?{" "}
            <button type="button" className="--text-sm --btn-link" onClick={onRegister}>
              Register
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
