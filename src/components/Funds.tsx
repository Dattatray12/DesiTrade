import React, { useState } from "react";
import Watchlist from "./Watchlist";
import { useTheme } from "../context/ThemeContext";

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

interface FundsProps {
  watchlistData: Stock[];
}

const Funds: React.FC<FundsProps> = ({ watchlistData }) => {
  const [selectedTab, setSelectedTab] = useState<'stocks' | 'mutualFunds'>('stocks');
  const [addMoneyAmount, setAddMoneyAmount] = useState(50000);
  const { theme } = useTheme();

  const quickAddAmounts = [10000, 25000, 50000, 100000, 250000];

  const handleQuickAdd = (amount: number) => {
    setAddMoneyAmount(prev => prev + amount);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Left Column - Watchlist */}
      <div className="lg:col-span-1">
        <Watchlist data={watchlistData} />
      </div>
      
      {/* Right Column - Funds Content */}
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Margin Overview & Benefits */}
      <div className="lg:col-span-2 space-y-6">
        {/* Margin Overview Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Margin Overview</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Margin Available</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹958.40</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Margin Used</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">₹0.00</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm">For Withdrawal</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹958.40</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Margin Utilization</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">0.00%</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>0%</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
          
          <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
            Get Instant Margin
          </button>
        </div>

        {/* Margin Benefits Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pledge Shares, MFs & Get Margin Benefit</h3>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">+ ₹27.3.1</span>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">₹</span>
              </div>
              <span className="text-gray-600 dark:text-gray-300">Margin Benefit for Options Buying & Selling</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 text-yellow-500">⭐</div>
              <span className="text-gray-600 dark:text-gray-300">Get Instant Margin in 15 minutes</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 text-yellow-500">⭐</div>
              <span className="text-gray-600 dark:text-gray-300">Auto-unpledge when you sell</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 text-yellow-500">⭐</div>
              <span className="text-gray-600 dark:text-gray-300">Trade across all segments & exchanges</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">₹</span>
            </div>
            <span className="text-gray-600 dark:text-gray-300">Get Higher Margin Benefits For Trading</span>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => setSelectedTab('stocks')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                selectedTab === 'stocks' 
                  ? 'bg-yellow-500 text-gray-900 border-2 border-yellow-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Stocks & ETFs
            </button>
            <button 
              onClick={() => setSelectedTab('mutualFunds')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                selectedTab === 'mutualFunds' 
                  ? 'bg-yellow-500 text-gray-900 border-2 border-yellow-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Mutual Funds
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Money In & Referral */}
      <div className="space-y-6">
        {/* Money In Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Money in</h3>
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-400 text-sm mb-2">Add Money:</label>
            <input
              type="text"
              value={`₹${addMoneyAmount.toLocaleString('en-IN')}`}
              onChange={(e) => {
                const value = e.target.value.replace(/[₹,]/g, '');
                const numValue = parseInt(value) || 0;
                setAddMoneyAmount(numValue);
              }}
              className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickAddAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleQuickAdd(amount)}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm transition-colors"
              >
                + ₹{amount.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
          
          <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
            Add Money for Investing
          </button>
        </div>

        {/* Referral Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Share the Experience!</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Get your Friends & Family to Invest & Trade on DesiTrade Make their trading experience - incredible!
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 dark:text-gray-400 text-sm mb-2">Your Referral Link</label>
              <div className="flex">
                <input
                  type="text"
                  value="https://desitrade.com/ref/ZEMKW91292"
                  readOnly
                  className="flex-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-l-lg border border-gray-200 dark:border-gray-600 focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard("https://desitrade.com/ref/ZEMKW91292")}
                  className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-white px-3 py-2 rounded-r-lg border border-gray-200 dark:border-gray-600 transition-colors"
                >
                  📋
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-600 dark:text-gray-400 text-sm mb-2">Your exclusive referral code for DesiTrade</label>
              <div className="flex">
                <input
                  type="text"
                  value="ZEMKW91292"
                  readOnly
                  className="flex-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-l-lg border border-gray-200 dark:border-gray-600 focus:outline-none"
                />
                <div className="flex">
                  <button
                    onClick={() => copyToClipboard("ZEMKW91292")}
                    className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-white px-3 py-2 border border-gray-200 dark:border-gray-600 transition-colors"
                  >
                    📋
                  </button>
                  <button className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 border border-green-600 transition-colors">
                    📱
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 border border-blue-600 transition-colors">
                    𝕏
                  </button>
                  <button className="bg-blue-800 hover:bg-blue-700 text-white px-3 py-2 rounded-r-lg border border-blue-800 transition-colors">
                    f
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-4">
            For full details on referral, quick sharing & status of referrals, please check DesiTrade app
          </p>
        </div>

        {/* Detailed Margin Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Margin Available Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Margin Available</span>
              <span className="text-gray-900 dark:text-white font-medium">₹958.40</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Opening Balance</span>
              <span className="text-gray-900 dark:text-white font-medium">₹0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Pay In</span>
              <span className="text-gray-900 dark:text-white font-medium">₹0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Delivery Sell Benefit (100%)</span>
              <span className="text-gray-900 dark:text-white font-medium">₹0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Collateral Equity</span>
              <span className="text-gray-900 dark:text-white font-medium">₹0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Unrealised Ledger</span>
              <span className="text-gray-900 dark:text-white font-medium">₹0.00</span>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;
