export interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export interface Holding {
  symbol: string;
  quantity: number;
  avg_price: number;
  current_price: number;
  pnl: number;
  sector: string;
  purchase_date: string;
  market_cap: string;
  weight: number;
}

export interface PortfolioData {
  invested: number;
  current_value: number;
  today_loss: number;
  overall_gain_percent: number;
  profit_loss: number;
  total_holdings: number;
  sector_allocation: {
    [key: string]: number;
  };
  risk_metrics: {
    beta: number;
    volatility: number;
    sharpe_ratio: number;
    max_drawdown: number;
  };
  holdings: Holding[];
}

export interface TrendingItem {
  symbol: string;
  name: string;
  price: number;
  gain: number;
  volume: string;
}

export interface IPOItem {
  company: string;
  issue_size: string;
  price_band: string;
  gain: number;
  status: string;
}

export interface MarketSentimentData {
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

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}
