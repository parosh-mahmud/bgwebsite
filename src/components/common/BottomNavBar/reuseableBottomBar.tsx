import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ReusableBottomBar = () => {
  const [value, setValue] = useState(0);
  const router = useRouter();

  const handleNavigation = (event: any, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push('/home'); // Update with your home route
        break;
      case 1:
        router.push('/wallet'); // Update with your wallet route
        break;
      case 2:
        router.push('/games'); // Update with your games route
        break;
      case 3:
        router.push('/chats'); // Update with your chats route
        break;
      case 4:
        router.push('/account'); // Update with your account route
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleNavigation}
      sx={{
        backgroundColor: '#0B1E37',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        '& .MuiBottomNavigationAction-root': { color: '#F2BA56' },
        '& .Mui-selected': { color: '#FFFFFF' },
      }}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Wallet" icon={<AccountBalanceWalletIcon />} />
      <BottomNavigationAction label="Games" icon={<SportsEsportsIcon />} />
      <BottomNavigationAction label="Chats" icon={<ChatIcon />} />
      <BottomNavigationAction label="My Account" icon={<AccountCircleIcon />} />
    </BottomNavigation>
  );
};

export default ReusableBottomBar;
