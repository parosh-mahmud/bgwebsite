import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Breadcrumbs, Typography, Link, Button, Modal, TextField } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface TicketDetailsProps {
  ticketId: number;
  onBack: () => void;
}

interface TicketData {
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
  drawStatus: string;
  totalNumberOfTickets: number;
  numberOfTicketSold: number;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticketId, onBack }) => {
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [quantity, setQuantity] = useState(1); // Quantity of tickets
  const [modalOpen, setModalOpen] = useState(false); // Modal state

  const fetchTicketDetails = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`https://api.bazigaar.com/ticket_draw_app/ticket/${ticketId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setTicketData(response.data);
    } catch (error) {
      console.error("Failed to fetch ticket details:", error);
    }
  };

  useEffect(() => {
    fetchTicketDetails();
  }, [ticketId]);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handlePayNow = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  if (!ticketData) {
    return <div>Loading ticket details...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-700 rounded-lg text-gray-100">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="#" color="inherit" onClick={onBack}>
          <HomeIcon fontSize="small" /> Lottery Home
        </Link>
        <Typography color="inherit">
          <ConfirmationNumberIcon fontSize="small" /> Packages
        </Typography>
        <Typography color="textPrimary">
          <EventNoteIcon fontSize="small" /> Ticket Details
        </Typography>
      </Breadcrumbs>

      {/* Ticket Details */}
      <div className="mt-6">
        <Image src={ticketData.prizeImage || "/placeholder-image.png"} alt="Prize Image" width={300} height={200} className="rounded-lg" />
        <h2 className="text-2xl font-bold mt-4">{ticketData.LotteryName}</h2>
        <p>Price: ${ticketData.price}</p>
        <p>Draw Amount: ${ticketData.drawPriceAmount}</p>
        <p>Number of Winners: {ticketData.numberOfWinner}</p>
        <p>Winning Ratio: {ticketData.winningRatio}</p>
        <p>Total Tickets: {ticketData.totalNumberOfTickets}</p>
        <p>Tickets Sold: {ticketData.numberOfTicketSold}</p>
        <p>Status: {ticketData.drawStatus}</p>

        {/* Prize Images */}
        <div className="flex gap-4 mt-4">
          <div>
            <Image src={ticketData.firstPrize} alt="First Prize" width={100} height={100} className="rounded-lg" />
            <p>{ticketData.firstPrizeName}</p>
          </div>
          <div>
            <Image src={ticketData.secondPrize} alt="Second Prize" width={100} height={100} className="rounded-lg" />
            <p>{ticketData.secondPrizeName}</p>
          </div>
          <div>
            <Image src={ticketData.thirdPrize} alt="Third Prize" width={100} height={100} className="rounded-lg" />
            <p>{ticketData.thirdPrizeName}</p>
          </div>
        </div>

        {/* Ticket Quantity and Pay Now Button */}
        <div className="flex items-center mt-6">
          <Button variant="outlined" onClick={() => handleQuantityChange(-1)}>
            <RemoveIcon />
          </Button>
          <TextField
            value={quantity}
            inputProps={{
              maxLength: 6,
              min: 1,
              style: { textAlign: "center", color: "#fff", width: "4rem" },
            }}
            variant="outlined"
            className="mx-2"
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value.replace(/\D/g, "")) || 1))}
          />
          <Button variant="outlined" onClick={() => handleQuantityChange(1)}>
            <AddIcon />
          </Button>
        </div>
        <Button variant="contained" color="primary" className="mt-4" onClick={handlePayNow}>
          Pay Now
        </Button>
      </div>

      {/* Success Modal */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Purchase Successful!</h2>
            <p>You have successfully purchased {quantity} ticket(s).</p>
            <p>Check your ticket on the My Lottery History page.</p>
            <Button variant="contained" color="primary" onClick={handleModalClose} className="mt-4">
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TicketDetails;
