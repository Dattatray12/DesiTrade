export const APP_CONFIG = {
  UPDATE_INTERVAL: 5000, // 5 seconds
  DEFAULT_VOLATILITY: 0.02,
  SECTOR_VOLATILITY_MULTIPLIERS: {
    Technology: 1.5,
    Banking: 1.2,
    'Oil & Gas': 1.8,
    Healthcare: 0.8,
    FMCG: 0.6,
  },
  RISK_METRICS_BOUNDS: {
    beta: { min: 0.1, max: 2.0 },
    volatility: { min: 5.0, max: 25.0 },
    sharpe_ratio: { min: 0.1, max: 3.0 },
    max_drawdown: { min: -15.0, max: -2.0 },
  },
} as const;

export const TABS = {
  HOME: 'home',
  PORTFOLIO: 'portfolio',
  ORDERS: 'orders',
  FUNDS: 'funds',
  MORE: 'more',
} as const;

export const COLORS = {
  SUCCESS: 'text-green-400',
  ERROR: 'text-red-400',
  WARNING: 'text-yellow-400',
  INFO: 'text-blue-400',
} as const;
