import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowBack, HelpOutline } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
} from "@mui/material";
import {
  AccountBalanceWallet,
  ArrowDownward,
  ArrowUpward,
} from "@mui/icons-material";
import axios from "axios";
import Image from "next/image";

interface BgcoinResponse {
  user_id: number;
  bgcoin: number;
}

interface Transaction {
  id: string;
  transaction_type: "Deposit" | "Withdrawal";
  amount: string;
  date: string;
}

interface DepositRequest {
  id: number;
  amount: string;
  transactionMedium: string;
  transactionId: string;
  status: string;
  created_at: string;
}

interface TransactionResponse {
  transactions: Transaction[];
}

interface DepositRequestResponse {
  results: DepositRequest[];
}

export default function Wallet() {
  const [balance, setBalance] = useState<number>(0);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  const [depositRequests, setDepositRequests] = useState<DepositRequest[]>([]);
  const [isReseller, setIsReseller] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchWalletData = async () => {
      const userDetailsString = localStorage.getItem("userDetails");
      if (userDetailsString) {
        const userDetails = JSON.parse(userDetailsString);
        const token = userDetails.token;
        console.log(token)
        const userId = userDetails.user.id;
        console.log(isReseller)
        try {
          // Fetch user details to check if the user is a reseller
          const userDetailsResponse = await axios.get(
            `https://api.bazigaar.com/user/user_details/${userId}`,
            { headers: { Authorization: `Token ${token}` } }
          );
          const userApiDetails = userDetailsResponse.data;
          console.log("User API details:", userApiDetails.user.isReseller);
          setIsReseller(userApiDetails.user.isReseller);

          // Fetch balance
          const balanceResponse = await axios.get<BgcoinResponse>(
            "https://api.bazigaar.com/user/api/v1/user/bgcoin",
            { headers: { Authorization: `Token ${token}` } }
          );
          setBalance(balanceResponse.data.bgcoin);

          if (userApiDetails.user.isReseller) {
            // Fetch deposit requests if user is a reseller
            const depositRequestResponse =
              await axios.get<DepositRequestResponse>(
                "https://api.bazigaar.com/wallet_app/api/v1/user/my-walle/deposit-request-list/",
                { headers: { Authorization: `Token ${token}` } }
              );
            setDepositRequests(depositRequestResponse.data.results);
            console.log(depositRequestResponse)
          } else {
            // Fetch transaction history if user is not a reseller
            const transactionResponse = await axios.get<TransactionResponse>(
              "https://api.bazigaar.com/wallet_app/api/v1/user/my-wallet-profile",
              { headers: { Authorization: `Token ${token}` } }
            );
            setTransactionHistory(transactionResponse.data.transactions);
          }
        } catch (error) {
          console.error("Failed to fetch wallet data:", error);
        }
      } else {
        console.warn("No userDetails found in localStorage.");
      }
    };

    fetchWalletData();
  }, []);

  return (
    <Card
      className="max-w-lg mx-auto my-8 shadow-lg rounded-lg md:max-w-2xl"
      style={{ backgroundColor: "#0B1E37" }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={1}
        sx={{
          backgroundColor: "#0B1E37",
          borderRadius: "8px",
          margin: "8px 16px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <ArrowBack
          style={{ color: "#AAB4BE", cursor: "pointer" }}
          onClick={() => router.back()}
        />
        <Typography
          variant="h6"
          style={{ color: "#FFFFFF", fontWeight: "bold" }}
        >
          Coin Wallet
        </Typography>
        <HelpOutline style={{ color: "#AAB4BE", cursor: "pointer" }} />
      </Box>
      <CardHeader
        title="Bazigaar Wallet"
        subheader="Manage your BG COIN balance and transactions"
        avatar={<AccountBalanceWallet style={{ color: "#FFD700" }} />}
        titleTypographyProps={{ variant: "h5", style: { color: "#FFFFFF" } }}
        subheaderTypographyProps={{ style: { color: "#AAB4BE" } }}
      />
      <CardContent>
        {/* Balance Section */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={4}
          sx={{
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "#455271",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant="subtitle1"
            style={{ color: "#AAB4BE", marginBottom: "8px" }}
          >
            Main Balance
          </Typography>
          <Box display="flex" alignItems="center">
            <Image
              src="/images/bgcoin.svg"
              alt="BG Coin"
              width={25}
              height={25}
            />
            <Typography
              variant="h4"
              style={{
                color: "#FFD700",
                fontWeight: "bold",
                marginLeft: "12px",
              }}
            >
              {balance}
            </Typography>
          </Box>
        </Box>

        {/* Deposit & Withdraw Buttons */}
        <div className="flex flex-col md:flex-row md:justify-around gap-4 mb-6">
          <Button
            variant="contained"
            startIcon={<ArrowDownward />}
            style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}
          >
            Deposit
          </Button>
          <Button
            variant="contained"
            startIcon={<ArrowUpward />}
            style={{ backgroundColor: "#FF5722", color: "#FFFFFF" }}
          >
            Withdraw
          </Button>
        </div>

        {/* Conditional Rendering Based on Reseller Status */}
        {isReseller ? (
          // Show deposit requests for resellers
          <div>
            <Typography
              variant="h6"
              className="mt-6 mb-4"
              style={{ color: "#FFFFFF" }}
            >
              Coin Requests
            </Typography>
            <List style={{ backgroundColor: "#455271", borderRadius: 8 }}>
              {depositRequests.map((request) => (
                <ListItem
                  key={request.id}
                  style={{ borderBottom: "1px solid #AAB4BE" }}
                >
                  <ListItemText
                    primary={`Amount: ${request.amount} | Medium: ${request.transactionMedium}`}
                    secondary={`Status: ${
                      request.status
                    } | Date: ${new Date(
                      request.created_at
                    ).toLocaleDateString()}`}
                    primaryTypographyProps={{ style: { color: "#FFFFFF" } }}
                    secondaryTypographyProps={{ style: { color: "#AAB4BE" } }}
                  />
                  <Chip
                    label={request.status.toUpperCase()}
                    color={
                      request.status === "pending" ? "warning" : "success"
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
        ) : (
          // Show transaction history for regular users
          <div>
            <Typography
              variant="h6"
              className="mt-6 mb-4"
              style={{ color: "#FFFFFF" }}
            >
              Transaction History
            </Typography>
            <List style={{ backgroundColor: "#455271", borderRadius: 8 }}>
              {transactionHistory.map((transaction) => (
                <ListItem
                  key={transaction.id}
                  style={{ borderBottom: "1px solid #AAB4BE" }}
                >
                  <ListItemText
                    primary={`Type: ${transaction.transaction_type} | Amount: ${transaction.amount}`}
                    secondary={`Date: ${new Date(
                      transaction.date
                    ).toLocaleDateString()}`}
                    primaryTypographyProps={{ style: { color: "#FFFFFF" } }}
                    secondaryTypographyProps={{ style: { color: "#AAB4BE" } }}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
