import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress, Box, Typography, Button, Alert } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const WithdrawalConfirmation: React.FC = () => {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(45 * 60); // 45 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#0B1E37"
      color="white"
      p={4}
    >
      {/* Withdrawal Animation */}
      <Box sx={{ position: 'relative', mb: 4 }}>
        <CircularProgress
          size={100}
          thickness={4}
          sx={{ color: '#F2BA56' }}
          variant="determinate"
          value={100 - (remainingTime / (45 * 60)) * 100}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 60, color: '#F2BA56' }} />
        </Box>
      </Box>

      {/* Confirmation Text */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Withdrawal Request Submitted!
      </Typography>
      <Typography variant="body1" align="center" mb={4}>
        Your withdrawal request is now being processed. Funds are typically received within 45 minutes. If you experience delays, please contact support.
      </Typography>

      {/* Timer */}
      <Box display="flex" alignItems="center" gap={1} mb={4}>
        <AccessTimeIcon sx={{ color: '#F2BA56' }} />
        <Typography variant="h6" fontWeight="bold">
          Time Remaining: {formatTime(remainingTime)}
        </Typography>
      </Box>

      {/* Support Alert */}
      {remainingTime === 0 && (
        <Alert severity="warning" sx={{ mb: 4 }}>
          Withdrawal time has expired. Please contact support for further assistance.
        </Alert>
      )}

      {/* Buttons */}
      <Box display="flex" gap={2} mb={4}>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => router.push('/')}
          sx={{
            background: 'linear-gradient(90deg, #F2BA56 0%, #E65E09 100%)',
            color: '#FFFFFF',
            '&:hover': {
              background: 'linear-gradient(90deg, #E65E09 0%, #F2BA56 100%)',
            },
          }}
        >
          Home
        </Button>
        <Button
          variant="contained"
          startIcon={<HistoryIcon />}
          onClick={() => router.push('/transaction-history')}
          sx={{
            background: 'linear-gradient(90deg, #F2BA56 0%, #E65E09 100%)',
            color: '#FFFFFF',
            '&:hover': {
              background: 'linear-gradient(90deg, #E65E09 0%, #F2BA56 100%)',
            },
          }}
        >
          Transaction History
        </Button>
        <Button
          variant="contained"
          startIcon={<SupportAgentIcon />}
          onClick={() => router.push('/support')}
          sx={{
            background: 'linear-gradient(90deg, #F2BA56 0%, #E65E09 100%)',
            color: '#FFFFFF',
            '&:hover': {
              background: 'linear-gradient(90deg, #E65E09 0%, #F2BA56 100%)',
            },
          }}
        >
          Contact Support
        </Button>
      </Box>
    </Box>
  );
};

export default WithdrawalConfirmation;
