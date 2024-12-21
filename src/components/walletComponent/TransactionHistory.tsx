import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

interface Transaction {
  transaction_type: "deposit" | "withdrawal";
  amount: string;
  currency: string;
  payment_status: string;
  payment_at: string | null;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div>
      <Typography variant="h6" className="mt-6 mb-4" style={{ color: "#FFFFFF" }}>
        Transaction History
      </Typography>
      <TableContainer component={Paper} style={{ backgroundColor: "#455271", borderRadius: 8 }}>
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
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell style={{ color: "#FFFFFF" }}>
                  {transaction.transaction_type === "deposit" ? (
                    <ArrowDownward style={{ color: "#4CAF50", verticalAlign: "middle" }} />
                  ) : (
                    <ArrowUpward style={{ color: "#FF5722", verticalAlign: "middle" }} />
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
    </div>
  );
};
