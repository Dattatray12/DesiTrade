import React from 'react';
import Watchlist from '../components/Watchlist';
import Portfolio from '../components/Portfolio';
import ChartSwitcher from '../components/ChartSwitcher';
import Trending from '../components/Trending';
import IPOs from '../components/IPOs';
import { useTheme } from '../context/ThemeContext';
import { Stock, PortfolioData, TrendingItem, IPOItem, MarketSentimentData } from '../types';

interface HomePageProps {
  watchlist: Stock[];
  portfolio: PortfolioData;
  trending: TrendingItem[];
  ipos: IPOItem[];
  marketSentiment: MarketSentimentData;
}

const HomePage: React.FC<HomePageProps> = ({ watchlist, portfolio, trending, ipos, marketSentiment }) => {
  const { theme } = useTheme();

  return (
    <div className={`transition-colors duration-300 ${
      theme === 'dark' ? 'text-dark-text-primary' : 'text-neutral-900'
    }`}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
        <div className="lg:col-span-1">
          <Watchlist data={watchlist} />
        </div>
        <div className="lg:col-span-1">
          <Portfolio data={portfolio} />
        </div>
        <div className="lg:col-span-2">
          <ChartSwitcher />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Trending data={trending} />
        <IPOs data={ipos} />
      </div>
    </div>
  );
};

export default HomePage;
