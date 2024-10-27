import React, { useState } from 'react';
import axios from 'axios';
import OtpModal from './otpModal';
interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onLoginClick }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    referral_code: '',
    password1: '',
    password2: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [verificationKey, setVerificationKey] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password1 !== formData.password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://api.bazigaar.com/user/auth/registration/custom/', {
        email: formData.email,
        password1: formData.password1,
        password2: formData.password2,
        first_name: formData.first_name,
        last_name: formData.last_name,
        referral_code: formData.referral_code,
      });
      console.log('Registration successful:', response.data);
      setError(null);
      setVerificationKey(response.data.key); // Assume "key" is returned
      setOtpModalOpen(true); // Open OTP modal
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-11/12 max-w-md p-6 rounded-lg relative">
          <button className="absolute top-2 right-2 text-xl" onClick={onClose}>✕</button>
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <p className="text-sm mb-4">
            Already have an account? 
            <button onClick={onLoginClick} className="text-green-600 ml-1">Log in</button>
          </p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
              type="text" 
              name="first_name" 
              placeholder="First Name" 
              value={formData.first_name} 
              onChange={handleChange} 
              className="border p-2 rounded-lg"
            />
            <input 
              type="text" 
              name="last_name" 
              placeholder="Last Name" 
              value={formData.last_name} 
              onChange={handleChange} 
              className="border p-2 rounded-lg"
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              value={formData.email} 
              onChange={handleChange} 
              className="border p-2 rounded-lg"
            />
            <input 
              type="text" 
              name="referral_code" 
              placeholder="Referral Code (Optional)" 
              value={formData.referral_code} 
              onChange={handleChange} 
              className="border p-2 rounded-lg"
            />
            <input 
              type="password" 
              name="password1" 
              placeholder="Password" 
              value={formData.password1} 
              onChange={handleChange} 
              className="border p-2 rounded-lg"
            />
            <input 
              type="password" 
              name="password2" 
              placeholder="Re-type Password" 
              value={formData.password2} 
              onChange={handleChange} 
              className="border p-2 rounded-lg"
            />
            <button type="submit" className="bg-green-500 text-white py-2 rounded-lg font-bold mt-4">Sign Up</button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            By signing up you agree to our 
            <a href="/terms" target="_blank" className="text-blue-600 mx-1">Terms of Service</a>
            and 
            <a href="/privacy" target="_blank" className="text-blue-600 ml-1">Privacy Policy</a>.
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      <OtpModal isOpen={otpModalOpen} onClose={() => setOtpModalOpen(false)} verificationKey={verificationKey} />
    </>
  );
};

export default SignUpModal;
