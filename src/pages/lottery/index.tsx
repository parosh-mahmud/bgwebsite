import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import TicketDetails from "../../components/ticketDetails/ticketDetails";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LoadingSpinner from "../../components/common/loadingSpinner/LoadingSpinner";
import LotteryCard from "../../components/Lottery/lotteryCard";

interface Ticket {
  id: number;
  LotteryName: string;
  price: number;
  prizeImage: string;
}

const LotteryPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
const lotteries = [
  {
    id: 1,
    lotteryName: "Mega Lottery",
    price: 5,
    drawStatus: "Ongoing",
    numberOfTickets: 500,
    prizeImage:
      "https://sgp1.digitaloceanspaces.com/bazigaar/media/image/firstPrize/iPhone-17-Plus-Feature.jpeg",
  },
  {
    id: 2,
    lotteryName: "Super Saver Lottery",
    price: 10,
    drawStatus: "Completed",
    numberOfTickets: 300,
    prizeImage:
      "https://sgp1.digitaloceanspaces.com/bazigaar/media/image/secondPrize/iphoneimage-removebg-preview.png",
  },
];
  const fetchTickets = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await axios.get("https://api.bazigaar.com/ticket_draw_app/ticketList/", {
        headers: { Authorization: `Token ${token}` },
      });
      setTickets(response.data.results);
      console.log(response.data.results)
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

  if (selectedTicketId) {
    return (
      <TicketDetails
        ticketId={selectedTicketId}
        onBack={() => setSelectedTicketId(null)}
      />
    );
  }

  return (
    <div className="min-h-screen text-white-100">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto p-4">
        <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
          <Link href="/" className="flex items-center" style={{ color: "white" }}>
            <HomeIcon fontSize="small" className="mr-1" />
            Home
          </Link>
          <Typography className="flex items-center" style={{ color: "white" }}>
            <ConfirmationNumberIcon fontSize="small" className="mr-1" />
            Lottery Packages
          </Typography>
        </Breadcrumbs>
      </div>

      {/* Heading */}
      <h1 className="text-3xl text-yellow-100 lg:text-4xl font-bold text-center mt-4">
        Available All Packages
      </h1>

      {/* Tickets Grid */}
      <div className="container mx-auto p-6 lg:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
   {lotteries.map((lottery) => (
          <LotteryCard
            key={lottery.id}
            lotteryName={lottery.lotteryName}
            price={lottery.price}
            drawStatus={lottery.drawStatus}
            numberOfTickets={lottery.numberOfTickets}
            prizeImage={lottery.prizeImage}
            onViewDetails={() => alert(`Viewing details for ${lottery.lotteryName}`)}
          />
        ))}
</div>

      </div>
    </div>
  );
};

export default LotteryPage;
