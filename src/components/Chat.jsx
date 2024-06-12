import React, { useState, useEffect, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { chatMessages } from '../features/chatMessagesSlice';
import { questionMessages } from '../features/questionMessagesSlice';
import { questionMessagesEdit } from '../features/questionMessagesEditSlice';
import { prompt } from '../features/promptSlice';

const Chat = () => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const [chats, setChats] = useState([]);
  const [editedChat, setEditedChat] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState('current');

  const [responseMessages, setResponseMessages] = useState([]);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedChat(chats?.[index]?.name);
  };

  const handleSaveClick = ({ id, name }) => {
    const updatedChats = [...chats];
    updatedChats[editIndex] = editedChat;
    setChats(updatedChats);
    setEditIndex(null);
    setEditedChat('');
    dispatch(questionMessagesEdit({ id, name }));
  };

  const { data: chatMessagesResponse } = useSelector(state => state.chatMessages) || {};
  const { loading, data: questionMessagesResponse } = useSelector(state => state.questionMessages) || {};

  useEffect(() => {
    setEditedChat(questionMessagesResponse?.conversations);
  }, [questionMessagesResponse]);

  useEffect(() => {
    setChats(questionMessagesResponse?.conversations);
    setResponseMessages(chatMessagesResponse?.history);
    setSelectedChatId('current')
  }, [questionMessagesResponse?.conversations, chatMessagesResponse?.history]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(chatMessages());
    dispatch(questionMessages());
  }, [dispatch]);

  const handleSendMessage = () => {
    if ((input || '').trim()) {
      dispatch(prompt({ input }));
      setInput('');
    }
  };

  const handleChangeChats = (chatId) => {
    setSelectedChatId(chatId); 

    if(chatId === 'current'){
      setResponseMessages(chatMessagesResponse?.history)
    }else{
      const { messages } = (chats || []).filter(chat => chat.id === chatId)?.[0] || {};
      setResponseMessages(messages);
    }

    
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
    <div className="flex flex-col h-full">
      {!!chats?.length &&
        <div className="bg-gray-200 p-2 flex items-center overflow-x-auto">
          {
            (chats || [])
              .map((chat, index) => (
                <div
                  key={index}
                  className={`p-2 rounded mr-2 cursor-pointer ${selectedChatId === chat.id ? 'bg-blue-500' : 'bg-white shadow'}`} 
                  onClick={() => handleChangeChats(chat?.id)}
                >
                  {index === editIndex ? (
                    <div>
                      <input
                        type="text"
                        value={editedChat}
                        onChange={(e) => setEditedChat(e.target.value)}
                        className="mr-2"
                      />
                      <button
                        onClick={() => { handleSaveClick({ id: chat.id, name: editedChat }) }}
                        className="bg-blue-500 text-white p-1 rounded"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      {chat?.name}
                      <FiEdit2
                        onClick={() => handleEditClick(index)}
                        className="ml-2 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              ))
          }
          <div
            className={`p-2 rounded mr-2 cursor-pointer ${selectedChatId === 'current' ? 'bg-blue-500 text-white' : 'bg-white shadow'}`} // Current Chat Tab
            onClick={() => handleChangeChats('current')}
          >
            Current Chat
          </div>
        </div>
      }

      <div className="flex-grow p-4 bg-gray-100 overflow-y-auto" style={{ height: 'calc(700px)' }}>
        {loading ? (
          <p>Loading...</p>
        ) :
          (responseMessages || [])
            .map((msg, index) => ({
              text: msg.message,
              sender: msg.from === 'You' ? 'user' : 'alice',
              timestamp: msg.timestamp,
              id: index
            }))
            .map((message) => (
              <div
                key={message.id}
                className={`mb-2 p-2 rounded shadow max-w-md ${
                  message.sender === 'user' ? 'bg-white self-start' : 'bg-gray-300 self-end'
                }`}
                style={{ marginLeft: message.sender === 'alice' ? 'inherit' : 'auto' }}
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
          onClick={() => handleSendMessage()}
          className="p-2 bg-blue-500 text-white rounded"
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default Chat;
