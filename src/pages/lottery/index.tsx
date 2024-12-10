import React, { useEffect, useState } from "react";
import axios from "axios";
import LotteryCard from "../../components/Lottery/lotteryCard";
import LoadingSpinner from "../../components/common/loadingSpinner/LoadingSpinner";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import TicketDetails from "../../components/ticketDetails/ticketDetails";

interface Ticket {
  id: number;
  LotteryName: string;
  firstPrize: string;
  secondPrize: string;
  thirdPrize: string;
  firstPrizeName: string;
  secondPrizeName: string;
  thirdPrizeName: string;
}

const LotteryPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLottery, setSelectedLottery] = useState<number | null>(null);

  const handleViewDetails = (ticketId: number) => {
    setSelectedLottery(ticketId);
  };

  const handleBackToLottery = () => {
    setSelectedLottery(null);
  };

  const fetchTickets = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await axios.get(
        "https://api.bazigaar.com/ticket_draw_app/ticketList/",
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setTickets(response.data.results);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen py-6 bg-gray-900 text-white">
      <h1 className="text-3xl md:text-5xl text-center font-bold mb-6">
        Available Lottery Packages
      </h1>
      <div className="container mx-auto px-4">
        <Breadcrumbs aria-label="breadcrumb" separator={<span style={{ color: '#ffcc00' }}> &gt; </span>} className="text-gray-400">
          <Link href="/" className="flex items-center text-gray-400">
            <HomeIcon fontSize="small" className="mr-1" />
            Home
          </Link>
          <Typography className="flex items-center text-gray-400">
            <ConfirmationNumberIcon fontSize="small" className="mr-1" />
            Lottery Packages
          </Typography>
        </Breadcrumbs>
      </div>
      <div className="mt-6">
        {selectedLottery ? (
          <TicketDetails
            ticketId={selectedLottery}
            onBack={handleBackToLottery}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 container mx-auto">
            {tickets.map((ticket) => (
              <LotteryCard
                key={ticket.id}
                lotteryName={ticket.LotteryName}
                firstPrize={ticket.firstPrize}
                secondPrize={ticket.secondPrize}
                thirdPrize={ticket.thirdPrize}
                firstPrizeName={ticket.firstPrizeName}
                secondPrizeName={ticket.secondPrizeName}
                thirdPrizeName={ticket.thirdPrizeName}
                onViewDetails={() => handleViewDetails(ticket.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LotteryPage;