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
          className="bg-white p-6 shadow-lg rounded-lg w-full max-w-lg text-center border-2 border-gray-300 relative"
        >
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

          {/* Prize Details */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Prizes</h3>
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
                <p className="text-sm mt-2 font-semibold">{firstPrizeName}</p>
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
                <p className="text-sm mt-2 font-semibold">{secondPrizeName}</p>
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
                <p className="text-sm mt-2 font-semibold">{thirdPrizeName}</p>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <Button
            variant="contained"
            color="primary"
            className="mt-6"
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
    </div>
  );
};

export default Ticket;
