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

type ScratchResult = {
  message: string;
  ticket_number: number;
  remaining_balance: number;
  status: string; // "win" or "loss"
  prize: string | null;
};

const API_URL = 'https://api.bazigaar.com/api/v1/admin/scratchcards/';
const SCRATCH_URL = 'https://api.bazigaar.com/api/v1/user/scratchcards/25/buy-ticket/';
const BALANCE_URL = 'https://api.bazigaar.com/api/v1/user/bgcoin/';

const ScratchCardContainer = () => {
  const [scratchCards, setScratchCards] = useState<ScratchCardType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('10 Coin');
  const [showScratchModal, setShowScratchModal] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<ScratchCardType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [username, setUsername] = useState<string>('Guest');
  const [scratchResult, setScratchResult] = useState<ScratchResult | null>(null);
  const [isScratching, setIsScratching] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken');
      const storedUser = JSON.parse(localStorage.getItem('userDetails') || '{}');
      setToken(authToken);
      setUsername(storedUser.user?.username || 'Guest');
    }
  }, []);

  useEffect(() => {
    const fetchScratchCards = async () => {
      if (!token) return;
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

    const fetchBalance = async () => {
      if (!token) return;
      try {
        const response = await axios.get(BALANCE_URL, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUserBalance(response.data.balance);
      } catch (err) {
        console.error('Failed to fetch user balance:', err);
      }
    };

    fetchScratchCards();
    fetchBalance();
  }, [token]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleEnter = (card: ScratchCardType) => {
    setCurrentCard(card);
    setShowScratchModal(true);
  };

  const handleScratch = async () => {
    if (!token) return;
    setIsScratching(true);
    setScratchResult(null);

    try {
      const response = await axios.post(SCRATCH_URL, {}, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const result: ScratchResult = response.data;
      setScratchResult(result);
      setUserBalance(result.remaining_balance);
    } catch (err) {
      console.error('Error during scratching:', err);
    } finally {
      setIsScratching(false);
    }
  };

  const handleCloseScratchCard = () => {
    setShowScratchModal(false);
    setCurrentCard(null);
    setScratchResult(null);
  };

  const handleNextCard = () => {
    setScratchResult(null);
    setIsScratching(false);
  };

  const filteredScratchCards = scratchCards.filter(
    (card) => card.type === selectedCategory
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 py-8">
      {/* User Info */}
      <div className="text-center mb-6">
        <h2 className="text-xl text-white font-bold">Welcome, {username}</h2>
        <p className="text-lg text-gray-300">Balance: {userBalance} Coins</p>
      </div>

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
          <div className="flex justify-center items-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {!loading &&
                !error &&
                filteredScratchCards.map((card) => (
                  <ScratchCard
                    key={card.id}
                    card={card}
                    onEnter={handleEnter} // Pass the handler
                  />
                ))}
            </div>
          </div>
        </>
      )}

      {/* Scratch Modal */}
      {showScratchModal && currentCard && (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-fade-in">
          <h3 className="text-lg font-bold mb-4">Scratching {currentCard.name}</h3>
          {!scratchResult && !isScratching && (
            <button
              onClick={handleScratch}
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-full shadow-lg hover:from-green-500 hover:to-blue-600"
            >
              Scratch & Win
            </button>
          )}

          {isScratching && <p className="text-lg text-gray-700 animate-pulse">Scratching...</p>}

          {scratchResult && (
            <div
              className={`mt-4 p-4 rounded-lg transition-transform duration-300 ${
                scratchResult.status === 'win' ? 'bg-green-100' : 'bg-red-100'
              } animate-bounce`}
            >
              <p className="text-xl font-bold text-gray-700">{scratchResult.message}</p>
              {scratchResult.prize && <p className="text-lg text-green-700">Prize: {scratchResult.prize}</p>}
              <p className="text-sm text-gray-500">Ticket: {scratchResult.ticket_number}</p>
            </div>
          )}

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handleCloseScratchCard}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-full"
            >
              Close
            </button>
            {scratchResult && (
              <button
                onClick={handleNextCard}
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-full hover:from-yellow-500 hover:to-orange-600"
              >
                Next Card
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScratchCardContainer;
