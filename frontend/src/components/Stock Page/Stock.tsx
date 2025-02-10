"use client";

import React, { useEffect, useState } from 'react';
import Symbolinfo from './Symbolinfo';
import TradingViewWidget from './TradingViewWidget';
import CompanyProfileWidget from './CompanyProfileWidget';
import FundamentalDataWidget from './FundamentalDataWidget';
import TechnicalAnalysisWidget from './TechnicalAnalysisWidget';
import TopStoriesWidget from './TopStoriesWidget';

const Stock: React.FC = () => {
    const [searchInput, setSearchInput] = useState<string>("");

    useEffect(() => {
        const savedInput = localStorage.getItem("searchInput");
        if (savedInput) {
            setSearchInput(savedInput);
        }
    });

    return (
        <main className='mb-4'>
            <section id="symbol-info"><Symbolinfo searchInputValue={searchInput} /></section>
            <section id="advanced-chart"><TradingViewWidget symbol={searchInput} /> </section>
            <section id="company-profile"><CompanyProfileWidget searchInputValue={searchInput} /></section>
            <section id="fundamental-data"><FundamentalDataWidget searchInputValue={searchInput}  /></section>
            <section id="technical-analysis"><TechnicalAnalysisWidget searchInputValue={searchInput} /></section>         
            <section id="top-stories"><TopStoriesWidget searchInputValue={searchInput} /></section>
        </main>
    );  
};

export default Stock;

