'use client'

import React, { useState } from 'react'
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
  Paper
} from '@mui/material'
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material'

interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  profile_picture: string
  gender: string
  date_of_birth: string
  bgcoin: string
  bgtoken: string
  ref: string
}

interface Card {
  header: string
  value: number
}

interface ProfileProps {
  user: User
  cards: Card[]
}

export default function Component({ user, cards }: ProfileProps = {
  user: {
    id: 15,
    username: "Parosh-mahmud",
    email: "info@techinfousa.com",
    first_name: "Bazi",
    last_name: "gaar",
    profile_picture: "https://sgp1.digitaloceanspaces.com/bazigaar/image/profile/41784496_2183178488621019_7189167292293316608_n.jpeg?AWSAccessKeyId=DO00TXQXMWA9TA3ZTJ47&Signature=%2F6ycIMgzf011t7fo6XafkDaQB60%3D&Expires=1730431537",
    gender: "Male",
    date_of_birth: "1995-03-07",
    bgcoin: "443.00",
    bgtoken: "0.00",
    ref: "hFjx69"
  },
  cards: [
    { header: "Deposits", value: 0 },
    { header: "Withdrawals", value: 0 },
    { header: "Transactions", value: 0 },
    { header: "Total Buy Ticket", value: 0 },
    { header: "Total Win Ticket", value: 0 },
    { header: "Total Win Bonus", value: 0.0 },
    { header: "Total Referral", value: 0 },
    { header: "Balance", value: 443.0 }
  ]
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // Here you would typically send the editedUser data to your backend
    console.log('Saving user data:', editedUser)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value })
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src={user.profile_picture}
                alt={`${user.first_name} ${user.last_name}`}
                sx={{ width: 100, height: 100, margin: '0 auto' }}
              />
              <Typography variant="h5" sx={{ mt: 2 }}>
                {user.first_name} {user.last_name}
              </Typography>
              <Typography color="textSecondary">@{user.username}</Typography>
              <Chip label={`Ref: ${user.ref}`} sx={{ mt: 1 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">BGCoin: {user.bgcoin}</Typography>
                <Typography variant="body2">BGToken: {user.bgtoken}</Typography>
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
                    value={editedUser.first_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={editedUser.last_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Gender"
                    name="gender"
                    value={editedUser.gender}
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
                    value={editedUser.date_of_birth}
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
  )
}