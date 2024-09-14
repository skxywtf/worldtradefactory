import { createContext, useContext, useState, ReactNode } from 'react';

const SymbolContext = createContext<{ symbol: string, setSymbol: (symbol: string) => void } | undefined>(undefined);

export const SymbolProvider = ({ children }: { children: ReactNode }) => {
    const [symbol, setSymbol] = useState('NASDAQ:AAPL');
    return (
        <SymbolContext.Provider value={{ symbol, setSymbol }}>
            {children}
        </SymbolContext.Provider>
    );
};

export const useSymbol = () => {
    const context = useContext(SymbolContext);
    if (context === undefined) {
        throw new Error('useSymbol must be used within a SymbolProvider');
    }
    return context;
};