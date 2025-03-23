'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Brain, Wallet, Dices, FileText, BarChart3, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

// Mock data for simulation tools
const simulationTools = [
  {
    id: 'trading-simulator',
    title: 'Crypto Trading Simulator',
    description: 'Practice trading with virtual funds in a realistic market environment. Test strategies without risking real capital.',
    icon: <LineChart className="h-5 w-5 text-aurora-green" />,
    category: 'trading',
    difficulty: 'beginner',
    estimatedTime: '30 min',
    isPopular: true,
    isNew: false,
  },
  {
    id: 'portfolio-optimizer',
    title: 'Portfolio Optimization Tool',
    description: 'Discover the optimal allocation of assets to maximize returns while managing risk.',
    icon: <Brain className="h-5 w-5 text-aurora-purple" />,
    category: 'portfolio',
    difficulty: 'intermediate',
    estimatedTime: '15 min',
    isPopular: true,
    isNew: true,
  },
  {
    id: 'risk-management',
    title: 'Risk Management Calculator',
    description: 'Calculate position sizes, stop-losses, and potential profits based on your risk tolerance.',
    icon: <Wallet className="h-5 w-5 text-aurora-blue" />,
    category: 'trading',
    difficulty: 'beginner',
    estimatedTime: '10 min',
    isPopular: false,
    isNew: false,
  },
  {
    id: 'market-scenario',
    title: 'Market Scenario Simulator',
    description: 'Test how your portfolio would perform under different market conditions like bull runs or crashes.',
    icon: <Dices className="h-5 w-5 text-amber-500" />,
    category: 'portfolio',
    difficulty: 'advanced',
    estimatedTime: '20 min',
    isPopular: false,
    isNew: true,
  },
  {
    id: 'crypto-calculator',
    title: 'Cryptocurrency Calculator',
    description: 'Convert between cryptocurrencies and fiat currencies, calculate profits, and estimate taxes.',
    icon: <FileText className="h-5 w-5 text-emerald-500" />,
    category: 'finance',
    difficulty: 'beginner',
    estimatedTime: '5 min',
    isPopular: true,
    isNew: false,
  },
  {
    id: 'technical-indicator',
    title: 'Technical Indicator Lab',
    description: 'Experiment with various technical indicators and see how they perform on historical data.',
    icon: <BarChart3 className="h-5 w-5 text-blue-500" />,
    category: 'analysis',
    difficulty: 'intermediate',
    estimatedTime: '25 min',
    isPopular: false,
    isNew: false,
  }
];

export default function SimulationsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Filter tools based on active category
  const filteredTools = activeCategory
    ? simulationTools.filter(tool => tool.category === activeCategory)
    : simulationTools;
    
  // Get unique categories for filter
  const categories = Array.from(
    new Set(simulationTools.map(tool => tool.category))
  );
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-2">Simulations & Tools</h1>
          <p className="text-text-secondary">
            Practice and apply your knowledge with interactive tools
          </p>
        </motion.div>
      </div>
      
      {/* Hero card - Featured simulation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-aurora-blue/20 bg-gradient-to-br from-surface to-surface/30">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left side content */}
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-aurora-blue/20 text-aurora-blue hover:bg-aurora-blue/30">
                    Featured Tool
                  </Badge>
                  <Badge variant="secondary" className="bg-muted text-text-secondary">
                    Most Popular
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Crypto Trading Simulator</h2>
                  <p className="text-text-secondary">
                    Practice trading with virtual funds in a realistic market environment. Test strategies,
                    analyze performance, and build confidence before trading with real money.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-sm text-text-secondary">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>Beginner Friendly</span>
                  </div>
                  <div className="flex items-center text-sm text-text-secondary">
                    <Wallet className="h-4 w-4 mr-1" />
                    <span>$10,000 Virtual Capital</span>
                  </div>
                  <div className="flex items-center text-sm text-text-secondary">
                    <Sparkles className="h-4 w-4 mr-1" />
                    <span>Real-time Market Data</span>
                  </div>
                </div>
                
                <div>
                  <Button className="bg-aurora-gradient" asChild>
                    <Link href="/simulations/trading-simulator">
                      Start Trading
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Right side background/image */}
              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-br from-aurora-blue/10 to-aurora-purple/20 backdrop-blur-sm">
                  {/* Decorative elements */}
                  <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-aurora-blue animate-pulse"></div>
                  <div className="absolute top-2/3 left-1/2 w-3 h-3 rounded-full bg-aurora-green animate-pulse"></div>
                  <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-aurora-purple animate-pulse"></div>
                </div>
                
                {/* Animated chart placeholder - in a real app you'd use a chart library */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="300" height="150" className="text-aurora-green opacity-50">
                    <path 
                      d="M0,75 Q50,25 100,75 T200,75 T300,75" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3"
                    />
                    <path 
                      d="M0,75 Q50,125 100,75 T200,75 T300,75" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeDasharray="5,5"
                    />
                    <circle cx="100" cy="75" r="4" fill="white" />
                    <circle cx="200" cy="75" r="4" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeCategory === null ? "default" : "outline"}
          onClick={() => setActiveCategory(null)}
        >
          All Tools
        </Button>
        
        {categories.map(category => (
          <Button 
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>
      
      {/* Simulations grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="space-card h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-aurora">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="h-10 w-10 rounded-full bg-surface flex items-center justify-center">
                    {tool.icon}
                  </div>
                  <div className="flex gap-2">
                    {tool.isNew && (
                      <Badge className="bg-aurora-purple/20 text-aurora-purple hover:bg-aurora-purple/30">
                        New
                      </Badge>
                    )}
                    {tool.isPopular && (
                      <Badge className="bg-aurora-green/20 text-aurora-green hover:bg-aurora-green/30">
                        Popular
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg mt-3">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-text-secondary">
                    <span className="font-medium">Difficulty:</span>
                    <span className="ml-1 capitalize">{tool.difficulty}</span>
                  </div>
                  <div className="flex items-center text-text-secondary">
                    <span className="font-medium">Time:</span>
                    <span className="ml-1">{tool.estimatedTime}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 mt-auto">
                <Button variant="ghost" className="text-aurora-blue w-full" asChild>
                  <Link href={`/simulations/${tool.id}`}>
                    Launch Tool
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Info card */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="h-16 w-16 rounded-full bg-surface flex items-center justify-center flex-shrink-0 border border-border">
            <Sparkles className="h-8 w-8 text-aurora-purple" />
          </div>
          
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg font-medium">Enhance Your Learning</h3>
            <p className="text-text-secondary">
              Our simulation tools are designed to help you practice and apply what you've learned in our courses.
              For the best experience, complete the related courses first.
            </p>
            <div className="pt-2">
              <Button variant="outline" asChild>
                <Link href="/courses">
                  Explore Courses
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
