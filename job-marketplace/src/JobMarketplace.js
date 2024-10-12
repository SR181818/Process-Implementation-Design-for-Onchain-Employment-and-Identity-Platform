import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import multisigfactory from "./factory.json";

const ipfs = create("https://ipfs.infura.io:5001/api/v0");

function JobMarketplace({ wallet }) {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // Fetch jobs by querying the contract factory for instantiations
        async function fetchJobs() {
            const FACTORY_ABI = multisigfactory;
            const FACTORY_ADDRESS = "0xb079272C54a743624ECCf48d6D4761099104d075";
            const factoryContract = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, wallet);

            // Fetch total instantiations count
            const jobCount = await factoryContract.getInstantiationCount(wallet.getAddress());

            let fetchedJobs = [];

            // Loop through the instantiations from 0 to 1000 (or `jobCount`, whichever is smaller)
            const limit = Math.min(jobCount, 1000);  // Limit the loop to 1000 or `jobCount`, whichever is smaller
            for (let i = 0; i < limit; i++) {
                try {
                    const jobAddress = await factoryContract.instantiations(wallet.getAddress(), i);
                    fetchedJobs.push({ contract: jobAddress });
                } catch (error) {
                    console.error(`Failed to fetch instantiation at index ${i}:`, error);
                }
            }

            // Update state with the fetched jobs
            setJobs(fetchedJobs);
        }

        fetchJobs();
    }, [wallet]);

    async function applyForJob(jobAddress) {
        // Placeholder for applying logic, uploading CV/portfolio to IPFS
        const applicationData = { portfolio: "Your portfolio URL or content" };
        const ipfsResult = await ipfs.add(JSON.stringify(applicationData));

        alert(`Applied! CV stored at: ${ipfsResult.path}`);
    }

    return (
        <div>
            <h2>Job Listings</h2>
            <ul>
                {jobs.map((job, index) => (
                    <li key={index}>
                        <p>Job Contract: {job.contract}</p>
                        <button onClick={() => applyForJob(job.contract)}>Apply</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JobMarketplace;
