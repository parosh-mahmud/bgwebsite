import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Bgcoin from "../../assets/LandingPage/SVG/bgcoin.svg"
import { ArrowBack, HelpOutline } from "@mui/icons-material"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
} from "@mui/material"
import { AccountBalanceWallet, ArrowDownward, ArrowUpward, History } from "@mui/icons-material"
import clsx from "clsx"
import axios from "axios"
import Image from "next/image"

// Define the types for transaction history and wallet response
interface BgcoinResponse {
  user_id: number
  bgcoin: number
}

interface Transaction {
  id: string
  transaction_type: "Deposit" | "Withdrawal"
  amount: string
  date: string
}

interface TransactionResponse {
  transactions: Transaction[]
}

export default function Wallet() {
  const [balance, setBalance] = useState<number>(0)
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchWalletData = async () => {
      const userDetailsString = localStorage.getItem("userDetails")
      if (userDetailsString) {
        const userDetails = JSON.parse(userDetailsString)
        const token = userDetails.token
        console.log("Token:", token) // Log the token to verify

        try {
          // Fetch balance
          const balanceResponse = await axios.get<BgcoinResponse>("https://api.bazigaar.com/user/api/v1/user/bgcoin", {
            headers: { Authorization: `Token ${token}` }
          })
          if (balanceResponse.data && balanceResponse.data.bgcoin) {
            setBalance(balanceResponse.data.bgcoin)
          }

          // Fetch transaction history
          const transactionResponse = await axios.get<TransactionResponse>("https://api.bazigaar.com/wallet_app/api/v1/user/my-wallet-profile", {
            headers: { Authorization: `Token ${token}` }
          })
          if (transactionResponse.data && transactionResponse.data.transactions) {
            setTransactionHistory(transactionResponse.data.transactions.map((transaction, index) => ({
              id: `${index}-${transaction.transaction_type}-${transaction.date}`,
              transaction_type: transaction.transaction_type,
              amount: transaction.amount,
              date: transaction.date,
            })))
          }
        } catch (error) {
          console.error("Failed to fetch wallet data:", error)
        }
      } else {
        console.warn("No userDetails found in localStorage.")
      }
    }

    fetchWalletData()
  }, [])

  const navigateToFunds = (type: "deposit" | "withdrawal") => {
    router.push(`/funds?type=${type}`)
  }

  return (
    
    <Card className="max-w-lg mx-auto my-8 shadow-lg rounded-lg md:max-w-2xl" style={{ backgroundColor: "#0B1E37" }}>
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
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
  }}
>
  <ArrowBack style={{ color: "#AAB4BE", cursor: "pointer" }} onClick={() => router.back()} />
  
  <Typography variant="h6" style={{ color: "#FFFFFF", fontWeight: "bold" }}>
    Coin Wallet
  </Typography>

  <HelpOutline style={{ color: "#AAB4BE", cursor: "pointer" }} onClick={() => {/* Add help action here */}} />
</Box>
      <CardHeader
        title="Bazigaar Wallet"
        subheader="Manage your BG COIN balance and transactions"
        avatar={<AccountBalanceWallet style={{ color: "#FFD700" }} />}
        titleTypographyProps={{ variant: "h5", style: { color: "#FFFFFF" } }}
        subheaderTypographyProps={{ style: { color: "#AAB4BE" } }}
      />
      <CardContent>
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
  {/* Label for Main Balance */}
  <Typography variant="subtitle1" style={{ color: "#AAB4BE", marginBottom: "8px" }}>
    Main Balance
  </Typography>
  
  {/* Balance Display */}
  <Box display="flex" alignItems="center">
 <Image src="/images/bgcoin.svg" alt="BG Coin" width={25} height={25} />
    <Typography
      variant="h4"
      style={{
        color: "#FFD700", // Soft gold color for a professional look
        fontWeight: "bold",
        marginLeft: "12px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {balance} 
    </Typography>
  </Box>
</Box>
        <div className="flex flex-col md:flex-row md:justify-around gap-4 mb-6">
          <Button
            variant="contained"
            startIcon={<ArrowDownward />}
            onClick={() => navigateToFunds("deposit")}
            style={{ backgroundColor: "#4CAF50", color: "#FFFFFF" }}
          >
            Deposit
          </Button>
          <Button
            variant="contained"
            startIcon={<ArrowUpward />}
            onClick={() => navigateToFunds("withdrawal")}
            style={{ backgroundColor: "#FF5722", color: "#FFFFFF" }}
          >
            Withdraw
          </Button>
        </div>

        {/* Transaction History */}
        <Typography variant="h6" className="mb-4 flex items-center" style={{ color: "#FFFFFF" }}>
          <History className="mr-2" style={{ color: "#AAB4BE" }} /> Transaction History
        </Typography>
        <List style={{ backgroundColor: "#455271", borderRadius: 8 }}>
          {transactionHistory.map((transaction) => (
            <ListItem key={transaction.id} style={{ borderBottom: "1px solid #AAB4BE" }}>
              <ListItemAvatar>
                <Avatar className={clsx(transaction.transaction_type === "Deposit" ? "bg-green-500" : "bg-red-500")}>
                  {transaction.transaction_type === "Deposit" ? <ArrowDownward /> : <ArrowUpward />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${transaction.transaction_type} - ${transaction.amount} BG COIN`}
                secondary={transaction.date}
                primaryTypographyProps={{ style: { color: "#FFFFFF" } }}
                secondaryTypographyProps={{ style: { color: "#AAB4BE" } }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions className="justify-center">
        <Typography variant="body2" style={{ color: "#AAB4BE" }} className="text-center">
          Need help? Contact Bazigaar support
        </Typography>
      </CardActions>
    </Card>
  )
}
