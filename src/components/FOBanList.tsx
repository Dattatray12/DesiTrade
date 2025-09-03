import React from 'react';

const FOBanList: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">F&O ban list</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-red-500/20 rounded-lg border border-red-500/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-900 dark:text-white font-medium">Banned</span>
          </div>
          <span className="text-red-600 dark:text-red-400 font-semibold">0</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-900 dark:text-white font-medium">Possible ban</span>
          </div>
          <span className="text-yellow-600 dark:text-yellow-400 font-semibold">0</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-900 dark:text-white font-medium">Possible exit</span>
          </div>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">0</span>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <div className="text-center text-sm text-gray-600 dark:text-gray-300">
          <p>No stocks currently in ban list</p>
          <p className="text-xs mt-1">Market conditions are stable</p>
        </div>
      </div>
    </div>
  );
};

export default FOBanList;
