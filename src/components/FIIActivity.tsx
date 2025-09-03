import React from 'react';

const FIIActivity: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">FII DII activity</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-red-500/20 rounded-lg border border-red-500/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-900 dark:text-white font-medium">FII Stocks</span>
          </div>
          <span className="text-red-600 dark:text-red-400 font-semibold">₹-1,159 Cr</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-green-500/20 rounded-lg border border-green-500/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-900 dark:text-white font-medium">DII Stocks</span>
          </div>
          <span className="text-green-600 dark:text-green-400 font-semibold">₹2,550 Cr</span>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Net Flow:</span>
          <span className="text-green-600 dark:text-green-400 font-medium">₹1,391 Cr</span>
        </div>
      </div>
    </div>
  );
};

export default FIIActivity;
