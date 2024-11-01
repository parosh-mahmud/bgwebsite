import React, { useRef } from "react";
import html2canvas from "html2canvas";
import Image from "next/image";
import { Button } from "@mui/material";

interface TicketProps {
  lotteryName: string;
  ticketId: number;
  luckyNumbers: string[];
  drawDate: string;
  price: number;
}

const Ticket: React.FC<TicketProps> = ({ lotteryName, ticketId, luckyNumbers, drawDate, price }) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownloadTicket = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current);
      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `Ticket-${ticketId}.png`;
      link.click();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div ref={ticketRef} className="bg-white p-6 shadow-lg rounded-lg w-80 text-center border-2 border-gray-300 relative">
        {/* Ticket Header */}
        <h2 className="text-xl font-bold mb-2 text-gray-800">{lotteryName}</h2>
        <p className="text-gray-600">Ticket ID: #{ticketId}</p>

        {/* Lucky Numbers */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Your Lucky Numbers</h3>
          <div className="flex justify-center space-x-2 mt-2">
            {luckyNumbers.map((num, index) => (
              <span
                key={index}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg"
              >
                {num}
              </span>
            ))}
          </div>
        </div>

        {/* Draw Date */}
        <div className="mt-6">
          <p className="text-gray-600">Draw Date:</p>
          <p className="text-lg font-semibold text-gray-800">{drawDate}</p>
        </div>

        {/* Price */}
        <div className="mt-6">
          <p className="text-gray-600">Ticket Price:</p>
          <p className="text-lg font-semibold text-gray-800">${price.toFixed(2)}</p>
        </div>

        {/* Download Button */}
        <Button
          variant="contained"
          color="primary"
          className="mt-6"
          onClick={handleDownloadTicket}
        >
          Download Ticket
        </Button>
      </div>
    </div>
  );
};

export default Ticket;
