import React, { useState } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am your chatbot. Ask me anything!" },
  ]);
  const [isOpen, setIsOpen] = useState(true);

  // Hardcoded chatbot logic
  const getResponse = (question) => {
    const lowerCaseQuestion = question.toLowerCase();

    if (lowerCaseQuestion.includes("hello")) {
      return "Hi there! How can I assist you today?";
    } else if (lowerCaseQuestion.includes("javascript")) {
      return "JavaScript is a versatile programming language used for web development.";
    } else if (lowerCaseQuestion.includes("java")) {
      return "We do not provide Java answers.";
    } else {
      return "I'm sorry, I don't understand that. Can you rephrase?";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // Generate bot response
    const botResponse = getResponse(input);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 500);

    // Clear input
    setInput("");
  };

  if (!isOpen) return (
    <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
      Open Chatbot
    </button>
  );

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        <div className="chat-header">
          <h3>Chatbot</h3>
          <button className="close-button" onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "bot" ? "bot" : "user"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <textarea
            rows="2"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
