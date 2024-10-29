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
      setVerificationKey(response.data.key);
      setOtpModalOpen(true);
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-white w-11/12 max-w-md p-6 rounded-lg relative">
          <div className="max-h-screen overflow-y-auto p-4">
            <button className="absolute top-2 right-2 text-xl" onClick={onClose}>✕</button>
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <p className="text-sm mb-4">
              Already have an account? 
              <button onClick={onLoginClick} className="text-green-600 ml-1">Log in</button>
            </p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* First Name and Last Name in a Row */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <label className="absolute -top-3 bg-white px-1 text-gray-600 text-sm">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    name="first_name" 
                    value={formData.first_name} 
                    onChange={handleChange} 
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 mt-2"
                  />
                </div>

                <div className="relative flex-1">
                  <label className="absolute -top-3 bg-white px-1 text-gray-600 text-sm">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    name="last_name" 
                    value={formData.last_name} 
                    onChange={handleChange} 
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 mt-2"
                  />
                </div>
              </div>

              {/* Email Address (Required) */}
              <div className="relative">
                <label className="absolute -top-3 bg-white px-1 text-gray-600 text-sm">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 mt-2"
                />
              </div>

             

              {/* Password (Required) */}
              <div className="relative">
                <label className="absolute -top-3 bg-white px-1 text-gray-600 text-sm">
                  Password<span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  name="password1" 
                  value={formData.password1} 
                  onChange={handleChange} 
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 mt-2"
                />
              </div>

              {/* Re-type Password (Required) */}
              <div className="relative">
                <label className="absolute -top-3 bg-white px-1 text-gray-600 text-sm">
                  Confirm Password<span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  name="password2" 
                  value={formData.password2} 
                  onChange={handleChange} 
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 mt-2"
                />
              </div>

               {/* Referral Code (Optional) */}
              <div className="relative">
                <label className="absolute -top-3 bg-white px-1 text-gray-600 text-sm">
                  Refer Code (Optional)
                </label>
                <input 
                  type="text" 
                  name="referral_code" 
                  value={formData.referral_code} 
                  onChange={handleChange} 
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 mt-2"
                />
              </div>

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
      </div>

      {/* OTP Modal */}
      <OtpModal isOpen={otpModalOpen} onClose={() => setOtpModalOpen(false)} verificationKey={verificationKey} />
    </>
  );
};

export default SignUpModal;
