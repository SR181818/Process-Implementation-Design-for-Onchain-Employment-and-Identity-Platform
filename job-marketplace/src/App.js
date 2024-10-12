import { useState, useEffect } from "react";
import { ethers } from "ethers";
import JobPosting from './JobPosting';
import JobMarketplace from './JobMarketplace';

function App() {
    const [wallet, setWallet] = useState(null);

    async function connectWallet() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            setWallet(signer);
        } else {
            alert("Please install MetaMask to use this app!");
        }
    }

    useEffect(() => {
        connectWallet();
    }, []);

    return (
        <div>
            {wallet ? (
                <>
                    <p>Connected to {wallet.address}</p>
                    <JobPosting wallet={wallet} />
                    <JobMarketplace wallet={wallet} />
                </>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
}

export default App;
