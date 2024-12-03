import React, { useRef } from "react";
import html2canvas from "html2canvas";
import Image from "next/image";
import { Button, Breadcrumbs, Typography, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

interface TicketProps {
  lotteryName: string;
  ticketId: number;
  luckyNumbers: string[];
  drawDate: string;
  price: number;
  prizeImage: string;
  firstPrizeName: string;
  firstPrize: string;
  secondPrizeName: string;
  secondPrize: string;
  thirdPrizeName: string;
  thirdPrize: string;
  onBackToHistory: () => void;
}

const Ticket: React.FC<TicketProps> = ({
  lotteryName,
  ticketId,
  luckyNumbers,
  drawDate,
  price,
  prizeImage,
  firstPrizeName,
  firstPrize,
  secondPrizeName,
  secondPrize,
  thirdPrizeName,
  thirdPrize,
  onBackToHistory,
}) => {
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
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs aria-label="breadcrumb" className="mb-6">
        <Link
          color="inherit"
          onClick={() => (window.location.href = "/")}
          className="flex items-center cursor-pointer"
        >
          <HomeIcon fontSize="small" className="mr-1" />
          Home
        </Link>
        <Link
          color="inherit"
          onClick={onBackToHistory}
          className="flex items-center cursor-pointer"
        >
          <HistoryIcon fontSize="small" className="mr-1" />
          Ticket Details
        </Link>
        <Typography color="textPrimary" className="flex items-center">
          <ConfirmationNumberIcon fontSize="small" className="mr-1" />
          Ticket
        </Typography>
      </Breadcrumbs>

      <div className="flex justify-center items-center">
        <div
          ref={ticketRef}
          className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 p-8 shadow-lg rounded-lg w-full max-w-lg text-center border-2 border-gray-300 relative"
        >
          {/* Ticket Header */}
          <h2 className="text-2xl font-bold mb-2 text-white">{lotteryName}</h2>
          <p className="text-white text-sm">Ticket ID: #{ticketId}</p>

          {/* Lucky Numbers */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-white">Your Lucky Numbers</h3>
            <div className="flex justify-center space-x-2 mt-2">
              {luckyNumbers.map((num, index) => (
                <span
                  key={index}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-700 text-white font-bold text-lg shadow-md"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          {/* Draw Date */}
          <div className="mt-6">
            <p className="text-white">Draw Date:</p>
            <p className="text-xl font-semibold text-white">{drawDate}</p>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-white">Ticket Price:</p>
            <p className="text-xl font-semibold text-white">${price.toFixed(2)}</p>
          </div>

          {/* Prize Details */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white">Prizes</h3>
            <div className="flex justify-center gap-4 mt-4">
              {/* First Prize */}
              <div className="text-center">
                <Image
                  src={firstPrize || "/placeholder-image.png"}
                  alt="First Prize"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <p className="text-sm mt-2 font-semibold text-white">{firstPrizeName}</p>
              </div>
              {/* Second Prize */}
              <div className="text-center">
                <Image
                  src={secondPrize || "/placeholder-image.png"}
                  alt="Second Prize"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <p className="text-sm mt-2 font-semibold text-white">{secondPrizeName}</p>
              </div>
              {/* Third Prize */}
              <div className="text-center">
                <Image
                  src={thirdPrize || "/placeholder-image.png"}
                  alt="Third Prize"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <p className="text-sm mt-2 font-semibold text-white">{thirdPrizeName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-8">
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadTicket}
          style={{
            background: "linear-gradient(90deg, #F2BA56 0%, #E65E09 100%)",
            color: "#fff",
          }}
        >
          Download Ticket
        </Button>
      </div>
    </div>
  );
};

export default Ticket;
