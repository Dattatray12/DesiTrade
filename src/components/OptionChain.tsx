import React from 'react';

interface OptionChainItem {
  name: string;
  icon: string;
  badge?: string;
  isExpiring?: boolean;
  type: 'index' | 'commodity' | 'currency' | 'sector';
}

const optionChainData: OptionChainItem[] = [
  { name: 'NIFTY', icon: '📊', isExpiring: true, type: 'index' },
  { name: 'SENSEX', icon: '🏛️', badge: 'BSE', type: 'index' },
  { name: 'BANKNIFTY', icon: '🏦', badge: 'BANK', type: 'sector' },
  { name: 'CRUDEOIL', icon: '🛢️', badge: 'OIL', type: 'commodity' },
  { name: 'NATURALGAS', icon: '🔥', badge: 'GAS', type: 'commodity' },
  { name: 'GOLD', icon: '🥇', badge: 'GOLD', type: 'commodity' },
  { name: 'SILVER', icon: '🥈', badge: 'SILVER', type: 'commodity' },
  { name: 'FINNIFTY', icon: '💼', badge: 'FIN', type: 'sector' },
  { name: 'MIDCPNIFTY', icon: '📈', badge: 'MIDCAP', type: 'sector' },
  { name: 'BANKEX', icon: '🏛️', badge: 'BANKEX', type: 'sector' }
];

// Icon background color mapping based on asset type
const getIconBackgroundClasses = (type: OptionChainItem['type']) => {
  const baseClasses = 'w-16 h-16 rounded-full flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition-all duration-200 shadow-lg';
  
  const typeClasses = {
    index: 'bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-primary-500/25',
    commodity: 'bg-gradient-to-br from-warning-500 to-warning-600 hover:from-warning-600 hover:to-warning-700 shadow-warning-500/25',
    currency: 'bg-gradient-to-br from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 shadow-success-500/25',
    sector: 'bg-gradient-to-br from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 shadow-secondary-500/25'
  };
  
  return `${baseClasses} ${typeClasses[type]}`;
};

const OptionChain: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Option chain</h3>
      <div className="flex flex-wrap gap-3">
        {optionChainData.map((item, index) => (
          <div key={index} className="relative">
            <div className={getIconBackgroundClasses(item.type)}>
              {item.icon}
            </div>
            {item.badge && (
              <div className="absolute -top-1 -right-1 bg-gray-600 dark:bg-gray-700 text-xs text-white px-1.5 py-0.5 rounded-full">
                {item.badge}
              </div>
            )}
            {item.isExpiring && (
              <div className="absolute -top-1 -right-1 bg-danger-500 text-xs text-white px-1.5 py-0.5 rounded-full">
                EXP
              </div>
            )}
            <div className="text-center mt-2">
              <span className="text-xs text-gray-600 dark:text-gray-300">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionChain;
