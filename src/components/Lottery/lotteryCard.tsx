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
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-700 rounded-lg shadow-lg p-4 w-full max-w-lg mx-auto text-center text-gray-100">
      {/* Countdown Timer */}
      <div className="absolute top-2 right-2  text-white font-thin  rounded text-xs">
        {timeLeft !== "Expired" ? ` ${timeLeft}` : "Draw Closed"}
      </div>

      {/* Lottery Name */}
      <h2 className="text-2xl font-extrabold mb-4 tracking-wide">{lotteryName}</h2>

      {/* Prizes Section */}
      <div className="grid grid-cols-3 gap-2">
        {/* First Prize */}
        <div className="bg-white rounded-lg shadow-md p-2 flex flex-col items-center">
          <h3 className="text-sm font-bold text-blue-700 mb-1">1ST PRIZE</h3>
          <div className="relative w-16 h-16 mb-1">
            <Image
              src={firstPrize}
              alt={`${firstPrizeName}`}
              layout="fill"
              objectFit="contain"
              className="rounded"
            />
          </div>
          <p className="text-xs font-semibold text-gray-800 text-center">
            {firstPrizeName}
          </p>
        </div>

        {/* Second Prize */}
        <div className="bg-white rounded-lg shadow-md p-2 flex flex-col items-center">
          <h3 className="text-sm font-bold text-blue-700 mb-1">2ND PRIZE</h3>
          <div className="relative w-16 h-16 mb-1">
            <Image
              src={secondPrize}
              alt={`${secondPrizeName}`}
              layout="fill"
              objectFit="contain"
              className="rounded"
            />
          </div>
          <p className="text-xs font-semibold text-gray-800 text-center">
            {secondPrizeName}
          </p>
        </div>

        {/* Third Prize */}
        <div className="bg-white rounded-lg shadow-md p-2 flex flex-col items-center">
          <h3 className="text-sm font-bold text-blue-700 mb-1">3RD PRIZE</h3>
          <div className="relative w-16 h-16 mb-1">
            <Image
              src={thirdPrize}
              alt={`${thirdPrizeName}`}
              layout="fill"
              objectFit="contain"
              className="rounded"
            />
          </div>
          <p className="text-xs font-semibold text-gray-800 text-center">
            {thirdPrizeName}
          </p>
        </div>
      </div>

      {/* View Details Button */}
      <button
        onClick={onViewDetails}
        className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-2 rounded-lg font-bold hover:shadow-xl hover:scale-105 transition duration-300"
      >
        View Package Details
      </button>
    </div>
  );
};

export default LotteryCard;
