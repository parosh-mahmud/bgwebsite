import React, { useState } from 'react';

interface PaymentDetailsProps {
  resellers: { id: number; name: string; country: string }[];
  onSubmit: (data: {
    resellerId: number;
    amount: number;
    transactionId: string;
    screenshot: File | null;
  }) => void;
  onBack: () => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ resellers, onSubmit }) => {
  const [resellerId, setResellerId] = useState<number | null>(null);
  const [amount, setAmount] = useState('');
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

    if (!resellerId || !amount || !transactionId) {
      setError('Please fill all required fields.');
      return;
    }

    setError('');
    onSubmit({
      resellerId,
      amount: parseFloat(amount),
      transactionId,
      screenshot,
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Reseller Dropdown */}
        <div>
          <label htmlFor="reseller" className="block text-sm font-medium mb-1">
            Select Reseller
          </label>
          <select
            id="reseller"
            value={resellerId || ''}
            onChange={(e) => setResellerId(Number(e.target.value))}
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="" disabled>
              Choose a reseller
            </option>
            {resellers.map((reseller) => (
              <option key={reseller.id} value={reseller.id}>
                {reseller.name} - {reseller.country}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-1">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          />
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
            <p className="text-sm text-green-500 mt-2">
              Uploaded: {screenshot.name}
            </p>
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
