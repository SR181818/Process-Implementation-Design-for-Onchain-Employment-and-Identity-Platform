import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import Chat from './pages/Chat';
import Register from './components/Register';  // Register for sign-up
import Verification from './components/Verification';  // Verification for log-in
import PreviousChats from './pages/PreviousChats';
import Navbar from './Navbar';

function App() {
  // State to track whether the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Callback function to handle successful registration or login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Navbar />
      <div>
        <h1>Web3 Registration and Login</h1>

        <Routes>
          {/* Registration page (sign-up) */}
          <Route path="/" element={<Register onLogin={handleLogin} />} />

          {/* Verification page (login) */}
          <Route path="/verify" element={<Verification onLogin={handleLogin} />} />

          {/* Protected routes - accessible only after authentication */}
          <Route
            path="/job-listings"
            element={isAuthenticated ? <JobListings /> : <Navigate to="/" />}
          />
          <Route
            path="/job/:jobId"
            element={isAuthenticated ? <JobDetails /> : <Navigate to="/" />}
          />
          <Route
            path="/chat/:jobId"
            element={isAuthenticated ? <Chat /> : <Navigate to="/" />}
          />
          <Route
            path="/previous-chats"
            element={isAuthenticated ? <PreviousChats /> : <Navigate to="/" />}
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/job-listings" : "/"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
