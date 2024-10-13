import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import Chat from './pages/Chat';
import Verification from './components/Verification';
import PreviousChats from './pages/PreviousChats';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<JobListings />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/chat/:jobId" element={<Chat />} />
          <Route path="/previous-chats" element={<PreviousChats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
