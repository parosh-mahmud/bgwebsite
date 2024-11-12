import { useEffect, useState } from 'react';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';

type Transaction = {
  id: string;
  transaction_type: 'Deposit' | 'Withdrawal';
  amount: string;
  date: string;
};

export default function TransactionHistory({ onBack }: { onBack: () => void }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const response = await axios.get('https://api.bazigaar.com/wallet_app/api/v1/user/my-wallet-profile', {
          headers: { Authorization: `Token ${token}` },
        });
        setTransactions(response.data.transactions || []);
      } catch (error) {
        console.error('Failed to fetch transaction history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionHistory();
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      {/* Header with Back Button */}
      <div className="flex items-center mb-4 p-2 bg-gray-800 rounded-lg">
        <button onClick={onBack} className="p-2 text-gray-400 hover:text-white">
          <ArrowBack className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold ml-4">Transaction History</h2>
      </div>

      {/* Transaction List */}
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="bg-gray-800 p-4 rounded-lg flex items-center">
              <span
                className={`mr-4 ${transaction.transaction_type === 'Deposit' ? 'text-green-400' : 'text-red-400'}`}
              >
                {transaction.transaction_type === 'Deposit' ? '+' : '-'}
              </span>
              <div className="flex-grow">
                <p className="text-white font-semibold">
                  {transaction.transaction_type} - {transaction.amount} BG COIN
                </p>
                <p className="text-gray-400 text-sm">{transaction.date}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
