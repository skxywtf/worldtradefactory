import React from 'react';
import TradingViewWidget from './TradingViewWidget';
import { blueChipStocks, pennyStocks, volatileStocks, sectorBasedCategories } from '@/data/StockData';

const OtherStocks = () => {
  return (
    <>
      <BlueChipStocks />
      <PennyStocks />
      <VolatileStocks />
      <SectorBasedStocks />
    </>
  );
};

export default OtherStocks;

interface StockProps {
  symbol: string;
  name: string;
  price?: string;
  marketCap?: string;
  beta?: number;
  sector?: string;
  ipoDate?: string;
  initialPrice?: string;
  esgRating?: string;
  shortInterestPercentage?: string;
  country?: string;
  exchange?: string;
  peRatio?: string;
}

const StockCard: React.FC<StockProps> = ({
  symbol,
  name,
  price,
  marketCap,
  beta,
  sector,
  ipoDate,
  initialPrice,
  esgRating,
  shortInterestPercentage,
  country,
  exchange,
  peRatio,
}) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-bold">{name} ({symbol})</h3>
      {price && <p>Price: {price}</p>}
      {marketCap && <p>Market Cap: {marketCap}</p>}
      {beta !== undefined && <p>Beta: {beta}</p>}
      {sector && <p>Sector: {sector}</p>}
      {ipoDate && <p>IPO Date: {ipoDate}</p>}
      {initialPrice && <p>Initial Price: {initialPrice}</p>}
      {esgRating && <p>ESG Rating: {esgRating}</p>}
      {shortInterestPercentage && <p>Short Interest: {shortInterestPercentage}</p>}
      {country && exchange && (
        <p>
          Country: {country} | Exchange: {exchange}
        </p>
      )}
      {peRatio && <p>P/E Ratio: {peRatio}</p>}
      <StockChart symbol={symbol} name={name}  />
    </div>
  );
};

export const StockChart: React.FC<StockProps> = ({ symbol }) => {
  return (
    <TradingViewWidget
      symbol={symbol}
    />
  );
};

const BlueChipStocks: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blue Chip Stocks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blueChipStocks.map((stock) => (
          <StockCard
            key={stock.symbol}
            symbol={stock.symbol}
            name={stock.name}
            price={stock.price}
            marketCap={stock.marketCap}
          />
        ))}
      </div>
    </div>
  );
};

const PennyStocks: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Penny Stocks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pennyStocks.map((stock) => (
          <StockCard
            key={stock.symbol}
            symbol={stock.symbol}
            name={stock.name}
            price={stock.price}
          />
        ))}
      </div>
    </div>
  );
};

const VolatileStocks: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Volatile Stocks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {volatileStocks.map((stock) => (
          <StockCard
            key={stock.symbol}
            symbol={stock.symbol}
            name={stock.name}
            price={stock.price}
            beta={stock.beta}
          />
        ))}
      </div>
    </div>
  );
};

const SectorBasedStocks: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sector-Based Stocks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectorBasedCategories.map((stock) => (
          <StockCard
            key={stock.symbol}
            symbol={stock.symbol}
            name={stock.name}
            sector={stock.sector}
          />
        ))}
      </div>
    </div>
  );
};
