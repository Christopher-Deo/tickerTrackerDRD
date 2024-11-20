import React, { useState } from "react";
import axios from "axios";
import registerImg from "../../assets/register.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import getCSRFToken from "../../getCSRFToken"; // Import the CSRF token function
import "./AuthContainer.scss";

const Register = ({ onLogin, onTogglePassword, onShowPassword }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await axios.post("http://localhost:8000/api/auth/registration/", {
        username,
        email,
        password1: password,
        password2: confirmPassword,
      }, {
        withCredentials: true, // Allow sending cookies and credentials
        headers: {
          'X-CSRFTOKEN': getCSRFToken(), // CSRF token from cookies
        },
      });
      setSuccess("Registration successful. You can now log in.");
      setError("");
      setTimeout(onLogin, 2000); // Redirect to login after 2 seconds
    } catch (error) {
      setError("Registration failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="Auth-page --flex-center">
      <div className="img-container">
        <img src={registerImg} alt="register" />
      </div>
      <div className="form-container">
        <form className="--form-control" onSubmit={handleRegister}>
          <h2 className="--color-primary --text-center">Register</h2>
          <input
            type="text"
            className="--width-100"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            className="--width-100"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          <div className="password">
            <input
              type={onShowPassword ? "text" : "password"}
              className="--width-100"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="icon" onClick={onTogglePassword}>
              {onShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <button className="--btn --btn-primary --btn-block" type="submit">
            Register
          </button>
          {error && <p className="--color-danger">{error}</p>}
          {success && <p className="--color-success">{success}</p>}
          <span className="--text-sm --block">
            Already have an account?{" "}
            <button className="--text-sm" onClick={onLogin}>Login</button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
