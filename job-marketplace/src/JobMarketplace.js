import { useState, useEffect } from "react";
import { ethers } from "ethers";
import multisigfactory from "./factory.json";
import Chat from './Chat';  // Real-time chat component
import ChatHistory from './ChatHistory'; // Component for old chat history

function JobMarketplace({ wallet }) {
    const [jobs, setJobs] = useState([]);
    const [connectedContracts, setConnectedContracts] = useState([]);  // Track connected contracts

    useEffect(() => {
        async function fetchJobs() {
            const FACTORY_ABI = multisigfactory;
            const FACTORY_ADDRESS = "0xB3d9E2C3Ca370603398516608d9edFbbC0AC4a79";
            const factoryContract = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, wallet);

            // Fetch total instantiations count
            const jobCount = await factoryContract.getInstantiationCount();

            let fetchedJobs = [];
            const limit = Math.min(jobCount, 1000);
            for (let i = 0; i < limit; i++) {
                try {
                    const jobAddress = await factoryContract.getInstantiation(i);
                    fetchedJobs.push({ contract: jobAddress });
                } catch (error) {
                    console.error(`Failed to fetch instantiation at index ${i}:`, error);
                }
            }
            setJobs(fetchedJobs);
        }

        fetchJobs();
    }, [wallet]);

    // Simulate job contract connection (replace with real connection logic)
    async function connectToJob(jobAddress) {
        // Here you should check the actual connection logic for employer and worker.
        setConnectedContracts([...connectedContracts, jobAddress]);
        alert(`Connected to job contract: ${jobAddress}`);
    }

    return (
        <div>
            <h2>Job Listings</h2>
            <ul>
                {jobs.map((job, index) => (
                    <li key={index}>
                        <p>Job Contract: {job.contract}</p>
                        <button onClick={() => connectToJob(job.contract)}>Connect</button>
                        {/* Only show chat if connected */}
                        {connectedContracts.includes(job.contract) && <Chat jobAddress={job.contract} />}
                    </li>
                ))}
            </ul>
            {/* Page to view chat history */}
            <ChatHistory />
        </div>
    );
}

export default JobMarketplace;
