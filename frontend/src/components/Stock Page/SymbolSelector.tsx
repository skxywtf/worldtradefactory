import React from 'react';
import { useSymbol } from './SymbolContext';

const SymbolSelector: React.FC = () => {
    const { symbol, setSymbol } = useSymbol();

    const handleSymbolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSymbol(event.target.value);
    };

    return (
        <div>
            <label htmlFor="stock-selector">Select Stock: </label>
            <select id="stock-selector" value={symbol} onChange={handleSymbolChange}>
                <option value="NASDAQ:TSLA">Tesla (TSLA)</option>
                <option value="NASDAQ:AAPL">Apple (AAPL)</option>
                <option value="NASDAQ:NVDA">NVIDIA (NVDA)</option>
                <option value="NASDAQ:MSFT">Microsoft (MSFT)</option>
                <option value="NASDAQ:AMZN">Amazon (AMZN)</option>
                <option value="NASDAQ:GOOGL">Alphabet (GOOGL)</option>
                <option value="NASDAQ:META">Meta (META)</option>
                <option value="NYSE:BRK.B">Berkshire Hathaway (BRK.B)</option>
                <option value="NYSE:LLY">Eli Lilly (LLY)</option>
                <option value="NYSE:UNH">UnitedHealth (UNH)</option>
                <option value="NYSE:V">Visa (V)</option>
                <option value="NYSE:WMT">Walmart (WMT)</option>
            </select>
        </div>
    );
};

export default SymbolSelector;