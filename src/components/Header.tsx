import React, { useState, useRef, useEffect } from "react";
import marketData from "../data/mock-data.json";
import { useAppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import { Button } from "./index";

const Header: React.FC = () => {
  const { activeTab, setActiveTab } = useAppContext();
  const { theme, toggleTheme } = useTheme();
  
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [marketIndices, setMarketIndices] = useState(marketData.market_indices);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Simulate live market data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketIndices(prev => ({
        nifty: {
          ...prev.nifty,
          value: prev.nifty.value + (Math.random() - 0.5) * 10,
          change: prev.nifty.change + (Math.random() - 0.5) * 2,
          change_percent: ((prev.nifty.change + (Math.random() - 0.5) * 2) / prev.nifty.value) * 100
        },
        sensex: {
          ...prev.sensex,
          value: prev.sensex.value + (Math.random() - 0.5) * 30,
          change: prev.sensex.change + (Math.random() - 0.5) * 5,
          change_percent: ((prev.sensex.change + (Math.random() - 0.5) * 5) / prev.sensex.value) * 100
        }
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdowns when activeTab changes (except when it's 'more')
  useEffect(() => {
    if (activeTab !== 'more') {
      setIsMoreDropdownOpen(false);
    }
  }, [activeTab]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMoreDropdownOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMoreClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMoreDropdownOpen(!isMoreDropdownOpen);
    setIsProfileDropdownOpen(false); // Close profile dropdown when opening more dropdown
  };

  const handleProfileClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsMoreDropdownOpen(false); // Close more dropdown when opening profile dropdown
  };

  const handleDropdownItemClick = (item: string) => {
    setActiveTab(item);
    setIsMoreDropdownOpen(false);
  };

  const handleProfileItemClick = (item: string) => {
    // Handle profile dropdown actions
    switch (item) {
      case 'profile-details':
        setActiveTab('profile-details');
        break;
      case 'live-news':
        setActiveTab('live-news');
        break;
      case 'theme-change':
        console.log('Theme change clicked, current theme:', theme);
        toggleTheme();
        break;
      case 'logout':
        // Handle logout logic here
        console.log('Logout clicked');
        break;
      default:
        break;
    }
    setIsProfileDropdownOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-md border-b ${
        theme === 'dark' 
          ? 'bg-dark-bg-secondary/95 border-dark-border-primary shadow-dark-soft' 
          : 'bg-white/95 border-neutral-200 shadow-soft'
      }`}
      role="banner"
      aria-label="Main navigation"
      style={{ overflow: 'visible' }}
    >
      <div className={`relative flex flex-col lg:flex-row justify-between items-center p-2 sm:p-3 lg:pl-2 rounded-none w-full space-y-3 lg:space-y-0 transition-all duration-500 overflow-visible ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-dark-bg-secondary/80 to-dark-bg-tertiary/80 backdrop-blur-md border-dark-border-primary/50 shadow-dark-strong' 
          : 'bg-gradient-to-r from-white/90 to-neutral-50/90 backdrop-blur-md border-neutral-200/50 shadow-strong'
      }`}>
        {/* Bottom border for depth */}
        <div className={`absolute bottom-0 left-0 right-0 h-px ${
          theme === 'dark' ? 'bg-gradient-to-r from-transparent via-dark-border-primary to-transparent' : 'bg-gradient-to-r from-transparent via-neutral-300 to-transparent'
        }`}></div>
      
        {/* Top Section - Market Indices (Mobile) / Left Section (Desktop) */}
        <div className="flex-1 flex items-center justify-center lg:justify-start space-x-2 sm:space-x-4 w-full lg:w-auto lg:ml-2">
          {/* Live Indicator */}
          <div className="flex items-center space-x-1" aria-label="Live market data indicator">
            <div className="w-2 h-2 bg-danger-500 rounded-full animate-pulse" aria-hidden="true"></div>
            <span className="text-xs text-danger-600 font-medium dark:text-danger-400">LIVE</span>
          </div>
          
          {/* NIFTY */}
          <div 
            className={`relative px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-dark-bg-tertiary/80 border-dark-border-secondary backdrop-blur-sm'
                : 'bg-white/80 border-neutral-200 backdrop-blur-sm'
            }`}
            role="region"
            aria-label="NIFTY market index"
          >
            {/* Colored accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-lg ${
              marketIndices.nifty.change >= 0 ? 'bg-success-500' : 'bg-danger-500'
            }`} aria-hidden="true"></div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <h3 className={`text-xs font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-dark-text-secondary' : 'text-secondary-600'
                }`}>NIFTY</h3>
                <span className="text-xs" aria-label={marketIndices.nifty.change >= 0 ? 'Trending up' : 'Trending down'}>
                  {marketIndices.nifty.change >= 0 ? '📈' : '📉'}
                </span>
              </div>
              <div className={`text-sm sm:text-lg font-bold transition-colors duration-300 ${
                theme === 'dark' ? 'text-dark-text-primary' : 'text-neutral-900'
              }`}>
                {marketIndices.nifty.value.toFixed(2)}
              </div>
              <div className={`text-xs font-semibold ${
                marketIndices.nifty.change >= 0 ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'
              }`}>
                {marketIndices.nifty.change >= 0 ? '+' : ''}{marketIndices.nifty.change.toFixed(2)}
              </div>
              <div className={`text-xs font-medium ${
                marketIndices.nifty.change_percent >= 0 ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'
              }`}>
                ({marketIndices.nifty.change_percent >= 0 ? '+' : ''}{marketIndices.nifty.change_percent.toFixed(2)}%)
              </div>
            </div>
          </div>

          {/* SENSEX */}
          <div 
            className={`relative px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-dark-bg-tertiary/80 border-dark-border-secondary backdrop-blur-sm'
                : 'bg-white/80 border-neutral-200 backdrop-blur-sm'
            }`}
            role="region"
            aria-label="SENSEX market index"
          >
            {/* Colored accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-lg ${
              marketIndices.sensex.change >= 0 ? 'bg-success-500' : 'bg-danger-500'
            }`} aria-hidden="true"></div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <h3 className={`text-xs font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-dark-text-secondary' : 'text-secondary-600'
                }`}>SENSEX</h3>
                <span className="text-xs" aria-label={marketIndices.sensex.change >= 0 ? 'Trending up' : 'Trending down'}>
                  {marketIndices.sensex.change >= 0 ? '📈' : '📉'}
                </span>
              </div>
              <div className={`text-sm sm:text-lg font-bold transition-colors duration-300 ${
                theme === 'dark' ? 'text-dark-text-primary' : 'text-neutral-900'
              }`}>
                {marketIndices.sensex.value.toFixed(2)}
              </div>
              <div className={`text-xs font-semibold ${
                marketIndices.sensex.change >= 0 ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'
              }`}>
                {marketIndices.sensex.change >= 0 ? '+' : ''}{marketIndices.sensex.change.toFixed(2)}
              </div>
              <div className={`text-xs font-medium ${
                marketIndices.sensex.change_percent >= 0 ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'
              }`}>
                ({marketIndices.sensex.change_percent >= 0 ? '+' : ''}{marketIndices.sensex.change_percent.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>
        
        {/* Center Section - Logo */}
        <div className="flex-1 flex justify-center order-first lg:order-none">
          <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-4 rounded-xl transition-all duration-300 hover:scale-105">
            {/* Enhanced upward-trending arrow with gradient */}
            <div className="relative">
              <svg 
                className="w-6 h-6 sm:w-10 sm:h-10 text-primary-600 dark:text-primary-400 drop-shadow-lg" 
                viewBox="0 0 40 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
              >
                {/* Background glow effect */}
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Main arrow path with enhanced design */}
                <path 
                  d="M8 24L12 20L16 24L20 20L24 24L28 20L32 16L28 12L24 16L20 12L16 16L12 12L8 16L12 20L8 24Z" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  fill="none"
                  filter="url(#glow)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Arrow head */}
                <path 
                  d="M28 12L32 16L28 20" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  fill="none"
                  filter="url(#glow)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Trend line dots */}
                <circle cx="12" cy="20" r="1.5" fill="currentColor" opacity="0.8"/>
                <circle cx="16" cy="24" r="1.5" fill="currentColor" opacity="0.8"/>
                <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.8"/>
                <circle cx="24" cy="24" r="1.5" fill="currentColor" opacity="0.8"/>
              </svg>
            </div>
            
            {/* Enhanced DesiTrade Text with modern typography */}
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-wider transition-colors duration-300 ${
                theme === 'dark' ? 'text-dark-text-primary' : 'text-neutral-900'
              }">
                <span className="font-normal">Desi</span><span className="text-warning-500 dark:text-warning-400 font-bold">Trade</span>
              </h1>
              <span className={`text-xs font-medium tracking-widest uppercase hidden sm:block transition-colors duration-300 ${
                theme === 'dark' ? 'text-dark-text-secondary' : 'text-secondary-600'
              }`}>
                Trading Platform
              </span>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Navigation (Mobile) / Right Section (Desktop) */}
        <nav className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto" role="navigation" aria-label="Main navigation">
          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden mr-2">
            <button
              className={`p-2 rounded-lg transition-all duration-300 ${
                theme === 'dark' 
                  ? 'text-dark-text-secondary hover:bg-dark-bg-accent/80' 
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
              onClick={() => {/* TODO: Add mobile menu toggle */}}
              aria-label="Open mobile navigation menu"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-3 w-full justify-center lg:justify-end">
            <Button 
              variant={activeTab === 'home' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('home')}
              className={`text-xs sm:text-sm relative overflow-hidden transition-all duration-300 ${
                activeTab === 'home' 
                  ? 'shadow-medium scale-105' 
                  : 'hover:scale-105 hover:shadow-soft'
              }`}
              aria-label="Navigate to home page"
              aria-current={activeTab === 'home' ? 'page' : undefined}
            >
              <span className="relative z-10">Home</span>
              {activeTab === 'home' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg animate-pulse" aria-hidden="true"></div>
              )}
            </Button>
            <Button 
              variant={activeTab === 'portfolio' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('portfolio')}
              className={`text-xs sm:text-sm relative overflow-hidden transition-all duration-300 ${
                activeTab === 'portfolio' 
                  ? 'shadow-medium scale-105' 
                  : 'hover:scale-105 hover:shadow-soft'
              }`}
              aria-label="Navigate to portfolio page"
              aria-current={activeTab === 'portfolio' ? 'page' : undefined}
            >
              <span className="relative z-10">Portfolio</span>
              {activeTab === 'portfolio' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg animate-pulse" aria-hidden="true"></div>
              )}
            </Button>
            <Button 
              variant={activeTab === 'orders' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('orders')}
              className={`text-xs sm:text-sm relative overflow-hidden transition-all duration-300 ${
                activeTab === 'orders' 
                  ? 'shadow-medium scale-105' 
                  : 'hover:scale-105 hover:shadow-soft'
              }`}
              aria-label="Navigate to orders page"
              aria-current={activeTab === 'orders' ? 'page' : undefined}
            >
              <span className="relative z-10">Orders</span>
              {activeTab === 'orders' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg animate-pulse" aria-hidden="true"></div>
              )}
            </Button>
            <Button 
              variant={activeTab === 'funds' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('funds')}
              className={`text-xs sm:text-sm relative overflow-hidden transition-all duration-300 ${
                activeTab === 'funds' 
                  ? 'shadow-medium scale-105' 
                  : 'hover:scale-105 hover:shadow-soft'
              }`}
              aria-label="Navigate to funds page"
              aria-current={activeTab === 'funds' ? 'page' : undefined}
            >
              <span className="relative z-10">Funds</span>
              {activeTab === 'funds' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg animate-pulse" aria-hidden="true"></div>
              )}
            </Button>
            
            {/* More Tab with Dropdown */}
            <div className="relative inline-block dropdown-container" ref={dropdownRef}>
              <Button 
                variant={activeTab === 'more' || isMoreDropdownOpen ? 'primary' : 'ghost'}
                size="sm"
                onClick={handleMoreClick}
                className="flex items-center space-x-1 text-xs sm:text-sm"
                aria-label="More options menu"
                aria-expanded={isMoreDropdownOpen}
                aria-haspopup={true}
              >
                <span>More</span>
                <svg 
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isMoreDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
              
              {/* Dropdown Menu */}
              {isMoreDropdownOpen && (
                <div 
                  className={`absolute top-full left-0 mt-2 w-64 rounded-xl shadow-strong border z-[99999] animate-slide-down transition-all duration-300 backdrop-blur-md ${
                    theme === 'dark'
                      ? 'bg-dark-bg-tertiary border-dark-border-primary shadow-dark-strong'
                      : 'bg-white border-neutral-200'
                  }`}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-2rem',
                    minWidth: '16rem',
                    maxWidth: '20rem',
                    zIndex: 99999
                  }}
                  role="menu"
                  aria-label="More options"
                >
                  <div className="py-2">
                    <button
                      onClick={() => handleDropdownItemClick('alert')}
                      className={`w-full text-left px-4 py-3 transition-all duration-200 flex items-center space-x-3 rounded-lg mx-2 hover:scale-105 ${
                        theme === 'dark'
                          ? 'text-dark-text-secondary hover:bg-dark-bg-accent/80 hover:text-dark-text-primary'
                          : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
                      }`}
                      role="menuitem"
                      aria-label="Navigate to alerts page"
                    >
                      <div className={`p-2 rounded-lg ${
                        theme === 'dark' ? 'bg-dark-bg-accent/50' : 'bg-primary-100'
                      }`}>
                        <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="font-medium">Alert</span>
                    </button>
                    <button
                      onClick={() => handleDropdownItemClick('tradeone')}
                      className={`w-full text-left px-4 py-3 transition-all duration-200 flex items-center space-x-3 rounded-lg mx-2 hover:scale-105 ${
                        theme === 'dark'
                          ? 'text-dark-text-secondary hover:bg-dark-bg-accent/80 hover:text-dark-text-primary'
                          : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
                      }`}
                      role="menuitem"
                      aria-label="Navigate to TradeOne page"
                    >
                      <div className={`p-2 rounded-lg ${
                        theme === 'dark' ? 'bg-dark-bg-accent/50' : 'bg-primary-100'
                      }`}>
                        <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <span className="font-medium">TradeOne</span>
                    </button>
                    <button
                      onClick={() => handleDropdownItemClick('tradinginsight')}
                      className={`w-full text-left px-4 py-3 transition-all duration-200 flex items-center space-x-3 rounded-lg mx-2 hover:scale-105 ${
                        theme === 'dark'
                          ? 'text-dark-text-secondary hover:bg-dark-bg-accent/80 hover:text-dark-text-primary'
                          : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
                      }`}
                      role="menuitem"
                      aria-label="Navigate to TradingInsight page"
                    >
                      <div className={`p-2 rounded-lg ${
                        theme === 'dark' ? 'bg-dark-bg-accent/50' : 'bg-primary-100'
                      }`}>
                        <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <span className="font-medium">TradingInsight</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile Icon with Dropdown */}
            <div className="relative ml-2 sm:ml-4 z-[99999]" ref={profileDropdownRef}>
              <button
                className={`cursor-pointer hover:scale-110 p-1 sm:p-2 rounded-full transition-all duration-300 ${
                  theme === 'dark' ? 'hover:bg-dark-bg-accent/80' : 'hover:bg-primary-50'
                }`}
                onClick={handleProfileClick}
                aria-label="User profile menu"
                aria-expanded={isProfileDropdownOpen}
                aria-haspopup={true}
              >
                {/* Circular Avatar with Initials */}
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg' 
                    : 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-medium'
                }`}>
                  DT
                </div>
              </button>
              
              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div 
                  className={`absolute top-full right-0 mt-2 w-56 rounded-xl shadow-strong border z-[99999] animate-slide-down transition-all duration-300 backdrop-blur-md ${
                    theme === 'dark'
                      ? 'bg-dark-bg-tertiary/95 border-dark-border-primary/50 shadow-dark-strong'
                      : 'bg-white/95 border-neutral-200/50'
                  }`}
                  role="menu"
                  aria-label="User profile options"
                >
                  {/* Profile Header */}
                  <div className={`px-4 py-3 border-b ${
                    theme === 'dark' ? 'border-dark-border-secondary' : 'border-neutral-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        theme === 'dark' 
                          ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white' 
                          : 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
                      }`}>
                        DT
                      </div>
                      <div>
                        <p className={`font-semibold ${
                          theme === 'dark' ? 'text-dark-text-primary' : 'text-neutral-900'
                        }`}>Desi Trader</p>
                        <p className={`text-xs ${
                          theme === 'dark' ? 'text-dark-text-secondary' : 'text-neutral-600'
                        }`}>Premium Member</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <button
                      onClick={() => handleProfileItemClick('profile-details')}
                      className={`w-full text-left px-4 py-3 transition-all duration-200 flex items-center space-x-3 rounded-lg mx-2 hover:scale-105 ${
                        theme === 'dark'
                          ? 'text-dark-text-secondary hover:bg-dark-bg-accent/80 hover:text-dark-text-primary'
                          : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
                      }`}
                      role="menuitem"
                      aria-label="View profile details"
                    >
                      <div className={`p-2 rounded-lg ${
                        theme === 'dark' ? 'bg-dark-bg-accent/50' : 'bg-primary-100'
                      }`}>
                        <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="font-medium">Profile Details</span>
                    </button>
                    <button
                      onClick={() => handleProfileItemClick('live-news')}
                      className={`w-full text-left px-4 py-3 transition-all duration-200 flex items-center space-x-3 rounded-lg mx-2 hover:scale-105 ${
                        theme === 'dark'
                          ? 'text-dark-text-secondary hover:bg-dark-bg-accent/80 hover:text-dark-text-primary'
                          : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
                      }`}
                      role="menuitem"
                      aria-label="View live news"
                    >
                      <div className={`p-2 rounded-lg ${
                        theme === 'dark' ? 'bg-dark-bg-accent/50' : 'bg-primary-100'
                      }`}>
                        <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <span className="font-medium">Live News</span>
                    </button>
                    
                    {/* Theme Change Option */}
                    <button
                      onClick={() => handleProfileItemClick('theme-change')}
                      className={`w-full text-left px-4 py-3 transition-all duration-200 flex items-center space-x-3 rounded-lg mx-2 hover:scale-105 ${
                        theme === 'dark'
                          ? 'text-dark-text-secondary hover:bg-dark-bg-accent/80 hover:text-dark-text-primary'
                          : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
                      }`}
                      role="menuitem"
                      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                    >
                      <div className={`p-2 rounded-lg ${
                        theme === 'dark' ? 'bg-dark-bg-accent/50' : 'bg-primary-100'
                      }`}>
                        {theme === 'dark' ? (
                          <svg className="w-4 h-4 text-warning-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium">
                        {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                      </span>
                    </button>
                    
                    <div className={`border-t my-2 mx-2 ${
                      theme === 'dark' ? 'border-dark-border-secondary' : 'border-neutral-200'
                    }`}></div>
                    <button
                      onClick={() => handleProfileItemClick('logout')}
                      className={`w-full text-left px-4 py-3 transition-all duration-200 flex items-center space-x-3 rounded-lg mx-2 hover:scale-105 ${
                        theme === 'dark'
                          ? 'text-danger-400 hover:bg-danger-900/20 hover:text-danger-300'
                          : 'text-danger-600 hover:bg-danger-50 hover:text-danger-700'
                      }`}
                      role="menuitem"
                      aria-label="Logout from application"
                    >
                      <div className={`p-2 rounded-lg ${
                        theme === 'dark' ? 'bg-danger-900/30' : 'bg-danger-100'
                      }`}>
                        <svg className="w-4 h-4 text-danger-600 dark:text-danger-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;