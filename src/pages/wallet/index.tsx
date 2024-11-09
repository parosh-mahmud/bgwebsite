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

// Sample transaction history data
const transactionHistory = [
  { id: 1, type: "deposit", amount: 500, date: "2024-11-07" },
  { id: 2, type: "withdrawal", amount: 200, date: "2024-11-06" },
  { id: 3, type: "deposit", amount: 1000, date: "2024-11-05" },
]

export default function Wallet() {
  const [balance, setBalance] = useState<number>(0)
  const router = useRouter()

  useEffect(() => {
    // Retrieve userDetails from localStorage
    const userDetailsString = localStorage.getItem("userDetails")
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString)
      console.log("userDetails from localStorage:", userDetails)

      // Set the balance from userDetails.user.bgcoin if it exists
      if (userDetails.user && userDetails.user.bgcoin) {
        setBalance(parseFloat(userDetails.user.bgcoin))
      }
    } else {
      console.warn("No userDetails found in localStorage.")
    }
  }, [])

  const navigateToFunds = (type: "deposit" | "withdrawal") => {
    router.push(`/funds?type=${type}`)
  }

  return (
    <Card className="max-w-lg mx-auto my-8 p-4 bg-white shadow-lg rounded-lg md:max-w-2xl">
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
                <Avatar className={clsx(transaction.type === "deposit" ? "bg-green-500" : "bg-red-500")}>
                  {transaction.type === "deposit" ? <ArrowDownward /> : <ArrowUpward />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${transaction.type === "deposit" ? "Deposit" : "Withdrawal"} - ${transaction.amount} BG COIN`}
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
