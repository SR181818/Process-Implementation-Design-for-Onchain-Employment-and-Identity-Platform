// src/utils.js

import { create } from 'ipfs-http-client';
import Web3 from 'web3';

// IPFS setup
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});

// Web3 setup
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address
const contractABI = [/* Your Contract ABI here */];
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Upload to IPFS
export const uploadToIPFS = async (file) => {
  const added = await ipfs.add(file);
  return added.path;
};

// Post Job to Blockchain
export const postJobToBlockchain = async (jobData, fromAddress) => {
  const tx = await contract.methods.createJob(
    jobData.description,
    jobData.paymentTerms,
    jobData.deadline
  ).send({ from: fromAddress });

  return tx.transactionHash;
};

// Apply to Job
export const applyToJob = async (applicationData, fromAddress) => {
  const tx = await contract.methods.applyToJob(
    applicationData.jobId,
    applicationData.applicationHash // IPFS hash of the application
  ).send({ from: fromAddress });

  return tx.transactionHash;
};
