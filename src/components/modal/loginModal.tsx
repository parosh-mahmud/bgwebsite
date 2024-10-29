import React, { useState } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Step 1: Log in and get basic details and token
      const loginResponse = await axios.post('https://api.bazigaar.com/lottery/user-login/', {
        email,
        password,
      });

      const { id, token } = loginResponse.data;

      // Step 2: Use the token to fetch full user details
      const userDetailsResponse = await axios.get(`https://api.bazigaar.com/user/user_details/${id}`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });

      // Combine token with full user details
      const fullUserDetails = {
        ...userDetailsResponse.data,
        token, // Include token from login response
      };

      // Save full user details and token to localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userDetails", JSON.stringify(fullUserDetails));

      // Pass full details to parent component
      onLoginSuccess(fullUserDetails);
      setError(null);
      onClose();
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-md p-6 rounded-lg relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-xl text-center font-bold text-green-700">Welcome to Bazigaar</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <CloseIcon />
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Username Field */}
          <div className="relative">
            <label className="absolute -top-5 bg-white px-1 text-gray-600 text-sm">Username/Email</label>
            <AccountCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="absolute -top-3 bg-white px-1 text-gray-600 text-sm">Password</label>
            <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:border-green-500 mt-2"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button type="button" className="text-sm text-gray-600 hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold py-2 rounded-lg mt-2 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Login now
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm mt-4">
          Do not have an account?{' '}
          <button onClick={onSignUpClick} className="text-green-600 font-bold hover:underline">
            Sign Up now!
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
