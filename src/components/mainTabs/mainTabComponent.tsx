// components/MainTabComponent.tsx

import React, { useState } from 'react';
import QuickLotterySection from './quickLottery';
import ScratchCardContainer from './scratchCard/scractchCardContainer';
import SpecialLottery from './specialLotteris/specialLottery';
import Giveaway from './giveaways/giveAways';

const tabs = [
  { name: 'Quick Play', id: 'quickPlay' },
  { name: 'Special Lotteries', id: 'specialLotteries' },
  { name: 'Giveaways', id: 'giveaways' },
  { name: 'Scratchcards', id: 'Scratchcards' },
  { name: 'Results', id: 'results' },
  { name: 'Upcoming Events and Lotteries', id: 'upcomingLotteries' },
];

const MainTabComponent = () => {
  const [activeTab, setActiveTab] = useState('quickPlay');

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'quickPlay':
        return <div><QuickLotterySection /></div>;
      case 'specialLotteries':
        return <div><SpecialLottery/></div>;
      case 'giveaways':
        return <div><Giveaway/></div>;
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
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-12">
      {/* Tab Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 border-b-2 border-gray-400 pb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`w-full py-2 text-xs sm:text-sm md:text-base font-semibold rounded-lg focus:outline-none transition-all duration-300 transform 
              ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white hover:shadow-md'
              }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Active Tab Heading */}
      <div className="mt-6">
        <h2 className="font-semibold text-4xl sm:text-3xl text-yellow-100 text-center">
          {tabs.find(tab => tab.id === activeTab)?.name}
        </h2>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        <div
          className="transition-opacity duration-500 ease-in-out bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-md"
          key={activeTab}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MainTabComponent;
