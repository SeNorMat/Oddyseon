'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowDown, 
  ArrowUp, 
  ChevronDown, 
  RefreshCw, 
  Clock, 
  Wallet, 
  BarChart4, 
  LineChart, 
  CandlestickChart, 
  Clock3,
  Layers,
  Settings,
  Download,
  Info,
  HelpCircle,
  BellRing
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

// Mock crypto data
const cryptoData = [
  { 
    id: 'bitcoin', 
    symbol: 'BTC', 
    name: 'Bitcoin', 
    price: 42853.67, 
    change24h: 2.5, 
    marketCap: 826754981265,
    volume24h: 34567890123,
    supply: 19500000,
    chart: [42000, 42200, 42600, 42300, 42700, 42900, 42800, 42850],
  },
  { 
    id: 'ethereum', 
    symbol: 'ETH', 
    name: 'Ethereum', 
    price: 2286.43, 
    change24h: -1.2, 
    marketCap: 274893764512,
    volume24h: 12345678901,
    supply: 120000000,
    chart: [2300, 2280, 2260, 2240, 2260, 2270, 2290, 2286],
  },
  { 
    id: 'solana', 
    symbol: 'SOL', 
    name: 'Solana', 
    price: 145.32, 
    change24h: 5.8, 
    marketCap: 62512387654,
    volume24h: 3456789012,
    supply: 430000000,
    chart: [138, 140, 142, 144, 146, 145, 143, 145],
  },
  { 
    id: 'cardano', 
    symbol: 'ADA', 
    name: 'Cardano', 
    price: 0.58, 
    change24h: 0.3, 
    marketCap: 18765432198,
    volume24h: 876543210,
    supply: 35000000000,
    chart: [0.57, 0.575, 0.58, 0.582, 0.579, 0.581, 0.58, 0.58],
  },
  { 
    id: 'binancecoin', 
    symbol: 'BNB', 
    name: 'Binance Coin', 
    price: 305.67, 
    change24h: 1.7, 
    marketCap: 47123456789,
    volume24h: 2345678901,
    supply: 155000000,
    chart: [300, 302, 306, 304, 307, 306, 304, 305],
  },
  { 
    id: 'ripple', 
    symbol: 'XRP', 
    name: 'XRP', 
    price: 0.6245, 
    change24h: -0.5, 
    marketCap: 32456789012,
    volume24h: 1234567890,
    supply: 50000000000,
    chart: [0.63, 0.628, 0.625, 0.622, 0.624, 0.626, 0.625, 0.624],
  },
  { 
    id: 'polkadot', 
    symbol: 'DOT', 
    name: 'Polkadot', 
    price: 7.32, 
    change24h: 3.4, 
    marketCap: 8765432109,
    volume24h: 543210987,
    supply: 1200000000,
    chart: [7.1, 7.15, 7.2, 7.25, 7.3, 7.35, 7.32, 7.32],
  },
  { 
    id: 'dogecoin', 
    symbol: 'DOGE', 
    name: 'Dogecoin', 
    price: 0.0845, 
    change24h: 4.2, 
    marketCap: 11234567890,
    volume24h: 654321098,
    supply: 140000000000,
    chart: [0.081, 0.082, 0.083, 0.084, 0.085, 0.0855, 0.084, 0.0845],
  },
];

// Mock portfolio data
const initialPortfolio = {
  cash: 10000, // Starting cash in USD
  assets: [
    { id: 'bitcoin', symbol: 'BTC', amount: 0.05, avgBuyPrice: 41200 },
    { id: 'ethereum', symbol: 'ETH', amount: 1.25, avgBuyPrice: 2180 },
  ],
  transactions: [
    { 
      id: 't1', 
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
      type: 'buy', 
      symbol: 'BTC', 
      amount: 0.05, 
      price: 41200, 
      total: 2060 
    },
    { 
      id: 't2', 
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), 
      type: 'buy', 
      symbol: 'ETH', 
      amount: 1.25, 
      price: 2180, 
      total: 2725 
    },
  ],
};

export default function TradingSimulatorPage() {
  const router = useRouter();
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoData[0]);
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [chartTimeframe, setChartTimeframe] = useState('1d');
  const [chartType, setChartType] = useState('line');
  const [isBuying, setIsBuying] = useState(true);
  
  // Calculate portfolio value
  const calculatePortfolioValue = () => {
    const assetsValue = portfolio.assets.reduce((total, asset) => {
      const crypto = cryptoData.find(c => c.id === asset.id);
      return total + (crypto ? crypto.price * asset.amount : 0);
    }, 0);
    return portfolio.cash + assetsValue;
  };
  
  // Calculate asset value
  const getAssetValue = (asset: any) => {
    const crypto = cryptoData.find(c => c.id === asset.id);
    return crypto ? crypto.price * asset.amount : 0;
  };
  
  // Calculate asset profit/loss
  const getAssetProfitLoss = (asset: any) => {
    const crypto = cryptoData.find(c => c.id === asset.id);
    if (!crypto) return 0;
    
    const currentValue = crypto.price * asset.amount;
    const costBasis = asset.avgBuyPrice * asset.amount;
    return currentValue - costBasis;
  };
  
  // Calculate asset profit/loss percentage
  const getAssetProfitLossPercent = (asset: any) => {
    const crypto = cryptoData.find(c => c.id === asset.id);
    if (!crypto) return 0;
    
    const costBasis = asset.avgBuyPrice * asset.amount;
    if (costBasis === 0) return 0;
    
    const profitLoss = getAssetProfitLoss(asset);
    return (profitLoss / costBasis) * 100;
  };
  
  // Handle buy action
  const handleBuy = () => {
    const amount = parseFloat(buyAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    const totalCost = amount * selectedCrypto.price;
    if (totalCost > portfolio.cash) return;
    
    // Update portfolio
    const existingAsset = portfolio.assets.find(a => a.id === selectedCrypto.id);
    let updatedAssets;
    
    if (existingAsset) {
      // Calculate new average buy price
      const totalValue = existingAsset.amount * existingAsset.avgBuyPrice + amount * selectedCrypto.price;
      const newAmount = existingAsset.amount + amount;
      const newAvgPrice = totalValue / newAmount;
      
      updatedAssets = portfolio.assets.map(asset => 
        asset.id === selectedCrypto.id 
          ? { ...asset, amount: newAmount, avgBuyPrice: newAvgPrice }
          : asset
      );
    } else {
      updatedAssets = [
        ...portfolio.assets,
        { id: selectedCrypto.id, symbol: selectedCrypto.symbol, amount, avgBuyPrice: selectedCrypto.price }
      ];
    }
    
    // Create transaction record
    const newTransaction = {
      id: `t${Date.now()}`,
      date: new Date(),
      type: 'buy',
      symbol: selectedCrypto.symbol,
      amount,
      price: selectedCrypto.price,
      total: totalCost
    };
    
    setPortfolio({
      cash: portfolio.cash - totalCost,
      assets: updatedAssets,
      transactions: [newTransaction, ...portfolio.transactions]
    });
    
    setBuyAmount('');
  };
  
  // Handle sell action
  const handleSell = () => {
    const amount = parseFloat(sellAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    const existingAsset = portfolio.assets.find(a => a.id === selectedCrypto.id);
    if (!existingAsset || existingAsset.amount < amount) return;
    
    const totalValue = amount * selectedCrypto.price;
    
    // Update portfolio
    let updatedAssets;
    if (existingAsset.amount === amount) {
      // Remove asset if selling all
      updatedAssets = portfolio.assets.filter(a => a.id !== selectedCrypto.id);
    } else {
      // Reduce amount (avg buy price stays the same)
      updatedAssets = portfolio.assets.map(asset => 
        asset.id === selectedCrypto.id 
          ? { ...asset, amount: asset.amount - amount }
          : asset
      );
    }
    
    // Create transaction record
    const newTransaction = {
      id: `t${Date.now()}`,
      date: new Date(),
      type: 'sell',
      symbol: selectedCrypto.symbol,
      amount,
      price: selectedCrypto.price,
      total: totalValue
    };
    
    setPortfolio({
      cash: portfolio.cash + totalValue,
      assets: updatedAssets,
      transactions: [newTransaction, ...portfolio.transactions]
    });
    
    setSellAmount('');
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Format crypto
  const formatCrypto = (value: number, symbol: string) => {
    return `${value.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 })} ${symbol}`;
  };
  
  // Generate mock chart data
  const generateChartData = () => {
    // In a real app, you would fetch real chart data based on the timeframe
    return Array.from({ length: 24 }, (_, i) => {
      const basePrice = selectedCrypto.price * 0.98;
      const variation = (Math.random() * 0.05) * selectedCrypto.price;
      return basePrice + variation;
    });
  };
  
  // Toggle between buy and sell
  const toggleBuySell = (value: boolean) => {
    setIsBuying(value);
  };
  
  // Auto-update prices
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate price changes
      const updatedCryptoData = cryptoData.map(crypto => {
        const changePercent = (Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1);
        const newPrice = crypto.price * (1 + changePercent / 100);
        return {
          ...crypto,
          price: newPrice,
          change24h: crypto.change24h + (Math.random() * 0.2) * (Math.random() > 0.5 ? 1 : -1),
          chart: [...crypto.chart.slice(1), newPrice]
        };
      });
      
      // Update selected crypto
      const updatedSelected = updatedCryptoData.find(c => c.id === selectedCrypto.id);
      if (updatedSelected) {
        setSelectedCrypto(updatedSelected);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [selectedCrypto.id]);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/simulations')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold mb-1">Trading Simulator</h1>
            <p className="text-text-secondary text-sm">
              Practice trading with $10,000 virtual funds
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Portfolio
          </Button>
          <Button size="sm" className="bg-aurora-gradient">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Market & Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Market overview */}
          <Card className="space-card overflow-x-auto">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Market Overview</CardTitle>
              <CardDescription>Select a cryptocurrency to trade</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="min-w-[800px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>24h Change</TableHead>
                      <TableHead>Market Cap</TableHead>
                      <TableHead>Volume (24h)</TableHead>
                      <TableHead>Chart</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cryptoData.map((crypto) => (
                      <TableRow 
                        key={crypto.id}
                        className={`cursor-pointer ${selectedCrypto.id === crypto.id ? 'bg-muted' : ''}`}
                        onClick={() => setSelectedCrypto(crypto)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center mr-2 text-xs font-bold">
                              {crypto.symbol.substring(0, 3)}
                            </div>
                            <div>
                              <div>{crypto.name}</div>
                              <div className="text-text-muted text-xs">{crypto.symbol}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(crypto.price)}</TableCell>
                        <TableCell>
                          <span className={`flex items-center ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {crypto.change24h >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                            {Math.abs(crypto.change24h).toFixed(2)}%
                          </span>
                        </TableCell>
                        <TableCell>{formatCurrency(crypto.marketCap)}</TableCell>
                        <TableCell>{formatCurrency(crypto.volume24h)}</TableCell>
                        <TableCell>
                          {/* Simplified mini chart */}
                          <div className="h-8 w-24 flex items-end space-x-1">
                            {crypto.chart.map((price, i) => {
                              const height = (price / Math.max(...crypto.chart)) * 100;
                              return (
                                <div 
                                  key={i}
                                  className={`w-2 rounded-t ${crypto.change24h >= 0 ? 'bg-green-500/50' : 'bg-red-500/50'}`}
                                  style={{ height: `${height}%` }}
                                ></div>
                              );
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCrypto(crypto);
                              setIsBuying(true);
                            }}
                          >
                            Trade
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {/* Chart */}
          <Card className="space-card">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center">
                  <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center mr-2 text-xs font-bold">
                    {selectedCrypto.symbol.substring(0, 3)}
                  </div>
                  {selectedCrypto.name} ({selectedCrypto.symbol})
                  <Badge 
                    className={`ml-2 ${selectedCrypto.change24h >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
                  >
                    {selectedCrypto.change24h >= 0 ? '+' : ''}{selectedCrypto.change24h.toFixed(2)}%
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xl font-semibold mt-1">
                  {formatCurrency(selectedCrypto.price)}
                </CardDescription>
              </div>
              
              <div className="flex gap-2">
                <div className="flex items-center rounded-md border border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-3 rounded-none ${chartType === 'line' ? 'bg-muted' : ''}`}
                    onClick={() => setChartType('line')}
                  >
                    <LineChart className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-3 rounded-none ${chartType === 'candle' ? 'bg-muted' : ''}`}
                    onClick={() => setChartType('candle')}
                  >
                    <CandlestickChart className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-3 rounded-none ${chartType === 'depth' ? 'bg-muted' : ''}`}
                    onClick={() => setChartType('depth')}
                  >
                    <Layers className="h-4 w-4" />
                  </Button>
                </div>
                
                <Select defaultValue={chartTimeframe} onValueChange={setChartTimeframe}>
                  <SelectTrigger className="w-[120px] h-8">
                    <SelectValue placeholder="Timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="4h">4 Hours</SelectItem>
                    <SelectItem value="1d">1 Day</SelectItem>
                    <SelectItem value="1w">1 Week</SelectItem>
                    <SelectItem value="1m">1 Month</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm" className="h-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              {/* Chart placeholder - in a real app, use a charting library */}
              <div className="aspect-[2/1] bg-muted/20 rounded-md flex flex-col justify-center items-center">
                <div className="relative w-full h-full">
                  {/* X axis */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border"></div>
                  {/* Y axis */}
                  <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-border"></div>
                  
                  {/* Simplified chart */}
                  <div className="absolute inset-4 flex items-end">
                    <div className="relative w-full h-full">
                      {/* Price bars/line */}
                      {generateChartData().map((price, i, arr) => {
                        const x = (i / (arr.length - 1)) * 100;
                        const height = (price / (selectedCrypto.price * 1.05)) * 100;
                        const colorClass = price > selectedCrypto.price * 0.99 ? 'bg-green-500/50' : 'bg-red-500/50';
                        
                        return (
                          <div
                            key={i}
                            className={`absolute bottom-0 w-3 ${colorClass} rounded-t`}
                            style={{ 
                              height: `${height}%`, 
                              left: `${x}%`,
                              transform: 'translateX(-50%)'
                            }}
                          ></div>
                        );
                      })}
                      
                      {/* Current price line */}
                      <div 
                        className="absolute left-0 right-0 border-t border-dashed border-aurora-blue/70"
                        style={{ bottom: `${(selectedCrypto.price / (selectedCrypto.price * 1.05)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Price markers */}
                  <div className="absolute top-2 right-2 text-xs text-text-muted">
                    {formatCurrency(selectedCrypto.price * 1.05)}
                  </div>
                  <div className="absolute bottom-2 right-2 text-xs text-text-muted">
                    {formatCurrency(selectedCrypto.price * 0.95)}
                  </div>
                  
                  {/* Time markers */}
                  <div className="absolute bottom-2 left-2 text-xs text-text-muted">
                    {chartTimeframe === '1d' ? '24h ago' : chartTimeframe === '1w' ? '1w ago' : '1m ago'}
                  </div>
                  <div className="absolute bottom-2 right-2 text-xs text-text-muted">
                    Now
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Trading & Portfolio */}
        <div className="space-y-6">
          {/* Trading panel */}
          <Card className="space-card">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Trade {selectedCrypto.symbol}</CardTitle>
                <div className="flex rounded-md overflow-hidden border border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-none ${isBuying ? 'bg-aurora-green/20 text-aurora-green' : ''}`}
                    onClick={() => toggleBuySell(true)}
                  >
                    Buy
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-none ${!isBuying ? 'bg-red-500/20 text-red-500' : ''}`}
                    onClick={() => toggleBuySell(false)}
                  >
                    Sell
                  </Button>
                </div>
              </div>
              <CardDescription>
                {isBuying 
                  ? `Available: ${formatCurrency(portfolio.cash)}`
                  : `Available: ${formatCrypto(portfolio.assets.find(a => a.id === selectedCrypto.id)?.amount || 0, selectedCrypto.symbol)}`
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {isBuying ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="buyAmount">Amount to Buy ({selectedCrypto.symbol})</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="buyAmount"
                        type="number"
                        placeholder="0.00"
                        value={buyAmount}
                        onChange={(e) => setBuyAmount(e.target.value)}
                      />
                      <Button
                        variant="outline"
                        className="shrink-0"
                        onClick={() => {
                          const maxAmount = portfolio.cash / selectedCrypto.price;
                          setBuyAmount(maxAmount.toFixed(8));
                        }}
                      >
                        Max
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Total Cost</span>
                      <span>{formatCurrency(parseFloat(buyAmount || '0') * selectedCrypto.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Current Price</span>
                      <span>{formatCurrency(selectedCrypto.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Remaining Balance</span>
                      <span>
                        {formatCurrency(portfolio.cash - parseFloat(buyAmount || '0') * selectedCrypto.price)}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full bg-aurora-green hover:bg-aurora-green/90"
                    disabled={parseFloat(buyAmount || '0') <= 0 || parseFloat(buyAmount || '0') * selectedCrypto.price > portfolio.cash}
                    onClick={handleBuy}
                  >
                    Buy {selectedCrypto.symbol}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="sellAmount">Amount to Sell ({selectedCrypto.symbol})</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="sellAmount"
                        type="number"
                        placeholder="0.00"
                        value={sellAmount}
                        onChange={(e) => setSellAmount(e.target.value)}
                      />
                      <Button
                        variant="outline"
                        className="shrink-0"
                        onClick={() => {
                          const asset = portfolio.assets.find(a => a.id === selectedCrypto.id);
                          if (asset) {
                            setSellAmount(asset.amount.toString());
                          }
                        }}
                      >
                        Max
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Total Value</span>
                      <span>{formatCurrency(parseFloat(sellAmount || '0') * selectedCrypto.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Current Price</span>
                      <span>{formatCurrency(selectedCrypto.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">New Balance</span>
                      <span>
                        {formatCurrency(portfolio.cash + parseFloat(sellAmount || '0') * selectedCrypto.price)}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full bg-red-500 hover:bg-red-500/90"
                    disabled={
                      parseFloat(sellAmount || '0') <= 0 || 
                      parseFloat(sellAmount || '0') > (portfolio.assets.find(a => a.id === selectedCrypto.id)?.amount || 0)
                    }
                    onClick={handleSell}
                  >
                    Sell {selectedCrypto.symbol}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
          
          {/* Portfolio overview */}
          <Card className="space-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Portfolio Overview</CardTitle>
              <CardDescription>
                Total Value: {formatCurrency(calculatePortfolioValue())}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="p-4 border-b border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-secondary">Cash Balance</span>
                  <span>{formatCurrency(portfolio.cash)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Assets Value</span>
                  <span>{formatCurrency(calculatePortfolioValue() - portfolio.cash)}</span>
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-medium mb-3">Your Assets</h4>
                
                {portfolio.assets.length > 0 ? (
                  <div className="space-y-4">
                    {portfolio.assets.map(asset => {
                      const crypto = cryptoData.find(c => c.id === asset.id);
                      if (!crypto) return null;
                      
                      const value = getAssetValue(asset);
                      const profitLoss = getAssetProfitLoss(asset);
                      const profitLossPercent = getAssetProfitLossPercent(asset);
                      const isProfit = profitLoss >= 0;
                      
                      return (
                        <div key={asset.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center mr-2 text-xs font-bold">
                              {asset.symbol.substring(0, 3)}
                            </div>
                            <div>
                              <div className="font-medium">{asset.symbol}</div>
                              <div className="text-sm text-text-muted">
                                {asset.amount.toFixed(6)} {asset.symbol}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div>{formatCurrency(value)}</div>
                            <div className={isProfit ? 'text-green-500' : 'text-red-500'}>
                              {isProfit ? '+' : ''}{formatCurrency(profitLoss)} ({profitLossPercent.toFixed(2)}%)
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4 text-text-muted">
                    No assets in your portfolio
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Transaction history */}
          <Card className="space-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Transaction History</CardTitle>
            </CardHeader>
            
            <CardContent className="p-0">
              {portfolio.transactions.length > 0 ? (
                <div className="divide-y divide-border max-h-60 overflow-y-auto">
                  {portfolio.transactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-4">
                      <div>
                        <div className="flex items-center">
                          <Badge className={transaction.type === 'buy' ? 'bg-aurora-green/20 text-aurora-green' : 'bg-red-500/20 text-red-500'}>
                            {transaction.type === 'buy' ? 'Buy' : 'Sell'}
                          </Badge>
                          <span className="ml-2 font-medium">{transaction.symbol}</span>
                        </div>
                        <div className="text-sm text-text-muted mt-1">
                          {transaction.date.toLocaleDateString()} · {transaction.date.toLocaleTimeString()}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div>{transaction.amount.toFixed(6)} {transaction.symbol}</div>
                        <div className="text-sm text-text-muted">
                          {formatCurrency(transaction.price)} · {formatCurrency(transaction.total)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-text-muted">
                  No transactions yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Tips section */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-5 w-5 text-aurora-blue" />
            <h3 className="font-semibold">Trading Tips</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-text-secondary">
                <span className="font-medium text-text-primary">Diversify your portfolio</span> - Don't put all your investment into a single asset. Spread your risk across different cryptocurrencies.
              </p>
            </div>
            <div>
              <p className="text-text-secondary">
                <span className="font-medium text-text-primary">Use stop losses</span> - Set price levels where you'll automatically sell to prevent major losses during downtrends.
              </p>
            </div>
            <div>
              <p className="text-text-secondary">
                <span className="font-medium text-text-primary">Follow market trends</span> - Pay attention to overall market conditions and how they might affect your investments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
