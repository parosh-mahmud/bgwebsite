import React from "react";
import Image from "next/image";

interface LotteryCardProps {
  lotteryName: string;
  price: number;
  drawStatus: string;
  numberOfTickets: number;
  prizeImage: string;
  onViewDetails: () => void;
}

const LotteryCard: React.FC<LotteryCardProps> = ({
  lotteryName,
  price,
  drawStatus,
  numberOfTickets,
  prizeImage,
  onViewDetails,
}) => {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg overflow-hidden w-full max-w-sm text-white hover:scale-105 transition-transform duration-300">
      {/* Prize Image */}
      <div className="w-full h-48 relative">
        <Image
          src={prizeImage}
          alt={`${lotteryName} Prize`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      {/* Lottery Details */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center">{lotteryName}</h2>
        <p className="text-lg text-center mt-2">
          <span className="font-semibold">Price:</span> ${price.toFixed(2)}
        </p>
        <p className="text-center mt-2">
          <span className="font-semibold">Status:</span> {drawStatus}
        </p>
        <p className="text-center mt-2">
          <span className="font-semibold">Tickets:</span> {numberOfTickets}
        </p>
      </div>

      {/* Action Button */}
      <div className="p-4">
        <button
          onClick={onViewDetails}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 py-2 rounded-lg font-bold hover:opacity-90 transition duration-200"
        >
          View Ticket Details
        </button>
      </div>
    </div>
  );
};

export default LotteryCard;
