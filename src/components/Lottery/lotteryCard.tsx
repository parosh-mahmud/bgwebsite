import React, { useEffect, useState } from "react";
import Image from "next/image";

// Define the props type
interface LotteryCardProps {
  lotteryName: string;
  firstPrize: string;
  secondPrize: string;
  thirdPrize: string;
  firstPrizeName: string;
  secondPrizeName: string;
  thirdPrizeName: string;
  onViewDetails: () => void;
}

const LotteryCard: React.FC<LotteryCardProps> = ({
  lotteryName,
  firstPrize,
  secondPrize,
  thirdPrize,
  firstPrizeName,
  secondPrizeName,
  thirdPrizeName,
  onViewDetails,
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    // Calculate the demo closing time (30 days from now)
    const demoClosingTime = new Date();
    demoClosingTime.setDate(demoClosingTime.getDate() + 30);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const closingTime = demoClosingTime.getTime();
      const difference = closingTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Expired");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer); // Cleanup timer
  }, []);

  return (
    <div className="relative bg-red-500 rounded-lg shadow-lg p-8 w-full max-w-5xl mx-auto text-center">
      {/* Countdown Timer */}
      <div className="absolute top-4 right-4 bg-white text-red-500 font-bold  rounded shadow-md text-sm">
        {timeLeft !== "Expired" ? `Draw time: ${timeLeft}` : "Lottery Closed"}
      </div>

      {/* Lottery Name */}
      <h2 className="text-3xl font-bold text-white mb-6">{lotteryName}</h2>

      {/* Prizes Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* First Prize */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          <h3 className="text-lg font-bold text-red-500 mb-2">1ST PRIZE</h3>
          <div className="relative w-28 h-28 mb-2">
            <Image
              src={firstPrize}
              alt={`${firstPrizeName}`}
              layout="fill"
              objectFit="contain"
              className="rounded"
            />
          </div>
          <p className="text-base font-semibold text-black">{firstPrizeName}</p>
        </div>

        {/* Second Prize */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          <h3 className="text-lg font-bold text-red-500 mb-2">2ND PRIZE</h3>
          <div className="relative w-28 h-28 mb-2">
            <Image
              src={secondPrize}
              alt={`${secondPrizeName}`}
              layout="fill"
              objectFit="contain"
              className="rounded"
            />
          </div>
          <p className="text-base font-semibold text-black">{secondPrizeName}</p>
        </div>

        {/* Third Prize */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          <h3 className="text-lg font-bold text-red-500 mb-2">3RD PRIZE</h3>
          <div className="relative w-28 h-28 mb-2">
            <Image
              src={thirdPrize}
              alt={`${thirdPrizeName}`}
              layout="fill"
              objectFit="contain"
              className="rounded"
            />
          </div>
          <p className="text-base font-semibold text-black">{thirdPrizeName}</p>
        </div>
      </div>

      {/* View Details Button */}
      <button
        onClick={onViewDetails}
        className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-lg font-bold hover:opacity-90 transition duration-200"
      >
        View Package Details
      </button>
    </div>
  );
};

export default LotteryCard;
