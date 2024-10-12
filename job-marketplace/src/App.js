// src/App.js

import React, { useState } from 'react';
import JobPostingForm from './components/JobPostingForm';
import JobList from './components/JobList';

function App() {
  const [jobs, setJobs] = useState([
    { id: 1, description: 'Blockchain Developer', paymentTerms: 'Hourly', deadline: '2024-12-01' },
    { id: 2, description: 'React Developer', paymentTerms: 'Fixed', deadline: '2024-11-15' },
  ]);

  return (
    <div className="App">
      <JobPostingForm />
      <JobList jobs={jobs} />
    </div>
  );
}

export default App;
