
import React, { useEffect, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';
import { BASE_URL } from '../../DATA/category';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  let { userId } = useParams(); 
  useEffect(() => {
    socket.on('chat message', (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      socket.emit('chat message', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
          <h1 className="text-2xl font-semibold">Chat Room</h1>
          <Link to={`/userlist`} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none">
            Exit
          </Link>
        </div>
        <div className="p-4 flex flex-col h-96">
          <div className="overflow-y-auto mb-4 flex-1">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-2 p-2 max-w-xs mx-2 rounded-lg ${
                  index % 2 === 0 ? 'bg-blue-500 text-white self-start' : 'bg-gray-200 text-gray-800 self-end'
                }`}
              >
                {message}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              className="flex-1 border border-gray-300 px-4 py-2 rounded-l focus:outline-none"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
