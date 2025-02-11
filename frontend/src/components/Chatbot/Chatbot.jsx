import React, { useState } from 'react';
import axios from 'axios';
import { FaComments } from 'react-icons/fa';

function Chatbot() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Welcome! How can I assist you? Please ask any medical related query', sender: 'bot' },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // New state for typing

  const handleSend = async () => {
    const userMessage = { text: userInput, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate typing
    setIsTyping(true);
    setUserInput('');

    try {
      const response = await axios.post('http://localhost:5001/api/chat', { message: userInput });
      const botMessage = { text: response.data.reply, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { text: 'Error communicating with the server.', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    }

    // Simulate typing delay before showing the bot message
    setTimeout(() => {
      setIsTyping(false);
    }, 1000); // Adjust delay as needed
  };

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
      >
        <FaComments className="h-6 w-6" />
      </button>
      {isOpen && (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-96 mt-2 flex flex-col transition-all duration-300"style={{ height: '32rem' }}>
          <div className="border border-gray-300 p-2 flex-grow overflow-y-auto rounded-lg bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`p-2 rounded-lg inline-block ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="my-2 text-left">
                <span className="p-2 rounded-lg inline-block bg-gray-200">
                  Typing...
                </span>
              </div>
            )}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white rounded-lg p-2 ml-2 hover:bg-blue-700 transition transform hover:scale-105"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
