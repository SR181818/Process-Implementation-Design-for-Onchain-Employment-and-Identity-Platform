// src/components/JobPostingForm.js

import React, { useState } from 'react';
import { uploadToIPFS, postJobToBlockchain } from '../utils';

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    paymentTerms: '',
    deadline: ''
  });

  const [account, setAccount] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);

    // Upload job details to IPFS
    const jobHash = await uploadToIPFS(JSON.stringify(formData));
    console.log('Job details stored on IPFS: ', jobHash);

    // Post job to the blockchain
    const txHash = await postJobToBlockchain(formData, accounts[0]);
    console.log('Job posted on blockchain, txHash: ', txHash);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Post a New Job</h3>
      <input
        type="text"
        name="description"
        placeholder="Job Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="paymentTerms"
        placeholder="Payment Terms"
        value={formData.paymentTerms}
        onChange={handleChange}
      />
      <input
        type="date"
        name="deadline"
        placeholder="Deadline"
        value={formData.deadline}
        onChange={handleChange}
      />
      <button type="submit">Submit Job</button>
    </form>
  );
};

export default JobPostingForm;
