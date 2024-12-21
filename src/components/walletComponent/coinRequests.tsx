import React, { useState } from "react";
import {
  List,
  ListItem,
  Button,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";

interface DepositRequest {
  id: number;
  amount: string;
  transactionMedium: string;
  transactionId: string;
  status: string;
  created_at: string;
}

interface CoinRequestsProps {
  depositRequests: DepositRequest[];
  updateRequestStatus: (id: number, status: "accepted" | "denied") => void;
}

const CoinRequests: React.FC<CoinRequestsProps> = ({
  depositRequests,
  updateRequestStatus,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<DepositRequest | null>(
    null
  );

  const handleViewDetails = (request: DepositRequest) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRequest(null);
  };

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Typography
        variant="h6"
        sx={{ color: "#FFFFFF", mb: 3, textAlign: "center" }}
      >
        Deposit Requests
      </Typography>
      <List>
        {depositRequests.map((request) => (
          <ListItem
            key={request.id}
            sx={{
              mb: 2,
              p: 2,
              bgcolor: "#455271",
              borderRadius: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                Amount: {request.amount}
              </Typography>
              <Typography variant="body2" sx={{ color: "#AAB4BE" }}>
                Medium: {request.transactionMedium}
              </Typography>
              <Typography variant="body2" sx={{ color: "#AAB4BE" }}>
                Transaction ID: {request.transactionId}
              </Typography>
              <Typography variant="body2" sx={{ color: "#FFD700" }}>
                Status: {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </Typography>
              <Typography variant="body2" sx={{ color: "#AAB4BE" }}>
                Created At: {new Date(request.created_at).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#3f51b5" }}
                onClick={() => handleViewDetails(request)}
              >
                View
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => updateRequestStatus(request.id, "accepted")}
                disabled={request.status === "accepted"}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => updateRequestStatus(request.id, "denied")}
                disabled={request.status === "denied"}
              >
                Deny
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { bgcolor: "#455271", color: "#fff" } }}
      >
        <DialogTitle>Request Details</DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box sx={{ p: 2 }}>
              <Typography sx={{ mb: 1 }}>
                Amount: {selectedRequest.amount}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                Medium: {selectedRequest.transactionMedium}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                Transaction ID: {selectedRequest.transactionId}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                Status: {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
              </Typography>
              <Typography>
                Created At: {new Date(selectedRequest.created_at).toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "#fff" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CoinRequests;
