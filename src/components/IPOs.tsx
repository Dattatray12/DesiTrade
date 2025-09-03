import React from "react";
import { IPOItem } from "../types";

interface Props {
  data: IPOItem[];
}

const IPOs: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">IPOs in Market</h2>
      </div>
      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">{item.company}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">₹{item.price_band}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Size: {item.issue_size}</div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${item.gain >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  {item.gain >= 0 ? '+' : ''}{item.gain}%
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  item.status === 'Open' ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' : 
                  item.status === 'Closed' ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' : 
                  'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                }`}>
                  {item.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IPOs;