import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface TicketDetails {
  id: number;
  numberOfTicketSold: number;
  winningRatio: string;
  LotteryName: string;
  price: number;
  drawPriceAmount: number;
  numberOfWinner: number;
  coverImage: string;
  firstPrize: string;
  secondPrize: string;
  thirdPrize: string;
  firstPrizeName: string;
  secondPrizeName: string;
  thirdPrizeName: string;
  numberOfFirstWinner: number;
  numberOfSecondWinner: number;
  numberOfThirdWinner: number;
  ticketSellOpeningTime: string;
  ticketSellClosingTime: string;
  drawStatus: string;
}

const TicketDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ticketDetails, setTicketDetails] = useState<TicketDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [luckyNumber, setLuckyNumber] = useState('');
  const [userId, setUserId] = useState("2"); // Replace with actual user ID retrieval logic

  useEffect(() => {
    const fetchTicketDetails = async () => {
      if (id) {
        try {
          const response = await axios.get(`https://api.bazigaar.com/ticket_draw_app/ticket/${id}/`, {
            headers: {
              Authorization: `Token f89a4e393692925822dd6dd1dff4bbae84529b34`,
            },
          });
          setTicketDetails(response.data.results[0]);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching ticket details:", error);
          setLoading(false);
        }
      }
    };

    fetchTicketDetails();
  }, [id]);

  const handleBuyTicket = async () => {
    if (!/^\d{6}$/.test(luckyNumber)) {
      alert("Please enter a valid 6-digit lucky number.");
      return;
    }

    try {
      const response = await axios.post('https://api.bazigaar.com/ticket_draw_app/purchaseTicket/', {
        id: userId,
        count: quantity.toString(),
        numbers: luckyNumber,
      }, {
        headers: {
          Authorization: `Token f89a4e393692925822dd6dd1dff4bbae84529b34`,
        }
      });

      alert("Ticket purchase successful!");
      console.log("Purchase response:", response.data);
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      alert("There was an error purchasing your ticket.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold">Loading Ticket Details...</p>
      </div>
    );
  }

  if (!ticketDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold">Ticket Details Not Found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-extrabold mb-8 text-center">{ticketDetails.LotteryName}</h1>
      <div className="border p-6 rounded-lg shadow-lg bg-white">
        <Image src={ticketDetails.coverImage} alt={ticketDetails.LotteryName} width={300} height={200} className="rounded-lg mx-auto" />

        <div className="mt-6">
          <p className="text-lg font-semibold">Tickets Sold: {ticketDetails.numberOfTicketSold}</p>
          <p className="text-lg">Winning Ratio: {ticketDetails.winningRatio}</p>
          <p className="text-lg font-semibold">Ticket Price: ${ticketDetails.price}</p>
          <p className="text-lg">Draw Amount: ${ticketDetails.drawPriceAmount}</p>
          <p className="text-lg">Total Winners: {ticketDetails.numberOfWinner}</p>
          <p className="text-lg font-semibold">Draw Status: {ticketDetails.drawStatus}</p>
          <p className="text-lg mt-2">Ticket Sales: {new Date(ticketDetails.ticketSellOpeningTime).toLocaleString()} to {new Date(ticketDetails.ticketSellClosingTime).toLocaleString()}</p>
        </div>

        {/* Input Fields for Quantity and Lucky Number */}
        <div className="mt-8 flex flex-col items-center space-y-4">
          <label className="text-lg font-medium">
            Ticket Quantity:
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="ml-3 p-2 border rounded-lg"
            />
          </label>

          <label className="text-lg font-medium">
            Lucky Number (6 digits):
            <input
              type="text"
              value={luckyNumber}
              maxLength={6}
              onChange={(e) => setLuckyNumber(e.target.value)}
              placeholder="Enter 6-digit number"
              className="ml-3 p-2 border rounded-lg"
            />
          </label>
        </div>

        <div className="flex mt-8 space-x-6 justify-center">
          <button
            onClick={handleBuyTicket}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 px-8 rounded-lg"
          >
            Buy Ticket Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsPage;
