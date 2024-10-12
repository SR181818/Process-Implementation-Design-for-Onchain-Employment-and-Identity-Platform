// Chat.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function Chat({ wallet }) {
    const [chats, setChats] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchChat() {
            try {
                // Ensure wallet is connected
                if (!wallet) {
                    throw new Error("Wallet is not connected");
                }

                const address = await wallet.getAddress();
                console.log("User address:", address);

                // Fetch chat data here (mocked for example)
                const fetchedChats = await mockFetchChat(address);
                setChats(fetchedChats);
            } catch (err) {
                console.error("Error fetching chat data:", err);
                setError(err.message);
            }
        }

        fetchChat();
    }, [wallet]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Chat</h2>
            {chats.length > 0 ? (
                <ul>
                    {chats.map((chat, index) => (
                        <li key={index}>{chat.message}</li>
                    ))}
                </ul>
            ) : (
                <p>No chats available.</p>
            )}
        </div>
    );
}

async function mockFetchChat(address) {
    // Replace with actual API call to fetch chat data
    return [
        { message: `Chat for address: ${address}` },
        { message: "Second chat message" }
    ];
}

export default Chat;
