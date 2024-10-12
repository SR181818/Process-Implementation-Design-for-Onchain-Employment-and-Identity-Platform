// src/components/JobList.js

import React, { useState, useEffect } from 'react';
import { applyToJob, uploadToIPFS } from '../utils';

const JobList = ({ jobs }) => {
  const [application, setApplication] = useState({ jobId: '', cv: '' });

  const handleChange = (e) => {
    setApplication({
      ...application,
      [e.target.name]: e.target.value
    });
  };

  const handleApply = async (jobId) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Upload CV to IPFS
    const cvHash = await uploadToIPFS(application.cv);
    console.log('CV uploaded to IPFS: ', cvHash);

    // Apply to job
    const txHash = await applyToJob({ jobId, applicationHash: cvHash }, accounts[0]);
    console.log('Applied to job, txHash: ', txHash);
  };

  return (
    <div>
      <h3>Available Jobs</h3>
      <ul>
        {jobs.map((job, idx) => (
          <li key={idx}>
            <h4>{job.description}</h4>
            <p>Payment Terms: {job.paymentTerms}</p>
            <p>Deadline: {job.deadline}</p>
            <button onClick={() => handleApply(job.id)}>Apply</button>
          </li>
        ))}
      </ul>

      <h3>Submit Your Application</h3>
      <textarea
        name="cv"
        placeholder="Paste your CV here"
        value={application.cv}
        onChange={handleChange}
      />
    </div>
  );
};

export default JobList;
