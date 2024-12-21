import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress
} from '@mui/material';

interface LotteryTicket {
  id: string;
  number: string;
  purchaseDate: string;
}

const SpecialLottery: React.FC = () => {
  const [tickets, setTickets] = useState<LotteryTicket[]>([]);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [loading, setLoading] = useState(false);

  return (
    <Box sx={{ color: 'white' }}>
      <Grid container spacing={3}>
        {/* Prize Pool Section */}
        <Grid item xs={12}>
          <Card sx={{ bgcolor: '#2A3441', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Current Prize Pool: 1,000,000 BGC
              </Typography>
              <Typography variant="h6">
                Next Draw: {timeLeft}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Ticket Purchase Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#2A3441', color: 'white' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Buy Tickets
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Purchase Ticket (100 BGC)
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* My Tickets Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#2A3441', color: 'white' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                My Tickets
              </Typography>
              {loading ? (
                <CircularProgress />
              ) : (
                tickets.map(ticket => (
                  <Box key={ticket.id} sx={{ mb: 1 }}>
                    <Typography>
                      Ticket #{ticket.number}
                    </Typography>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SpecialLottery;