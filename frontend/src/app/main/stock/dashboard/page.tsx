"use client";

import React, { useState, useRef } from 'react';
// @ts-ignore
import { SingleTicker, SymbolOverview, TechnicalAnalysis } from 'react-ts-tradingview-widgets';
import { 
  Sun, Moon, Search, Bell, User, Menu, ChevronLeft, ChevronRight,
  TrendingUp, Star, Pin, Share2, 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useRouter } from 'next/navigation';

import { categories } from '@/data/StockData';

import OtherStocks from '@/components/Stock Page/OtherStocks';

import { useTheme } from 'next-themes'; // Import useTheme from next-themes

interface Stock {
  symbol: string;
  name: string;
  price: string;
  change?: number;
  peRatio?: number;
  marketCap?: string;
  beta?: number;
}

interface StockCategoryProps {
  title: string;
  stocks: Stock[];
  isDarkMode: boolean;
  onStockSelect: (stock: Stock) => void;
}

const StockCard = ({ stock, isDarkMode, onSelect }: { stock: Stock, isDarkMode: boolean, onSelect: (stock: Stock) => void }) => {

  const router = useRouter();

  return (
    <Card 
      className={`
        flex-none w-[280px] sm:w-[320px] cursor-pointer 
        transform transition-all duration-300 
        hover:scale-105 hover:shadow-xl
        ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}
        rounded-xl overflow-hidden
      `}
      onClick={() => onSelect(stock)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2" onClick={() => router.push(`/main/stock?tvwidgetsymbol=${encodeURIComponent(stock.symbol)}`)}>
          <div>
            <h3 className="font-bold text-lg">{stock.symbol}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <Star className="h-5 w-5" />
          </Button>
        </div>
        
        <SingleTicker
          symbol={stock.symbol}
          colorTheme={isDarkMode ? "dark" : "light"}
          width="100%"
        />
        
        <div className="mt-3 flex justify-between items-center">
          <p className="font-semibold">${stock.price}</p>
          {stock.change !== undefined && (
            <p className={`
              px-2 py-1 rounded-full text-sm font-medium
              ${stock.change >= 0 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}
            `}>
              {stock.change}%
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const StockCategory = ({ title, stocks, isDarkMode, onStockSelect }: StockCategoryProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mb-8 py-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {title}
        </h2>
        <Button variant="ghost" size="sm">
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      <div 
        className="group relative"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <button 
          onClick={() => scroll('left')} 
          className={`
            absolute left-0 top-1/2 -translate-y-1/2 z-10 
            bg-black/50 p-3 rounded-full transition-all duration-300
            hover:bg-black/70
            ${showControls ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}
          `}
        >
          <ChevronLeft className="text-white h-6 w-6" />
        </button>
        
        <button 
          onClick={() => scroll('right')} 
          className={`
            absolute right-0 top-1/2 -translate-y-1/2 z-10 
            bg-black/50 p-3 rounded-full transition-all duration-300
            hover:bg-black/70
            ${showControls ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
          `}
        >
          <ChevronRight className="text-white h-6 w-6" />
        </button>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {stocks.map((stock) => (
            <div key={stock.symbol} className="snap-start">
              <StockCard 
                stock={stock}
                isDarkMode={isDarkMode}
                onSelect={onStockSelect}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StockModal = ({ stock, isOpen, onClose, isDarkMode } : { stock: Stock | null, isOpen: boolean, onClose: () => void, isDarkMode: boolean }) => {
  if (!stock) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-6xl ${isDarkMode ? 'dark bg-gray-800 text-white' : ''}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              {stock.name} ({stock.symbol})
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Pin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Star className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-[400px]">
            <SymbolOverview
              symbols={[[stock.symbol]]}
              colorTheme={isDarkMode ? "dark" : "light"}
              height="100%"
              width="100%"
              dateFormat='dd-MM-yyyy'
            />
          </div>
          <div className="h-[400px]">
            <TechnicalAnalysis
              symbol={stock.symbol}
              colorTheme={isDarkMode ? "dark" : "light"}
              height="100%"
              width="100%"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProfessionalStockDashboard = () => {
  const { theme, setTheme } = useTheme(); // Use theme from next-themes
  const isDarkMode = theme === 'dark';

  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-opacity-90 border-b border-gray-700">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-xl font-bold ml-2">SKXYWTF</h1>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[87rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {categories.map((category, index) => (
          <StockCategory 
            key={index}
            title={category?.categoryName}
            stocks={category?.stocks}
            isDarkMode={isDarkMode}
            onStockSelect={(stock) => {
              setSelectedStock(stock);
              setIsModalOpen(true);
            }}
          />
        ))}
        {/* <OtherStocks/> */}

        <StockModal 
          stock={selectedStock} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          isDarkMode={isDarkMode}
        />
      </main>
    </div>
  );
};

export default ProfessionalStockDashboard;
