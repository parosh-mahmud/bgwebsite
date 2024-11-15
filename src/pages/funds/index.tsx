'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowBack, HelpOutline, AccountBalanceWallet } from '@mui/icons-material';
import { Avatar, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Bgcoin from "../../assets/LandingPage/SVG/bgcoin.svg";
import clsx from 'clsx';
import axios from 'axios';
import Image from 'next/image';
import PaymentDetails from '../../components/payments/paymentDetails';


type PaymentMethod = {
  id: string;
  name: string;
  iconUrl: string;
  fee: string;
};
interface PaymentDetailsProps {
  resellers: Reseller[];
  amount: number;
  onSubmit: (data: {
    resellerId: number;
    amount: number;
    transactionId: string;
    screenshot: File | null;
  }) => void;
  onBack: () => void;
}
type Reseller = {
  country: any;
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
  const [showPaymentDetails, setShowPaymentDetails] = useState<boolean>(false);
const [convertedAmountDetails, setConvertedAmountDetails] = useState<{
  bgcoin_amount: number;
  usd_equivalent: number;
  currency: string;
  currency_amount: number;
} | null>(null);

const handleAmountConversion = async (inputAmount: number, country: string) => {
  try {
    const userDetailsString = localStorage.getItem('userDetails');
    if (!userDetailsString) throw new Error('User details not found in localStorage.');
    const { token } = JSON.parse(userDetailsString);

    const requestData = {
      amount: inputAmount,
      country_or_currency: country,
    };

    console.log("Request Data:", requestData); // Log the request data before sending

    const response = await axios.post(
      'https://api.bazigaar.com/wallet_app/api/v1/user/amout/country-wise-convert-to-bgcoin/',
      requestData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    console.log("Response Data:", response.data); // Log the response data

    setConvertedAmountDetails(response.data);
  } catch (error) {
    console.error('Error converting amount:', error);
    setConvertedAmountDetails(null);
  }
};


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type === 'deposit' || type === 'withdrawal') {
      setSelectedTab(type);
    }

    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      console.log('Retrieved userDetails from localStorage:', userDetails);
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
  if (selectedCountry) {
    const fetchResellersForCountry = async () => {
      try {
        const userDetailsString = localStorage.getItem('userDetails');
        if (!userDetailsString) throw new Error('User details not found in localStorage.');
        const { token } = JSON.parse(userDetailsString);
        if (!token) throw new Error('Token not found in user details.');

        const response = await axios.get<Reseller[]>(
          `https://api.bazigaar.com/wallet_app/api/v1/user/country-wise-reseller/?country=${selectedCountry}`,
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
    fetchResellersForCountry();
  } else {
    setResellers([]);
  }
}, [selectedCountry]);


  const handleTabSwitch = (tab: string) => setSelectedTab(tab);

const handleCountryChange = (event: SelectChangeEvent<string>) => {
  setSelectedCountry(event.target.value);
  setSelectedReseller(null);
  setResellers([]); // Clear resellers when country changes
};

  const handleResellerChange = (event: SelectChangeEvent<string>) => setSelectedReseller(event.target.value);

  const handlePaymentSelect = (id: string) => setSelectedPayment(id);

  const handleAmountSelect = (amount: number) => setAmount(amount.toString());

const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = e.target.value;
  setAmount(inputValue);

  const inputAmount = parseFloat(inputValue);
  if (!isNaN(inputAmount) && selectedCountry) {
    handleAmountConversion(inputAmount, selectedCountry);
  } else {
    setConvertedAmountDetails(null); // Clear conversion details if input is invalid
  }
};

  const handleSubmit = () => {
    const selectedAmount = parseFloat(amount) || 0;
    if (selectedTab === 'deposit') {
      // Handle deposit logic here
      alert(`Deposited ${selectedAmount} via ${selectedPayment} to ${selectedReseller}`);
    } else {
      // Handle withdrawal logic here
      alert(`Withdrawn ${selectedAmount} via ${selectedPayment} to ${withdrawPhoneNumber}`);
    }
    // Show PaymentDetails component
    setShowPaymentDetails(true);
  };

  const handleBackToFunds = () => {
    // Hide PaymentDetails and return to FundsComponent
    setShowPaymentDetails(false);
  };
const handlePaymentDetailsSubmit = (data: {
    resellerId: number;
    amount: number;
    transactionId: string;
    screenshot: File | null;
  }) => {
    // Handle submission of payment details here
    console.log('Payment Details Submitted:', data);
    // After handling, you might want to navigate back or show a success message
    setShowPaymentDetails(false);
  };

  if (showPaymentDetails) {
    // Prepare the reseller list for PaymentDetails component
    const resellerList = resellers
      .filter((reseller) => reseller.country === selectedCountry)
      .map((reseller) => ({
        id: reseller.id,
        name: `${reseller.first_name} ${reseller.last_name}`,
        country: reseller.country,
      }));



  return (
    <PaymentDetails
      resellers={resellers}
      amount={parseFloat(amount)}
      onBack={() => setShowPaymentDetails(false)}
      onSubmit={handlePaymentDetailsSubmit}
    />
  );
}


  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <div className="flex items-center justify-between mb-4 p-2 bg-gray-800 rounded-lg">
        <button onClick={() => router.back()} className="p-2 text-gray-400 hover:text-white">
          <ArrowBack className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">Funds</h1>
        <button className="p-2 text-gray-400 hover:text-white">
          <HelpOutline className="h-6 w-6" />
        </button>
      </div>

      {selectedTab === 'withdrawal' ? (
        <div className="bg-green-700 p-4 rounded-lg mb-4 text-center text-white">
          <div className="flex justify-between items-center">
            <span>Main Balance</span>
            <AccountBalanceWallet className="text-white h-6 w-6" />
          </div>
          <div className="flex justify-center items-center text-4xl font-bold mt-2">
            <Image src={Bgcoin} alt="BG Coin" width={40} height={40} />
            <span style={{ color: '#FFD700', marginLeft: '8px' }}>
              {balance !== null ? balance.toFixed(2) : 'Loading...'}
            </span>
          </div>
        </div>
      ) : null}

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
        selectedCountry={selectedCountry}
        handleCountryChange={handleCountryChange}
        selectedReseller={selectedReseller}
        handleResellerChange={handleResellerChange}
        resellers={resellers}
         convertedAmountDetails={convertedAmountDetails}
      />

      {/* Instructions */}
      <div style={{ backgroundColor: '#455271', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
        <h2 className="text-lg font-semibold text-green-400 mb-2">Important</h2>
        <p className="text-sm">
          Dear member, to speed up your {selectedTab} process:
          <ul className="list-disc list-inside mt-2">
            {selectedTab === 'deposit' ? (
              <>
                <li>Ensure you have selected the correct deposit method.</li>
                <li>Enter the exact amount you wish to deposit.</li>
                <li>Confirm your transaction details before proceeding.</li>
                <li>Attach the successful payment slip as proof.</li>
                <li>Contact support if there are any issues with the deposit.</li>
              </>
            ) : (
              <>
                <li>Verify the phone number associated with your withdrawal account.</li>
                <li>Enter the correct reference number for your withdrawal.</li>
                <li>Withdraw only the amount you selected.</li>
                <li>Ensure you have sufficient balance for the withdrawal amount.</li>
                <li>Do not save phone numbers to avoid potential security issues.</li>
              </>
            )}
          </ul>
        </p>
      </div>

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
  setWithdrawPhoneNumber,
  selectedCountry,
  handleCountryChange,
  selectedReseller,
  handleResellerChange,
  resellers,
  convertedAmountDetails // Correctly include this prop here
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
  selectedCountry: string | null;
  handleCountryChange: (event: SelectChangeEvent<string>) => void;
  selectedReseller: string | null;
  handleResellerChange: (event: SelectChangeEvent<string>) => void;
  resellers: Reseller[];
  convertedAmountDetails: {
    bgcoin_amount: number;
    usd_equivalent: number;
    currency: string;
    currency_amount: number;
  } | null; // Define the type of convertedAmountDetails
}) {

  return (
    <>
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

      {selectedPayment !== 'usdt_trc20' && selectedPayment !== 'bitcoin' && (
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-4">Select Country & Reseller</h2>
       
          <Select
            fullWidth
            value={selectedCountry || ''}
            onChange={handleCountryChange}
            displayEmpty
            className="mb-4"
            style={{ backgroundColor: '#374151', color: 'white' }}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: '#374151',
                  color: 'white'
                }
              }
            }}
          >
            <MenuItem value="" disabled style={{ color: '#9CA3AF' }}>Select Country</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country} value={country} style={{ color: 'white' }}>
                {country}
              </MenuItem>
            ))}
          </Select>

          {selectedCountry && (
            <Select
              fullWidth
              value={selectedReseller || ''}
              onChange={handleResellerChange}
              displayEmpty
              className="mb-4"
              style={{ backgroundColor: '#374151', color: 'white' }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: '#374151',
                    color: 'white'
                  }
                }
              }}
            >
              <MenuItem value="" disabled style={{ color: '#9CA3AF' }}>Select Reseller</MenuItem>
              {resellers.map((reseller) => (
                <MenuItem key={reseller.id} value={reseller.username} style={{ color: 'white' }}>
                  <Avatar src={reseller.profile_picture || ''} alt={reseller.username} className="mr-2" />
                  {`${reseller.first_name} ${reseller.last_name}`}
                </MenuItem>
              ))}
            </Select>
          )}
        </div>
      )}

      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <label htmlFor="manualAmount" className="block text-sm mb-2">
          {selectedTab === 'deposit' ? 'Enter Deposit Coin Amount' : 'Enter Withdrawal Amount'}
        </label>
        <div className="relative">
          <Image
            src={Bgcoin}
            alt="BG Coin"
            width={24}
            height={24}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
          <input
            id="manualAmount"
            type="number"
            placeholder={`Enter ${selectedTab} amount`}
            className="w-full p-2 pl-10 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-green-500"
            value={amount}
            onChange={handleAmountInputChange}
          />
          {convertedAmountDetails && (
  <div className="bg-gray-700 p-4 mt-2 rounded-lg">
    <h3 className="text-sm font-semibold text-green-400 mb-2">Conversion Details:</h3>
    <ul className="text-sm">
      <li><strong>BG Coin Amount:</strong> {convertedAmountDetails.bgcoin_amount}</li>
      <li><strong>USD Equivalent:</strong> ${convertedAmountDetails.usd_equivalent.toFixed(2)}</li>
      <li>
        <strong>{convertedAmountDetails.currency} Amount:</strong> 
        {convertedAmountDetails.currency_amount.toFixed(2)} {convertedAmountDetails.currency}
      </li>
    </ul>
  </div>
)}

        </div>
      </div>

      {selectedTab === 'deposit' && (
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Amount</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {amountOptions
              .slice()
              .sort((a, b) => a - b)
              .map((option) => {
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
