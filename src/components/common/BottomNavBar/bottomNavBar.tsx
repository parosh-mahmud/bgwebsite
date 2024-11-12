import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DepositIcon from '@mui/icons-material/AccountBalanceWallet';
import WithdrawalIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';
import { WhatsApp } from '@mui/icons-material';
import { Facebook } from '@mui/icons-material';
import ProfileIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useRouter } from 'next/router';
interface UserDetails {
  user: {
    username: string;
    bgcoin: number;
  };
}

const BottomNavBar = () => {
  const [value, setValue] = useState(0);
  const [showAccountScreen, setShowAccountScreen] = useState(false);
   const [userDetails, setUserDetails] = useState({ user: { username: '', bgcoin: 0 } });
  const router = useRouter();
  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
    if (newValue === 1) {
      router.push('/wallet'); // Navigate to the wallet page
    } else if (newValue === 4) {
      setShowAccountScreen((prev) => !prev); // Toggle the account screen on "My Account"
    } else {
      setShowAccountScreen(false); // Close the account screen on other selections
    }
  };
  useEffect(() => {
    // Retrieve userDetails from localStorage on component mount
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);
  // Prevent background scrolling when the account screen is open
  useEffect(() => {
    if (showAccountScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAccountScreen]);

  return (
    <>
      {/* Bottom Navigation */}
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          backgroundColor: '#0B1E37', // Set background color for bottom nav
          '& .MuiBottomNavigationAction-root': { color: '#F2BA56' }, // Icon color for all actions
          '& .Mui-selected': { color: '#FFFFFF' }, // White color for selected item
        }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Wallet" icon={<AccountBalanceWalletIcon />} />
        <BottomNavigationAction label="Games" icon={<SportsEsportsIcon />} />
        <BottomNavigationAction label="Chats" icon={<ChatIcon />} />
        <BottomNavigationAction label="My Account" icon={<AccountCircleIcon />} />
      </BottomNavigation>

      {/* Slide-up Account Screen */}
      <div
        className={`fixed inset-0 z-40 bg-gray-800 text-white transition-transform duration-500 transform ${
          showAccountScreen ? 'translate-y-0' : 'translate-y-full'
        } flex flex-col`}
      >
        {/* Sticky Header */}
        <div className="flex justify-between items-center p-4 bg-gray-900">
          <h2 className="text-lg font-semibold">{userDetails.user.username}</h2>
          <button onClick={() => setShowAccountScreen(false)} className="text-white text-2xl">
            &times;
          </button>
        </div>

        {/* Content Wrapper */}
        <div className="flex-1 overflow-y-auto">
          {/* Wallet Section */}
          <div className="bg-gray-700 p-3 rounded-md mb-4 mx-4">
            <p className="text-gray-400">Main Wallet</p>
            <div className="flex items-center justify-between">
              <span className="text-lg">{userDetails.user.bgcoin}</span>
            </div>
          </div>

          {/* Sections with Dividers */}
          <div className="space-y-6 px-4">
            {/* Funds Section */}
            <div>
              <h3 className="text-lg font-semibold text-white border-l-4 border-green-500 pl-2">
                Funds
              </h3>
              <div className="flex justify-around py-4">
                <button className="flex flex-col items-center text-center">
                  <div className="bg-gray-600 rounded-full p-3 mb-2">
                    <DepositIcon sx={{ color: '#F2BA56' }} />
                  </div>
                  <span className="text-sm">Deposit</span>
                </button>
                <button className="flex flex-col items-center text-center">
                  <div className="bg-gray-600 rounded-full p-3 mb-2">
                    <WithdrawalIcon sx={{ color: '#F2BA56' }} />
                  </div>
                  <span className="text-sm">Withdrawal</span>
                </button>
              </div>
            </div>
            <div className="border-t border-gray-500 my-2"></div>

            {/* History Section */}
            <div>
              <h3 className="text-lg font-semibold text-white border-l-4 border-green-500 pl-2">
                History
              </h3>
              <div className="flex justify-around py-4">
                <button className="flex flex-col items-center text-center">
                  <div className="bg-gray-600 rounded-full p-3 mb-2">
                    <HistoryIcon sx={{ color: '#F2BA56' }} />
                  </div>
                  <span className="text-sm">Lottery History</span>
                </button>
                <button className="flex flex-col items-center text-center">
                  <div className="bg-gray-600 rounded-full p-3 mb-2">
                    <HistoryIcon sx={{ color: '#F2BA56' }} />
                  </div>
                  <span className="text-sm">Transaction History</span>
                </button>
              </div>
            </div>
            <div className="border-t border-gray-500 my-2"></div>

            {/* Profile Section */}
            <div>
              <h3 className="text-lg font-semibold text-white border-l-4 border-green-500 pl-2">
                Profile
              </h3>
              <div className="flex justify-around py-4">
                <button className="flex flex-col items-center text-center">
                  <div className="bg-gray-600 rounded-full p-3 mb-2">
                    <ProfileIcon sx={{ color: '#F2BA56' }} />
                  </div>
                  <span className="text-sm">Personal Info</span>
                </button>
                <button className="flex flex-col items-center text-center">
                  <div className="bg-gray-600 rounded-full p-3 mb-2">
                    <ProfileIcon sx={{ color: '#F2BA56' }} />
                  </div>
                  <span className="text-sm">Reset Password</span>
                </button>
                <button className="flex flex-col items-center text-center">
                  <div className="bg-gray-600 rounded-full p-3 mb-2">
                    <ChatIcon sx={{ color: '#F2BA56' }} />
                  </div>
                  <span className="text-sm">Inbox</span>
                </button>
              </div>
            </div>
            <div className="border-t border-gray-500 my-2"></div>

            {/* Contact Us Section */}
            <div>
              <h3 className="text-lg font-semibold text-white border-l-4 border-green-500 pl-2">
                Contact Us
              </h3>
              <div className="flex justify-around py-4">
                <button className="flex flex-col items-center text-center">
                  <div className="bg-gray-600 rounded-full p-3 mb-2">
                    <WhatsApp sx={{ color: '#F2BA56' }} />
                  </div>
                  <span className="text-sm">WhatsApp</span>
                </button>
                <button className="flex flex-col items-center text-center">
                  <div className="bg-gray-600 rounded-full p-3 mb-2">
                    <ContactMailIcon sx={{ color: '#F2BA56' }} />
                  </div>
                  <span className="text-sm">Email</span>
                </button>
                <button className="flex flex-col items-center text-center">
                  <div className="bg-gray-600 rounded-full p-3 mb-2">
                    <Facebook sx={{ color: '#F2BA56' }} />
                  </div>
                  <span className="text-sm">Facebook</span>
                </button>
              </div>
            </div>
            <div className="border-t border-gray-500 my-2"></div>
            <div>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNavBar;
