import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import resetImg from "../../assets/forgot.svg";
import { AiOutlineClose } from "react-icons/ai";

const Reset = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/password/reset/', {
        email: email,
      });
      setMessage('A reset link has been sent to your email.');
      setError(null);
    } catch (error) {
      setMessage(null);
      setError('Failed to send reset link. Please check the email address and try again.');
    }
  };

  return (
    <div className="Auth-page --flex-center">
      <div className="form-container reset">
        <form className="--form-control" onSubmit={handleSubmit}>
          <h2 className="--color-danger --text-center">Reset</h2>
          <input
            type="email"
            className="--width-100"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="--btn --btn-primary --btn-block">
            Reset Password
          </button>
          {message && <div className="--color-success">{message}</div>}
          {error && <div className="--color-danger">{error}</div>}
          <span className="--text-sm --block --text-center">
            We will send you a reset link!!!
          </span>
          <div className="close" onClick={onLogin}>
            <AiOutlineClose color="red" />
          </div>
        </form>
      </div>
      <div className="img-container">
        <img src={resetImg} alt="login" />
      </div>
    </div>
  );
};

export default Reset;
