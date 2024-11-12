import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
} from "@mui/material"
import { AccountBalanceWallet, ArrowDownward, ArrowUpward, History } from "@mui/icons-material"
import clsx from "clsx"
import axios from "axios"

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
        console.log("Token:", token)  // Log the token to verify

        try {
          // Fetch balance
          const balanceResponse = await axios.get<BgcoinResponse>("https://api.bazigaar.com/user/api/v1/user/bgcoin", {
            headers: { Authorization: `Token ${token}` }  // Use "Token" format
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
    <Card className="max-w-lg mx-auto my-8 p-4 shadow-lg rounded-lg md:max-w-2xl">
      <CardHeader
        title="Bazigaar Wallet"
        subheader="Manage your BG COIN balance and transactions"
        avatar={<AccountBalanceWallet className="text-green-500" />}
        titleTypographyProps={{ variant: "h5", className: "text-gray-900" }}
        subheaderTypographyProps={{ className: "text-gray-500" }}
      />
      <CardContent>
        <Typography variant="h4" color="text.primary" className="text-center mb-4 text-gray-900">
          {balance} BG COIN
        </Typography>
        <div className="flex flex-col md:flex-row md:justify-around gap-4 mb-6">
          <Button
            variant="contained"
            color="success"
            startIcon={<ArrowDownward />}
            onClick={() => navigateToFunds("deposit")}
            className="w-full md:w-auto py-2"
          >
            Deposit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowUpward />}
            onClick={() => navigateToFunds("withdrawal")}
            className="w-full md:w-auto py-2"
          >
            Withdraw
          </Button>
        </div>

        {/* Transaction History */}
        <Typography variant="h6" className="text-gray-900 mb-4 flex items-center">
          <History className="mr-2 text-gray-500" /> Transaction History
        </Typography>
        <List className="bg-gray-100 rounded-lg">
          {transactionHistory.map((transaction) => (
            <ListItem key={transaction.id} className="border-b border-gray-200">
              <ListItemAvatar>
                <Avatar className={clsx(transaction.transaction_type === "Deposit" ? "bg-green-500" : "bg-red-500")}>
                  {transaction.transaction_type === "Deposit" ? <ArrowDownward /> : <ArrowUpward />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${transaction.transaction_type} - ${transaction.amount} BG COIN`}
                secondary={transaction.date}
                primaryTypographyProps={{ className: "text-gray-900" }}
                secondaryTypographyProps={{ className: "text-gray-500" }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions className="justify-center">
        <Typography variant="body2" color="text.secondary" className="text-center">
          Need help? Contact Bazigaar support
        </Typography>
      </CardActions>
    </Card>
  )
}
