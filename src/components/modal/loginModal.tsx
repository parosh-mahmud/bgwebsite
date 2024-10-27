import React, { useState } from 'react';
import axios from 'axios';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick: () => void;
  onLoginSuccess: (userDetails: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSignUpClick, onLoginSuccess }) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.bazigaar.com/lottery/user-login/', {
        email,
        password,
      });

      const { id, token } = response.data;

      // Fetch full user details
      const userDetailsResponse = await axios.get(`https://api.bazigaar.com/user/user_details/${id}`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });

      onLoginSuccess(userDetailsResponse.data); // Pass the entire user details object
      setError(null);
      onClose();
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-md p-6 rounded-lg relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>✕</button>
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <p className="text-sm mb-4">
          Don't have an account? 
          <button onClick={onSignUpClick} className="text-green-600 ml-1">Sign up</button>
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border p-2 rounded-lg" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="border p-2 rounded-lg" 
          />
          <div className="flex justify-between mt-4">
            <button type="button" className="text-black border border-gray-300 py-2 px-4 rounded-lg">
              Forgot Password?
            </button>
            <button type="submit" className="bg-green-500 text-white py-2 px-6 rounded-lg font-bold">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
