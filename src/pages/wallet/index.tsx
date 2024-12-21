import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  AccountBalanceWallet,
  ArrowDownward,
  ArrowUpward,
} from "@mui/icons-material";
import axios from "axios";
import Image from "next/image";
import ReusableBottomBar from "../../components/common/BottomNavBar/reuseableBottomBar";
import {
  getTokenFromStorage,
  getUserDetailsFromStorage,
} from "../../../utils/localStorageUtils";
import CoinRequests from "../../components/walletComponent/coinRequests";
interface BgcoinResponse {
  user_id: number;
  bgcoin: number;
}

interface Transaction {
  transaction_type: "deposit" | "withdrawal";
  amount: string;
  currency: string;
  payment_status: string;
  payment_at: string | null;
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
  wallet: {
    wallet_id: string;
    user: {
      id: number;
      bgcoin: string;
    };
  };
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
const [loading, setLoading] = useState<boolean>(false); 
const [value, setValue] = useState(0);

 const token = getTokenFromStorage();
 console.log(token)
 useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    setLoading(true);
    const userDetailsString = localStorage.getItem("userDetails");

    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      const userId = userDetails.user.id;

      try {
        // Fetch user details
        const userDetailsResponse = await axios.get(
          `https://api.bazigaar.com/user/user_details/${userId}`,
          { headers: { Authorization: `Token ${token}` } }
        );
        const isUserReseller = userDetailsResponse.data.user.isReseller;
        setIsReseller(isUserReseller);

        // Fetch balance
        const balanceResponse = await axios.get<BgcoinResponse>(
          "https://api.bazigaar.com/user/api/v1/user/bgcoin",
          { headers: { Authorization: `Token ${token}` } }
        );
        setBalance(balanceResponse.data.bgcoin);

        if (isUserReseller) {
          // Fetch deposit requests
          const depositRequestResponse = await axios.get<DepositRequestResponse>(
            "https://api.bazigaar.com/reseller_app/api/v1/user/reseller-my-wallet/deposit-request-list/",
            { headers: { Authorization: `Token ${token}` } }
          );
          setDepositRequests(depositRequestResponse.data.results || []);
          console.log(depositRequestResponse.data.results )
        } else {
          // Fetch transaction history
          const transactionResponse = await axios.get<TransactionResponse>(
            "https://api.bazigaar.com/wallet_app/api/v1/user/my-wallet-profile",
            { headers: { Authorization: `Token ${token}` } }
          );
          setBalance(parseFloat(transactionResponse.data.wallet.user.bgcoin));
          setTransactionHistory(transactionResponse.data.transactions || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateRequestStatus = async (id: number, status: "accepted" | "denied") => {
    try {
      await axios.post(
        "https://api.bazigaar.com/reseller_app/api/v1/user/reseller-my-wallet/deposit-request-status-update/",
        { id, status },
        { headers: { Authorization: `Token ${token}` } }
      );

      // Update the status locally
      setDepositRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error("Failed to update request status:", error);
      alert("Failed to update request. Please try again.");
    }
  };

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
              width={40}
              height={35}
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
             onClick={() => router.push('/funds?type=deposit')}
          >
            Deposit
          </Button>
          <Button
            variant="contained"
            startIcon={<ArrowUpward />}
            style={{ backgroundColor: "#FF5722", color: "#FFFFFF" }}
             onClick={() => router.push('/funds?type=withdrawal')}
          >
            Withdraw
          </Button>
        </div>

        {/* Conditional Rendering Based on Reseller Status */}
        {isReseller ? (
          // Show deposit requests for resellers
          <CoinRequests
            depositRequests={depositRequests}
            updateRequestStatus={updateRequestStatus}
          />
        ) : (
          // Show transaction history for regular users
          <div>
    <Typography variant="h6" className="mt-6 mb-4" style={{ color: "#FFFFFF" }}>
      Transaction History
    </Typography>
    <TableContainer
      component={Paper}
      style={{ backgroundColor: "#455271", borderRadius: 8 }}
    >
      <Table aria-label="transaction history table">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "#AAB4BE" }}>Type</TableCell>
            <TableCell style={{ color: "#AAB4BE" }}>Amount</TableCell>
            <TableCell style={{ color: "#AAB4BE" }}>Currency</TableCell>
            <TableCell style={{ color: "#AAB4BE" }}>Date</TableCell>
            <TableCell style={{ color: "#AAB4BE" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionHistory.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell style={{ color: "#FFFFFF" }}>
                {transaction.transaction_type === "deposit" ? (
                  <ArrowDownward
                    style={{ color: "#4CAF50", verticalAlign: "middle" }}
                  />
                ) : (
                  <ArrowUpward
                    style={{ color: "#FF5722", verticalAlign: "middle" }}
                  />
                )}{" "}
                {transaction.transaction_type.charAt(0).toUpperCase() +
                  transaction.transaction_type.slice(1)}
              </TableCell>
              <TableCell style={{ color: "#FFFFFF" }}>
                {parseFloat(transaction.amount).toFixed(2)}
              </TableCell>
              <TableCell style={{ color: "#FFFFFF" }}>
                {transaction.currency}
              </TableCell>
              <TableCell style={{ color: "#FFFFFF" }}>
                {transaction.payment_at
                  ? new Date(transaction.payment_at).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell style={{ color: "#FFFFFF" }}>
                {transaction.payment_status ? (
                  <Chip
                    label={transaction.payment_status.toUpperCase()}
                    color={
                      transaction.payment_status.toLowerCase() === "pending"
                        ? "warning"
                        : "success"
                    }
                  />
                ) : (
                  "N/A"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ReusableBottomBar value={value} onChange={(event, newValue) => setValue(newValue)} />
  </div>
        )}
      </CardContent>
    </Card>
  );
}


