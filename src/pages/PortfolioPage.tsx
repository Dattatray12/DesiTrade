import React from 'react';
import Watchlist from '../components/Watchlist';
import Portfolio from '../components/Portfolio';
import { useTheme } from '../context/ThemeContext';
import { Stock, PortfolioData } from '../types';

interface PortfolioPageProps {
  watchlist: Stock[];
  portfolio: PortfolioData;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ watchlist, portfolio }) => {
  const { theme } = useTheme();

  return (
    <div className={`mt-4 transition-colors duration-300 ${
      theme === 'dark' ? 'text-dark-text-primary' : 'text-neutral-900'
    }`}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <Watchlist data={watchlist} />
        </div>
        <div className="lg:col-span-3">
          <Portfolio data={portfolio} />
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
