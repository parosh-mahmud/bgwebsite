// components/QuickLotterySection.tsx

import React from "react";

const lotteries = [
  {
    id: 1,
    name: "Mega Millions Max",
    prize: "$150",
    nextDraw: "20:45",
    frequency: "Every Hour",
    logo: "https://via.placeholder.com/60", // Demo image placeholder
  },
  {
    id: 2,
    name: "Super Jackpot Plus",
    prize: "$140",
    nextDraw: "18:30",
    frequency: "Every Hour",
    logo: "https://via.placeholder.com/60", // Demo image placeholder
  },
  {
    id: 3,
    name: "Golden Power Draw",
    prize: "$130",
    nextDraw: "23:10",
    frequency: "Every Hour",
    logo: "https://via.placeholder.com/60", // Demo image placeholder
  },
];

const QuickLotterySection = () => {
  return (
    <div className="container mx-auto py-12">
      {/* <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white">
        Quick Draws
      </h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {lotteries.map((lottery) => (
          <div
            key={lottery.id}
            className="bg-gradient-to-r from-blue-500 to-blue-400 p-6 rounded-xl shadow-md text-white text-center"
          >
            <div className="flex justify-center mb-4">
              <img
                src={lottery.logo}
                alt={lottery.name}
                width={60}
                height={60}
                className="object-contain rounded-full"
              />
            </div>
            <p className="uppercase text-sm font-semibold">{lottery.frequency}</p>
            <h3 className="text-xl sm:text-2xl font-bold my-2">{lottery.prize}</h3>
            <p className="text-sm font-medium">Next draw</p>
            <div className="text-2xl sm:text-3xl font-bold mt-1">{lottery.nextDraw}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLotterySection;
