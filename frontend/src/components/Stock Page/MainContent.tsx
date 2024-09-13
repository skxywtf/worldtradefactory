"use client"

import React, { useEffect, useRef } from 'react';
import { useSymbol } from './SymbolContext';
import Symbolinfo from './Symbolinfo';
import TradingViewWidget from './TradingViewWidget';
import CompanyProfileWidget from './CompanyProfileWidget';
import FundamentalDataWidget from './FundamentalDataWidget';
import TechnicalAnalysisWidget from './TechnicalAnalysisWidget';
import TopStoriesWidget from './TopStoriesWidget';

const MainContent: React.FC = () => {
    const { symbol } = useSymbol();

    useEffect(() => {
        // Function to create and update widget scripts
        const createWidget = (templateId: string, targetId: string, symbol: string) => {
            const template = document.getElementById(templateId) as HTMLTemplateElement;
            const target = document.getElementById(targetId);

            if (template && target) {
                target.innerHTML = '';
                const clone = template.content.cloneNode(true) as HTMLElement;
                const script = clone.querySelector('script') as HTMLScriptElement;
                script.textContent = script.textContent?.replace(/"symbol": "([^"]*)"/g, `"symbol": "${symbol}"`);
                target.appendChild(clone);
            }
        };

        // Update widgets with new symbol
        createWidget('symbol-info-template', 'symbol-info', symbol);
        createWidget('advanced-chart-template', 'advanced-chart', symbol);
        createWidget('company-profile-template', 'company-profile', symbol);
        createWidget('fundamental-data-template', 'fundamental-data', symbol);
        createWidget('technical-analysis-template', 'technical-analysis', symbol);
        createWidget('top-stories-template', 'top-stories', symbol);
    }, [symbol]);

    return (
        <main>
            <section id="symbol-info"> <Symbolinfo /> </section>
            <section id="advanced-chart"> <TradingViewWidget symbol={symbol} /> </section>
            <section id="company-profile"> <CompanyProfileWidget /> </section>
            <section id="fundamental-data"> <FundamentalDataWidget /> </section>
            <section id="technical-analysis"> <TechnicalAnalysisWidget /> </section>
            <section id="top-stories"> <TopStoriesWidget /> </section>
        </main>
    );
};

export default MainContent;