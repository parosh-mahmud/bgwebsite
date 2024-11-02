'use client'

import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Chip,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  gender: string;
  date_of_birth: string;
  bgcoin: string;
  bgtoken: string;
  ref: string;
}

interface Card {
  header: string;
  value: number;
}

interface ProfileModalProps {
  user: { user: User } | null; // Allow user to be nullable
  cards: Card[];
  open: boolean;
  onClose: () => void;
}

export default function ProfileModal({ user, cards, open, onClose }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user?.user || null); // Initialize safely

 useEffect(() => {
    if (user?.user) {
      console.log('Profile Picture URL:', user.user.profile_picture); // Log profile picture URL
      setEditedUser(user.user); // Update editedUser when user is available
    }
  }, [user]);
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log('Saving user data:', editedUser);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Profile</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={editedUser?.profile_picture || "/default-profile.png"}
                    alt={`${editedUser?.first_name || "User"} ${editedUser?.last_name || ""}`}
                    sx={{ width: 100, height: 100, margin: '0 auto' }}
                  />
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    {editedUser?.first_name || "First Name"} {editedUser?.last_name || "Last Name"}
                  </Typography>
                  <Typography color="textSecondary">@{editedUser?.username || "username"}</Typography>
                  <Chip label={`Ref: ${editedUser?.ref || "N/A"}`} sx={{ mt: 1 }} />
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">BGCoin: {editedUser?.bgcoin || "0.00"}</Typography>
                    <Typography variant="body2">BGToken: {editedUser?.bgtoken || "0.00"}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Profile Information</Typography>
                    <Button
                      variant="contained"
                      startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                      onClick={isEditing ? handleSave : handleEdit}
                    >
                      {isEditing ? 'Save' : 'Edit'}
                    </Button>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="first_name"
                        value={editedUser?.first_name || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="last_name"
                        value={editedUser?.last_name || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={editedUser?.email || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Gender"
                        name="gender"
                        value={editedUser?.gender || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Date of Birth"
                        name="date_of_birth"
                        type="date"
                        value={editedUser?.date_of_birth || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>Statistics</Typography>
              <Grid container spacing={2}>
                {cards.map((card, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6">{card.header}</Typography>
                      <Typography variant="h4">{card.value}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
}
