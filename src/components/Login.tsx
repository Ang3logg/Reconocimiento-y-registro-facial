import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, MessageCircle } from 'lucide-react';
import { TrilceLogo } from './ui/TrilceLogo';

interface LoginProps {
  onLogin: (role: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin('admin');
      navigate('/attendance');
    } else if (username === 'user' && password === 'user123') {
      onLogin('user');
      navigate('/attendance');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black bg-opacity-40 rounded-2xl p-8 backdrop-blur-lg shadow-[0_0_15px_rgba(0,255,255,0.3)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 opacity-20"></div>
        
        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <TrilceLogo />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-cyan-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border-0 border-b-2 border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="Username"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-cyan-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border-0 border-b-2 border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="Password"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate('/chatbot')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-md hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              ChatBot UCV
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-300">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-cyan-400 hover:text-cyan-300">
              Contact administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}