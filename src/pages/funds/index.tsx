'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowBack, HelpOutline, AccountBalanceWallet } from '@mui/icons-material';
import { Avatar, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import clsx from 'clsx';
import axios from 'axios';

type PaymentMethod = {
  id: string;
  name: string;
  iconUrl: string;
  fee: string;
};

type Reseller = {
  id: number;
  username: string;
  profile_picture: string | null;
  first_name: string;
  last_name: string;
};

const countries = ["Bangladesh", "India", "Nepal"];

const paymentMethods: PaymentMethod[] = [
  { id: 'bkash', name: 'bKash', iconUrl: 'https://freelogopng.com/images/all_img/1656234745bkash-app-logo-png.png', fee: '' },
  { id: 'rocket', name: 'Rocket', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Rocket_ddbl.png?20231124044331', fee: '' },
  { id: 'nagad', name: 'Nagad', iconUrl: 'https://freelogopng.com/images/all_img/1679248787Nagad-Logo.png', fee: '' },
  { id: 'usdt_trc20', name: 'USDT TRC20', iconUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png', fee: '' },
  { id: 'bitcoin', name: 'Bitcoin', iconUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', fee: '' }
];

const amountOptions = [2000, 3000, 5000, 10000, 15000, 20000, 25000, 1000, 500, 100];

export default function FundsComponent() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('deposit');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedReseller, setSelectedReseller] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('bkash');
  const [amount, setAmount] = useState<string>('');
  const [withdrawPhoneNumber, setWithdrawPhoneNumber] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [resellers, setResellers] = useState<Reseller[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      const { user, token } = userDetails;

      setBalance(parseFloat(user.bgcoin));

      const fetchBalance = async () => {
        try {
          const response = await axios.get(`https://api.bazigaar.com/user/user_details/${user.id}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setBalance(parseFloat(response.data.user.bgcoin) || 0);
        } catch (error) {
          console.error('Error fetching user balance:', error);
        }
      };
      fetchBalance();
    } else {
      console.warn('No userDetails found in localStorage.');
    }
  }, []);

  useEffect(() => {
    const fetchResellers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Token not found');

        const response = await axios.get<Reseller[]>(
          'https://api.bazigaar.com/reseller/ResellerList/',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setResellers(response.data);
      } catch (error) {
        console.error('Error fetching reseller list:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResellers();
  }, []);

  const handleTabSwitch = (tab: string) => setSelectedTab(tab);

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value);
    setSelectedReseller(null);
  };

  const handleResellerChange = (event: SelectChangeEvent<string>) => setSelectedReseller(event.target.value);

  const handlePaymentSelect = (id: string) => setSelectedPayment(id);

  const handleAmountSelect = (amount: number) => setAmount(amount.toString());

  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value);

  const handleSubmit = () => {
    const selectedAmount = parseFloat(amount) || 0;
    if (selectedTab === 'deposit') {
      alert(`Deposited ${selectedAmount} via ${selectedPayment} to ${selectedReseller}`);
    } else {
      alert(`Withdrawn ${selectedAmount} via ${selectedPayment} to ${withdrawPhoneNumber}`);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 p-2 bg-gray-800 rounded-lg">
        <button onClick={() => router.push('/')} className="p-2 text-gray-400 hover:text-white">
          <ArrowBack className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">Funds</h1>
        <button className="p-2 text-gray-400 hover:text-white">
          <HelpOutline className="h-6 w-6" />
        </button>
      </div>

      {/* Deposit or Main Wallet (for Withdrawal only) */}
      {selectedTab === 'withdrawal' ? (
        <div className="bg-green-700 p-4 rounded-lg mb-4 text-center text-white">
          <div className="flex justify-between items-center">
            <span>Main Balance</span>
            <AccountBalanceWallet className="text-white h-6 w-6" />
          </div>
          <div className="text-4xl font-bold">{balance !== null ? balance.toFixed(2) : 'Loading...'}</div>
        </div>
      ) : (
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-4">Select Country & Reseller</h2>
          <Select
            fullWidth
            value={selectedCountry || ''}
            onChange={handleCountryChange}
            displayEmpty
            className="mb-4 bg-gray-100 text-white"
          >
            <MenuItem value="" disabled>Select Country</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country} value={country}>{country}</MenuItem>
            ))}
          </Select>

          {selectedCountry && (
            <Select
              fullWidth
              value={selectedReseller || ''}
              onChange={handleResellerChange}
              displayEmpty
              className="bg-gray-100 text-white"
            >
              <MenuItem value="" disabled>Select Reseller</MenuItem>
              {resellers.map((reseller) => (
                <MenuItem key={reseller.id} value={reseller.username}>
                  <Avatar src={reseller.profile_picture || ''} alt={reseller.username} />
                  {`${reseller.first_name} ${reseller.last_name}`}
                </MenuItem>
              ))}
            </Select>
          )}
        </div>
      )}

      {/* Tabs for Deposit and Withdrawal */}
      <div className="flex mb-6">
        <button
          className={clsx(
            'flex-1 py-2 text-center rounded-l-lg transition duration-200',
            selectedTab === 'deposit' ? 'bg-green-600' : 'bg-gray-700'
          )}
          onClick={() => handleTabSwitch('deposit')}
        >
          Deposit
        </button>
        <button
          className={clsx(
            'flex-1 py-2 text-center rounded-r-lg transition duration-200',
            selectedTab === 'withdrawal' ? 'bg-green-600' : 'bg-gray-700'
          )}
          onClick={() => handleTabSwitch('withdrawal')}
        >
          Withdrawal
        </button>
      </div>

      {/* Content for Payment and Amount Selection */}
      <DepositWithdrawContent
        selectedTab={selectedTab}
        selectedPayment={selectedPayment}
        amount={amount}
        handlePaymentSelect={handlePaymentSelect}
        handleAmountSelect={handleAmountSelect}
        handleAmountInputChange={handleAmountInputChange}
        showPhoneInput={selectedTab === 'withdrawal'}
        withdrawPhoneNumber={withdrawPhoneNumber}
        setWithdrawPhoneNumber={setWithdrawPhoneNumber}
      />

      {/* Instructions */}
      <div style={{ backgroundColor: '#455271', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
        <h2 className="text-lg font-semibold text-green-400 mb-2">Important</h2>
        <p className="text-sm">
          Dear member, to speed up your {selectedTab} process:
          <ul className="list-disc list-inside mt-2">
            <li>Verify the phone number used for {selectedTab}.</li>
            <li>Input the correct reference number.</li>
            <li>Process only the selected amount.</li>
            <li>Attach the successful slip.</li>
            <li>Do not save phone numbers to avoid loss.</li>
          </ul>
        </p>
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
        onClick={handleSubmit}
        disabled={!amount || (selectedTab === 'withdrawal' && !withdrawPhoneNumber)}
      >
        Submit
      </button>
    </div>
  );
}

function DepositWithdrawContent({
  selectedTab,
  selectedPayment,
  amount,
  handlePaymentSelect,
  handleAmountSelect,
  handleAmountInputChange,
  showPhoneInput,
  withdrawPhoneNumber,
  setWithdrawPhoneNumber
}: {
  selectedTab: string;
  selectedPayment: string;
  amount: string;
  handlePaymentSelect: (id: string) => void;
  handleAmountSelect: (amount: number) => void;
  handleAmountInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPhoneInput?: boolean;
  withdrawPhoneNumber?: string;
  setWithdrawPhoneNumber?: (value: string) => void;
}) {
  return (
    <>
      {/* Payment Methods */}
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
        <div className="grid grid-cols-3 gap-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              className={clsx(
                'flex flex-col items-center p-2 rounded-lg cursor-pointer border',
                selectedPayment === method.id ? 'border-yellow-400' : 'border-gray-700'
              )}
              onClick={() => handlePaymentSelect(method.id)}
            >
              <Avatar src={method.iconUrl} alt={method.name} className="w-12 h-12 mb-1" />
              <span className="text-sm">{method.name}</span>
              {method.fee && <span className="text-xs text-red-400">{method.fee}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Manual Amount Input */}
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <label htmlFor="manualAmount" className="block text-sm mb-2">
          {selectedTab === 'deposit' ? 'Enter Deposit Amount' : 'Enter Withdrawal Amount'}
        </label>
        <input
          id="manualAmount"
          type="number"
          placeholder={`Enter ${selectedTab} amount`}
          className="w-full p-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-green-500"
          value={amount}
          onChange={handleAmountInputChange}
        />
      </div>

      {/* Amount Selection (Only for Deposit) */}
      {selectedTab === 'deposit' && (
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Amount</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {amountOptions.map((option) => {
              const extraPercentage =
                option === 10000 ? '+1.5% Extra' :
                option === 15000 ? '+2% Extra' :
                option === 20000 ? '+3% Extra' :
                option === 25000 ? '+3.5% Extra' : '';

              return (
                <button
                  key={option}
                  className={clsx(
                    'py-2 px-4 rounded-md text-sm font-semibold flex flex-col items-center',
                    parseFloat(amount) === option ? 'bg-green-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  )}
                  onClick={() => handleAmountSelect(option)}
                >
                  <span>{option.toLocaleString()}</span>
                  {extraPercentage && (
                    <span className="text-xs text-red-400 mt-1">{extraPercentage}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Phone Number Input for Withdrawal */}
      {showPhoneInput && (
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <label htmlFor="withdrawPhone" className="block text-sm mb-2">Withdrawal Phone Number</label>
          <input
            id="withdrawPhone"
            type="tel"
            placeholder="Enter phone number"
            className="w-full p-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-green-500"
            value={withdrawPhoneNumber}
            onChange={(e) => setWithdrawPhoneNumber?.(e.target.value)}
          />
        </div>
      )}
    </>
  );
}
