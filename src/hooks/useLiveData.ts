import { useEffect, useState } from 'react';
import { Stock, PortfolioData, TrendingItem, IPOItem, MarketSentimentData } from '../types';
import { updatePortfolioLive, generateRandomPriceChange, generateRandomGainChange } from '../utils/priceUtils';
import mockData from '../data/mock-data.json';

export const useLiveData = () => {
  const [watchlist, setWatchlist] = useState<Stock[]>(mockData.watchlist);
  const [portfolio, setPortfolio] = useState<PortfolioData>(mockData.portfolio);
  const [trending, setTrending] = useState<TrendingItem[]>(
    mockData.trending.map(item => ({
      symbol: item.symbol,
      name: item.name,
      price: item.price,
      gain: item.gain,
      volume: item.volume
    }))
  );
  const [ipos, setIpos] = useState<IPOItem[]>(
    mockData.ipos.map(item => ({
      company: item.company,
      issue_size: item.issue_size,
      price_band: item.price_band,
      gain: item.gain,
      status: item.status
    }))
  );
  const [marketSentiment, setMarketSentiment] = useState<MarketSentimentData>({
    ...mockData.market_sentiment,
    sectorPerformance: mockData.market_sentiment.sectorPerformance.map(sector => ({
      ...sector,
      trend: sector.trend as 'up' | 'down' | 'neutral'
    })),
    tradingSignals: mockData.market_sentiment.tradingSignals.map(signal => ({
      ...signal,
      type: signal.type as 'buy' | 'sell' | 'hold'
    }))
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Update watchlist with live price changes
      setWatchlist((prev) =>
        prev.map((item) => {
          const { change, price } = generateRandomPriceChange(item);
          return { ...item, change, price };
        })
      );

      // Update portfolio with live data
      setPortfolio((prev) => updatePortfolioLive(prev));

      // Update trending stocks
      setTrending((prev) =>
        prev.map((item) => ({ ...item, gain: generateRandomGainChange(item).gain }))
      );

      // Update IPOs
      setIpos((prev) =>
        prev.map((item) => ({ ...item, gain: generateRandomGainChange(item).gain }))
      );

      // Update market sentiment with slight variations
      setMarketSentiment((prev) => ({
        ...prev,
        fearGreedIndex: Math.max(0, Math.min(100, prev.fearGreedIndex + (Math.random() - 0.5) * 2)),
        volatilityIndex: Math.max(10, Math.min(30, prev.volatilityIndex + (Math.random() - 0.5) * 1)),
        putCallRatio: Math.max(0.5, Math.min(1.5, prev.putCallRatio + (Math.random() - 0.5) * 0.1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    watchlist,
    portfolio,
    trending,
    ipos,
    marketSentiment,
    setWatchlist,
    setPortfolio,
    setTrending,
    setIpos,
    setMarketSentiment
  };
};
