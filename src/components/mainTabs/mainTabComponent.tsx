// components/MainTabComponent.tsx

import React, { useState } from 'react';
import QuickLotterySection from './quickLottery';

const tabs = [
  { name: 'Quick Lottery', id: 'quickLottery' },
  { name: 'Special Lotteries', id: 'specialLotteries' },
  { name: 'Giveaways', id: 'giveaways' },
  { name: 'Results', id: 'results' },
  { name: 'Upcoming Events and Lotteris', id: 'upcomingLotteries' },
];

const MainTabComponent = () => {
  const [activeTab, setActiveTab] = useState('quickLottery');

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'quickLottery':
        return <div><QuickLotterySection/></div>;
      case 'specialLotteries':
        return <div>Special Lotteries Content</div>;
      case 'giveaways':
        return <div>Giveaways Content</div>;
      case 'results':
        return <div>Results Content</div>;
      case 'upcomingLotteries':
        return <div>Upcoming Lottery Packages Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-4 py-2 m-2 text-sm sm:text-base font-semibold rounded-full focus:outline-none transition-colors duration-300
              ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <div
          className="transition-opacity duration-500"
          key={activeTab}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MainTabComponent;
