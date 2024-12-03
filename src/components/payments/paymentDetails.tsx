import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import DepositConfirmation from './depositConfirmation';
interface Reseller {
  id: number;
  username: string;
  profile_picture: string | null;
  country: string;
  phone_number: string;
}

interface PaymentDetailsProps {
  resellers: Reseller[];
  amount: number;
  equivalentCurrency: { value: number; currency: string } | null;
  selectedPayment: string;
  selectedReseller: Reseller | null;
  resellerPaymentNumbers: { id: number; number: string; bankName: string }[];
  onSubmit: (data: {
    resellerId: number;
    amount: number;
    transactionId: string;
    screenshot: File | null;
  }) => void;
  onBack: () => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  resellers,
  amount,
  equivalentCurrency,
  selectedPayment,
  selectedReseller,
  resellerPaymentNumbers,
  onSubmit,
  onBack,
}) => {
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedReseller || !transactionId) {
    setError('Please fill all required fields.');
    return;
  }

  setError('');
  const userDetailsString = localStorage.getItem('userDetails');
  const { token } = userDetailsString ? JSON.parse(userDetailsString) : { token: null };

  if (!token) {
    setError('User authentication token not found. Please log in again.');
    return;
  }

  const requestData: {
    reseller: string;
    amount: number;
    equalBgCoin: number;
    transactionId: string;
    transactionMedium: string;
    screenshot?: string;
  } = {
    reseller: selectedReseller.id.toString(),
    amount,
    equalBgCoin: amount,
    transactionId,
    transactionMedium: selectedPayment,
  };

  console.log('Request Data Before Sending:', requestData);

  if (screenshot) {
    const reader = new FileReader();
    reader.onload = async () => {
      requestData.screenshot = reader.result as string;
      try {
        const response = await axios.post(
          'https://api.bazigaar.com/wallet_app/api/v1/user/my-walle/deposit-request/',
          requestData,
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Response from API:', response.data);
        setIsSubmitted(true);
      } catch (error: any) {
        console.error('Error Response from API:', error.response?.data);
        console.error('Error submitting payment details:', error);
        setError('Failed to submit payment details. Please try again.');
      }
    };
    reader.readAsDataURL(screenshot);
  } else {
    try {
      const response = await axios.post(
        'https://api.bazigaar.com/wallet_app/api/v1/user/my-walle/deposit-request/',
        requestData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response from API:', response.data);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Error Response from API:', error.response?.data);
      console.error('Error submitting payment details:', error);
      setError('Failed to submit payment details. Please try again.');
    }
  }
};


  if (isSubmitted) {
    return (
      <DepositConfirmation />
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="p-2 text-gray-400 hover:text-white">
          <ArrowBack className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold flex-1 text-center">Payment Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selected Reseller */}
        <div>
          <label htmlFor="reseller" className="block text-sm font-medium mb-1">
            Selected Reseller
          </label>
          {selectedReseller ? (
            <div className="mt-2 flex items-center">
              <Avatar
                src={selectedReseller.profile_picture || ''}
                alt={selectedReseller.username}
                className="mr-2"
              />
              <div>
                <p className="text-sm font-medium">{selectedReseller.username}</p>
                <p className="text-xs text-gray-400">{selectedReseller.country}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-red-400">No reseller selected. Go back to select a reseller.</p>
          )}
        </div>

        {/* Reseller Payment Numbers */}
        <div className="mt-4 p-3 rounded-md bg-gray-800 border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Send Money Number:</h3>
          {resellerPaymentNumbers.length > 0 &&
          resellerPaymentNumbers.some(
            (bank) => bank.bankName.toLowerCase() === selectedPayment.toLowerCase()
          ) ? (
            resellerPaymentNumbers
              .filter((bank) => bank.bankName.toLowerCase() === selectedPayment.toLowerCase())
              .map((bank) => (
                <div key={bank.id} className="mb-2">
                  <p className="text-sm text-gray-400">
                    <span className="font-bold text-yellow-400">{bank.bankName}</span>: {bank.number}
                  </p>
                </div>
              ))
          ) : (
            <p className="text-sm text-red-400">
              No payment number available for the selected method.
            </p>
          )}
        </div>

        {/* Amount and Equivalent Local Currency */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-1">
            Deposit Amount
          </label>
          <div className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600">
            <p>
              {amount} BG Coin
              {equivalentCurrency && (
                <span className="text-sm text-green-400 ml-2">
                  (~ {equivalentCurrency.value.toFixed(2)} {equivalentCurrency.currency})
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Selected Payment Method */}
        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium mb-1">
            Selected Payment Method
          </label>
          <div
            id="paymentMethod"
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          >
            {selectedPayment}
          </div>
        </div>

        {/* Transaction ID Input */}
        <div>
          <label htmlFor="transactionId" className="block text-sm font-medium mb-1">
            Transaction ID
          </label>
          <input
            id="transactionId"
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter transaction ID"
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Screenshot Upload */}
        <div>
          <label htmlFor="screenshot" className="block text-sm font-medium mb-1">
            Upload Screenshot
          </label>
          <input
            id="screenshot"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 text-gray-400 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          />
          {screenshot && (
            <p className="text-sm text-green-500 mt-2">Uploaded: {screenshot.name}</p>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Payment Details
        </button>
      </form>
    </div>
  );
};

export default PaymentDetails;
