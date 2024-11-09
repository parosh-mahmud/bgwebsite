import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  CircularProgress,
  Breadcrumbs,
  Link,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';

type Reseller = {
  id: number;
  username: string;
  country: string;
  profile_picture: string | null;
};

type ResellerListProps = {
  onClose: () => void;
};

export function ResellerList({ onClose }: ResellerListProps) {
  const [resellers, setResellers] = useState<Reseller[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const router = useRouter(); // Next.js router

  const countries = ['All', 'Bangladesh', 'India', 'Nepal'];

  useEffect(() => {
    const fetchResellers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Token not found');

        const response = await axios.get<Reseller[]>(
          'https://api.bazigaar.com/reseller/ResellerList/',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const resellersWithCountry = response.data.map((reseller, index) => ({
          ...reseller,
          country: countries[(index % (countries.length - 1)) + 1],
        }));

        setResellers(resellersWithCountry);
      } catch (error) {
        console.error('Error fetching reseller list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResellers();
  }, []);

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCountry(event.target.value);
  };

  const handleResellerSelect = (reseller: Reseller) => {
    // Navigate to the Funds page with reseller data in the query
    router.push({
      pathname: '/funds',
    //   query: { id: reseller.id, username: reseller.username, country: reseller.country, profile_picture: reseller.profile_picture || '' },
    });
  };

  const filteredResellers = resellers.filter(
    (reseller) =>
      selectedCountry === 'All' || reseller.country === selectedCountry
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );

  return (
    <div className="p-4">
      {/* Breadcrumbs and Back Button */}
      <Breadcrumbs aria-label="breadcrumb" className="mb-4">
        <Link underline="hover" color="inherit" onClick={onClose} className="cursor-pointer">
          Wallet
        </Link>
        <Typography color="text.primary">Select Reseller</Typography>
      </Breadcrumbs>

      <IconButton onClick={onClose} aria-label="back" className="mb-4">
        <ArrowBack /> Back
      </IconButton>

      {/* Country Selection */}
      <FormControl fullWidth className="mb-4">
        <InputLabel>Country</InputLabel>
        <Select value={selectedCountry} onChange={handleCountryChange} label="Country">
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <List>
        {filteredResellers.map((reseller) => (
          <ListItem
            key={reseller.id}
            className="hover:bg-gray-100 cursor-pointer rounded-lg"
            onClick={() => handleResellerSelect(reseller)}
          >
            <ListItemAvatar>
              <Avatar src={reseller.profile_picture || ''} alt={reseller.username} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h6" className="text-gray-800">
                  {reseller.username}
                </Typography>
              }
              secondary={
                <Typography variant="body2" className="text-gray-600">
                  {reseller.country}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
