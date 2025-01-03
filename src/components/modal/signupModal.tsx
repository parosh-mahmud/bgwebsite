import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import OtpModal from './otpModal';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onSignUpSuccess: (userDetails: any) => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onLoginClick, onSignUpSuccess }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    referral_code: '',
    password1: '',
    password2: '',
    country: '', // New field for country
  });
  const [countries, setCountries] = useState<{ value: string; label: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [verificationKey, setVerificationKey] = useState('');

  // Fetch country list when modal opens
 interface CountryOption {
  value: string;
  label: string;
  currency: string;
}


useEffect(() => {
  if (isOpen) {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries/currency');
        if (response.data.error) {
          throw new Error(response.data.msg);
        }

        const countryOptions = response.data.data
          .map((country: { name: string; currency: string }) => ({
            value: country.name,
            label: country.name,
            currency: country.currency
          }))
          .sort((a: CountryOption, b: CountryOption) => 
            a.label.localeCompare(b.label)
          );

        setCountries(countryOptions);
      } catch (error) {
        console.error('Error fetching countries:', error);
        // Optional: Add error state handling here
        setCountries([]);
      }
    };
    fetchCountries();
  }
}, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCountryChange = (selectedOption: any) => {
    setFormData((prevData) => ({ ...prevData, country: selectedOption ? selectedOption.value : '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password1 !== formData.password2) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post('https://api.bazigaar.com/user/auth/registration/custom/', {
        email: formData.email,
        password1: formData.password1,
        password2: formData.password2,
        first_name: formData.first_name,
        last_name: formData.last_name,
        referral_code: formData.referral_code,
        country: formData.country, // Include country in the request
      });
      console.log('Registration successful:', response.data);
      setError(null);
      setVerificationKey(response.data.key);
      setOtpModalOpen(true); // Open OTP modal after successful registration
    } catch (err: any) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-white w-11/12 max-w-md p-6 rounded-lg relative">
          <div className="max-h-screen overflow-y-auto p-4">
            <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <p className="text-sm mb-4">
              Already have an account?
              <button onClick={onLoginClick} className="text-green-600 ml-1">
                Log in
              </button>
            </p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* First Name and Last Name in a Row */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <label className="absolute -top-3 bg-white px-1 text-gray-600 text-sm">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 mt-2"
                  />
                </div>

                <div className="relative flex-1">
                  <label className="absolute -top-3 bg-white px-1 text-gray-600 text-sm">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 mt-2"
                  />
                </div>
              </div>

              {/* Email Address */}
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

              {/* Country Searchable Dropdown */}
              <div className="relative">
                <label className="absolute -top-3 bg-white px-1 text-gray-600 text-sm">
                  Country<span className="text-red-500">*</span>
                </label>
                <Select
                  options={countries}
                  onChange={handleCountryChange}
                  placeholder="Select your country"
                  isSearchable
                  className="mt-2"
                />
              </div>

              {/* Password Fields */}
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

              {/* Referral Code */}
              <div className="relative">
                <label className="absolute -top-3 bg-white px-1 text-gray-600 text-sm">Refer Code (Optional)</label>
                <input
                  type="text"
                  name="referral_code"
                  value={formData.referral_code}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 mt-2"
                />
              </div>

              <button
                type="submit"
                className={`${
                  loading ? 'bg-gray-400' : 'bg-green-500'
                } text-white py-2 rounded-lg font-bold mt-4`}
                disabled={loading}
              >
                {loading ? 'Please wait...' : 'Sign Up'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              By signing up you agree to our
              <a href="/terms" target="_blank" className="text-blue-600 mx-1">
                Terms of Service
              </a>
              and
              <a href="/privacy" target="_blank" className="text-blue-600 ml-1">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <OtpModal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        verificationKey={verificationKey}
        onOtpSuccess={(userDetails: any) => {
          onSignUpSuccess(userDetails);
          onClose();
        }}
      />
    </>
  );
};

export default SignUpModal;
