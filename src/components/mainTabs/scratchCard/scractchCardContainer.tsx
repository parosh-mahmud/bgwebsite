import React, { useState } from 'react';

type ScratchCard = {
  id: number;
  image: string;
  name: string;
  category: string; // 10 Coin, 20 Coin, or 50 Coin
  price: number;
  status: string; // Active or Inactive
  description: string; // Description about the prize
};

const scratchCards: ScratchCard[] = [
  {
    id: 1,
    image:
      'https://www.startech.com.bd/image/cache/catalog/mobile/samsung/galaxy-a04/galaxy-a04--500x500.webp',
    name: 'Samsung Galaxy A04 (4/64GB)',
    category: '10 Coin',
    price: 10,
    status: 'Active',
    description: 'You can win also BGcoin( 200, 20, 10)',
  },
  {
    id: 2,
    image:
      'https://www.startech.com.bd/image/cache/catalog/mobile/samsung/galaxy-a15-5g/galaxy-a15-5g-blueblack-01-500x500.webp',
    name: 'Samsung Galaxy A15 5G (6/128GB)',
    category: '20 Coin',
    price: 20,
    status: 'Active',
    description:
      'You can win also BGcoin( 200, 20, 10)',
  },
  {
    id: 3,
    image:
      'https://via.placeholder.com/150',
    name: 'Diamond Scratch',
    category: '50 Coin',
    price: 50,
    status: 'Inactive',
    description:
      'You can win also BGcoin( 200, 20, 10).',
  },
  {
    id: 4,
    image:
      'https://www.startech.com.bd/image/cache/catalog/mobile/samsung/galaxy-a24/galaxy-a24-light-green-500x500.webp',
    name: 'Samsung Galaxy A24 (8/128GB)',
    category: '20 Coin',
    price: 20,
    status: 'Active',
    description:
      'You can win also BGcoin( 200, 20, 10)',
  },
];

const ScratchCardContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('10 Coin');
  const [showScratchModal, setShowScratchModal] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<ScratchCard | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleEnter = (card: ScratchCard) => {
    setCurrentCard(card);
    setShowScratchModal(true);
  };

  const filteredScratchCards = scratchCards.filter(
    (card) => card.category === selectedCategory
  );

  return (
    <div className="container mx-auto py-8">
      {/* Category Selector */}
      <div className="flex justify-center space-x-4 mb-6">
        {['10 Coin', '20 Coin', '50 Coin'].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full focus:outline-none transition-colors duration-300
              ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Scratchcards List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScratchCards.map((card) => (
          <div
            key={card.id}
            className="p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300"
          >
            <div className="mx-auto mb-4">
              <img
                src={card.image}
                alt={card.name}
                className="w-40 h-40 object-cover rounded-lg border-4 border-gray-700 shadow-lg transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{card.name}</h3>
            <p className="text-gray-200 mb-2">{card.description}</p>
           <button
              onClick={() => handleEnter(card)}
              disabled={card.status !== 'Active'}
              className={`mt-4 px-6 py-3 text-lg font-bold rounded-full transition-transform duration-300 hover:scale-110 shadow-lg ${
                card.status === 'Active'
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Scratch & Win
            </button>
          </div>
        ))}
      </div>

      {/* Scratch Modal */}
      {showScratchModal && currentCard && (
        <div className="fixed inset-0 bg-gradient-to-r from-purple-800 via-indigo-800 to-gray-900 bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-center text-white">
              {currentCard.name}
            </h2>
            <div className="mx-auto mb-4">
              <img
                src={currentCard.image}
                alt={currentCard.name}
                className="w-48 h-48 object-cover rounded-lg border-4 border-gray-600 shadow-xl transition-transform duration-300 hover:scale-110"
              />
            </div>
            <p className="text-gray-300 mb-4 text-center">
              {currentCard.description}
            </p>
            <button
              onClick={() => setShowScratchModal(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full block mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScratchCardContainer;
