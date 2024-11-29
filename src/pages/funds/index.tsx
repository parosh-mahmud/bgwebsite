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
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        const countryCurrencyData: CountryData[] = data.map((country: any) => ({
          name: country.name.common,
          currencyCode: Object.keys(country.currencies || {})[0] || 'USD',
        }));

        // Sort countries alphabetically
        countryCurrencyData.sort((a, b) => a.name.localeCompare(b.name));

        setCountryList(countryCurrencyData);
        setFilteredCountries(countryCurrencyData);
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

  const handlePaymentSelect = (id: string) => setSelectedPayment(id);

  const handleAmountSelect = (amount: number) => setAmount(amount.toString());

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

    // Log the token, input amount, and currency code
    console.log('Token:', token);
    console.log('Input Amount:', inputAmount);
    console.log('Country Code:', currencyCode);

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
     
    } else {
      // Handle withdrawal logic here
      
    }
    // Show PaymentDetails component
    setShowPaymentDetails(true);
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
        handleResellerChange={handleResellerChange}
        resellers={resellers}
        convertedAmountDetails={convertedAmountDetails}
        countrySearchQuery={countrySearchQuery}
        handleCountrySearch={handleCountrySearch}
        filteredCountries={filteredCountries}
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
};

export default FundsComponent;
