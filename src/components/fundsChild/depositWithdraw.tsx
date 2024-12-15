import React, { useEffect, useState } from 'react';
import { Avatar, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Image from 'next/image';
import clsx from 'clsx';
import { Reseller, ConvertedAmountDetails } from './types';
import { paymentMethods, amountOptions } from './constants';
import Bgcoin from '../../assets/LandingPage/SVG/bgcoin.svg';
import dynamic from 'next/dynamic';
type CountryData = {
  name: string;
  currencyCode: string;
};

type Props = {
  selectedTab: string;
  selectedPayment: string;
  amount: string;
   setSelectedCountry: (value: string) => void;
  handlePaymentSelect: (id: string) => void;
  handleAmountSelect: (amount: number) => void;
  handleAmountInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPhoneInput?: boolean;
  withdrawPhoneNumber?: string;
  setWithdrawPhoneNumber?: (value: string) => void;
  selectedCountry: string | null;
  handleCountryChange: (event: SelectChangeEvent<string>) => void;
  selectedReseller: Reseller | null;
   setSelectedReseller: (reseller: Reseller | null) => void;
  handleResellerChange: (event: SelectChangeEvent<string>) => void;
  resellers: Reseller[];
  convertedAmountDetails: ConvertedAmountDetails;
  countrySearchQuery: string;
  handleCountrySearch: (query: string) => void;
  filteredCountries: CountryData[];
  accountNumber: string;
  setAccountNumber: (value: string) => void;
  accountHolderName: string;
  setAccountHolderName: (value: string) => void;
  bankNameInput: string;
  setBankNameInput: (value: string) => void;
  branchName: string;
  setBranchName: (value: string) => void;
  cryptoAddress: string;
  setCryptoAddress: (value: string) => void;
  networkName: string;
  setNetworkName: (value: string) => void;
  cryptoName: string;
  setCryptoName: (value: string) => void;
};

const DepositWithdrawContent: React.FC<Props> = ({
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
  convertedAmountDetails,
  countrySearchQuery,
  handleCountrySearch,
  setSelectedCountry,
  filteredCountries,
  accountNumber,
  setAccountNumber,
  accountHolderName,
  setAccountHolderName,
  bankNameInput,
  setBankNameInput,
  branchName,
  setSelectedReseller,
  setBranchName,
  cryptoAddress,
  setCryptoAddress,
  networkName,
  setNetworkName,
  cryptoName,
  setCryptoName,
}) => {
  const [isValidAmount, setIsValidAmount] = useState(false);

  // Validate amount whenever it changes
  useEffect(() => {
    const numericAmount = parseInt(amount, 10);
    setIsValidAmount(numericAmount >= 100);
  }, [amount]);

   const handleCountrySearchUpdate = (query: string) => {
    console.log('Country search query:', query);
    handleCountrySearch(query);
};

  return (
    <>
      {/* Payment Method Selection */}
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

      {selectedTab === "withdrawal" && 
        (selectedPayment === "crypto" || selectedPayment === "usdt" || selectedPayment === "bitcoin") && (
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <label htmlFor="cryptoAddress" className="block text-sm mb-2">
              Crypto Wallet Address
            </label>
            <input
              id="cryptoAddress"
              type="text"
              placeholder="Enter crypto wallet address"
              className="w-full p-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-green-500"
              value={cryptoAddress}
              onChange={(e) => setCryptoAddress(e.target.value)}
            />
            <label htmlFor="networkName" className="block text-sm mb-2 mt-4">
              Network Name
            </label>
            <input
              id="networkName"
              type="text"
              placeholder="Enter network name (e.g., TRC20)"
              className="w-full p-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-green-500"
              value={networkName}
              onChange={(e) => setNetworkName(e.target.value)}
            />
            <label htmlFor="cryptoName" className="block text-sm mb-2 mt-4">
              Cryptocurrency Name
            </label>
            <input
              id="cryptoName"
              type="text"
              placeholder="Enter cryptocurrency name (e.g., Bitcoin)"
              className="w-full p-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-green-500"
              value={cryptoName}
              onChange={(e) => setCryptoName(e.target.value)}
            />
          </div>
      )}

      {/* Country & Reseller Selection (Only for Deposit) */}
{selectedTab === 'deposit' && selectedPayment !== 'usdt' && selectedPayment !== 'bitcoin' && (
  <div className="bg-gray-800 p-6 rounded-lg mb-6 shadow-lg">
    <h2 className="text-xl font-semibold mb-6 text-green-400">Select Country & Reseller</h2>

    {/* Country Search Dropdown */}
    <div className="relative mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">Search Country</label>
      <input
        type="text"
        placeholder="Type to search..."
        value={countrySearchQuery}
        onChange={(e) => handleCountrySearch(e.target.value)}
        className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
      />
      <div className="mt-2 bg-gray-900 rounded-lg overflow-hidden shadow-lg max-h-60 overflow-y-auto">
        {filteredCountries.length > 0 ? (
    filteredCountries
      .filter((country) => !selectedCountry || country.name === selectedCountry) // Only show selected country
      .map((country) => (
        <button
          key={country.name}
          onClick={() => {
            setSelectedCountry(country.name);
            handleCountryChange({ target: { value: country.name } } as SelectChangeEvent<string>);
          }}
          className={`block w-full text-left px-4 py-2 hover:bg-gray-700 transition ${
            selectedCountry === country.name ? 'bg-gray-700' : ''
          }`}
        >
          {country.name} ({country.currencyCode})
        </button>
      ))
  ) : (
    <p className="text-center text-gray-400 py-4">No countries found</p>
  )}
      </div>
    </div>

    {/* Reseller List */}
   {selectedCountry && (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-300 mb-2">Select Reseller</label>
    {resellers.length > 0 ? (
      <div className="bg-gray-900 rounded-lg shadow-lg max-h-60 overflow-y-auto p-2">
        {resellers
          .filter((reseller) => selectedReseller === null || reseller.id === selectedReseller.id) // Filter resellers
          .map((reseller) => (
            <div
              key={reseller.id}
              onClick={() => {
                setSelectedReseller(reseller);
                handleResellerChange({
                  target: { value: reseller.username },
                } as SelectChangeEvent<string>);
              }}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition ${
                selectedReseller?.id === reseller.id ? 'bg-gray-700' : ''
              }`}
            >
              <div className="flex items-center">
                <img
                  src={reseller.profile_picture || '/images/default-avatar.png'}
                  alt={reseller.username}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="text-sm font-medium text-white">{`${reseller.first_name} ${reseller.last_name}`}</p>
                  <p className="text-xs text-gray-400">{reseller.username}</p>
                </div>
              </div>
              <p className="text-sm text-green-400">Verified</p>
            </div>
          ))}
      </div>
    ) : (
      <p className="text-center text-gray-400 py-4">No resellers available</p>
    )}
  </div>
)}

  </div>
)}


      {/* Amount Input and Conversion Details */}
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <label htmlFor="manualAmount" className="block text-sm mb-2">
          {selectedTab === 'deposit' ? 'Enter Deposit Coin Amount' : 'Enter Withdrawal Amount'}
        </label>
        <div className="relative">
          <Image
            src="/images/bgcoin.svg"
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
            onChange={(e) => {
              handleAmountInputChange(e); // Update amount
              const numericValue = parseInt(e.target.value, 10);
              setIsValidAmount(numericValue >= 100); // Update validation state
            }}
          />
        </div>

        {!isValidAmount && (
          <p className="text-xs text-red-400 mt-2">
            Amount must be at least three digits to proceed.
          </p>
        )}

        {convertedAmountDetails && (
          <div className="bg-gray-700 p-4 mt-2 rounded-lg">
            <h3 className="text-sm font-semibold text-green-400 mb-2">
              Equivalent Local Currency:{' '}
              <strong className="text-yellow-500">
                {convertedAmountDetails.currency_amount.toFixed(2)}{' '}
                {convertedAmountDetails.currency}
              </strong>
            </h3>
          </div>
        )}
      </div>

      {/* Amount Options */}
      {selectedTab === 'deposit' && (
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Amount</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {amountOptions
              .slice()
              .sort((a, b) => a - b)
              .map((option) => {
                const extraPercentage =
                  option === 10000
                    ? '+1.5% Extra'
                    : option === 15000
                    ? '+2% Extra'
                    : option === 20000
                    ? '+3% Extra'
                    : option === 25000
                    ? '+3.5% Extra'
                    : '';

                return (
                  <button
                    key={option}
                    className={clsx(
                      'py-2 px-4 rounded-md text-sm font-semibold flex flex-col items-center',
                      parseFloat(amount) === option
                        ? 'bg-green-700 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    )}
                    onClick={() => {
                      handleAmountSelect(option);
                      setIsValidAmount(option >= 100); // Update validation state
                    }}
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

      {/* Withdrawal Phone Number */}
      {showPhoneInput && (
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <label htmlFor="withdrawPhone" className="block text-sm mb-2">
            Withdrawal Phone Number
          </label>
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
};

export default DepositWithdrawContent;