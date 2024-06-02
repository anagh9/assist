// src/components/Chat.js
import React, { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');
      // Trigger auto-response after a delay
      setTimeout(() => {
        handleAutoResponse(newMessages);
      }, 1000); // 1 second delay for the auto-response
    }
  };

  const handleAutoResponse = (newMessages) => {
    const autoResponseText = "This is an auto-response.";
    setMessages([...newMessages, { text: autoResponseText, sender: 'bot' }]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-4 bg-gray-100 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded shadow max-w-md ${
              message.sender === 'user' ? 'bg-white self-start' : 'bg-gray-300 self-end'
            }`}
            style={{ marginLeft: message.sender === 'bot' ? 'inherit' : 'auto' }}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-200 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded mr-2"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded"
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default Chat;
