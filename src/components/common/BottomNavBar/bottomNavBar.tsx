// components/BottomNavBar.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const BottomNavBar = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  // Update the value based on the current route
  useEffect(() => {
    switch (router.pathname) {
      case '/':
        setValue(0);
        break;
      case '/wallet':
        setValue(1);
        break;
      case '/games':
        setValue(2);
        break;
      case '/chats':
        setValue(3);
        break;
      case '/account':
        setValue(4);
        break;
      default:
        setValue(0);
    }
  }, [router.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push('/');
        break;
      case 1:
        router.push('/wallet');
        break;
      case 2:
        router.push('/games');
        break;
      case 3:
        router.push('/chats');
        break;
      case 4:
        router.push('/account');
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: '1px solid #ccc', // Optional: Add a top border
      }}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Wallet" icon={<AccountBalanceWalletIcon />} />
        <BottomNavigationAction label="Games" icon={<SportsEsportsIcon />} />
        <BottomNavigationAction label="Chats" icon={<ChatIcon />} />
        <BottomNavigationAction label="My Account" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default BottomNavBar;
