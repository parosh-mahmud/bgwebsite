import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScratchCard from './scratchCard';

type ScratchCardType = {
  id: number;
  name: string;
  type: string; // 10 Coin, 20 Coin, or 50 Coin
  total_cards: number;
  status: string; // Active or Inactive
  description: string; // Description about the prize
  product_image: string | null;
  prize_tiers: {
    id: number;
    tier_name: string | null;
    prize_value: string | null;
    quantity: number;
    cost: string | null;
  }[];
};

const API_URL = 'https://api.bazigaar.com/api/v1/admin/scratchcards/';

const ScratchCardContainer = () => {
  const [scratchCards, setScratchCards] = useState<ScratchCardType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('10 Coin');
  const [showScratchModal, setShowScratchModal] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<ScratchCardType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Fetch token safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken');
      setToken(authToken);
    }
  }, []);

  useEffect(() => {
    const fetchScratchCards = async () => {
      if (!token) return; // Wait for the token to be set
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setScratchCards(response.data);
      } catch (err) {
        setError('Failed to load scratch cards. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScratchCards();
  }, [token]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleEnter = (card: ScratchCardType) => {
    setCurrentCard(card);
    setShowScratchModal(true);
  };

  const handleCloseScratchCard = () => {
    setShowScratchModal(false);
    setCurrentCard(null);
  };

  const filteredScratchCards = scratchCards.filter(
    (card) => card.type === selectedCategory
  );

  return (
    <div className="container mx-auto py-8">
      {/* Only show this content when showScratchModal is false */}
      {!showScratchModal && (
        <>
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

          {/* Loading State */}
          {loading && (
            <div className="text-center text-white">Loading scratch cards...</div>
          )}

          {/* Error State */}
          {error && <div className="text-center text-red-500">{error}</div>}

          {/* Scratchcards List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading &&
              !error &&
              filteredScratchCards.map((card) => (
                <div
                  key={card.id}
                  className="p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="mx-auto mb-4">
                    <img
                      src={card.product_image || 'https://via.placeholder.com/150'}
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
        </>
      )}

      {/* Scratch Modal */}
      {showScratchModal && currentCard && (
        <ScratchCard onClose={handleCloseScratchCard} />
      )}
    </div>
  );
};

export default ScratchCardContainer;
