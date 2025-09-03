import { PortfolioData } from '../types';

// Function to generate realistic price changes
export const generatePriceChange = (currentPrice: number, volatility: number = 0.02, sector: string = '') => {
  // Sector-specific volatility
  let sectorVolatility = volatility;
  switch (sector) {
    case 'Technology':
      sectorVolatility = volatility * 1.5; // Higher volatility for tech
      break;
    case 'Banking':
      sectorVolatility = volatility * 1.2; // Moderate volatility for banking
      break;
    case 'Oil & Gas':
      sectorVolatility = volatility * 1.8; // High volatility for commodities
      break;
    case 'Healthcare':
      sectorVolatility = volatility * 0.8; // Lower volatility for healthcare
      break;
    case 'FMCG':
      sectorVolatility = volatility * 0.6; // Low volatility for consumer goods
      break;
    default:
      sectorVolatility = volatility;
  }
  
  // Add some market correlation (stocks tend to move together)
  const marketTrend = (Math.random() * 0.01 - 0.005); // -0.5% to +0.5%
  const stockSpecific = (Math.random() * 2 - 1) * sectorVolatility;
  const totalChange = marketTrend + stockSpecific;
  
  return currentPrice * (1 + totalChange);
};

// Function to update portfolio with live data
export const updatePortfolioLive = (prevPortfolio: PortfolioData): PortfolioData => {
  // Update holdings with live prices
  const updatedHoldings = prevPortfolio.holdings.map(holding => {
    const newPrice = generatePriceChange(holding.current_price, 0.015, holding.sector);
    const newPnl = (newPrice - holding.avg_price) * holding.quantity;
    
    return {
      ...holding,
      current_price: parseFloat(newPrice.toFixed(2)),
      pnl: parseFloat(newPnl.toFixed(2))
    };
  });

  // Calculate new portfolio values
  const newCurrentValue = updatedHoldings.reduce((sum, holding) => 
    sum + (holding.current_price * holding.quantity), 0
  );
  
  const newProfitLoss = newCurrentValue - prevPortfolio.invested;
  const newOverallGainPercent = ((newProfitLoss / prevPortfolio.invested) * 100);
  
  // Calculate today's performance with market correlation
  const marketMovement = (Math.random() * 0.015 - 0.0075); // -0.75% to +0.75%
  const newTodayLoss = parseFloat((marketMovement * 100).toFixed(2));
  
  // Update sector allocation based on new values
  const sectorValues: { [key: string]: number } = {};
  updatedHoldings.forEach(holding => {
    const sectorValue = holding.current_price * holding.quantity;
    sectorValues[holding.sector] = (sectorValues[holding.sector] || 0) + sectorValue;
  });
  
  const totalValue = Object.values(sectorValues).reduce((sum, val) => sum + val, 0);
  const newSectorAllocation: { [key: string]: number } = {};
  Object.entries(sectorValues).forEach(([sector, value]) => {
    newSectorAllocation[sector] = parseFloat(((value / totalValue) * 100).toFixed(1));
  });

  // Update risk metrics dynamically with realistic changes
  const newRiskMetrics = {
    beta: parseFloat((prevPortfolio.risk_metrics.beta + (Math.random() * 0.08 - 0.04)).toFixed(2)),
    volatility: parseFloat((prevPortfolio.risk_metrics.volatility + (Math.random() * 0.4 - 0.2)).toFixed(1)),
    sharpe_ratio: parseFloat((prevPortfolio.risk_metrics.sharpe_ratio + (Math.random() * 0.08 - 0.04)).toFixed(2)),
    max_drawdown: parseFloat((prevPortfolio.risk_metrics.max_drawdown + (Math.random() * 0.3 - 0.15)).toFixed(1))
  };

  // Ensure risk metrics stay within realistic bounds
  newRiskMetrics.beta = Math.max(0.1, Math.min(2.0, newRiskMetrics.beta));
  newRiskMetrics.volatility = Math.max(5.0, Math.min(25.0, newRiskMetrics.volatility));
  newRiskMetrics.sharpe_ratio = Math.max(0.1, Math.min(3.0, newRiskMetrics.sharpe_ratio));
  newRiskMetrics.max_drawdown = Math.max(-15.0, Math.min(-2.0, newRiskMetrics.max_drawdown));

  return {
    ...prevPortfolio,
    current_value: parseFloat(newCurrentValue.toFixed(2)),
    today_loss: newTodayLoss,
    overall_gain_percent: parseFloat(newOverallGainPercent.toFixed(2)),
    profit_loss: parseFloat(newProfitLoss.toFixed(2)),
    sector_allocation: newSectorAllocation,
    risk_metrics: newRiskMetrics,
    holdings: updatedHoldings
  };
};

// Function to generate random price changes for watchlist
export const generateRandomPriceChange = (item: { change: number; price: number }) => {
  const randomChange = (Math.random() * 2 - 1).toFixed(2);
  const newChange = item.change + parseFloat(randomChange);
  const newPrice = item.price * (1 + newChange / 100);
  return { 
    change: parseFloat(newChange.toFixed(2)), 
    price: parseFloat(newPrice.toFixed(2)) 
  };
};

// Function to generate random gain changes
export const generateRandomGainChange = (item: { gain: number }) => ({
  ...item,
  gain: parseFloat((item.gain + (Math.random() * 2 - 1)).toFixed(2)),
});
