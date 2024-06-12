import React, { useState, useEffect, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const dummyData = [
  {
      "from": "Alice",
      "message": "Hello user.",
      "timestamp": "2023-09-28T15:27:32.296859"
  },
  {
      "from": "You",
      "message": "Please research Microsoft stock performance recently",
      "timestamp": "2023-09-28T15:28:54.836121"
  },
  {
      "from": "Alice",
      "message": "Hello dear user, I have been working on researching Microsoft stock performance and investigating a South America mining investigation. Is there anything specific you need assistance with?",
      "timestamp": "2023-10-01T22:27:03.705094"
  },
  {
      "from": "You",
      "message": "Hello ALICE. Please investigate the South America lithium mining operation and possible investments in the space",
      "timestamp": "2023-10-01T22:27:03.705462"
  },
  {
      "from": "Alice",
      "message": "Hello dear user, I have been working on researching Microsoft stock performance and then investigating a South America mining investigation, specifically the lithium mining operation and possible investments in the space. Is there anything specific you would like to know or discuss?",
      "timestamp": "2023-10-02T03:02:36.933729"
  },
  {
    "from": "You",
    "message": "Please research Microsoft stock performance recently",
    "timestamp": "2023-09-28T15:28:54.836121"
},
{
    "from": "Alice",
    "message": "Hello dear user, I have been working on researching Microsoft stock performance and investigating a South America mining investigation. Is there anything specific you need assistance with?",
    "timestamp": "2023-10-01T22:27:03.705094"
}];

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages(dummyData.map((msg, index) => ({
      text: msg.message,
      sender: msg.from === 'You' ? 'user' : 'bot',
      timestamp: msg.timestamp,
      id: index
    })));
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        sender: 'user',
        timestamp: new Date().toISOString(),
        id: messages.length // Unique id for the message
      };
      const newMessages = [...messages, newMessage];
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
    const botMessage = {
      text: autoResponseText,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      id: newMessages.length // Unique id for the message
    };
    setMessages([...newMessages, botMessage]);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    const timeString = date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit'
    });
    return `${dateString} ${timeString}`;
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow p-4 bg-gray-100 overflow-y-auto" style={{ maxHeight: 'calc(100% - 64px)' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded shadow max-w-md ${
              message.sender === 'user' ? 'bg-white self-start' : 'bg-gray-300 self-end'
            }`}
            style={{ marginLeft: message.sender === 'bot' ? 'inherit' : 'auto' }}
          >
            <div className="text-xs text-gray-500 mb-1">{formatTimestamp(message.timestamp)}</div>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
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
