import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Box,
  Breadcrumbs,
  Typography,
  Link,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Divider,
  Paper
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Ticket from "./ticket";

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
  const [luckyNumbers, setLuckyNumbers] = useState<string[]>(["", "", "", "", "", ""]);
  const [showTicket, setShowTicket] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
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

    fetchTicketDetails();
  }, [ticketId]);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleLuckyNumberChange = (index: number, value: string) => {
    if (/^\d$/.test(value) || value === "") {
      const updated = [...luckyNumbers];
      updated[index] = value;
      setLuckyNumbers(updated);

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleClearLuckyNumbers = () => {
    setLuckyNumbers(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handlePayNow = async () => {
    const token = localStorage.getItem("authToken");
    const luckyNumbersString = luckyNumbers.join("");
    const payload = { id: ticketId, count: quantity, numbers: luckyNumbersString };

    try {
      await axios.post("https://api.bazigaar.com/ticket_draw_app/purchaseTicket/", payload, {
        headers: { Authorization: `Token ${token}` },
      });
      setShowTicket(true);
    } catch (error) {
      console.error("Failed to purchase ticket:", error);
    }
  };

  if (showTicket && ticketData) {
    const totalPrice = ticketData.price * quantity;
    return (
      <Ticket
        lotteryName={ticketData.LotteryName}
        ticketId={ticketId}
        luckyNumbers={luckyNumbers}
        drawDate={ticketData.drawStatus}
        price={totalPrice}
        prizeImage={ticketData.prizeImage}
        firstPrizeName={ticketData.firstPrizeName}
        firstPrize={ticketData.firstPrize}
        secondPrizeName={ticketData.secondPrizeName}
        secondPrize={ticketData.secondPrize}
        thirdPrizeName={ticketData.thirdPrizeName}
        thirdPrize={ticketData.thirdPrize}
        onBackToHistory={onBack}
      />
    );
  }

  if (!ticketData) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#121212",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "grey.100",
        }}
      >
        <CircularProgress sx={{ color: "grey.100" }} />
      </Box>
    );
  }

  const totalPrice = ticketData.price * quantity;
  const isPayDisabled = quantity < 1 || luckyNumbers.some((num) => num === "");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#121212", color: "#e0e0e0" }}>
      <Box sx={{ p: 2 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#fff" }}>
          <Link
            color="inherit"
            onClick={onBack}
            sx={{ display: "flex", alignItems: "center", cursor: "pointer", color: "#fff" }}
          >
            <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
            Lottery Home
          </Link>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            <ConfirmationNumberIcon fontSize="small" sx={{ mr: 0.5 }} />
            Ticket Details
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            mb: 2,
            color: "#fff",
            borderColor: "#fff",
            "&:hover": { borderColor: "#F2BA56", color: "#F2BA56" },
          }}
        >
          Back to Packages
        </Button>

        <Box sx={{ bgcolor: "#1E1E1E", p: { xs: 2, md: 4 }, borderRadius: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative", width: "100%", height: { xs: 250, md: 400 } }}>
                <Image
                  src={ticketData.prizeImage || "/placeholder-image.png"}
                  alt="Prize Image"
                  fill
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{ color: "#F2BA56", fontWeight: "bold", mb: 2, letterSpacing: "0.5px" }}
              >
                {ticketData.LotteryName}
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Price per Ticket:</strong> ${ticketData.price}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Number of Winners:</strong> {ticketData.numberOfWinner}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Winning Ratio:</strong> {ticketData.winningRatio}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Total Tickets:</strong> {ticketData.totalNumberOfTickets}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                <strong>Status:</strong> {ticketData.drawStatus}
              </Typography>

              <Paper
  elevation={3}
  sx={{
    p: 3,
    mb: 4,
    bgcolor: "#1E1E1E",
    borderRadius: 2,
    border: "1px solid #3a3a3a",
  }}
>
  <Typography
    variant="h6"
    sx={{
      mb: 3,
      fontWeight: "bold",
      color: "#F2BA56",
      textAlign: "center",
      letterSpacing: "0.5px",
    }}
  >
    Pick Your 6 Lucky Numbers
  </Typography>

  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      justifyContent: "center",
      alignItems: "center",
      gap: 2,
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 1.5, // Reduced gap for a tighter layout
      }}
    >
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
              fontWeight: "bold",
              fontSize: "1rem",
            },
          }}
          inputRef={(el) => (inputRefs.current[index] = el)}
          sx={{
            width: 40, // Reduced width
            height: 40, // Reduced height
            "& .MuiOutlinedInput-root": {
              bgcolor: "#333",
              borderRadius: "50%",
              "& fieldset": {
                borderColor: "#444",
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
      ))}
    </Box>

    <Button
      variant="outlined"
      onClick={handleClearLuckyNumbers}
      sx={{
        mt: { xs: 2, sm: 0 }, // Add margin-top for mobile
        height: 45, // Adjusted to match input size
        px: 3,
        color: "#F2BA56",
        borderColor: "#F2BA56",
        fontWeight: "bold",
        fontSize: "0.9rem",
        "&:hover": {
          borderColor: "#D4AF37",
          color: "#D4AF37",
        },
      }}
    >
      Clear
    </Button>
  </Box>
</Paper>


              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Button
                  onClick={() => handleQuantityChange(-1)}
                  sx={{
                    minWidth: 40,
                    height: 40,
                    color: "#F2BA56",
                    "&:hover": { bgcolor: "#2A2A2A" },
                  }}
                >
                  <RemoveIcon />
                </Button>
                <TextField
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value.replace(/\D/g, "")) || 1))
                  }
                  variant="outlined"
                  inputProps={{ style: { textAlign: "center", color: "#fff" } }}
                  sx={{
                    width: 60,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#F2BA56" },
                      "&:hover fieldset": { borderColor: "#F2BA56" },
                      "&.Mui-focused fieldset": { borderColor: "#F2BA56" },
                    },
                  }}
                />
                <Button
                  onClick={() => handleQuantityChange(1)}
                  sx={{
                    minWidth: 40,
                    height: 40,
                    color: "#F2BA56",
                    "&:hover": { bgcolor: "#2A2A2A" },
                  }}
                >
                  <AddIcon />
                </Button>
              </Box>

              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
              </Typography>

              <Button
                variant="contained"
                onClick={handlePayNow}
                disabled={isPayDisabled}
                sx={{
                  background: isPayDisabled
                    ? "gray"
                    : "linear-gradient(90deg, #F2BA56 0%, #D4AF37 100%)",
                  color: "#000",
                  "&:hover": {
                    background: isPayDisabled
                      ? "gray"
                      : "linear-gradient(90deg, #D4AF37 0%, #F2BA56 100%)",
                  },
                }}
              >
                Pay Now
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#F2BA56" }}>
              Prizes
            </Typography>
            <Grid container spacing={4}>
              {[
                { label: "1st Prize", name: ticketData.firstPrizeName, image: ticketData.firstPrize },
                { label: "2nd Prize", name: ticketData.secondPrizeName, image: ticketData.secondPrize },
                { label: "3rd Prize", name: ticketData.thirdPrizeName, image: ticketData.thirdPrize },
              ].map((prize, index) => (
                <Grid item xs={12} sm={4} key={index} textAlign="center">
                  <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, color: "#F2BA56" }}>
                    {prize.label}
                  </Typography>
                  <Box sx={{ position: "relative", width: 150, height: 150, mx: "auto", mb: 1 }}>
                    <Image
                      src={prize.image || "/placeholder-image.png"}
                      alt={`${prize.label} Image`}
                      fill
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </Box>
                  <Typography variant="body2">{prize.name}</Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TicketDetails;
