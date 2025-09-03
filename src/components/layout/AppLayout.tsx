import React from 'react';
import Header from '../Header';
import HomePage from '../../pages/HomePage';
import PortfolioPage from '../../pages/PortfolioPage';
import OrdersPage from '../../pages/OrdersPage';
import FundsPage from '../../pages/FundsPage';
import MorePage from '../../pages/MorePage';
import ThemeDemoPage from '../../pages/ThemeDemoPage';
import { useAppContext } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { Stock, PortfolioData, TrendingItem, IPOItem, MarketSentimentData } from '../../types';

interface AppLayoutProps {
  watchlist: Stock[];
  portfolio: PortfolioData;
  trending: TrendingItem[];
  ipos: IPOItem[];
  marketSentiment: MarketSentimentData;
}

const AppLayout: React.FC<AppLayoutProps> = ({ watchlist, portfolio, trending, ipos, marketSentiment }) => {
  const { activeTab } = useAppContext();
  const { theme } = useTheme();

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage watchlist={watchlist} portfolio={portfolio} trending={trending} ipos={ipos} marketSentiment={marketSentiment} />;
      case 'portfolio':
        return <PortfolioPage watchlist={watchlist} portfolio={portfolio} />;
      case 'orders':
        return <OrdersPage />;
      case 'funds':
        return <FundsPage watchlistData={watchlist} />;
      case 'more':
        return <MorePage />;
      default:
        return <HomePage watchlist={watchlist} portfolio={portfolio} trending={trending} ipos={ipos} marketSentiment={marketSentiment} />;
    }
  };

  return (
    <div 
      className={`min-h-screen-mobile w-full transition-colors duration-300 ${
        theme === 'dark' ? 'bg-dark-bg-primary' : 'bg-neutral-50'
      }`}
      role="application"
      aria-label="DesiTrade Trading Platform"
    >
      <div className="container-fluid">
        <div className="pt-2 pb-responsive space-y-responsive">
          <Header />
          <main 
            id="main-content"
            className="animate-fade-in w-full"
            role="main"
            aria-label={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} page content`}
          >
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
