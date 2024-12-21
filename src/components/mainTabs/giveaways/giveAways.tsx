import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import HomeIcon from '@mui/icons-material/Home';

const Giveaway: React.FC = () => {
  return (
    <Box
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white"
      padding={4}
    >
      <CelebrationIcon style={{ fontSize: 80, color: '#ffcc00' }} />
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        className="mt-4"
      >
        No Giveaways Available Right Now
      </Typography>
      <Typography
        variant="body1"
        align="center"
        className="mt-2"
      >
        Stay tuned for upcoming giveaways! In the meantime, check out our amazing lottery packages and participate to win exciting prizes.
      </Typography>
      <Button
        variant="contained"
        href="/lottery-packages"
        startIcon={<HomeIcon />}
        style={{
          background: 'linear-gradient(270deg, #E65E09 0%, #F2BA56 100%)',
          color: 'black',
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '30px',
          textTransform: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        className="mt-6"
      >
         All Lottery Packages
      </Button>
    </Box>
  );
};

export default Giveaway;
