

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import TicketDetails from "../../components/ticketDetails/ticketDetails";
interface Ticket {
  id: number;
  LotteryName: string;
  price: number;
  drawPriceAmount: number;
  numberOfWinner: number;
  winningRatio: string;
  prizeImage: string;
  firstPrize: string;
  secondPrize: string;
  thirdPrize: string;
  firstPrizeName: string;
  secondPrizeName: string;
  thirdPrizeName: string;
  ticketSellOpeningTime: string;
  ticketSellClosingTime: string;
  active: boolean;
  drawStatus: string;
}

const LotteryPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);



console.log(tickets)
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
    return <div className="text-gray-200">Loading...</div>; // Lightened text color for loading
  }

  return (
    <div className="container mx-auto p-6" style={{ backgroundColor: "#4E4E4E" }}>
      <h1 className="text-3xl font-bold mb-6 text-gray-100">Lottery Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {selectedTicketId ? (
        <TicketDetails ticketId={selectedTicketId} onBack={() => setSelectedTicketId(null)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="border border-gray-600 rounded-lg p-4 shadow-lg bg-gray-700">
              <Image src={ticket.prizeImage || "/placeholder-image.png"} alt={`${ticket.LotteryName} Prize`} width={300} height={200} className="rounded-lg" />
              <h2 className="text-xl font-semibold mt-4 text-gray-100">{ticket.LotteryName}</h2>
              <button className="mt-4 bg-green-500 text-gray-100 py-2 px-4 rounded-lg" onClick={() => setSelectedTicketId(ticket.id)}>
                Select Ticket
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

const handleSelectTicket = (id: number) => {
  console.log("Selected ticket ID:", id);
};

export default LotteryPage;
