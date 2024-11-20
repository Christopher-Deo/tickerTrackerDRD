// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "./index.css";

// Find the root element
const container = document.getElementById('root');

// Create a root.
const root = createRoot(container);

// Initial render: Render the root component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
