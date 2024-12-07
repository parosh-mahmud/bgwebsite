import React from 'react';

type ScratchCardProps = {
  card: {
    id: number;
    name: string;
    description: string;
    product_image: string | null;
    status: string;
  };
  onEnter: (card: any) => void;
};

const ScratchCard: React.FC<ScratchCardProps> = ({ card, onEnter }) => {
  return (
    <div
      className="relative p-6 bg-gradient-to-r from-purple-700 via-indigo-500 to-blue-600 rounded-lg shadow-xl text-center transform hover:scale-105 transition-transform duration-300"
    >
      {/* Image */}
      <div className="flex justify-center items-center mx-auto mb-4">
        <img
          src={card.product_image || 'https://via.placeholder.com/150'}
          alt={card.name}
          className="w-40 h-40 object-cover rounded-lg border-4 border-white shadow-lg transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Card Name */}
      <h3 className="text-xl font-bold text-white mb-2">{card.name}</h3>

      {/* Description */}
      <p className="text-gray-200 text-sm mb-4">{card.description}</p>

      {/* Status Badge */}
      <div
        className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full ${
          card.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-gray-300'
        }`}
      >
        {card.status}
      </div>

      {/* Scratch Button */}
      <button
        onClick={() => onEnter(card)}
        disabled={card.status !== 'Active'}
        className={`mt-4 px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${
          card.status === 'Active'
            ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white hover:from-yellow-500 hover:to-red-600 transform hover:scale-110'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        Scratch & Win
      </button>
    </div>
  );
};

export default ScratchCard;
