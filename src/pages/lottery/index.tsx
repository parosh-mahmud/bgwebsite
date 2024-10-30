import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Lottery {
  id?: number;
  LotteryId: string;
  LotteryName: string;
  Price: number;
  PriceAmount: number;
  NumberOfWinners: number;
  NumberOfTickets: number;
  OpeningTime: string;
  ClosingTime: string;
  FirstPrizeName: string;
  SecondPrizeName: string;
  ThirdPrizeName: string;
  TotalFirstPrizeWinner: number;
  TotalSecondPrizeWinner: number;
  TotalThirdPrizeWinner: number;
  isOpen: boolean;
  isDrawComplete: boolean;
  image_banner: string;
  image_first: string;
  image_second: string;
  image_third: string;
  type: string;
}

const LotteryPage: React.FC = () => {
  const router = useRouter();
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState<{ [key: string]: string }>({});
  const [selectedLottery, setSelectedLottery] = useState<Lottery | null>(null);
  const [luckyNumber, setLuckyNumber] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [userId, setUserId] = useState<number | null>(null);
  const [bgcoin, setBgcoin] = useState<number>(0);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
console.log(userId)
  // Calculate the total price based on ticket quantity and price per ticket
  const totalPrice = selectedLottery ? selectedLottery.Price * ticketQuantity : 0;

  // Retrieve user details from localStorage
  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      setUserId(userDetails.user.id);
      setBgcoin(userDetails.user.bgcoin);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      console.log(token)
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const ticketListResponse = await axios.get("https://api.bazigaar.com/ticket_draw_app/ticketList/", {
          headers: { Authorization: `Token ${token}` },
        });
        
        const ticketListData = ticketListResponse.data.results;

        const lotteriesResponse = await axios.get("https://api.bazigaar.com/lottery/get-lotteries/", {
          headers: { Authorization: `Token ${token}` },
        });
        const lotteryData = lotteriesResponse.data.results;

        const mergedData = lotteryData.map((lottery: any) => {
          const ticket = ticketListData.find((t: any) => t.LotteryName === lottery.LotteryName);
          return ticket ? { ...lottery, id: ticket.id } : lottery;
        });

        setLotteries(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdown = lotteries.reduce((acc, lottery) => {
        const closingTime = new Date(lottery.ClosingTime).getTime();
        const currentTime = new Date().getTime();
        const timeLeft = closingTime - currentTime;

        if (timeLeft > 0) {
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

          acc[lottery.LotteryId] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          acc[lottery.LotteryId] = "Closed";
        }

        return acc;
      }, {} as { [key: string]: string });

      setCountdown(newCountdown);
    }, 1000);

    return () => clearInterval(interval);
  }, [lotteries]);

  const handleSelectClick = (lottery: Lottery) => {
    setSelectedLottery(lottery);
  };

  const handleBackClick = () => {
    setSelectedLottery(null);
  };

  const increaseQuantity = () => {
    setTicketQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setTicketQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setTicketQuantity(value >= 1 ? value : 1);
  };
  const closeConfirmation = () => {
    setIsConfirmationVisible(false);
  };

  const handlePayNow = async () => {
  if (!selectedLottery || !userId) {
    console.error("Lottery or user ID is missing");
    return;
  }

  try {
    // Send POST request to purchase ticket
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      "https://api.bazigaar.com/ticket_draw_app/purchaseTicket/",
      {
        id: userId,                    // user ID
        count: ticketQuantity,          // ticket quantity
        numbers: luckyNumber            // lucky number
      },
      {
        headers: { Authorization: `Token ${token}` }
      }
    );

    console.log("Ticket purchase successful:", response.data);
    // Show confirmation modal upon successful purchase
    setIsConfirmationVisible(true);
  } catch (error) {
    console.error("Ticket purchase failed:", error);
    alert("Ticket purchase failed. Please try again.");
  }
};


  return (
    <div className="max-w-screen-lg mx-auto px-4 py-10 bg-white">
      <nav className="text-sm mb-4">
        <span>Lottery Home</span> &gt; <span>Packages</span>
        {selectedLottery && (
          <>
            &gt; <span>Ticket Details</span>
          </>
        )}
      </nav>

      {selectedLottery ? (
        <div>
          <button onClick={handleBackClick} className="text-blue-500 underline mb-4">
            &lt; Back to Packages
          </button>

          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{selectedLottery.LotteryName}</h2>
            <Image
              src={selectedLottery.image_banner}
              alt={selectedLottery.LotteryName}
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-full"
            />
            <p>Ticket Type: {selectedLottery.type}</p>
            <p>Ticket Price: ${selectedLottery.Price}</p>
            <p>Total Tickets: {selectedLottery.NumberOfTickets}</p>
            <p>Total Winners: {selectedLottery.NumberOfWinners}</p>
            <p>Draw Time: {countdown[selectedLottery.LotteryId]}</p>

            <div className="mt-6">
              <p className="font-semibold">Available Balance: ${bgcoin}</p>
              <label className="block mt-4 mb-2 font-semibold">Enter Lucky Number</label>
              <input
                type="text"
                value={luckyNumber}
                onChange={(e) => setLuckyNumber(e.target.value)}
                placeholder="Lucky Number"
                className="w-full border px-4 py-2 rounded-lg mb-4"
              />

              <label className="block mb-2 font-semibold">Ticket Quantity</label>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 py-2 bg-gray-300 rounded-l-lg font-semibold hover:bg-gray-400"
                >
                  -
                </button>
                <input
                  type="number"
                  value={ticketQuantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="w-16 text-center border-t border-b border-gray-300"
                />
                <button
                  onClick={increaseQuantity}
                  className="px-4 py-2 bg-gray-300 rounded-r-lg font-semibold hover:bg-gray-400"
                >
                  +
                </button>
              </div>
            </div>
            <p className="mt-4 font-semibold">Total Price: ${totalPrice}</p>

            <button
              onClick={handlePayNow}
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
            >
              Pay Now
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          <h1 className="text-3xl font-extrabold mb-8 text-center">Available Lottery Packages</h1>
          {lotteries.map((lottery) => (
            <div key={lottery.LotteryId} className="border p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row items-center md:space-x-6">
                <div className="w-full md:w-1/3">
                  <Image
                    src={lottery.image_banner}
                    alt={lottery.LotteryName}
                    width={500}
                    height={500}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 mt-4 md:mt-0">
                  <h2 className="text-2xl font-bold mb-2">{lottery.LotteryName}</h2>
                  <p className="text-gray-500 mb-2">Ticket Type: {lottery.type}</p>
                  <p className="text-lg font-semibold">Ticket Price: ${lottery.Price}</p>
                  <p className="text-lg">Total Tickets: {lottery.NumberOfTickets}</p>
                  <p className="text-lg">Total Winners: {lottery.NumberOfWinners}</p>
                  <p className="text-lg font-semibold mt-2">Draw Time: {countdown[lottery.LotteryId]}</p>
                </div>
              </div>
              <div className="mt-6 text-center md:text-right">
                <button
                  onClick={() => handleSelectClick(lottery)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                >
                  Select Ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg relative">
            <h2 className="text-2xl font-bold mb-4 text-center">Ticket Purchase Confirmation</h2>
            <p className="mb-4 text-center">
              Your ticket has been successfully purchased!
            </p>
            <p className="mb-4 text-center">Draw Date: {selectedLottery?.ClosingTime}</p>

            <div className="flex flex-col items-center">
              <button
                onClick={() => router.push('/track-ticket')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg mb-4"
              >
                Track Ticket
              </button>
              <button
                onClick={() => router.push('/history')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg mb-4"
              >
                Go to History
              </button>
              <button
                onClick={() => router.push('/')}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
              >
                Home
              </button>
            </div>

            <button
              onClick={closeConfirmation}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LotteryPage;
