import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Breadcrumbs,
  Typography,
  Link,
  Button,
  Modal,
  TextField,
} from "@mui/material";
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
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [luckyNumbers, setLuckyNumbers] = useState<string[]>(["", "", "", "", "", ""]);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const fetchTicketDetails = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `https://api.bazigaar.com/ticket_draw_app/ticket/${ticketId}/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setTicketData(response.data);
    } catch (error) {
      console.error("Failed to fetch ticket details:", error);
    }
  };

  useEffect(() => {
    fetchTicketDetails();
  }, [ticketId]);

  const handleQuantityChange = (amount: number) => 
    setQuantity((prev) => Math.max(1, prev + amount));

  const handleLuckyNumberChange = (index: number, value: string) => {
    if (/^\d$/.test(value) || value === "") {
      const newLuckyNumbers = [...luckyNumbers];
      newLuckyNumbers[index] = value;
      setLuckyNumbers(newLuckyNumbers);

      // Move to the next input if a digit is entered
      if (value !== "" && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleClearLuckyNumbers = () => {
    setLuckyNumbers(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus(); // Focus back on the first input
  };

  const handlePayNow = async () => {
    const token = localStorage.getItem("authToken");
    const luckyNumbersString = luckyNumbers.join("");

    const payload = {
      id: ticketId,
      count: quantity,
      numbers: luckyNumbersString,
    };

    try {
      await axios.post(
        "https://api.bazigaar.com/ticket_draw_app/purchaseTicket/",
        payload,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setModalOpen(true);
    } catch (error) {
      console.error("Failed to purchase ticket:", error);
    }
  };

  const handleModalClose = () => setModalOpen(false);

  const totalPrice = ticketData ? ticketData.price * quantity : 0;
  const isPayDisabled = quantity < 1 || luckyNumbers.some((num) => num === "");

  if (!ticketData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-gray-200 text-xl">Loading ticket details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-100">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto p-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" onClick={onBack} className="flex items-center cursor-pointer">
            <HomeIcon fontSize="small" className="mr-1" />
            Lottery Home
          </Link>
          <Link color="inherit" onClick={onBack} className="flex items-center cursor-pointer">
            <ConfirmationNumberIcon fontSize="small" className="mr-1" />
            Packages
          </Link>
          <Typography color="textPrimary" className="flex items-center">
            <EventNoteIcon fontSize="small" className="mr-1" />
            Ticket Details
          </Typography>
        </Breadcrumbs>
      </div>

      {/* Ticket Details */}
      <div className="container mx-auto p-6">
        <Button variant="outlined" color="primary" onClick={onBack} className="mb-4">
          Back to Packages
        </Button>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Image
              src={ticketData.prizeImage || "/placeholder-image.png"}
              alt="Prize Image"
              width={500}
              height={400}
              className="rounded-lg object-cover w-full h-full"
            />
            <div>
              <h2 className="text-3xl font-bold mb-4">{ticketData.LotteryName}</h2>
              <p className="mb-2"><strong>Price per Ticket:</strong> ${ticketData.price}</p>
              <p className="mb-2"><strong>Draw Amount:</strong> ${ticketData.drawPriceAmount}</p>
              <p className="mb-2"><strong>Number of Winners:</strong> {ticketData.numberOfWinner}</p>
              <p className="mb-2"><strong>Winning Ratio:</strong> {ticketData.winningRatio}</p>
              <p className="mb-2"><strong>Total Tickets:</strong> {ticketData.totalNumberOfTickets}</p>
              <p className="mb-2"><strong>Tickets Sold:</strong> {ticketData.numberOfTicketSold}</p>
              <p className="mb-2"><strong>Status:</strong> {ticketData.drawStatus}</p>

              {/* Lucky Number Input */}
              <div className="mt-4">
                <label className="block text-lg font-medium mb-2">Enter Your 6 Lucky Numbers</label>
                <div className="flex space-x-2">
                  {luckyNumbers.map((num, index) => (
                    <TextField
                      key={index}
                      value={num}
                      onChange={(e) => handleLuckyNumberChange(index, e.target.value)}
                      variant="outlined"
                      inputProps={{
                        maxLength: 1,
                        style: { textAlign: "center", color: "#fff" },
                      }}
                      className="w-12"
                      inputRef={(el) => (inputRefs.current[index] = el)}
                    />
                  ))}
                </div>
                <Button variant="outlined" color="secondary" className="mt-2" onClick={handleClearLuckyNumbers}>
                  Clear
                </Button>
              </div>

              {/* Quantity Selector and Total Price */}
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
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value.replace(/\D/g, "")) || 1))
                  }
                />
                <Button variant="outlined" onClick={() => handleQuantityChange(1)}>
                  <AddIcon />
                </Button>
              </div>

              {/* Display Total Price */}
              <p className="mt-4 text-lg font-semibold">Total Price: ${totalPrice.toFixed(2)}</p>

              <Button
                variant="contained"
                color="primary"
                className="mt-4"
                onClick={handlePayNow}
                disabled={isPayDisabled}
                style={{
                  background: isPayDisabled ? "gray" : "linear-gradient(90deg, #F2BA56 0%, #E65E09 100%)",
                  color: "#000",
                }}
              >
                Pay Now
              </Button>
            </div>
          </div>

          {/* Prize Details */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Prizes</h3>
            <div className="flex flex-wrap gap-6">
              {[ticketData.firstPrize, ticketData.secondPrize, ticketData.thirdPrize].map(
                (prize, index) => (
                  <div key={index} className="text-center">
                    <Image
                      src={prize || "/placeholder-image.png"}
                      alt={`Prize ${index + 1}`}
                      width={150}
                      height={150}
                      className="rounded-lg object-cover w-36 h-36"
                    />
                    <p className="mt-2">
                      {[ticketData.firstPrizeName, ticketData.secondPrizeName, ticketData.thirdPrizeName][index]}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Purchase Successful!</h2>
            <p className="text-gray-800">You have successfully purchased {quantity} ticket(s).</p>
            <p className="text-gray-800 mt-2">Check your ticket on the My Lottery History page.</p>
            <Button
              variant="contained"
              color="primary"
              onClick={handleModalClose}
              className="mt-6"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TicketDetails;
