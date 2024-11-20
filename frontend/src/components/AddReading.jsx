import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const AddReading = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('http://localhost:8000/api/readings/', {
        date,
        time,
        systolic,
        diastolic,
        pulse,
        oxygen,
      });
      setSuccess('Reading added successfully!');
      setError('');
      // Optionally redirect to another page
//       navigate.push('/some-other-page'); // Adjust the redirect as needed
    } catch (error) {
      setSuccess('');
      setError('Failed to add reading. Please try again.');
    }
  };

  return (
    <div className="Full-page --flex-center">
      <div className="form-container">
        <form className="--form-control" onSubmit={handleSubmit}>
          <h2 className="--color-primary --text-center">Add Reading</h2>
          <input
            type="date"
            className="--width-100"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            className="--width-100"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <input
            type="number"
            className="--width-100"
            placeholder="Systolic"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            required
          />
          <input
            type="number"
            className="--width-100"
            placeholder="Diastolic"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            required
          />
          <input
            type="number"
            className="--width-100"
            placeholder="Pulse"
            value={pulse}
            onChange={(e) => setPulse(e.target.value)}
          />
          <input
            type="number"
            className="--width-100"
            placeholder="Oxygen"
            value={oxygen}
            onChange={(e) => setOxygen(e.target.value)}
          />
          <button className="--btn --btn-primary --btn-block" type="submit">
            Add Reading
          </button>
          {success && <p className="--color-success">{success}</p>}
          {error && <p className="--color-danger">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddReading;
