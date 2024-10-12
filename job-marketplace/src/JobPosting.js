import { useState } from "react";
import { ethers } from "ethers";
import abimultisigfac from './Factory_multisig.json';

function JobPosting({ wallet }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [milestones, setMilestones] = useState("");
  const [payment, setPayment] = useState("");
  const [jobHash, setJobHash] = useState(""); // This is no longer needed, but keeping it for the UI

  async function handleSubmit(event) {
    event.preventDefault();

    const jobData = { title, description, milestones, payment };

    try {
      // Creating a multisig wallet using the factory contract
      const FACTORY_ABI = abimultisigfac;
      const FACTORY_ADDRESS = "0xb079272C54a743624ECCf48d6D4761099104d075";
      const factoryContract = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, wallet);

      // Replace these parameters as needed to match your contract
      const transaction = await factoryContract.create([wallet.getAddress()], 1); // Placeholder multisig params
      const receipt = await transaction.wait();

      // Removed IPFS - no jobHash now
      setJobHash(""); // Clear jobHash as we no longer store it

      alert(`Job posted! Contract: ${receipt.contractAddress}`);
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error posting job. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Post a New Job</h2>
      <label>Job Title:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <label>Milestones:</label>
      <textarea value={milestones} onChange={(e) => setMilestones(e.target.value)} />
      <label>Payment:</label>
      <input value={payment} onChange={(e) => setPayment(e.target.value)} />

      <button type="submit">Post Job</button>
      {/* Removed IPFS display */}
      {/* {jobHash && <p>Job stored on IPFS at: {jobHash}</p>} */}
    </form>
  );
}

export default JobPosting;
