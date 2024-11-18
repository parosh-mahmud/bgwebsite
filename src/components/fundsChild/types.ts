// types.ts
export type PaymentMethod = {
  id: string;
  name: string;
  iconUrl: string;
  fee: string;
};

export interface PaymentDetailsProps {
  resellers: Reseller[];
  amount: number;
  onSubmit: (data: {
    resellerId: number;
    amount: number;
    transactionId: string;
    screenshot: File | null;
  }) => void;
  onBack: () => void;
}

export type Reseller = {
  country: any;
  id: number;
  username: string;
  profile_picture: string | null;
  first_name: string;
  last_name: string;
  phone_number: string;
};

export type ConvertedAmountDetails = {
  bgcoin_amount: number;
  usd_equivalent: number;
  currency: string;
  currency_amount: number;
} | null;
