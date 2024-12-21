import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Typography,
  Box,
  Breadcrumbs,
  Link,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LotteryCard from '../../Lottery/lotteryCard';
import LoadingSpinner from '../../common/loadingSpinner/LoadingSpinner';
import TicketDetails from '../../ticketDetails/ticketDetails';

interface LotteryTicket {
  id: number;
  LotteryName: string;
  price: number;
  drawPriceAmount: number;
  numberOfWinner: number;
  firstPrize: string;
  secondPrize: string;
  thirdPrize: string;
  firstPrizeName: string;
  secondPrizeName: string;
  thirdPrizeName: string;
  type: string;
}

const SpecialLottery: React.FC = () => {
  const [tickets, setTickets] = useState<LotteryTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLottery, setSelectedLottery] = useState<number | null>(null);

  const fetchTickets = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "https://api.bazigaar.com/ticket_draw_app/ticketList/",
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log("API Response:", response.data); // Console log response data
      const specialTickets = response.data.results.filter((ticket: LotteryTicket) => ticket.type === 'Special');
      setTickets(specialTickets);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleViewDetails = (ticketId: number) => {
    setSelectedLottery(ticketId);
  };

  const handleBackToLottery = () => {
    setSelectedLottery(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box padding={2} className="min-h-screen bg-gray-900 text-white">
    
       

      {selectedLottery ? (
        <TicketDetails
          ticketId={selectedLottery}
          onBack={handleBackToLottery}
        />
      ) : (
        <Grid container spacing={3} className="mt-6">
          {tickets.map((ticket) => (
            <Grid item xs={12} sm={6} md={4} key={ticket.id}>
              <LotteryCard
                lotteryName={ticket.LotteryName}
                firstPrize={ticket.firstPrize}
                secondPrize={ticket.secondPrize}
                thirdPrize={ticket.thirdPrize}
                firstPrizeName={ticket.firstPrizeName}
                secondPrizeName={ticket.secondPrizeName}
                thirdPrizeName={ticket.thirdPrizeName}
                onViewDetails={() => handleViewDetails(ticket.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SpecialLottery;
