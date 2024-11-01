// pages/lottery/LotteryPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import TicketDetails from "../../components/ticketDetails/ticketDetails";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LoadingSpinner from "../../components/common/loadingSpinner/LoadingSpinner";

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
    return (
     <LoadingSpinner/>
    );
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
    <div className="min-h-screen bg-gray-100 text-white-100">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto p-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" className="flex items-center">
            <HomeIcon fontSize="small" className="mr-1" />
            Home
          </Link>
          <Typography color="textPrimary" className="flex items-center">
            <ConfirmationNumberIcon fontSize="small" className="mr-1" />
            Lottery Packages
          </Typography>
        </Breadcrumbs>
      </div>

      {/* Heading */}
      <h1 className="text-3xl lg:text-4xl font-bold text-center mt-4">
        Available All Packages
      </h1>

      {/* Tickets Grid */}
      <div className="container mx-auto p-6 lg:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-gray-700 rounded-lg p-4 shadow-lg bg-gray-800 hover:bg-gray-700 transition duration-200"
            >
              <Image
                src={ticket.prizeImage || "/placeholder-image.png"}
                alt={`${ticket.LotteryName} Prize`}
                width={400}
                height={250}
                className="rounded-lg object-cover w-full h-48"
              />
              <h1 className="text-x1 text-white font-semibold mt-4">{ticket.LotteryName}</h1>
              <p className="text-gray-300 mt-2">Price: ${ticket.price.toFixed(2)}</p>
              <button
                className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 py-2 rounded-lg font-semibold hover:opacity-90 transition duration-200"
                onClick={() => setSelectedTicketId(ticket.id)}
              >
                Select Ticket
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LotteryPage;
