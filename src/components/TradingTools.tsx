import React from 'react';

const TradingTools: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trading tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Trade from charts */}
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform duration-200 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-gray-900 dark:text-white font-medium">Trade from charts</h4>
            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-300 text-sm">📊</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Analyze charts and trade</p>
        </div>

        {/* Strategy Bot */}
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform duration-200 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h4 className="text-gray-900 dark:text-white font-medium">Strategy Bot</h4>
              <div className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-medium">
                NEW
              </div>
            </div>
            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-300 text-sm font-bold">T%</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Automated Trading</p>
        </div>
      </div>
    </div>
  );
};

export default TradingTools;
