import React from 'react';
import Funds from '../components/Funds';
import { Stock } from '../types';

interface FundsPageProps {
  watchlistData: Stock[];
}

const FundsPage: React.FC<FundsPageProps> = ({ watchlistData }) => {
  return (
    <div className="mt-4">
      <Funds watchlistData={watchlistData} />
    </div>
  );
};

export default FundsPage;
