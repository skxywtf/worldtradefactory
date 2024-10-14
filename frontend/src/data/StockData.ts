// Define Category and Stock interfaces
interface Stock {
    symbol: string;
    name: string;
    price: string;
    change?: number;
    peRatio?: number;
    marketCap?: string;
    beta?: number;
  }
  
  interface Category {
    categoryName: string;
    stocks: Stock[];
  }
  
  interface SectorBasedCategory {
    symbol: string;
    name: string;
    sector: string;
  }


  export const categories: Category[] = [
    {
      categoryName: 'Trending',
      stocks: [
        { symbol: 'AAPL', name: 'Apple Inc.', change: 2.5, price: '170.50' },
        { symbol: 'TSLA', name: 'Tesla Inc.', change: -1.2, price: '240.20' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', change: 1.8, price: '140.00' },
        { symbol: 'MSFT', name: 'Microsoft Corp.', change: 1.5, price: '320.00' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', change: 0.9, price: '1500.00' },
        { symbol: 'NFLX', name: 'Netflix Inc.', change: 2.8, price: '450.00' },
        { symbol: 'NVDA', name: 'NVIDIA Corp.', change: 5.7, price: '480.30' },
        { symbol: 'AMD', name: 'Advanced Micro Devices', change: 4.2, price: '120.40' },
        { symbol: 'META', name: 'Meta Platforms Inc.', change: 1.1, price: '300.00' },
        { symbol: 'ORCL', name: 'Oracle Corp.', change: 2.0, price: '110.50' },
        { symbol: 'INTC', name: 'Intel Corp.', change: -0.5, price: '40.60' },
        { symbol: 'ADBE', name: 'Adobe Inc.', change: 1.7, price: '550.20' },
      ]
    },
    {
      categoryName: 'Top Gainers',
      stocks: [
        { symbol: 'NVDA', name: 'NVIDIA Corp.', change: 5.7, price: '480.30' },
        { symbol: 'AMD', name: 'Advanced Micro Devices', change: 4.2, price: '120.40' },
        { symbol: 'TSM', name: 'Taiwan Semiconductor Manufacturing', change: 3.5, price: '100.80' },
        { symbol: 'COST', name: 'Costco Wholesale Corp.', change: 3.0, price: '500.50' },
        { symbol: 'NFLX', name: 'Netflix Inc.', change: 2.8, price: '450.00' },
        { symbol: 'SHOP', name: 'Shopify Inc.', change: 6.0, price: '700.00' },
        { symbol: 'ZM', name: 'Zoom Video Communications Inc.', change: 3.7, price: '120.00' },
        { symbol: 'BA', name: 'Boeing Co.', change: 2.5, price: '210.00' },
        { symbol: 'MRNA', name: 'Moderna Inc.', change: 3.1, price: '190.00' },
        { symbol: 'SBUX', name: 'Starbucks Corp.', change: 2.9, price: '115.50' },
        { symbol: 'SPOT', name: 'Spotify Technology', change: 4.1, price: '145.60' },
        { symbol: 'ROKU', name: 'Roku Inc.', change: 5.0, price: '110.70' },
      ]
    },
    {
      categoryName: 'Dividend',
      stocks: [
        { symbol: 'KO', name: 'Coca-Cola Co.', change: 0.8, price: '60.30' },
        { symbol: 'JNJ', name: 'Johnson & Johnson', change: 1.1, price: '155.20' },
        { symbol: 'PG', name: 'Procter & Gamble Co.', change: 0.5, price: '145.00' },
        { symbol: 'PEP', name: 'PepsiCo Inc.', change: 0.6, price: '175.00' },
        { symbol: 'VZ', name: 'Verizon Communications Inc.', change: 0.4, price: '38.50' },
        { symbol: 'MO', name: 'Altria Group Inc.', change: 0.9, price: '45.30' },
        { symbol: 'T', name: 'AT&T Inc.', change: 0.2, price: '20.60' },
        { symbol: 'MMM', name: '3M Co.', change: 1.2, price: '90.40' },
        { symbol: 'ABBV', name: 'AbbVie Inc.', change: 1.0, price: '120.00' },
        { symbol: 'CL', name: 'Colgate-Palmolive Co.', change: 0.6, price: '78.00' },
        { symbol: 'MRK', name: 'Merck & Co. Inc.', change: 0.8, price: '115.00' },
        { symbol: 'XOM', name: 'Exxon Mobil Corp.', change: 0.5, price: '100.00' },
      ]
    },
    {
      categoryName: 'Top Losers',
      stocks: [
        { symbol: 'META', name: 'Meta Platforms Inc.', change: -4.5, price: '300.00' },
        { symbol: 'BA', name: 'Boeing Co.', change: -3.7, price: '210.00' },
        { symbol: 'DIS', name: 'Walt Disney Co.', change: -3.2, price: '90.00' },
        { symbol: 'XOM', name: 'Exxon Mobil Corp.', change: -2.8, price: '100.00' },
        { symbol: 'CVX', name: 'Chevron Corp.', change: -2.5, price: '160.00' },
        { symbol: 'NFLX', name: 'Netflix Inc.', change: -1.8, price: '450.00' },
        { symbol: 'CRM', name: 'Salesforce Inc.', change: -2.2, price: '220.00' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', change: -1.4, price: '1500.00' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', change: -1.9, price: '140.00' },
        { symbol: 'F', name: 'Ford Motor Co.', change: -2.7, price: '12.00' },
        { symbol: 'GM', name: 'General Motors Co.', change: -2.5, price: '35.00' },
        { symbol: 'IBM', name: 'International Business Machines Corp.', change: -2.0, price: '130.00' },
      ]
    },
    {
      categoryName: 'Growth Stocks',
      stocks: [
        { symbol: 'SHOP', name: 'Shopify Inc.', change: 6.0, price: '700.00' },
        { symbol: 'SQ', name: 'Block Inc.', change: 5.5, price: '85.00' },
        { symbol: 'DOCU', name: 'DocuSign Inc.', change: 4.8, price: '65.00' },
        { symbol: 'SNAP', name: 'Snap Inc.', change: 4.0, price: '15.00' },
        { symbol: 'ZM', name: 'Zoom Video Communications Inc.', change: 3.7, price: '120.00' },
        { symbol: 'ROKU', name: 'Roku Inc.', change: 5.0, price: '110.70' },
        { symbol: 'NVDA', name: 'NVIDIA Corp.', change: 5.7, price: '480.30' },
        { symbol: 'TTD', name: 'The Trade Desk Inc.', change: 6.3, price: '92.00' },
        { symbol: 'CRWD', name: 'CrowdStrike Holdings Inc.', change: 4.6, price: '170.00' },
        { symbol: 'TWLO', name: 'Twilio Inc.', change: 4.3, price: '58.00' },
        { symbol: 'ASAN', name: 'Asana Inc.', change: 3.5, price: '24.00' },
        { symbol: 'NET', name: 'Cloudflare Inc.', change: 3.9, price: '65.00' },
      ]
    },
    {
      categoryName: 'Value Stocks',
      stocks: [
        { symbol: 'TGT', name: 'Target Corp.', peRatio: 12, price: '150.00' },
        { symbol: 'WMT', name: 'Walmart Inc.', peRatio: 15, price: '160.00' },
        { symbol: 'HD', name: 'Home Depot Inc.', peRatio: 20, price: '320.00' },
        { symbol: 'LOW', name: 'Lowe’s Cos Inc.', peRatio: 18, price: '200.00' },
        { symbol: 'NKE', name: 'Nike Inc.', peRatio: 25, price: '90.00' },
        { symbol: 'KO', name: 'Coca-Cola Co.', peRatio: 20, price: '60.30' },
        { symbol: 'PEP', name: 'PepsiCo Inc.', peRatio: 22, price: '175.00' },
        { symbol: 'PG', name: 'Procter & Gamble Co.', peRatio: 23, price: '145.00' },
        { symbol: 'JNJ', name: 'Johnson & Johnson', peRatio: 17, price: '155.20' },
        { symbol: 'PFE', name: 'Pfizer Inc.', peRatio: 10, price: '35.00' },
        { symbol: 'XOM', name: 'Exxon Mobil Corp.', peRatio: 9, price: '100.00' },
        { symbol: 'CVX', name: 'Chevron Corp.', peRatio: 11, price: '160.00' },
      ]
    },
  ];
  
    export const blueChipStocks = [
      { symbol: 'AAPL', name: 'Apple Inc.', price: '170.50', marketCap: '2.7T' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: '320.00', marketCap: '2.4T' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '1500.00', marketCap: '1.5T' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '140.00', marketCap: '1.4T' },
      { symbol: 'JNJ', name: 'Johnson & Johnson', price: '155.20', marketCap: '400B' },
      { symbol: 'PG', name: 'Procter & Gamble Co.', price: '145.00', marketCap: '350B' },
      { symbol: 'VZ', name: 'Verizon Communications Inc.', price: '38.50', marketCap: '160B' },
      { symbol: 'KO', name: 'Coca-Cola Co.', price: '60.30', marketCap: '260B' },
      { symbol: 'DIS', name: 'Walt Disney Co.', price: '90.00', marketCap: '170B' },
      { symbol: 'CSCO', name: 'Cisco Systems Inc.', price: '55.00', marketCap: '230B' },
    ]
    
    export const pennyStocks = [
      { symbol: 'SNDL', name: 'Sundial Growers Inc.', price: '$0.50' },
      { symbol: 'NOK', name: 'Nokia Corp.', price: '$4.50' },
      { symbol: 'BBBYQ', name: 'Bed Bath & Beyond Inc.', price: '$0.30' },
      { symbol: 'CLOV', name: 'Clover Health Investments Corp.', price: '$1.20' },
      { symbol: 'GME', name: 'GameStop Corp.', price: '$4.00' },
      { symbol: 'AMC', name: 'AMC Entertainment Holdings Inc.', price: '$3.50' },
      { symbol: 'PLTR', name: 'Palantir Technologies Inc.', price: '$4.80' },
      { symbol: 'FUBO', name: 'fuboTV Inc.', price: '$4.10' },
      { symbol: 'ZOM', name: 'Zomedica Corp.', price: '$0.90' },
      { symbol: 'SPCE', name: 'Virgin Galactic Holdings Inc.', price: '$4.20' },
    ]
  
    export const volatileStocks = [
      { symbol: 'TSLA', name: 'Tesla Inc.', beta: 2.0, price: '240' },
      { symbol: 'NFLX', name: 'Netflix Inc.', beta: 1.8, price: '450' },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', beta: 1.7, price: '480' },
      { symbol: 'AMD', name: 'Advanced Micro Devices Inc.', beta: 1.6, price: '120' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', beta: 1.5, price: '140' },
      { symbol: 'AAPL', name: 'Apple Inc.', beta: 1.3, price: '170' },
      { symbol: 'DIS', name: 'Walt Disney Co.', beta: 1.4, price: '90' },
      { symbol: 'BA', name: 'Boeing Co.', beta: 1.5, price: '210' },
      { symbol: 'CRM', name: 'Salesforce.com Inc.', beta: 1.6, price: '220' },
      { symbol: 'FB', name: 'Meta Platforms Inc.', beta: 1.8, price: '300' },
    ]
  
    export const sectorBasedCategories : SectorBasedCategory[]= [
      // Technology Sector
      { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology' },
      // Healthcare Sector
      { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare' },
      // Consumer Goods Sector
      { symbol: 'KO', name: 'Coca-Cola Co.', sector: 'Consumer Goods' },
      // Financial Sector
      { symbol: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financial' },
      // Energy Sector
      { symbol: 'XOM', name: 'Exxon Mobil Corp.', sector: 'Energy' },
      // Utilities Sector
      { symbol: 'DUK', name: 'Duke Energy Corp.', sector: 'Utilities' },
      // Real Estate Sector
      { symbol: 'PLD', name: 'Prologis Inc.', sector: 'Real Estate' },
      // Communication Sector
      { symbol: 'VZ', name: 'Verizon Communications Inc.', sector: 'Communication' },
      // Industrials Sector
      { symbol: 'BA', name: 'Boeing Co.', sector: 'Industrials' },
      // Materials Sector
      { symbol: 'NEM', name: 'Newmont Corporation', sector: 'Materials' },
    ]
  
    export const ipoStocks = [
      { symbol: 'RIVN', name: 'Rivian Automotive', ipoDate: 'November 10, 2021', initialPrice: '$78' },
      { symbol: 'SNOW', name: 'Snowflake Inc.', ipoDate: 'September 16, 2020', initialPrice: '$120' },
      { symbol: 'DOX', name: 'DigitalOcean Holdings', ipoDate: 'March 24, 2021', initialPrice: '$47' },
      { symbol: 'UPST', name: 'Upstart Holdings', ipoDate: 'December 16, 2020', initialPrice: '$20' },
      { symbol: 'COIN', name: 'Coinbase Global', ipoDate: 'April 14, 2021', initialPrice: '$250' },
      { symbol: 'PINS', name: 'Pinterest Inc.', ipoDate: 'April 18, 2019', initialPrice: '$19' },
      { symbol: 'LYFT', name: 'Lyft Inc.', ipoDate: 'March 29, 2019', initialPrice: '$72' },
      { symbol: 'PTON', name: 'Peloton Interactive', ipoDate: 'September 26, 2019', initialPrice: '$29' },
      { symbol: 'BMBL', name: 'Bumble Inc.', ipoDate: 'February 11, 2021', initialPrice: '$43' },
      { symbol: 'AFRM', name: 'Affirm Holdings', ipoDate: 'January 13, 2021', initialPrice: '$49' },
    ]
  
    export const esgFriendlyStocks = [
      // High ESG rating companies
      { symbol: 'TSLA', name: 'Tesla Inc.', esgRating: 'A' },
      { symbol: 'AAPL', name: 'Apple Inc.', esgRating: 'A' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', esgRating: 'A' },
      { symbol: 'VZ', name: 'Verizon Communications', esgRating: 'A' },
      // Moderate ESG rating companies
      { symbol: 'KO', name: 'Coca-Cola Co.', esgRating: 'B' },
      // Low ESG rating companies
      { symbol: 'XOM', name: 'Exxon Mobil Corp.', esgRating: 'C' },
      // Other companies with notable ESG ratings
      { symbol: 'JNJ', name: 'Johnson & Johnson', esgRating: 'A' },
    ]
  
    export const mostShortedStocks = [
      // Stocks with high short interest
      { symbol: 'TSLA', name: 'Tesla Inc.', shortInterestPercentage: '18%' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', shortInterestPercentage: '15%' },
      { symbol: 'GME', name: 'GameStop Corp.', shortInterestPercentage: '25%' },
      // Additional stocks with notable short interest
      { symbol: 'BBBYQ', name: 'Bed Bath & Beyond', shortInterestPercentage: '30%' },
    ]
  
    export const highMarketCapStocks = [
      // Companies with high market capitalization
      { symbol: 'AAPL', name: 'Apple Inc.', marketCap: '2.7T' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', marketCap: '2.4T' },
    ]
  
    export const smallCapStocks= [
      // Small-cap stocks (typically under $2 billion)
      { symbol: 'CRWD', name: 'CrowdStrike Holdings', marketCap: '1.5B' },
      { symbol: 'RIVN', name: 'Rivian Automotive', marketCap: '1.5B' },
    ]
    export const globalStocks = [
      // Stocks from various global markets
      // US Stocks
      { symbol: 'AAPL', country: 'USA', exchange: 'NASDAQ' },
      // European Stocks
      { symbol: 'SAP', country: 'Germany', exchange: 'XETRA' },
      // Asian Stocks
      { symbol: 'SONY', country: 'Japan', exchange: 'TSE' },
    ]
  
    export const lowPERatioStocks = [
      // Stocks with low Price-to-Earnings ratios
      { symbol: 'KO', name: 'Coca-Cola Co.', peRatio: '18' },
      { symbol: 'VZ', name: 'Verizon Communications', peRatio: '12' },
      { symbol: 'BAC', name: 'Bank of America', peRatio: '10' },
    ]
  