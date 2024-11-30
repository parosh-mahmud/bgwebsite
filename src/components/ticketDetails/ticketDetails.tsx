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
import Ticket from "./ticket"; // Import the Ticket component

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
  const [showTicket, setShowTicket] = useState(false); // New state to toggle Ticket component visibility

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
      setModalOpen(false); // Close the modal if it was open
      setShowTicket(true); // Show the Ticket component after successful purchase
    } catch (error) {
      console.error("Failed to purchase ticket:", error);
    }
  };

  const handleModalClose = () => setModalOpen(false);

  const totalPrice = ticketData ? ticketData.price * quantity : 0;
  const isPayDisabled = quantity < 1 || luckyNumbers.some((num) => num === "");

  if (showTicket && ticketData) {
    return (
      <Ticket
      lotteryName={ticketData.LotteryName}
      ticketId={ticketId}
      luckyNumbers={luckyNumbers}
      drawDate={ticketData.drawStatus} // Update this with the actual draw date if different
      price={totalPrice}
      prizeImage={ticketData.prizeImage}
      firstPrizeName={ticketData.firstPrizeName}
      firstPrize={ticketData.firstPrize}
      secondPrizeName={ticketData.secondPrizeName}
      secondPrize={ticketData.secondPrize}
      thirdPrizeName={ticketData.thirdPrizeName}
      thirdPrize={ticketData.thirdPrize}
      onBackToHistory={onBack} // Ensure this navigates back to the package list
    />
    );
  }

  if (!ticketData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-gray-200 text-xl">Loading ticket details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-gray-100">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto p-4">
        <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
  <Link
    color="inherit"
    onClick={onBack}
    className="flex text-white items-center cursor-pointer"
  >
    <HomeIcon fontSize="small" className="mr-1" />
    Lottery Home
  </Link>
  <Typography className="flex text-white items-center">
    <ConfirmationNumberIcon fontSize="small" className="mr-1" />
    Ticket Details
  </Typography>
</Breadcrumbs>

      </div>

      {/* Ticket Details */}
      <div className="container mx-auto p-6">
        <Button variant="outlined"  onClick={onBack} className="mb-4 text-white">
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
              <h2 className="text-3xl text-yellow-100 font-bold mb-4">{ticketData.LotteryName}</h2>
              <p className="mb-2"><strong>Price per Ticket:</strong> ${ticketData.price}</p>
              <p className="mb-2"><strong>Number of Winners:</strong> {ticketData.numberOfWinner}</p>
              <p className="mb-2"><strong>Winning Ratio:</strong> {ticketData.winningRatio}</p>
              <p className="mb-2"><strong>Total Tickets:</strong> {ticketData.totalNumberOfTickets}</p>
              <p className="mb-2"><strong>Status:</strong> {ticketData.drawStatus}</p>

             {/* Lucky Number Input */}
<div className="mt-4">
  <label className="block text-lg font-medium mb-2">Enter Your 6 Lucky Numbers</label>
 <div className="flex flex-col md:flex-row items-center md:space-x-2 space-y-2 md:space-y-0">
  {/* Lucky Number Inputs */}
  <div className="flex space-x-2 md:space-x-2 justify-center">
    {luckyNumbers.map((num, index) => (
      <TextField
        key={index}
        value={num}
        onChange={(e) => handleLuckyNumberChange(index, e.target.value)}
        variant="outlined"
        inputProps={{
          maxLength: 1,
          style: {
            textAlign: "center",
            color: "#fff",
            fontSize: "1.25rem", // Slightly smaller font on mobile
            fontWeight: "bold",
            padding: "8px 0",
          },
        }}
        InputLabelProps={{
          style: { color: '#fff' }
        }}
        className="w-12 h-12 md:w-14 md:h-14" // Adjust width/height for mobile
        inputRef={(el) => (inputRefs.current[index] = el)}
        sx={{
          position: "relative",
          borderRadius: "6px",
          background: "linear-gradient(to right, #ff7e5f, #feb47b)", // Gradient border effect
          padding: "1px", // Space for the gradient border
          "& .MuiOutlinedInput-root": {
            borderRadius: "4px", // Smaller radius for inner content on mobile
            backgroundColor: "#333",
            padding: "0px 6px", // Padding for inner input
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Remove default outline
            },
          },
        }}
      />
    ))}
  </div>

  {/* Clear Button */}
  <Button
    variant="outlined"
    onClick={handleClearLuckyNumbers}
    sx={{
      background: "linear-gradient(to right, #ff7e5f, #feb47b)", // Gradient background
      color: "#fff",
      fontSize: { xs: "1rem", md: "1.5rem" }, // Smaller font on mobile
      fontWeight: "bold",
      padding: { xs: "0", md: "8px" }, // No padding on mobile
      borderRadius: "6px", // Matching border radius for mobile
      minWidth: { xs: "48px", md: "56px" }, // Adjust width for mobile
      height: { xs: "48px", md: "56px" }, // Adjust height for mobile
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      "&:hover": {
        background: "linear-gradient(to right, #feb47b, #ff7e5f)", // Reverse gradient on hover
        opacity: 0.9,
      },
    }}
  >
    clear
  </Button>
</div>

</div>


             {/* Quantity Selector and Total Price */}
<div className="flex items-center mt-6 space-x-2">
  {/* Remove Button without border */}
  <Button
    onClick={() => handleQuantityChange(-1)}
    sx={{
      minWidth: "40px",
      height: "40px",
      color: "#F2BA56",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "rgba(242, 186, 86, 0.1)",
      },
      boxShadow: "none",
      border: "none",
    }}
  >
    <RemoveIcon />
  </Button>

  {/* Quantity Input Field with consistent border color */}
  <TextField
    value={quantity}
    inputProps={{
      maxLength: 6,
      min: 1,
      style: {
        textAlign: "center",
        color: "#fff",
        fontSize: "1rem",
        width: "60px",
        padding: "8px",
      },
    }}
    variant="outlined"
    onChange={(e) =>
      setQuantity(Math.max(1, parseInt(e.target.value.replace(/\D/g, "")) || 1))
    }
    sx={{
      "& .MuiOutlinedInput-root": {
        color: "#fff",
        "& fieldset": {
          borderColor: "#F2BA56", // Consistent border color
        },
        "&:hover fieldset": {
          borderColor: "#F2BA56",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#F2BA56",
        },
      },
    }}
  />

  {/* Add Button without border */}
  <Button
    onClick={() => handleQuantityChange(1)}
    sx={{
      minWidth: "40px",
      height: "40px",
      color: "#F2BA56",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "rgba(242, 186, 86, 0.1)",
      },
      boxShadow: "none",
      border: "none",
    }}
  >
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

          {/* Prize Details Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Prizes</h3>
            <div className="flex flex-wrap gap-6">
              {[
                { label: "1st Prize", name: ticketData.firstPrizeName, image: ticketData.firstPrize },
                { label: "2nd Prize", name: ticketData.secondPrizeName, image: ticketData.secondPrize },
                { label: "3rd Prize", name: ticketData.thirdPrizeName, image: ticketData.thirdPrize },
              ].map((prize, index) => (
                <div key={index} className="text-center">
                  <p className="font-bold text-lg mb-2">{prize.label}</p>
                  <Image
                    src={prize.image || "/placeholder-image.png"}
                    alt={`${prize.label} Image`}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover w-36 h-36"
                  />
                  <p className="mt-2">{prize.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
