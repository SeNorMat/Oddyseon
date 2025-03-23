'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Rocket, 
  Users, 
  ArrowUpRight, 
  ChevronRight, 
  Shield, 
  Trophy, 
  BarChart3, 
  LineChart,
  TrendingUp,
  Star,
  Clock,
  AlertCircle,
  DollarSign,
  BellRing,
  Sparkles,
  Filter,
  Search,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for trending traders
const trendingTraders = [
  {
    id: 'trader1',
    name: 'Alex Morgan',
    avatar: null,
    title: 'Crypto Analyst',
    specialty: 'Long-term Position Trading',
    returnRate: 34.8,
    followers: 1245,
    performanceScore: 89,
    riskLevel: 'Moderate',
    verified: true,
  },
  {
    id: 'trader2',
    name: 'Sarah Chen',
    avatar: null,
    title: 'DeFi Specialist',
    specialty: 'Yield Farming Strategies',
    returnRate: 28.5,
    followers: 872,
    performanceScore: 85,
    riskLevel: 'Low',
    verified: true,
  },
  {
    id: 'trader3',
    name: 'Michael Johnson',
    avatar: null,
    title: 'Technical Analyst',
    specialty: 'Swing Trading',
    returnRate: 42.6,
    followers: 965,
    performanceScore: 91,
    riskLevel: 'High',
    verified: true,
  },
  {
    id: 'trader4',
    name: 'Emma Williams',
    avatar: null,
    title: 'Altcoin Researcher',
    specialty: 'Emerging Projects',
    returnRate: 56.4,
    followers: 728,
    performanceScore: 88,
    riskLevel: 'Very High',
    verified: true,
  },
];

export default function TraderHubPage() {
  const [activeTab, setActiveTab] = useState('discover');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-2">Trader Hub (ODEX)</h1>
          <p className="text-text-secondary">
            Connect with expert traders, learn from their strategies, and boost your crypto portfolio
          </p>
        </motion.div>
      </div>
      
      {/* "Coming Soon" banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-aurora-purple/30 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left content */}
              <div className="p-8 md:p-10 relative">
                <div className="absolute top-0 left-0 w-32 h-32 bg-aurora-purple/10 blur-2xl rounded-full"></div>
                <div className="relative">
                  <Badge variant="aurora-purple" className="mb-4">Coming Soon</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Trader Marketplace
                  </h2>
                  <p className="text-text-secondary md:text-lg mb-6 max-w-lg">
                    We're building a revolutionary marketplace where investors can connect with verified 
                    traders, learn from their strategies, and potentially allocate capital for managed positions.
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 text-aurora-purple mr-3 mt-0.5" />
                      <span className="text-text-secondary">Verified trader profiles with track records</span>
                    </li>
                    <li className="flex items-start">
                      <Trophy className="h-5 w-5 text-aurora-purple mr-3 mt-0.5" />
                      <span className="text-text-secondary">Performance-based trader ranking system</span>
                    </li>
                    <li className="flex items-start">
                      <BarChart3 className="h-5 w-5 text-aurora-purple mr-3 mt-0.5" />
                      <span className="text-text-secondary">Risk-adjusted return metrics for better decisions</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    {!emailSubscribed ? (
                      <div className="flex max-w-md">
                        <Input 
                          type="email" 
                          placeholder="Your email address" 
                          className="rounded-r-none"
                        />
                        <Button 
                          className="rounded-l-none bg-aurora-purple hover:bg-aurora-purple/90"
                          onClick={() => setEmailSubscribed(true)}
                        >
                          Get Early Access
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-aurora-purple/20 text-aurora-purple p-3 rounded-md border border-aurora-purple/30 flex items-center">
                        <BellRing className="h-5 w-5 mr-2" />
                        <span>You'll get early access when we launch!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right side illustration */}
              <div className="bg-surface/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-bl from-aurora-purple/5 to-transparent"></div>
                
                {/* Decorative elements */}
                <div className="absolute top-10 right-10 w-16 h-16 rounded-lg border border-aurora-purple/30 flex items-center justify-center rotate-12 bg-surface">
                  <Rocket className="h-8 w-8 text-aurora-purple" />
                </div>
                
                <div className="absolute bottom-10 left-10 w-20 h-20 rounded-lg border border-aurora-purple/30 flex items-center justify-center -rotate-12 bg-surface">
                  <LineChart className="h-10 w-10 text-aurora-purple" />
                </div>
                
                {/* Chart lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="300" height="200" viewBox="0 0 300 200" className="opacity-30">
                    <path 
                      d="M0,100 Q75,50 150,100 T300,100" 
                      fill="none" 
                      stroke="#8D00C4" 
                      strokeWidth="3"
                    />
                    <path 
                      d="M0,150 Q75,100 150,150 T300,150" 
                      fill="none" 
                      stroke="#00EA8D" 
                      strokeWidth="3" 
                      strokeDasharray="5,5"
                    />
                    <path 
                      d="M0,50 Q75,100 150,50 T300,50" 
                      fill="none" 
                      stroke="#14E81E" 
                      strokeWidth="3" 
                      strokeDasharray="10,5"
                    />
                  </svg>
                </div>
                
                {/* Floating stats cards */}
                <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-surface p-2 rounded-md border border-aurora-purple/20 shadow-lg shadow-aurora-purple/5 w-32">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-text-muted">ROI</div>
                    <div className="text-sm font-bold text-aurora-green flex items-center">
                      +24.5% <TrendingUp className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2 bg-surface p-2 rounded-md border border-aurora-blue/20 shadow-lg shadow-aurora-blue/5 w-32">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-text-muted">Risk</div>
                    <div className="text-sm font-bold text-aurora-blue">
                      Moderate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Tabs for preview features */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="discover" className="flex gap-1">
            <Sparkles className="h-4 w-4" />
            <span>Discover Traders</span>
          </TabsTrigger>
          <TabsTrigger value="how" className="flex gap-1">
            <Shield className="h-4 w-4" />
            <span>How It Works</span>
          </TabsTrigger>
          <TabsTrigger value="benefits" className="flex gap-1">
            <Star className="h-4 w-4" />
            <span>Benefits</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discover" className="space-y-6">
          {/* Search and filters (preview) */}
          <Card className="space-card">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-4 w-4" />
                  <Input placeholder="Search traders by name or specialty" className="pl-10" disabled />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" disabled>
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <div className="relative">
                    <Button variant="outline" disabled>
                      <span>Sort By: Performance</span>
                      <ChevronRight className="h-4 w-4 ml-2 rotate-90" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-xl font-bold mt-6 mb-4">Trending Traders (Preview)</h2>
          
          {/* Trader cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingTraders.map((trader) => (
              <Card key={trader.id} className="space-card border-border hover:border-aurora-purple/30 hover:shadow-aurora-purple/5 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex flex-col items-center text-center mb-4">
                    <Avatar className="h-16 w-16 mb-3">
                      <AvatarFallback className="bg-muted text-lg font-bold">
                        {trader.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="font-bold text-lg flex items-center justify-center">
                        {trader.name}
                        {trader.verified && (
                          <Badge className="ml-2 bg-aurora-blue/20 text-aurora-blue">
                            Verified
                          </Badge>
                        )}
                      </h3>
                      <p className="text-text-secondary text-sm">{trader.title}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="text-text-secondary text-sm">Specialty</div>
                      <div className="font-medium">{trader.specialty}</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-text-secondary text-sm">1Y Return</div>
                      <div className="font-medium text-aurora-green">{trader.returnRate}%</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-text-secondary text-sm">Followers</div>
                      <div className="font-medium">{trader.followers.toLocaleString()}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Performance Score</span>
                        <span className="font-medium">{trader.performanceScore}/100</span>
                      </div>
                      <Progress value={trader.performanceScore} className="h-1.5" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-text-secondary text-sm">Risk Level</div>
                      <Badge variant="outline" className={
                        trader.riskLevel === 'Low' ? 'text-green-500' :
                        trader.riskLevel === 'Moderate' ? 'text-amber-500' :
                        trader.riskLevel === 'High' ? 'text-orange-500' :
                        'text-red-500'
                      }>
                        {trader.riskLevel}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <Button 
                      className="w-full bg-aurora-gradient hover:shadow-aurora" 
                      size="sm"
                      disabled
                    >
                      View Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="sm"
                      disabled
                    >
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <Button variant="outline" disabled>
              <Lock className="h-4 w-4 mr-2" />
              More Traders Coming Soon
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="how" className="space-y-6">
          <Card className="space-card overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-2 p-8">
                  <h2 className="text-2xl font-bold mb-6">How ODEX Works</h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-aurora-purple/20 text-aurora-purple font-bold mr-4 mt-1">
                        1
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Trader Verification</h3>
                        <p className="text-text-secondary">
                          We rigorously verify traders before they join the platform. This includes 
                          background checks, performance verification, and risk assessments to ensure 
                          you're connecting with legitimate professionals.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-aurora-purple/20 text-aurora-purple font-bold mr-4 mt-1">
                        2
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Find and Connect</h3>
                        <p className="text-text-secondary">
                          Browse trader profiles based on performance metrics, risk level, trading 
                          style, and specialty. You can follow traders to learn from their insights
                          before deciding to connect further.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-aurora-purple/20 text-aurora-purple font-bold mr-4 mt-1">
                        3
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Secure Engagement</h3>
                        <p className="text-text-secondary">
                          When you're ready, you can establish a connection with a trader through our 
                          secure platform. All communications and potential capital allocations are 
                          protected by industry-leading security measures.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-aurora-purple/20 text-aurora-purple font-bold mr-4 mt-1">
                        4
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Track and Evaluate</h3>
                        <p className="text-text-secondary">
                          Monitor performance in real-time with transparent metrics and reporting. 
                          Our platform makes it easy to track progress and make informed decisions 
                          about your connections.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-8 flex flex-col justify-center">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Safety First</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-aurora-purple mr-3 mt-0.5" />
                        <p className="text-text-secondary text-sm">
                          All traders undergo thorough background and credential verification
                        </p>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-aurora-purple mr-3 mt-0.5" />
                        <p className="text-text-secondary text-sm">
                          Performance metrics are verified and audited regularly
                        </p>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-aurora-purple mr-3 mt-0.5" />
                        <p className="text-text-secondary text-sm">
                          Secure and transparent communication channels
                        </p>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-aurora-purple mr-3 mt-0.5" />
                        <p className="text-text-secondary text-sm">
                          Funds remain under your control with secure escrow options
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 border border-dashed border-aurora-purple/30 rounded-lg bg-surface">
                    <Lock className="h-8 w-8 text-aurora-purple mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Enterprise-Grade Security</h4>
                    <p className="text-sm text-text-secondary">
                      Our platform employs bank-level encryption and security protocols to keep your information and assets safe.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="benefits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="space-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 text-aurora-green mr-2" />
                  For Investors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Access Expert Knowledge</h3>
                  <p className="text-sm text-text-secondary">
                    Learn from professional traders with proven track records and gain insights into successful strategies.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Transparent Performance</h3>
                  <p className="text-sm text-text-secondary">
                    See verified performance metrics and risk assessments to make informed decisions.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Portfolio Diversification</h3>
                  <p className="text-sm text-text-secondary">
                    Connect with multiple traders with different strategies and risk profiles.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Educational Opportunity</h3>
                  <p className="text-sm text-text-secondary">
                    Develop your own trading skills by learning from professionals in real-time.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="space-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 text-aurora-blue mr-2" />
                  For Traders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Build Your Brand</h3>
                  <p className="text-sm text-text-secondary">
                    Create a professional profile showcasing your expertise, strategy, and performance history.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Connect With Capital</h3>
                  <p className="text-sm text-text-secondary">
                    Gain access to investors looking for skilled traders to learn from or potentially allocate funds to.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Performance Verification</h3>
                  <p className="text-sm text-text-secondary">
                    Get your trading performance verified, building trust and credibility with potential connections.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Revenue Opportunities</h3>
                  <p className="text-sm text-text-secondary">
                    Earn through educational content, mentorship, and potential performance-based incentives.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="space-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 text-aurora-purple mr-2" />
                  Platform Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Rigorous Verification</h3>
                  <p className="text-sm text-text-secondary">
                    All traders undergo thorough background checks and performance verification.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Performance Analytics</h3>
                  <p className="text-sm text-text-secondary">
                    Detailed metrics including risk-adjusted returns, drawdowns, and consistency scores.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Secure Messaging</h3>
                  <p className="text-sm text-text-secondary">
                    Encrypted communication channels between investors and traders.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Educational Resources</h3>
                  <p className="text-sm text-text-secondary">
                    Webinars, articles, and tutorials to help both investors and traders succeed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="space-card">
            <CardHeader>
              <CardTitle>Join ODEX Early Access</CardTitle>
              <CardDescription>
                Be among the first to experience the Odysseon Trader Network when we launch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Early Access Benefits</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-amber-500 mr-2" />
                      <span>Exclusive first access to the platform</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-aurora-green mr-2" />
                      <span>Special introductory rates and incentives</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-aurora-blue mr-2" />
                      <span>Priority connections with top traders</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-aurora-purple mr-2" />
                      <span>Early input into platform development</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  {!emailSubscribed ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Reserve Your Spot</h3>
                      <p className="text-text-secondary">
                        Enter your email to join our early access waitlist. We'll notify you as soon as the platform is ready.
                      </p>
                      <div className="flex flex-col space-y-2">
                        <Input 
                          type="email" 
                          placeholder="Your email address" 
                        />
                        <Button 
                          className="w-full bg-aurora-gradient"
                          onClick={() => setEmailSubscribed(true)}
                        >
                          Join Early Access
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center space-y-4 border border-aurora-green/30 rounded-lg bg-aurora-green/10">
                      <div className="mx-auto w-16 h-16 rounded-full bg-surface flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-aurora-green" />
                      </div>
                      <h3 className="text-xl font-bold text-aurora-green">You're on the list!</h3>
                      <p className="text-text-secondary">
                        Thank you for your interest in ODEX. We'll contact you soon with early access details.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
