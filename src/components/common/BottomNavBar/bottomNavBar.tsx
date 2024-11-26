import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Box, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DepositIcon from '@mui/icons-material/AccountBalanceWallet';
import WithdrawalIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';
import { WhatsApp, Facebook } from '@mui/icons-material';
import ProfileIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Bgcoin from "../../../assets/LandingPage/SVG/bgcoin.svg";
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Image from 'next/image';
import ReferralProgram from '../../referral/referralMain';
interface UserDetails {
  user: {
    username: string;
    bgcoin: number;
    isReseller: boolean; // Ensure default value for isReseller
  };
}

const BottomNavBar = () => {
  const [value, setValue] = useState(0);
  const [showAccountScreen, setShowAccountScreen] = useState(false);
const [userDetails, setUserDetails] = useState<UserDetails>({
  user: {
    username: '',
    bgcoin: 0,
    isReseller: false, // Ensure default value for isReseller
  },
});
  const router = useRouter();
 const [showReferralProgram, setShowReferralProgram] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    router.push('/login');
  };

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    if (newValue === 1) {
      router.push('/wallet');
    } else if (newValue === 4) {
      setShowAccountScreen((prev) => !prev);
    } else {
      setShowAccountScreen(false);
    }
  };

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = showAccountScreen ? 'hidden' : '';
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
          backgroundColor: '#0B1E37',
          '& .MuiBottomNavigationAction-root': { color: '#F2BA56' },
          '& .Mui-selected': { color: '#FFFFFF' },
        }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Wallet" icon={<AccountBalanceWalletIcon />} />
        <BottomNavigationAction label="Games" icon={<SportsEsportsIcon />} />
        <BottomNavigationAction label="Chats" icon={<ChatIcon />} />
        <BottomNavigationAction sx={{ whiteSpace: 'nowrap' }} label="My Account" icon={<AccountCircleIcon />} />
      </BottomNavigation>

      {/* Slide-up Account Screen */}
      <div
        className={`fixed inset-0 z-40 bg-gray-800 text-white transition-transform duration-500 transform ${
          showAccountScreen ? 'translate-y-0' : 'translate-y-full'
        } flex flex-col h-screen`}
      >
         {!showReferralProgram ? (
          <>
        {/* Sticky Header */}
        <div className="flex justify-between items-center p-4 bg-gray-900">
           <div className="flex items-center space-x-2">
    <h2 className="text-lg font-semibold">{userDetails.user.username}</h2>
    {userDetails.user.isReseller && (
      <span
        className="text-xs font-bold text-green-500 px-2 py-1 rounded-full bg-gradient-to-r from-green-400 to-green-600"
        style={{
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'red',
        }}
      >
        Reseller
      </span>
    )}
  </div>
          <button onClick={() => setShowAccountScreen(false)} className="text-white text-2xl">
            &times;
          </button>
        </div>

        {/* Content Wrapper */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-primary">
          {/* Wallet Section */}
          <div className="bg-gray-700 p-3 rounded-md mb-4 mx-4">
            <p className="text-gray-400 text-left">Main Wallet</p>
            <div className="flex items-center justify-center space-x-2">
 <Image src="/images/bgcoin.svg" alt="BG Coin" width={50} height={50} />
              <span style={{ color: '#FFD700', marginLeft: '8px' }} className="text-4xl font-semibold">
                {userDetails.user.bgcoin}
              </span>
            </div>
          </div>

          {/* Sections with Dividers */}
          <div className="space-y-6 px-4">
            {/* Funds Section */}
            <div className="rounded-md bg-secondary p-4">
              <h3 className="text-lg font-semibold text-white border-l-4 border-green-500 pl-2">Funds</h3>
              <div className="flex justify-around py-4">
                <button
                  className="flex flex-col items-center text-center"
                  onClick={() => {
                    setShowAccountScreen(false);
                    router.push('/funds?type=deposit');
                  }}
                >
                  <div className="bg-gray-600 rounded-full p-3 mb-2">
                    <DepositIcon sx={{ color: '#F2BA56' }} />
                  </div>
                  <span className="text-sm">Deposit</span>
                </button>
                <button
                  className="flex flex-col items-center text-center"
                  onClick={() => {
                    setShowAccountScreen(false);
                    router.push('/funds?type=withdrawal');
                  }}
                >
                  <div className="bg-gray-600 rounded-full p-3 mb-2">
                    <WithdrawalIcon sx={{ color: '#F2BA56' }} />
                  </div>
                  <span className="text-sm">Withdrawal</span>
                </button>
              </div>
            </div>
            <div className="border-t border-gray-500 my-2"></div>

            {/* History Section */}
            <div className="rounded-md bg-secondary p-4">
              <h3 className="text-lg font-semibold text-white border-l-4 border-green-500 pl-2">History</h3>
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
            <div className="rounded-md bg-secondary p-4">
              <h3 className="text-lg font-semibold text-white border-l-4 border-green-500 pl-2">Profile</h3>
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
                 <button
                      className="flex flex-col items-center text-center"
                      onClick={() => setShowReferralProgram(true)}
                    >
                      <div className="bg-gray-600 rounded-full p-3 mb-2">
                        <ProfileIcon sx={{ color: '#F2BA56' }} />
                      </div>
                      <span className="text-sm">Referral</span>
                    </button>
              </div>
            </div>
            <div className="border-t border-gray-500 my-2"></div>

            {/* Contact Us Section */}
            <div className="rounded-md bg-secondary p-4">
              <h3 className="text-lg font-semibold text-white border-l-4 border-green-500 pl-2">Contact Us</h3>
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
            <div className="rounded-md bg-secondary p-4 text-center">
              <button onClick={handleLogout} className="text-white font-semibold">
                Logout
              </button>
            </div>
          </div>
        </div>

           </>
        ) : (
          // Referral Program Component with Back Button
          // Referral Program with Custom Header
          <Box className="flex flex-col h-full bg-primary">
            <Box display="flex" alignItems="center" p={2} sx={{ backgroundColor: '#00693e' }}>
              <IconButton onClick={() => setShowReferralProgram(false)} sx={{ color: 'white' }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" sx={{ ml: 1 }}>
                Referral Program
              </Typography>
            </Box>
            <Box p={3}>
              <ReferralProgram /> {/* Render Referral Program component here */}
            </Box>
          </Box>
        )}
      </div>
    </>
  );
};

export default BottomNavBar;
