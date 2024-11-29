// api.ts
import axios from 'axios';
import { Reseller, ConvertedAmountDetails } from './types';

export const fetchBalance = async (userId: string, token: string): Promise<number> => {
  try {
    const response = await axios.get(`https://api.bazigaar.com/user/user_details/${userId}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return parseFloat(response.data.user.bgcoin) || 0;
  } catch (error) {
    console.error('Error fetching user balance:', error);
    return 0;
  }
};
export const fetchResellerPaymentDetails = async (resellerId: number, token: string) => {
  try {
    const response = await axios.get(`https://api.bazigaar.com/user/user_details/${resellerId}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.user.mobileBanks;
  } catch (error) {
    console.error('Error fetching reseller payment details:', error);
    return [];
  }
};

export const fetchResellersForCountry = async (
  country: string,
  token: string
): Promise<Reseller[]> => {
  try {
    const response = await axios.get<Reseller[]>(
      `https://api.bazigaar.com/wallet_app/api/v1/user/country-wise-reseller/?country=${country}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching reseller list:', error);
    return [];
  }
};

// api.ts
export const convertAmountToLocalCurrency = async (
  inputAmount: number,
  currencyCode: string,
  token: string
): Promise<ConvertedAmountDetails> => {
  try {
    const requestData = {
      bgcoin_amount: inputAmount,
      country_or_currency: currencyCode,
    };

    console.log('Request Data:', requestData);

    const response = await axios.post(
      'https://api.bazigaar.com/wallet_app/api/v1/user/country-wise-bgcoin-to-currency-conversion/',
      requestData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    console.log('Response Data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error converting amount:', error);
    return null;
  }
};
