import React, { useState, useEffect, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { FiEdit2, FiPlus, FiCopy } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { chatMessages } from '../features/chatMessagesSlice';
import { questionMessages } from '../features/questionMessagesSlice';
import { questionMessagesEdit } from '../features/questionMessagesEditSlice';
import { prompt } from '../features/promptSlice';
import { setIsQuestion } from '../features/isQuestionSlice';
import { kill } from '../features/killSlice'
import { createQuestion } from '../features/createQuestionSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem('authToken');

  const [aliceBusy, setAliceBusy] = useState(false);

  const [chats, setChats] = useState([]);
  const [editedChat, setEditedChat] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState('current');

  const [showOptions, setShowOptions] = useState(false);

  const [responseMessages, setResponseMessages] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false)

  const isQuestion = useSelector(state => state.isQuestion);

  const [chatTitle, setChatTitle] = useState('')

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
  const { data: questionMessagesResponse } = useSelector(state => state.questionMessages) || {};

  useEffect(() => {
    setEditedChat(questionMessagesResponse?.conversations);
  }, [questionMessagesResponse, showOptions]);

  useEffect(() => {
    setAliceBusy(isQuestion ?  questionMessagesResponse?.status?.busy : chatMessagesResponse?.status?.busy) 
    setChats(questionMessagesResponse?.conversations);
    if(selectedChatId === 'current'){
      setResponseMessages(chatMessagesResponse?.history);
    }else{
      const { messages } = (chats || []).filter(chat => chat.id === selectedChatId)?.[0] || {};
      setResponseMessages(messages || []);
    }
    scrollToBottom();
  }, [questionMessagesResponse?.conversations, chatMessagesResponse?.history, isQuestion, 
    selectedChatId, questionMessagesResponse?.status?.busy, chatMessagesResponse?.status?.busy, chats]);

  const dispatch = useDispatch();

  const loading = false

  useEffect(() => {

    dispatch(chatMessages());
    dispatch(questionMessages());

    const intervalId = setInterval(() => {
      if(isQuestion){
        dispatch(questionMessages());
      }else{
        dispatch(chatMessages());
      }
      
    }, 10000); 

    return () => clearInterval(intervalId); 
  }, [dispatch, token, isQuestion]);

  useEffect(() => {
    scrollToBottom();
  }, [responseMessages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  const handleSendMessage = () => {
    if ((input || '').trim()) {
      dispatch(prompt({ input, id: selectedChatId }));
      setInput('');
    }
  };

  const handleChangeChats = (chatId, showOptionsVal = false) => {
    setSelectedChatId(chatId);

    if (chatId === 'current') {
      dispatch(setIsQuestion(false))
      setResponseMessages(chatMessagesResponse?.history);
    } else {
      dispatch(setIsQuestion(true))
      const { messages } = (chats || []).filter(chat => chat.id === chatId)?.[0] || {};
      setResponseMessages(messages || []);
          }
    setShowOptions(showOptionsVal);
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

  const [killDone, setKillDone] = useState(false)

  const handleKill = () => {
    dispatch(kill())
    setKillDone(true)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChatTitle = (event) => {
    event.preventDefault();
    dispatch(createQuestion({name: chatTitle}))
    setIsModalOpen(false)
    setChatTitle('')
  }

  const handleTextCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(responseMessages))
  }

  return (
    <div className="flex flex-col">
      {(
        <div className="bg-gray-200 p-2 flex items-center justify-between">
          <div className="flex items-center overflow-x-auto">
              {showOptions && 
              <>
              <button
              className="p-2 rounded mr-2 bg-white shadow cursor-pointer"
              onClick={() => {setIsModalOpen(true)}}
              >
                <FiPlus size={20} />
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                onClick={()=>{handleTextCopy()}}
              >
                <>
                  <FiCopy className="inline-block mr-1"/> Copy
                </>
              </button>
              </>
              }
            {showOptions && (chats || []).map((chat, index) => (
              <div
                key={index}
                className={`p-2 rounded mr-2 cursor-pointer ${selectedChatId === chat.id ? 'bg-green-200' : 'bg-white shadow'}`}
                onClick={() => handleChangeChats(chat?.id, true)}
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
            ))}
          </div>
          <div className="flex">
            <div
              className={`p-2 rounded mr-2 cursor-pointer ${selectedChatId === 'current' ? 'bg-blue-500 text-white' : 'bg-white shadow'}`}
              onClick={() => handleChangeChats('current')}
            >
              Current Chat
            </div>
            {
              <div className={`p-2 rounded mr-2 cursor-pointer ${selectedChatId !== 'current' ? 'bg-blue-500 text-white' : 'bg-white shadow'}`}
                onClick={() => {
                  const showOptionsVal = true;
                  handleChangeChats(chats?.[0]?.id, showOptionsVal);
                }}
              >
                QnA
              </div>}
          </div>
        </div>
      )}

      <div className="flex-grow p-4 bg-gray-100 overflow-y-auto" style={{ height: 'calc(75vh)' }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          (responseMessages || []).map((msg, index) => ({
            text: msg.message,
            sender: msg.from === 'You' ? 'user' : 'alice',
            timestamp: msg.timestamp,
            id: index
          })).map((message) => (
            <div
              key={message.id}
              className={`mb-2 p-2 rounded shadow max-w-md ${
                message.sender === 'user' ? `${showOptions ? 'bg-green-200' : 'bg-white'} self-start` : 'bg-gray-300 self-end'
              }`}
              style={{ marginLeft: message.sender === 'alice' ? 'inherit' : 'auto' }}
            >
              <div className="text-xs text-gray-500 mb-1">{formatTimestamp(message.timestamp)}</div>
              {message.text}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-gray-200 flex items-center justify-between">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded mr-2"
          placeholder={aliceBusy ? 'Alice is Busy' : 'Type a message...'}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          disabled={aliceBusy}
        />
        {aliceBusy &&
          <button
          onClick={() => handleKill()}
          className={`p-2 ${killDone ? 'bg-gray-500':'bg-red-500'} text-white rounded flex-shrink-0 mr-2`}
        >
          Kill
        </button>}
        <button
          onClick={() => handleSendMessage()}
          className={`p-2 ${aliceBusy ? 'bg-gray-500':'bg-blue-500'} text-white rounded flex-shrink-0`}
        >
          <FaArrowUp />
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg text-black w-96">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2 className="text-2xl font-bold mb-4">New Chat</h2>
            <form onSubmit={handleChatTitle}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chatTitle">
                  Chat Title
                </label>
                <input
                  type="text"
                  id="chatTitle"
                  name="chatTitle"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter title"
                  value={chatTitle}
                  onChange={(event) => setChatTitle(event.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
