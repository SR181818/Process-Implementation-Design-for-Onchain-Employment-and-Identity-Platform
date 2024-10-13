import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import Chat from './pages/Chat';
import Register from './components/Register';  // Register for sign-up
import Verification from './components/Verification';  // Verification for log-in
import PreviousChats from './pages/PreviousChats';
import Navbar from './Navbar';
import Home from './pages/Home';  // Main landing page
import JobPosting from './JobPosting'; // Job Posting component
import './App.css';  // Import the App CSS for the background theme

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <h1>Web3 Job Marketplace</h1>

        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<Home />} />

          {/* Registration page */}
          <Route path="/register" element={<Register onLogin={handleLogin} />} />

          {/* Verification (Login) page */}
          <Route path="/verify" element={<Verification onLogin={handleLogin} />} />

          {/* Job posting page */}
          <Route path="/post-job" element={isAuthenticated ? <JobPosting wallet={window.ethereum} onJobPosted={() => {}} /> : <Navigate to="/" />} />

          {/* Job Listings page */}
          <Route path="/job-listings" element={isAuthenticated ? <JobListings wallet={window.ethereum} /> : <Navigate to="/" />} />

          {/* Protected routes - accessible only after authentication */}
          <Route path="/job/:jobId" element={isAuthenticated ? <JobDetails /> : <Navigate to="/" />} />
          <Route path="/chat/:jobId" element={isAuthenticated ? <Chat /> : <Navigate to="/" />} />
          <Route path="/previous-chats" element={isAuthenticated ? <PreviousChats /> : <Navigate to="/" />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/job-listings" : "/"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
