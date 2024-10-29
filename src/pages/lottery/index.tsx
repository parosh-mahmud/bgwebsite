import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Lottery {
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

  useEffect(() => {
    const fetchLotteries = async () => {
      setLoading(true); // Start loading
      const token = localStorage.getItem("authToken");
      console.log(token);
      if (!token) {
        // Redirect to login if not authenticated
        router.push('/login');
        return;
      }
      try {
        const response = await axios.get("https://api.bazigaar.com/lottery/get-lotteries/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setLotteries(response.data.results);
      } catch (error) {
        console.error("Error fetching lotteries:", error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };
    if (typeof window !== 'undefined') {
      fetchLotteries();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-10 bg-white">
      <h1 className="text-3xl font-extrabold mb-8 text-center">Available Lottery Packages</h1>
      <div className="space-y-10">
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
            <div className="flex flex-col md:flex-row mt-6 md:space-x-8">
              <div className="flex flex-col items-center mb-4 md:mb-0">
                <Image
                  src={lottery.image_first}
                  alt={lottery.FirstPrizeName}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <p className="mt-2 text-center font-medium">{lottery.FirstPrizeName}</p>
                <p className="text-center">1st Prize</p>
              </div>
              <div className="flex flex-col items-center mb-4 md:mb-0">
                <Image
                  src={lottery.image_second}
                  alt={lottery.SecondPrizeName}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <p className="mt-2 text-center font-medium">{lottery.SecondPrizeName}</p>
                <p className="text-center">2nd Prize</p>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src={lottery.image_third}
                  alt={lottery.ThirdPrizeName}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <p className="mt-2 text-center font-medium">{lottery.ThirdPrizeName}</p>
                <p className="text-center">3rd Prize</p>
              </div>
            </div>
            <div className="mt-6 text-center md:text-right">
              <Link href={`/ticket-details/${lottery.LotteryId}`} passHref>
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                  Select Ticket
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LotteryPage;
