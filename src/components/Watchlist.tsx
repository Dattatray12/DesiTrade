import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Stock } from "../types";
import { useTheme } from "../context/ThemeContext";

interface Props {
  data: Stock[];
}

const Watchlist: React.FC<Props> = ({ data }) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(() => {
    // Try to restore page from localStorage
    const savedPage = localStorage.getItem('watchlist-current-page');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const { theme } = useTheme();

  // Pagination settings
  const itemsPerPage = 8;



  const formatPrice = (price: number) => {
    // Handle invalid or extremely large numbers
    if (!price || !isFinite(price) || price > 1000000000000) {
      return "₹--";
    }
    
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)}L`;
    } else if (price >= 1000) {
      return `₹${(price / 1000).toFixed(2)}K`;
    } else {
      return `₹${price.toFixed(2)}`;
    }
  };

  const formatFullPrice = (price: number) => {
    // Handle invalid or extremely large numbers
    if (!price || !isFinite(price) || price > 1000000000000) {
      return "₹--";
    }
    
    return `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatChange = (change: number) => {
    // Handle invalid numbers
    if (!change || !isFinite(change)) {
      return "0.00%";
    }
    
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  };

  // Filter out invalid data
  const validData = useMemo(() => data.filter(item => 
    item && 
    item.symbol && 
    typeof item.price === 'number' && 
    isFinite(item.price) && 
    item.price > 0 && 
    item.price < 1000000000000 &&
    typeof item.change === 'number' && 
    isFinite(item.change)
  ), [data]);

  // Apply pagination to valid data
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(validData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = validData.slice(startIndex, endIndex);
    
    return {
      totalPages,
      startIndex,
      endIndex,
      currentData
    };
  }, [validData, currentPage, itemsPerPage]);

  const { totalPages: totalValidPages, startIndex: validStartIndex, endIndex: validEndIndex, currentData: currentValidData } = paginationData;

  // Navigation functions (defined after totalValidPages is available)
  const handlePageChange = useCallback((page: number) => {
    console.log(`Watchlist: Changing page from ${currentPage} to ${page}`);
    setCurrentPage(page);
  }, [currentPage]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalValidPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalValidPages]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('watchlist-current-page', currentPage.toString());
  }, [currentPage]);

  // Only reset page when data length changes significantly (not on every data update)
  useEffect(() => {
    const newTotalPages = Math.ceil(validData.length / itemsPerPage);
    if (newTotalPages !== totalValidPages) {
      console.log(`Watchlist: Total pages changed from ${totalValidPages} to ${newTotalPages}, current page: ${currentPage}`);
      // Only reset if we're on a page that no longer exists
      if (currentPage > newTotalPages && newTotalPages > 0) {
        console.log(`Watchlist: Resetting to last page ${newTotalPages}`);
        setCurrentPage(newTotalPages);
      } else if (newTotalPages === 0) {
        console.log(`Watchlist: No data, resetting to page 1`);
        setCurrentPage(1);
      }
      // Don't reset to page 1 if we're just getting live data updates
    }
  }, [validData.length, totalValidPages, currentPage, itemsPerPage]);

  if (!validData.length) {
    return (
      <section 
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex flex-col"
        aria-label="Watchlist"
        role="region"
      >
        <header className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center" aria-hidden="true">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Watchlist</h2>
        </header>
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm">No valid watchlist data available</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex flex-col"
      aria-label="Watchlist"
      role="region"
    >
      <header className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center" aria-hidden="true">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Watchlist</h2>
      </header>
      
      {/* Pagination Controls */}
      {totalValidPages > 1 && (
        <div 
          key={`pagination-${totalValidPages}-${currentPage}`}
          className="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
        >
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span>Showing {validStartIndex + 1}-{Math.min(validEndIndex, validData.length)} of {validData.length} items</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Go to previous page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalValidPages }, (_, index) => {
                const pageNumber = index + 1;
                const isCurrentPage = pageNumber === currentPage;
                
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isCurrentPage
                        ? 'bg-blue-500 text-white border border-blue-500'
                        : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500'
                    }`}
                    aria-label={`Go to page ${pageNumber}`}
                    aria-current={isCurrentPage ? 'page' : undefined}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
            
            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalValidPages}
              className="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Go to next page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-3" role="list" aria-label="Watchlist items">
        {currentValidData.map((item: Stock, idx: number) => (
          <article 
            key={idx} 
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 relative group border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
            onMouseEnter={() => setHoveredItem(idx)}
            onMouseLeave={() => setHoveredItem(null)}
            role="listitem"
            aria-label={`${item.symbol} stock - Price: ${formatFullPrice(item.price)}, Change: ${formatChange(item.change)}`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{item.symbol}</h3>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" aria-hidden="true"></div>
                  <span>BSE</span>
                </div>
              </div>
              <div className="text-right">
                <span 
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    item.change >= 0 
                      ? "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/20" 
                      : "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/20"
                  }`}
                  aria-label={`${item.change >= 0 ? 'Gain' : 'Loss'} of ${formatChange(item.change)}`}
                >
                  {formatChange(item.change)}
                </span>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {formatFullPrice(item.price)}
            </div>
            
            {/* Action buttons that appear on hover */}
            <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2 transition-all duration-200 ${
              hoveredItem === idx ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
            }`}>
              {/* Buy Button */}
              <button 
                className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center justify-center text-sm font-bold transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label={`Buy ${item.symbol} stock`}
                title={`Buy ${item.symbol} stock`}
              >
                B
              </button>
              
              {/* Sell Button */}
              <button 
                className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center text-sm font-bold transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label={`Sell ${item.symbol} stock`}
                title={`Sell ${item.symbol} stock`}
              >
                S
              </button>
              
              {/* Line Chart Button */}
              <button 
                className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`View line chart for ${item.symbol}`}
                title={`View line chart for ${item.symbol}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M7 8l3-3 3 3 4-4" />
                </svg>
              </button>
              
              {/* Candlestick Chart Button */}
              <button 
                className="w-8 h-8 bg-purple-500 hover:bg-purple-600 text-white rounded-md flex items-center justify-center transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label={`View candlestick chart for ${item.symbol}`}
                title={`View candlestick chart for ${item.symbol}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Watchlist;