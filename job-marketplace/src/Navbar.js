import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import './Navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [wallet, setWallet] = useState(null);
    const [address, setAddress] = useState(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Function to connect to the user's wallet
    async function connectWallet() {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                const userAddress = await signer.getAddress();
                setWallet(signer);
                setAddress(userAddress);
            } catch (error) {
                console.error('Wallet connection failed:', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    }

    useEffect(() => {
        // Auto-connect wallet if already connected
        if (window.ethereum && window.ethereum.selectedAddress) {
            connectWallet();
        }
    }, []);

    return (
        <nav className="navbar">
            <div className="logo">
                <h2>Job Marketplace</h2>
            </div>
            <div className="menu-toggle" onClick={toggleMenu}>
                {/* Hamburger Icon */}
                <span className="hamburger"></span>
                <span className="hamburger"></span>
                <span className="hamburger"></span>
            </div>
            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li><Link to="/job/:jobId" onClick={toggleMenu}>Jobs</Link></li>
                <li><Link to="/post-job" onClick={toggleMenu}>Post a Job</Link></li>
                <li><Link to="/chat/:jobId" onClick={toggleMenu}>Chats</Link></li>
                <li><Link to="/previous-chats" onClick={toggleMenu}>Old Chats</Link></li>
            </ul>
            <div className="wallet">
                {!wallet ? (
                    <button onClick={connectWallet}>Connect Wallet</button>
                ) : (
                    <p>Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
