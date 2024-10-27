import React, { useState } from 'react';
import axios from 'axios';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  verificationKey: string;
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, verificationKey }) => {
  if (!isOpen) return null;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://api.bazigaar.com/user/auth/registration/custom-verify-email/', {
        key: otp
      });
      console.log('OTP verification successful:', response.data);
      setError(null);
      onClose();
    } catch (err) {
      console.error('OTP verification failed:', err);
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-md p-6 rounded-lg relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>✕</button>
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <p className="text-sm mb-4">Please enter the OTP sent to your email to complete the registration.</p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            className="border p-2 rounded-lg"
          />
          <button type="submit" className="bg-green-500 text-white py-2 rounded-lg font-bold mt-4">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpModal;
