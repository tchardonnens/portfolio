import { useState } from 'react';
import Head from 'next/head';
import SiriSphereLogo from '../components/siriSphereLogo';

export default function Chat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message to the chat
    const newMessages = [...messages, { role: 'user', content: inputMessage }];
    setMessages(newMessages);
    setInputMessage('');

    try {
      // Send the message to your backend API
      const response = await fetch('http://localhost:8000/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Add AI response to the chat
      setMessages([...newMessages, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      // Add an error message to the chat
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, an error occurred. Please try again.' }]);
    }
  };

  return (
    <>
      <Head>
        <title>Thomas Artefact</title>
        <meta name="description" content="Thomas Artefact" />
        <style>{`
          @keyframes glowingBorder {
            0% { box-shadow: 0 0 3px #8A2BE2, 0 0 12px #8A2BE2, 0 0 7px #8A2BE2, 0 0 10px #8A2BE2; }
            50% { box-shadow: 0 0 10px #FFFFFF, 0 0 5px #8A2BE2, 0 0 3px #8A2BE2, 0 0 7px #8A2BE2; }
            100% { box-shadow: 0 0 5px #8A2BE2, 0 0 10px #8A2BE2, 0 0 7px #8A2BE2, 0 0 3px #FFFFFF; }
          }
          .glowing-border {
            animation: glowingBorder 3s ease-in-out infinite;
          }
        `}</style>
      </Head>
      <main className="flex flex-col mx-auto justify-center items-center min-h-screen h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 p-4">
        <div className="w-full max-w-3xl my-auto flex flex-col space-y-4">
          <div className="flex justify-center">
            <SiriSphereLogo size={75} />
          </div>
          <div className="glowing-border bg-gray-100 dark:bg-neutral-900 rounded-lg p-4 overflow-y-auto mb-4 h-[calc(100vh-200px)]">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-800 text-white' : 'bg-neutral-800 dark:bg-neutral-800'}`}>
                  {message.content}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow p-2 border rounded-l-lg dark:bg-neutral-900 dark:border-neutral-800"
              placeholder="Type your message..."
            />
            <button type="submit" className="bg-blue-800 text-white p-2 rounded-r-lg">Send</button>
          </form>
        </div>
      </main>
    </>
  );
}