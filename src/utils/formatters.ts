import { COLORS } from '../constants';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

export const getChangeColor = (change: number): string => {
  if (change > 0) return COLORS.SUCCESS;
  if (change < 0) return COLORS.ERROR;
  return 'text-gray-400';
};

export const formatVolume = (volume: string): string => {
  // Convert volume strings like "1.2M", "500K" to readable format
  return volume;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
