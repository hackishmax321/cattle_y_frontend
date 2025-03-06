import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ENV from "../data/Env";

const socket = io(ENV.SERVER); 

const ChatMessages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { username: "Guest" };
  });

  useEffect(() => {
    // Connect and join the chat room
    socket.emit("join_room", { room: "global" });

    // Listen for chat history
    socket.on("chat_history", (chatHistory) => {
      setMessages(chatHistory);
    });

    // Listen for incoming messages
    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      room: "global",
      user: user.username,
      message: newMessage,
    };

    socket.emit("send_message", messageData);
    setNewMessage("");
  };

  return (
    <div className="chatContainer">
      <div className="chatHeader">
        <h2>Chat Messages</h2>
      </div>
      <div className="chatMessages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user === user.username ? "self" : "other"}`}>
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="chatInput">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatMessages;
