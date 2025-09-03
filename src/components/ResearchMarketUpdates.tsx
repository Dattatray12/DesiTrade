import React from 'react';

const ResearchMarketUpdates: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Research Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Research</h3>
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform duration-200 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 dark:text-white font-medium">Derivative calls</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Expert analysis & recommendations</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-300 text-lg">📈</span>
            </div>
          </div>
        </div>
      </div>

      {/* Market Updates Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Market updates</h3>
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform duration-200 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 dark:text-white font-medium">Live news</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Real-time market updates</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-300 text-lg">📡</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchMarketUpdates;
