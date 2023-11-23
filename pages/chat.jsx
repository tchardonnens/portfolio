// components/Chat.js
import { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]); // State to store messages
  const [input, setInput] = useState(''); // State to store the current input

  // Function to handle sending a message
  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-auto p-4 space-y-4">
        <p className='text-2xl text-white text-center'>Chat with me</p>
        {messages.map((message, index) => (
          <div key={index} className="max-w-xs p-2 rounded-lg text-white">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="border-t p-4 flex-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded w-3/4"
          placeholder="Wassup?"
        />
        <button
          type="submit"
          className="bg-white text-black p-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
