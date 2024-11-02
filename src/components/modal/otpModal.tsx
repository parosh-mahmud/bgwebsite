import React, { useState } from 'react';
import axios from 'axios';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  verificationKey: string;
  onOtpSuccess: (userDetails: any) => void; // Notify parent of successful OTP verification
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, verificationKey, onOtpSuccess }) => {
  if (!isOpen) return null;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Verify OTP
      const response = await axios.post('https://api.bazigaar.com/user/auth/registration/custom-verify-email/', {
        key: otp
      });
      console.log('OTP verification successful:', response.data);
      const { id, token } = response.data;

      // Fetch user details with verified ID and token
      const userDetailsResponse = await axios.get(`https://api.bazigaar.com/user/user_details/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const fullUserDetails = { ...userDetailsResponse.data, token };

      // Save to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userDetails', JSON.stringify(fullUserDetails));

      onOtpSuccess(fullUserDetails); // Notify parent of success
      onClose(); // Close OTP modal
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
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-3">
          <input type="text" placeholder="Enter OTP" value={otp} onChange={handleOtpChange} className="border p-2 rounded-lg" />
          <button type="submit" className="bg-green-500 text-white py-2 rounded-lg font-bold mt-4">Verify OTP</button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default OtpModal;
