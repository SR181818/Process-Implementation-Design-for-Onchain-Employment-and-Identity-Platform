import { useState, useEffect } from "react";

function Chat({ jobAddress }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        // Establish WebSocket connection (can be replaced by Push Protocol)
        const ws = new WebSocket(`wss://chat-server-url/${jobAddress}`);

        ws.onmessage = (message) => {
            setMessages(prevMessages => [...prevMessages, message.data]);
        };

        return () => {
            ws.close();  // Cleanup on component unmount
        };
    }, [jobAddress]);

    function sendMessage() {
        const ws = new WebSocket(`wss://chat-server-url/${jobAddress}`);
        ws.send(newMessage);
        setNewMessage("");  // Clear input after sending
    }

    return (
        <div>
            <h3>Chat for Contract: {jobAddress}</h3>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <input 
                type="text" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
                placeholder="Type your message..." 
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;
