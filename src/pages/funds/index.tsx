// FundsComponent.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowBack, HelpOutline, AccountBalanceWallet } from '@mui/icons-material';
import Image from 'next/image';
import clsx from 'clsx';
import { Reseller, ConvertedAmountDetails } from '../../components/fundsChild/types';
import {
  fetchBalance,
  fetchResellersForCountry,
  convertAmountToLocalCurrency,
  fetchResellerPaymentDetails
} from '../../components/fundsChild/api';
import DepositWithdrawContent from '../../components/fundsChild/depositWithdraw';
import PaymentDetails from '../../components/payments/paymentDetails';
import Bgcoin from '../../assets/LandingPage/SVG/bgcoin.svg';
import { SelectChangeEvent } from '@mui/material';
import { getTokenFromStorage, getUserDetailsFromStorage } from '../../../utils/localStorageUtils';
type CountryData = {
  name: string;
  currencyCode: string;
};

const FundsComponent: React.FC = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('deposit');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
const [selectedReseller, setSelectedReseller] = useState<Reseller | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('bkash');
  const [amount, setAmount] = useState<string>('');
  const [withdrawPhoneNumber, setWithdrawPhoneNumber] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [resellers, setResellers] = useState<Reseller[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPaymentDetails, setShowPaymentDetails] = useState<boolean>(false);
  const [convertedAmountDetails, setConvertedAmountDetails] = useState<ConvertedAmountDetails>(null);
  const [countryList, setCountryList] = useState<CountryData[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
const [resellerPaymentNumbers, setResellerPaymentNumbers] = useState<
  { id: number; number: string; bankName: string }[]
>([]);
// Add state variables for bank and crypto details
const [accountNumber, setAccountNumber] = useState('');
const [accountHolderName, setAccountHolderName] = useState('');
const [bankNameInput, setBankNameInput] = useState('');
const [branchName, setBranchName] = useState('');

const [cryptoAddress, setCryptoAddress] = useState('');
const [networkName, setNetworkName] = useState('');
const [cryptoName, setCryptoName] = useState('');
const token = getTokenFromStorage();
useEffect(() => {
  console.log("Selected Payment:", selectedPayment);
}, [selectedPayment]);

const handleWithdraw = async () => {
  const selectedAmount = parseFloat(amount) || 0;

  // Input validation
  if (!selectedAmount || selectedAmount < 100) {
    alert('Please enter a valid amount (minimum 100 BG Coins).');
    return;
  }

  if (balance === null || balance < selectedAmount) {
    alert('Insufficient balance for this withdrawal.');
    return;
  }

  if (selectedPayment === 'bkash' || selectedPayment === 'rocket' || selectedPayment === 'nagad') {
    if (!withdrawPhoneNumber) {
      alert('Please enter your withdrawal phone number.');
      return;
    }
  }



  // Construct the payload
  let payload: any = {};
  if (selectedPayment === 'bkash' || selectedPayment === 'rocket' || selectedPayment === 'nagad') {
    // Mobile Bank Withdrawal
    payload = {
      type: 'MobileBank',
      amount: selectedAmount.toFixed(2),
      bankName: selectedPayment.toUpperCase(),
      number: withdrawPhoneNumber,
    };
  } else if (selectedPayment === 'bank') {
    // Bank Withdrawal
    // Collect necessary bank details from the user (you need to add input fields for these)
    payload = {
      type: 'Bank',
      amount: selectedAmount.toFixed(2),
      accountNumber: 'account_number', // Replace with dynamic input
      accountHolderName: 'account_holder_name', // Replace with dynamic input
      bankName: 'bank_name', // Replace with dynamic input
      branchName: 'branch_name', // Replace with dynamic input
    };
  } else if (selectedPayment === 'crypto') {
    // Crypto Withdrawal
    // Collect necessary crypto details from the user (you need to add input fields for these)
    payload = {
      type: 'Crypto',
      amount: selectedAmount.toFixed(2),
      address: 'crypto_wallet_address', // Replace with dynamic input
      networkName: 'network_name', // Replace with dynamic input
      cryptoName: 'crypto_name', // Replace with dynamic input
    };
  } else {
    alert('Invalid payment method selected.');
    return;
  }

  // Make the API call
  try {
    const response = await fetch(
      'https://api.bazigaar.com/wallet_app/api/v1/user/my-walle/withdrawal-request/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('Withdrawal Success:', data);
 // Navigate to the withdrawal confirmation page
  router.push('/withdrawal-confirmation');
      // Update the balance
      setBalance((prevBalance) => (prevBalance !== null ? prevBalance - selectedAmount : null));
      setAmount('');
      setWithdrawPhoneNumber('');
      // Reset other inputs if necessary
    } else {
      const errorData = await response.json();
      console.error('Withdrawal Error:', errorData);
      alert(`Failed to submit withdrawal request: ${errorData.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Withdrawal Request Failed:', error);
    alert('An error occurred while submitting your withdrawal request.');
  }
};


  // Fetch user details and balance
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

      fetchBalance(user.id, token).then(setBalance);
    } else {
      console.warn('No userDetails found in localStorage.');
    }
  }, []);

  // Fetch resellers for selected country
  useEffect(() => {
    if (selectedCountry) {
      const userDetailsString = localStorage.getItem('userDetails');
      if (!userDetailsString) return;
      const { token } = JSON.parse(userDetailsString);

      fetchResellersForCountry(selectedCountry, token).then((data) => {
        setResellers(data);
        setLoading(false);
      });
    } else {
      setResellers([]);
    }
  }, [selectedCountry]);
// Fetch reseller payment numbers when reseller changes
useEffect(() => {
  if (selectedReseller) {
    const userDetailsString = localStorage.getItem('userDetails');
    if (!userDetailsString) return;
    const { token } = JSON.parse(userDetailsString);

    fetchResellerPaymentDetails(selectedReseller.id, token).then(setResellerPaymentNumbers);
  } else {
    setResellerPaymentNumbers([]);
  }
}, [selectedReseller]);
  // Fetch countries and currencies from REST Countries API
  useEffect(() => {
    const fetchCountriesAndCurrencies = async () => {
  try {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/currency');
    const data = await response.json();

    console.log('Raw API Response:', data); // Log the raw API response

    if (data && data.data) {
      const countryCurrencyData = data.data.map((item: { name: any; currency: any; }) => ({
        name: item.name,
        currencyCode: item.currency,
      }));

      console.log('Mapped Country-Currency Data:', countryCurrencyData); // Log the mapped country and currency data

      // Assuming you are using state to store and filter countries
      setCountryList(countryCurrencyData);
      setFilteredCountries(countryCurrencyData);
    } else {
      console.error('Invalid API response structure:', data);
    }
  } catch (error) {
    console.error('Error fetching countries and currencies:', error);
  }
};



    fetchCountriesAndCurrencies();
  }, []);

  // Filter countries based on search query
  useEffect(() => {
    const filtered = countryList.filter((country) =>
      country.name.toLowerCase().includes(countrySearchQuery.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [countrySearchQuery, countryList]);

  const handleTabSwitch = (tab: string) => setSelectedTab(tab);

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value as string);
    setSelectedReseller(null);
    setResellers([]);
    setConvertedAmountDetails(null); // Reset conversion details when country changes
  };

  const handleResellerChange = (event: SelectChangeEvent<string>) => {
    const selectedUsername = event.target.value as string;
    const reseller = resellers.find((r) => r.username === selectedUsername);
    setSelectedReseller(reseller || null);
  };

const handlePaymentSelect = (id: string) => {
  console.log("Payment selected:", id); // Add this
  setSelectedPayment(id);
};


// Update the handleAmountSelect function
const handleAmountSelect = (amount: number) => {
  setAmount(amount.toString());
  handleAmountInputChange({ target: { value: amount.toString() } } as React.ChangeEvent<HTMLInputElement>);
};
// Update the handleAmountInputChange function
const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = e.target.value;
  setAmount(inputValue);

  const inputAmount = parseFloat(inputValue);
  const userDetailsString = localStorage.getItem('userDetails');

  if (!isNaN(inputAmount) && selectedCountry && userDetailsString) {
    const { token } = JSON.parse(userDetailsString);

    // Get the currency code for the selected country
    const countryData = countryList.find((c) => c.name === selectedCountry);
    const currencyCode = countryData?.currencyCode || 'USD';

    // Call the API to get the conversion
    convertAmountToLocalCurrency(inputAmount, currencyCode, token).then((data) => {
      console.log('Equivalent Local Currency Data:', data); // Log the API response
      setConvertedAmountDetails(data);
    });
  } else {
    setConvertedAmountDetails(null);
  }
};



  const handleCountrySearch = (query: string) => {
    setCountrySearchQuery(query);
  };

 const handleSubmit = () => {
  const selectedAmount = parseFloat(amount) || 0;
  if (selectedTab === 'deposit') {
    // Handle deposit logic here
    // For example, navigate to the deposit confirmation page
    setShowPaymentDetails(true);
  } else if (selectedTab === 'withdrawal') {
    // Call handleWithdraw to process the withdrawal
    handleWithdraw();
  }
};


  const handlePaymentDetailsSubmit = (data: {
    resellerId: number;
    amount: number;
    transactionId: string;
    screenshot: File | null;
  }) => {
    // Handle submission of payment details here
    console.log('Payment Details Submitted:', data);
    setShowPaymentDetails(false);
  };

  if (showPaymentDetails) {
    return (
       <PaymentDetails
  resellers={resellers}
  amount={parseFloat(amount)}
  onBack={() => setShowPaymentDetails(false)}
  onSubmit={handlePaymentDetailsSubmit}
  selectedReseller={selectedReseller}
  equivalentCurrency={
    convertedAmountDetails
      ? {
          value: convertedAmountDetails.currency_amount,
          currency: convertedAmountDetails.currency,
        }
      : null
  }
  selectedPayment={selectedPayment}
  resellerPaymentNumbers={resellerPaymentNumbers} // Pass this state here
/>

    );
  }

  return (
    <>
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 p-2 bg-gray-800 rounded-lg">
        <button onClick={() => router.back()} className="p-2 text-gray-400 hover:text-white">
          <ArrowBack className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">Funds</h1>
        <button className="p-2 text-gray-400 hover:text-white">
          <HelpOutline className="h-6 w-6" />
        </button>
      </div>

      {/* Balance Display */}
      {selectedTab === 'withdrawal' && (
        <div className="bg-green-700 p-4 rounded-lg mb-4 text-center text-white">
          <div className="flex justify-between items-center">
            <span>Main Balance</span>
            <AccountBalanceWallet className="text-white h-6 w-6" />
          </div>
          <div className="flex justify-center items-center text-4xl font-bold mt-2">
            <Image src="/images/bgcoin.svg" alt="BG Coin" width={40} height={40} />
            <span style={{ color: '#FFD700', marginLeft: '8px' }}>
              {balance !== null ? balance.toFixed(2) : 'Loading...'}
            </span>
          </div>
        </div>
      )}

      {/* Tab Switch */}
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

      {/* Content */}
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
        setSelectedReseller={setSelectedReseller}
        handleResellerChange={handleResellerChange}
        resellers={resellers}
        convertedAmountDetails={convertedAmountDetails}
        countrySearchQuery={countrySearchQuery}
        handleCountrySearch={handleCountrySearch}
        filteredCountries={filteredCountries}
           setSelectedCountry={setSelectedCountry}
        accountNumber={accountNumber}
  setAccountNumber={setAccountNumber}
  accountHolderName={accountHolderName}
  setAccountHolderName={setAccountHolderName}
  bankNameInput={bankNameInput}
  setBankNameInput={setBankNameInput}
  branchName={branchName}
  setBranchName={setBranchName}
  cryptoAddress={cryptoAddress}
  setCryptoAddress={setCryptoAddress}
  networkName={networkName}
  setNetworkName={setNetworkName}
  cryptoName={cryptoName}
  setCryptoName={setCryptoName}
      />

      {/* Instructions */}
      <div
  style={{
    backgroundColor: '#455271',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
  }}
>
  <h2 className="text-lg font-semibold text-green-400 mb-2">Important Instructions</h2>
  <p className="text-sm">
    To ensure a smooth and efficient {selectedTab} process, please follow these guidelines:
  </p>
  <ul className="list-disc list-inside mt-2 text-sm">
    {selectedTab === 'deposit' ? (
      <>
        <li>Verify the chosen deposit method is correct.</li>
        <li>Enter the exact amount you intend to deposit.</li>
        <li>Confirm all transaction details prior to submission.</li>
        <li>Attach proof of payment, such as a payment slip.</li>
        <li>If you encounter any issues, please <a href="/support" style={{ color: '#F2BA56' }}>contact support</a>.</li>
      </>
    ) : (
      <>
        <li>Confirm the phone number linked to your withdrawal account is correct.</li>
        <li>Ensure the reference number for your withdrawal is accurate.</li>
        <li>Withdraw only the specific amount requested.</li>
        <li>Check that your account has sufficient funds for the withdrawal.</li>
        <li>Avoid saving phone numbers on the platform to prevent security risks.</li>
      </>
    )}
  </ul>
  <p className="mt-4">
    For more detailed information, please refer to our <a href="/faq" style={{ color: '#F2BA56' }}>FAQ</a> and <a href="/terms-and-conditions" style={{ color: '#F2BA56' }}>Terms & Conditions</a>.
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
    </>
  );
};

export default FundsComponent;
