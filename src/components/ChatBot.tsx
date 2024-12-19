import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowLeft } from 'lucide-react';
import { getBotResponse, Message, campusInfo } from './chatbotData';
import CampusMapPreview from './CampusMapPreview';

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "¡Hola! Soy el ChatBot de UCV. ¿En qué puedo ayudarte?🤖", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isBot: false };
    const botMessage = getBotResponse(input);

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
      {/* Header */}
      <div className="bg-black bg-opacity-40 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center">
          <button
            onClick={() => navigate('/')}
            className="text-white hover:text-cyan-400 transition-colors"
            aria-label="Volver a la página principal"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-white ml-4">ChatBot UCV</h1>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 overflow-hidden flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.isBot
                    ? 'bg-gray-800 text-white'
                    : 'bg-cyan-500 text-white'
                }`}
              >
                {message.text}
                {message.isMap && message.planoUrl && message.ubicanosUrl && message.campusUrl && (
                  <CampusMapPreview
                    planoUrl={message.planoUrl}
                    ubicanosUrl={message.ubicanosUrl}
                    campusName={Object.values(campusInfo).find(campus => campus.planoUrl === message.planoUrl)?.name || 'Campus'}
                    campusUrl={message.campusUrl}
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Mensaje para el ChatBot"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            aria-label="Enviar mensaje"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}