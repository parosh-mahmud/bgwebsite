import React from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSignUpClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-md p-6 rounded-lg relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>✕</button>
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <p className="text-sm mb-4">
          Don't have an account? 
          <button onClick={onSignUpClick} className="text-green-600 ml-1">Sign up</button>
        </p>

        <div className="flex gap-4 mb-4">
          <button className="flex-1 py-2 border rounded-lg flex items-center justify-center gap-2">
            Google <span>🌐</span>
          </button>
          <button className="flex-1 py-2 border rounded-lg flex items-center justify-center gap-2">
            Facebook <span>📘</span>
          </button>
        </div>

        <div className="text-center my-4 text-gray-900">OR</div>

        <form className="flex flex-col gap-3">
          <input type="email" placeholder="Email" className="border p-2 rounded-lg" />
          <input type="password" placeholder="Password" className="border p-2 rounded-lg" />
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
