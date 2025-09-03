import React, { useState, useEffect } from "react";
import { PortfolioData } from "../types";
import { useTheme } from "../context/ThemeContext";

interface Props {
  data: PortfolioData;
}

const Portfolio: React.FC<Props> = ({ data }) => {
  const [prevData, setPrevData] = useState<PortfolioData | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [priceChanges, setPriceChanges] = useState<{[key: string]: 'up' | 'down' | null}>({});
  const { theme } = useTheme();

  useEffect(() => {
    if (prevData) {
      setIsUpdating(true);
      
      // Track price changes for animations
      const changes: {[key: string]: 'up' | 'down' | null} = {};
      data.holdings.forEach(holding => {
        const prevHolding = prevData.holdings.find(h => h.symbol === holding.symbol);
        if (prevHolding) {
          if (holding.current_price > prevHolding.current_price) {
            changes[holding.symbol] = 'up';
          } else if (holding.current_price < prevHolding.current_price) {
            changes[holding.symbol] = 'down';
          }
        }
      });
      setPriceChanges(changes);
      
      const timer = setTimeout(() => {
        setIsUpdating(false);
        setPriceChanges({});
      }, 1000);
      return () => clearTimeout(timer);
    }
    setPrevData(data);
  }, [data]);

  const getChangeIndicator = (current: number, previous: number | null | undefined) => {
    if (!previous) return null;
    const change = current - previous;
    if (change > 0) return '↗';
    if (change < 0) return '↘';
    return '→';
  };

  const getChangeColor = (current: number, previous: number | null | undefined) => {
    if (!previous) return 'text-white';
    const change = current - previous;
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-white';
  };

  const formatCurrency = (value: number) => {
    // Handle invalid or extremely large numbers
    if (!value || !isFinite(value) || value > 1000000000000) {
      return "₹--";
    }
    
    return `₹${value.toLocaleString()}`;
  };

  return (
    <section 
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex flex-col"
      aria-label="Portfolio overview"
      role="region"
    >
      <header className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center" aria-hidden="true">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Portfolio</h2>
        <div className="ml-auto flex items-center gap-2">
          <div 
            className={`w-2 h-2 rounded-full live-indicator ${isUpdating ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}
            aria-hidden="true"
          ></div>
          <span className="text-xs text-gray-500 dark:text-gray-400" aria-live="polite">
            {isUpdating ? 'LIVE' : 'Updated'}
          </span>
        </div>
      </header>
      
      {/* Portfolio Summary */}
      <section className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600" aria-label="Portfolio summary">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wide">Invested</p>
            <p className="font-bold text-lg portfolio-value text-gray-900 dark:text-white">{formatCurrency(data.invested)}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wide">Current Value</p>
            <div className="flex items-center gap-1">
              <span className={`font-bold text-lg portfolio-value ${getChangeColor(data.current_value, prevData?.current_value)}`}>
                {formatCurrency(data.current_value)}
              </span>
              <span aria-hidden="true">{getChangeIndicator(data.current_value, prevData?.current_value)}</span>
            </div>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wide">Today's P&L</p>
            <p className={`font-bold portfolio-metric ${data.today_loss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {data.today_loss >= 0 ? '+' : ''}{data.today_loss}%
            </p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wide">Overall Gain</p>
            <div className="flex items-center gap-1">
              <span className="text-green-600 dark:text-green-400 font-bold portfolio-metric">+{data.overall_gain_percent}%</span>
              <span aria-hidden="true">{getChangeIndicator(data.overall_gain_percent, prevData?.overall_gain_percent)}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 dark:text-gray-300 text-sm">Profit/Loss:</span>
            <div className="flex items-center gap-1">
              <span className={`font-bold portfolio-value ${data.profit_loss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatCurrency(data.profit_loss)}
              </span>
              <span aria-hidden="true">{getChangeIndicator(data.profit_loss, prevData?.profit_loss)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300 text-sm">Total Holdings:</span>
            <span className="font-semibold bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-sm">{data.total_holdings}</span>
          </div>
        </div>
      </section>

      {/* Sector Allocation */}
      <section className="mb-6" aria-label="Sector allocation">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Sector Allocation
        </h3>
        <div className="space-y-3" role="list" aria-label="Sector allocation breakdown">
          {Object.entries(data.sector_allocation).map(([sector, percentage]) => {
            const prevPercentage = prevData?.sector_allocation[sector] || percentage;
            const isIncreasing = percentage > prevPercentage;
            const isDecreasing = percentage < prevPercentage;
            
            return (
              <div key={sector} className={`flex justify-between items-center sector-update ${isUpdating && (isIncreasing || isDecreasing) ? 'sector-update' : ''}`} role="listitem">
                <span className="text-sm text-gray-600 dark:text-gray-300">{sector}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label={`${sector} sector allocation: ${percentage}%`}>
                    <div 
                      className={`h-2 rounded-full progress-bar transition-all duration-300 ${
                        isIncreasing ? 'bg-green-500' : isDecreasing ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium w-12 text-right text-gray-900 dark:text-white">{percentage}%</span>
                    {isIncreasing && <span className="text-green-500 dark:text-green-400 text-xs" aria-label="increasing">↗</span>}
                    {isDecreasing && <span className="text-red-500 dark:text-red-400 text-xs" aria-label="decreasing">↘</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Risk Metrics */}
      <section className="mb-6" aria-label="Risk metrics">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Risk Metrics
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm" role="list" aria-label="Risk metrics breakdown">
          <div className="risk-metric bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg border border-gray-200 dark:border-gray-600" role="listitem">
            <p className="text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wide">Beta</p>
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg text-gray-900 dark:text-white">{data.risk_metrics.beta}</span>
              <span aria-hidden="true">{getChangeIndicator(data.risk_metrics.beta, prevData?.risk_metrics.beta)}</span>
            </div>
          </div>
          <div className="risk-metric bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg border border-gray-200 dark:border-gray-600" role="listitem">
            <p className="text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wide">Volatility</p>
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg text-gray-900 dark:text-white">{data.risk_metrics.volatility}%</span>
              <span aria-hidden="true">{getChangeIndicator(data.risk_metrics.volatility, prevData?.risk_metrics.volatility)}</span>
            </div>
          </div>
          <div className="risk-metric bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg border border-gray-200 dark:border-gray-600" role="listitem">
            <p className="text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wide">Sharpe Ratio</p>
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg text-gray-900 dark:text-white">{data.risk_metrics.sharpe_ratio}</span>
              <span aria-hidden="true">{getChangeIndicator(data.risk_metrics.sharpe_ratio, prevData?.risk_metrics.sharpe_ratio)}</span>
            </div>
          </div>
          <div className="risk-metric bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg border border-gray-200 dark:border-gray-600" role="listitem">
            <p className="text-red-600 dark:text-red-400 font-bold text-lg">{data.risk_metrics.max_drawdown}%</p>
            <span aria-hidden="true">{getChangeIndicator(data.risk_metrics.max_drawdown, prevData?.risk_metrics.max_drawdown)}</span>
          </div>
        </div>
      </section>

      {/* Holdings */}
      <section aria-label="Stock holdings">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Holdings
        </h3>
        <div className="max-h-64 overflow-y-auto space-y-3 pr-2" role="list" aria-label="Stock holdings list">
          {data.holdings.filter(holding => 
            holding && 
            holding.symbol && 
            typeof holding.current_price === 'number' && 
            isFinite(holding.current_price) && 
            holding.current_price > 0 && 
            holding.current_price < 1000000000000
          ).map((holding) => {
            const prevHolding = prevData?.holdings.find(h => h.symbol === holding.symbol);
            const priceChange = prevHolding ? holding.current_price - prevHolding.current_price : 0;
            const pnlChange = prevHolding ? holding.pnl - prevHolding.pnl : 0;
            const priceChangeType = priceChanges[holding.symbol];
            
            return (
              <article key={holding.symbol} className={`p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 holding-update transition-all duration-300 ${
                isUpdating && (priceChange !== 0 || pnlChange !== 0) ? 'ring-2 ring-blue-400' : ''
              } ${priceChangeType === 'up' ? 'price-up' : ''} ${priceChangeType === 'down' ? 'price-down' : ''}`} role="listitem">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{holding.symbol}</h4>
                  <div className="flex items-center gap-1">
                    <span className={`${holding.pnl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} font-bold`}>
                      ₹{holding.pnl.toFixed(0)}
                    </span>
                    {pnlChange > 0 && <span className="text-green-500 dark:text-green-400 text-xs" aria-label="profit increasing">↗</span>}
                    {pnlChange < 0 && <span className="text-red-500 dark:text-red-400 text-xs" aria-label="profit decreasing">↘</span>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Qty:</span> {holding.quantity}
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Weight:</span> {holding.weight}%
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Avg:</span> ₹{holding.avg_price}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Current:</span> ₹{holding.current_price}
                    {priceChange > 0 && <span className="text-green-500 dark:text-green-400 text-xs" aria-label="price increasing">↗</span>}
                    {priceChange < 0 && <span className="text-red-500 dark:text-red-400 text-xs" aria-label="price decreasing">↘</span>}
                  </div>
                </div>
                <div className="mt-2 text-gray-500 dark:text-gray-400">
                  <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">{holding.sector} • {holding.market_cap}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Portfolio;