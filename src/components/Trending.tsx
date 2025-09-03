import React from "react";
import { TrendingItem } from "../types";

interface Props {
  data: TrendingItem[];
}

const Trending: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trending Now in NIFTY</h2>
      </div>
      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">{item.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">₹{item.price?.toLocaleString() || 'N/A'}</div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${item.gain >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  {item.gain >= 0 ? '+' : ''}{item.gain}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Vol: {item.volume || 'High'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;