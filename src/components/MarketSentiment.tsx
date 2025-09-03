import React from "react";

interface MarketSentimentData {
  fearGreedIndex: number;
  marketMood: string;
  sectorPerformance: Array<{
    name: string;
    change: number;
    trend: 'up' | 'down' | 'neutral';
  }>;
  tradingSignals: Array<{
    type: 'buy' | 'sell' | 'hold';
    stock: string;
    reason: string;
    confidence: number;
  }>;
  volatilityIndex: number;
  putCallRatio: number;
}

interface Props {
  data: MarketSentimentData;
}

const MarketSentiment: React.FC<Props> = ({ data }) => {
  const getFearGreedColor = (index: number) => {
    if (index >= 70) return 'text-green-400';
    if (index >= 50) return 'text-yellow-400';
    if (index >= 30) return 'text-orange-400';
    return 'text-red-400';
  };

  const getFearGreedLabel = (index: number) => {
    if (index >= 70) return 'Extreme Greed';
    if (index >= 50) return 'Greed';
    if (index >= 30) return 'Fear';
    return 'Extreme Fear';
  };

  const getSignalColor = (type: string) => {
    switch (type) {
      case 'buy': return 'text-green-400';
      case 'sell': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getSignalBgColor = (type: string) => {
    switch (type) {
      case 'buy': return 'bg-green-500/20';
      case 'sell': return 'bg-red-500/20';
      default: return 'bg-yellow-500/20';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white">Market Sentiment</h2>
      </div>

      {/* Fear & Greed Index */}
      <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 mb-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${getFearGreedColor(data.fearGreedIndex)}`}>
            {data.fearGreedIndex}
          </div>
          <div className="text-sm text-gray-300">{getFearGreedLabel(data.fearGreedIndex)}</div>
          <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${getFearGreedColor(data.fearGreedIndex).replace('text-', 'bg-')}`}
              style={{ width: `${data.fearGreedIndex}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Sector Performance */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-3">Sector Performance</h3>
        <div className="space-y-2">
          {data.sectorPerformance.map((sector, idx) => (
            <div key={idx} className="flex justify-between items-center bg-gray-700/30 p-2 rounded">
              <span className="text-sm text-gray-300">{sector.name}</span>
              <span className={`text-sm font-medium ${
                sector.trend === 'up' ? 'text-green-400' : 
                sector.trend === 'down' ? 'text-red-400' : 'text-gray-400'
              }`}>
                {sector.change > 0 ? '+' : ''}{sector.change}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trading Signals */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-3">Trading Signals</h3>
        <div className="space-y-2">
          {data.tradingSignals.map((signal, idx) => (
            <div key={idx} className={`p-2 rounded ${getSignalBgColor(signal.type)}`}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white">{signal.stock}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getSignalColor(signal.type)}`}>
                  {signal.type.toUpperCase()}
                </span>
              </div>
              <div className="text-xs text-gray-300 mt-1">{signal.reason}</div>
              <div className="text-xs text-gray-400 mt-1">Confidence: {signal.confidence}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Indicators */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-700/30 p-3 rounded text-center">
          <div className="text-sm text-gray-400">VIX</div>
          <div className="text-lg font-bold text-white">{data.volatilityIndex}</div>
        </div>
        <div className="bg-gray-700/30 p-3 rounded text-center">
          <div className="text-sm text-gray-400">P/C Ratio</div>
          <div className="text-lg font-bold text-white">{data.putCallRatio}</div>
        </div>
      </div>
    </div>
  );
};

export default MarketSentiment;
