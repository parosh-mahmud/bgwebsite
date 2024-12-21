import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface BottomNavBarProps {
  value: number;
  onChange: (event: any, newValue: any) => void;
}

const ReuseableBottomBar: React.FC<BottomNavBarProps> = ({ value, onChange }) => {
  return (
    <BottomNavigation
      value={value}
      onChange={onChange}
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
  );
};

export default ReuseableBottomBar;
