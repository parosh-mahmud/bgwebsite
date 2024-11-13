import React, { useState } from 'react';
import { Button, Tab, Tabs, Typography, Box, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ReferralProgramProps {
  
}

const ReferralProgram: React.FC<ReferralProgramProps> = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [referralCode, setReferralCode] = useState<string>("ABCD1234"); // Example referral code
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://yourapp.com/referral?code=${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', padding: 2 }}>
     
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        sx={{
          marginTop: 2,
          backgroundColor: '#00693e',
          '& .MuiTab-root': { color: 'white', fontWeight: 'bold' },
        }}
      >
        <Tab label="Referral Info" />
        <Tab label="My Referral" />
      </Tabs>

      {tabValue === 0 && (
        <Box p={3} textAlign="center">
          <img src="/path/to/gift-image.png" alt="Refer and Earn" style={{ maxWidth: '100%', marginBottom: '16px' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            REFER YOUR FRIENDS AND EARN
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            You can earn cash rewards up to three referral tiers when you refer your friends. Invite your friends to join together and be entitled for lifetime cash rewards each time your friends place a bet.
          </Typography>
          <Button variant="contained" sx={{ backgroundColor: '#00693e', color: 'white', mt: 2 }}>
            Rules
          </Button>
        </Box>
      )}

      {tabValue === 1 && (
        <Box p={3}>
          <Typography variant="h6" sx={{ mb: 2 }}>Invite Friends</Typography>
          <TextField
            variant="outlined"
            size="small"
            value={`https://yourapp.com/referral?code=${referralCode}`}
            InputProps={{
              readOnly: true,
              sx: { color: "white", backgroundColor: "#455271" }
            }}
            fullWidth
          />
          <Button
            onClick={handleCopy}
            variant="contained"
            startIcon={<ContentCopyIcon />}
            sx={{ backgroundColor: copied ? "#4CAF50" : "#F2BA56", mt: 2 }}
            fullWidth
          >
            {copied ? "Copied!" : "Copy"}
          </Button>

          <Box mt={4}>
            <Typography variant="h6">Referred Friends</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              User123 - Joined on 2023-01-01
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              User456 - Joined on 2023-02-10
            </Typography>
            {/* Add more referred friends here */}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ReferralProgram;
