'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, 
  MessageSquare, 
  Sparkles, 
  HeartHandshake, 
  TrendingUp, 
  GraduationCap, 
  Bell,
  Calendar, 
  Search,
  BellRing,
  ThumbsUp,
  Rocket,
  Brain
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function CommunityPage() {
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
          <h1 className="text-3xl font-bold mb-2">Community</h1>
          <p className="text-text-secondary">
            Connect with fellow crypto enthusiasts, ask questions, and share insights
          </p>
        </motion.div>
      </div>
      
      {/* "Coming Soon" banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-lg border border-aurora-blue/30 bg-gradient-to-br from-surface to-surface/60"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-aurora-blue/10 blur-3xl rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-aurora-purple/10 blur-3xl rounded-full -ml-32 -mb-32"></div>
        
        <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="md:flex-1 text-center md:text-left">
            <Badge variant="aurora-blue" className="mb-4">Coming Soon</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Community & Trader Network
            </h2>
            <p className="text-text-secondary md:text-lg mb-6 max-w-2xl">
              We're building an interactive community where you can connect with other learners, ask questions, 
              share insights, and even find trading mentors. Be among the first to join when we launch!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {!emailSubscribed ? (
                <div className="flex max-w-md">
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="rounded-r-none"
                  />
                  <Button 
                    className="rounded-l-none bg-aurora-blue"
                    onClick={() => setEmailSubscribed(true)}
                  >
                    Get Notified
                  </Button>
                </div>
              ) : (
                <div className="bg-aurora-blue/20 text-aurora-blue p-3 rounded-md border border-aurora-blue/30 flex items-center">
                  <BellRing className="h-5 w-5 mr-2" />
                  <span>You'll be notified when we launch!</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <div className="relative w-64 h-64">
              {/* Illustrative community network visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center z-10 border-2 border-aurora-blue shadow-lg shadow-aurora-blue/20">
                  <Users className="h-10 w-10 text-aurora-blue" />
                </div>
              </div>
              
              {/* Orbit elements */}
              {[
                { icon: <MessageSquare className="h-6 w-6" />, delay: 0, color: 'bg-aurora-green', size: 'w-12 h-12' },
                { icon: <GraduationCap className="h-6 w-6" />, delay: 2, color: 'bg-aurora-blue', size: 'w-12 h-12' },
                { icon: <TrendingUp className="h-5 w-5" />, delay: 4, color: 'bg-aurora-purple', size: 'w-10 h-10' },
                { icon: <Sparkles className="h-5 w-5" />, delay: 6, color: 'bg-amber-500', size: 'w-10 h-10' },
                { icon: <HeartHandshake className="h-4 w-4" />, delay: 8, color: 'bg-emerald-500', size: 'w-8 h-8' },
              ].map((item, i) => (
                <div 
                  key={i}
                  className={`absolute rounded-full ${item.color} flex items-center justify-center border border-border animate-orbit z-0`}
                  style={{
                    width: '200px',
                    height: '200px',
                    opacity: 0.9,
                    animationDelay: `${item.delay}s`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className={`absolute ${item.size} rounded-full flex items-center justify-center bg-surface shadow-lg border border-border`}>
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Features preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-card">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-4 border border-aurora-green/30">
              <MessageSquare className="h-6 w-6 text-aurora-green" />
            </div>
            <CardTitle className="text-xl">Discussion Forums</CardTitle>
            <CardDescription>
              Ask questions, share insights, and engage in discussions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary mb-4">
              Participate in topic-based forums covering everything from beginner questions to advanced 
              trading strategies and market analysis.
            </p>
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">John Doe</div>
                    <div className="text-xs text-text-muted">2 hours ago</div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">
                  What's the best approach for dollar-cost averaging into Bitcoin? I'm new to crypto and trying to build a position...
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-text-muted flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" /> 12 replies
                  </span>
                  <span className="text-xs text-text-muted flex items-center">
                    <ThumbsUp className="h-3 w-3 mr-1" /> 24 likes
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" disabled>
              Browse Forums
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="space-card">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-4 border border-aurora-blue/30">
              <Rocket className="h-6 w-6 text-aurora-blue" />
            </div>
            <CardTitle className="text-xl">Trader Network</CardTitle>
            <CardDescription>
              Connect with experienced traders and mentors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary mb-4">
              Find and connect with traders who match your investment style, risk tolerance, and goals. 
              Learn from their strategies and insights.
            </p>
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Mark Anderson</div>
                    <div className="flex items-center">
                      <Badge variant="aurora" className="mr-2">Pro Trader</Badge>
                      <div className="text-xs text-text-muted">5+ years experience</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-3 text-sm">
                  <div className="text-text-secondary">
                    <div className="font-medium">39% YTD Return</div>
                    <div className="text-xs text-text-muted">Verified Performance</div>
                  </div>
                  <div className="text-text-secondary">
                    <div className="font-medium">127 Followers</div>
                    <div className="text-xs text-text-muted">Active Mentor</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" disabled>
              Explore Traders
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="space-card">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-4 border border-aurora-purple/30">
              <Brain className="h-6 w-6 text-aurora-purple" />
            </div>
            <CardTitle className="text-xl">AI Advisor</CardTitle>
            <CardDescription>
              Get instant answers to your crypto questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary mb-4">
              Our AI advisor uses advanced machine learning to provide instant answers to your questions,
              helping you learn faster and make better decisions.
            </p>
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-md">
                <div className="flex items-center mb-3">
                  <Search className="h-4 w-4 mr-2 text-text-muted" />
                  <div className="text-sm text-text-primary">How do hardware wallets work?</div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center mr-2 flex-shrink-0 border border-aurora-purple/30">
                    <Sparkles className="h-4 w-4 text-aurora-purple" />
                  </div>
                  <div className="text-sm text-text-secondary">
                    Hardware wallets are physical devices that store your private keys offline, keeping them safe from online threats. They...
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" disabled>
              Ask AI Advisor
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Event/Webinar preview */}
      <Card className="space-card">
        <CardHeader>
          <CardTitle className="text-xl">Upcoming Events & Webinars</CardTitle>
          <CardDescription>
            Live sessions with experts and community learning events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="p-6 md:col-span-2">
                <Badge variant="aurora-purple" className="mb-2">WEBINAR</Badge>
                <h3 className="text-lg font-semibold mb-2">Market Analysis: Navigating Crypto Cycles</h3>
                <p className="text-text-secondary mb-4">
                  Join our panel of experts as they discuss current market trends, key indicators to watch, 
                  and strategies for different market phases.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-sm text-text-muted">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Coming Soon</span>
                  </div>
                  <div className="flex items-center text-sm text-text-muted">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Limited spots</span>
                  </div>
                </div>
                <Button disabled>
                  Get Notified
                </Button>
              </div>
              <div className="bg-surface/60 p-6 flex flex-col justify-center items-center">
                <div className="w-24 h-24 rounded-full bg-surface flex items-center justify-center mb-4 border-2 border-aurora-purple/30">
                  <Calendar className="h-12 w-12 text-aurora-purple/70" />
                </div>
                <p className="text-center text-text-secondary">
                  A full calendar of events is coming soon!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Feedback form */}
      <Card className="space-card border-dashed">
        <CardHeader>
          <CardTitle className="text-xl">Help Shape Our Community</CardTitle>
          <CardDescription>
            We'd love to hear what features you'd like to see in our community platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-text-secondary">
                Your feedback will help us build a community that truly serves your needs. 
                What would you like to see in our community platform?
              </p>
              <div className="space-y-2">
                <label htmlFor="feedback" className="block text-sm font-medium">
                  Your Suggestions
                </label>
                <textarea 
                  id="feedback" 
                  rows={4} 
                  className="w-full rounded-md bg-muted border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-aurora-blue"
                  placeholder="Share your ideas for community features..."
                ></textarea>
              </div>
              <Button>
                Submit Feedback
              </Button>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Most Requested Features</h4>
              <div className="space-y-3">
                {[
                  { label: 'Live trading streams', votes: 158 },
                  { label: 'Expert Q&A sessions', votes: 127 },
                  { label: 'Community challenges', votes: 96 },
                  { label: 'Portfolio sharing', votes: 84 },
                  { label: 'Strategy discussion boards', votes: 76 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-muted/30 p-3 rounded-md">
                    <span>{item.label}</span>
                    <Badge variant="outline">{item.votes} votes</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
