// components/MainTabComponent.tsx

import React, { useState } from 'react';
import QuickLotterySection from './quickLottery';
import ScratchCardContainer from './scratchCard/scractchCardContainer';

const tabs = [
  { name: 'Quick Lottery', id: 'quickLottery' },
  { name: 'Special Lotteries', id: 'specialLotteries' },
  { name: 'Giveaways', id: 'giveaways' },
  { name: 'Scratchcards', id: 'Scratchcards' },
  { name: 'Results', id: 'results' },
  { name: 'Upcoming Events and Lotteries', id: 'upcomingLotteries' },
];

const MainTabComponent = () => {
  const [activeTab, setActiveTab] = useState('quickLottery');

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'quickLottery':
        return <div><QuickLotterySection /></div>;
      case 'specialLotteries':
        return <div>Special Lotteries Content</div>;
      case 'giveaways':
        return <div>Giveaways Content</div>;
      case 'results':
        return <div>Results Content</div>;
      case 'upcomingLotteries':
        return <div>Upcoming Lottery Packages Content</div>;
      case 'Scratchcards':
        return <div><ScratchCardContainer /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center border-b-2 border-gray-300 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-6 py-3 m-2 text-sm sm:text-base font-semibold rounded-full focus:outline-none transition-all duration-300 transform 
              ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-600 text-gray-100 shadow-lg scale-105'
                  : 'bg-gradient-to-r from-orange-400 to-yellow-500 text-gray-800 hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-600 hover:text-gray-100 hover:shadow-md'
              }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-10">
        <div
          className="transition-opacity duration-500 ease-in-out bg-gradient-to-b from-blue-900 to-gray-900 p-6 rounded-lg shadow-md"
          key={activeTab}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MainTabComponent;
