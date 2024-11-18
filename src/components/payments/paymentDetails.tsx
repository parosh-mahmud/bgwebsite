import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface Reseller {
  id: number;
  username: string;
  profile_picture: string | null;
  country: string;
  phone_number: string; // Added phone_number field
}

interface PaymentDetailsProps {
  resellers: Reseller[];
  amount: number;
  equivalentCurrency: { value: number; currency: string } | null;
  selectedPayment: string;
  selectedReseller: Reseller | null;
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
  onSubmit,
  onBack,
}) => {
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedReseller || !transactionId) {
      setError('Please fill all required fields.');
      return;
    }

    setError('');
    onSubmit({
      resellerId: selectedReseller.id,
      amount,
      transactionId,
      screenshot,
    });
  };

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
                {/* Display Reseller's Phone Number */}
               <div className="mt-4 p-3 rounded-md bg-gray-800 border border-gray-700">
  <p className="text-sm font-medium text-gray-300">
  Send Money to this Number:{" "}
  <span className="text-yellow-400 font-bold">0176587548</span>
</p>

  <p className="text-2xl font-semibold text-blue-400 mt-1">{selectedReseller.phone_number}</p>
</div>

              </div>
            </div>
          ) : (
            <p className="text-sm text-red-400">
              No reseller selected. Go back to select a reseller.
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

        {/* Instructions */}
        <div
          style={{
            backgroundColor: '#455271',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          <h2 className="text-lg font-semibold text-green-400 mb-2">Important</h2>
          <p className="text-sm">
            Dear member, to speed up your payment process:
            <ul className="list-disc list-inside mt-2">
              <li>Ensure you have selected the correct payment method.</li>
              <li>Send the exact amount to the reseller's phone number above.</li>
              <li>Enter the correct transaction ID.</li>
              <li>Attach the successful payment screenshot as proof.</li>
              <li>Contact support if there are any issues with the payment.</li>
            </ul>
          </p>
        </div>

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
