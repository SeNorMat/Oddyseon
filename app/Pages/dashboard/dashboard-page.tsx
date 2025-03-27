'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, Target, Award, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/auth-hook';
import { formatDate } from '@/utils/utils-file';

// Mock data for dashboard
const mockCourses = [
  {
    id: '1',
    title: 'Crypto Trading 101',
    progress: 65,
    lastAccessed: new Date('2023-12-10'),
    lessons: 12,
    lessonsCompleted: 8,
  },
  {
    id: '2',
    title: 'DeFi Fundamentals',
    progress: 30,
    lastAccessed: new Date('2023-12-08'),
    lessons: 10,
    lessonsCompleted: 3,
  },
  {
    id: '3',
    title: 'Technical Analysis',
    progress: 15,
    lastAccessed: new Date('2023-12-05'),
    lessons: 8,
    lessonsCompleted: 1,
  },
];

const mockTasks = [
  {
    id: '1',
    title: 'Complete "Introduction to Blockchain" lesson',
    dueDate: new Date('2023-12-20'),
    priority: 'high',
    completed: false,
  },
  {
    id: '2',
    title: 'Practice trading simulation for 30 minutes',
    dueDate: new Date('2023-12-15'),
    priority: 'medium',
    completed: true,
  },
  {
    id: '3',
    title: 'Take quiz on cryptocurrency basics',
    dueDate: new Date('2023-12-18'),
    priority: 'medium',
    completed: false,
  },
  {
    id: '4',
    title: 'Review portfolio diversification strategies',
    dueDate: new Date('2023-12-22'),
    priority: 'low',
    completed: false,
  },
];

const mockNews = [
  {
    id: '1',
    title: 'New Course: NFT Marketplace Development',
    date: new Date('2023-12-11'),
    description: 'Learn how to build your own NFT marketplace with our latest course.',
    category: 'new-content',
  },
  {
    id: '2',
    title: 'Platform Update: Trading Simulator Improvements',
    date: new Date('2023-12-09'),
    description: 'We\'ve added new features to the trading simulator, including real-time market data.',
    category: 'update',
  },
  {
    id: '3',
    title: 'Market Alert: Bitcoin Volatility Increasing',
    date: new Date('2023-12-12'),
    description: 'Recent market movements suggest increased volatility in Bitcoin. Learn how to navigate this in our Risk Management course.',
    category: 'market',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(mockTasks);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    let timeGreeting = 'Hello';
    
    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 18) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';
    
    setGreeting(timeGreeting);
  }, []);

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    // First by completion status
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    
    // Then by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const priorityDiff = priorityOrder[a.priority as keyof typeof priorityOrder] - 
                         priorityOrder[b.priority as keyof typeof priorityOrder];
    if (priorityDiff !== 0) return priorityDiff;
    
    // Finally by due date
    return a.dueDate.getTime() - b.dueDate.getTime();
  });

  const renderTaskIcon = (priority: string) => {
    switch(priority) {
      case 'high': 
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'medium': 
        return <Clock className="h-4 w-4 text-warning" />;
      case 'low': 
        return <Target className="h-4 w-4 text-info" />;
      default: 
        return <Target className="h-4 w-4 text-text-muted" />;
    }
  };

  const getPriorityClass = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-info';
      default: return 'text-text-muted';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with welcome message */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            {greeting}, <span className="text-aurora-green">{user?.displayName || 'Explorer'}</span>
          </h1>
          <p className="text-text-secondary">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <Button variant="outline" size="sm" className="text-text-secondary">
            <Target className="mr-2 h-4 w-4" />
            Set Goals
          </Button>
          <Button size="sm" className="bg-aurora-gradient">
            <BookOpen className="mr-2 h-4 w-4" />
            Resume Learning
          </Button>
        </div>
      </div>
      
      {/* Main dashboard content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Learning Progress section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:col-span-2 space-y-6"
        >
          <Card className="space-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-xl font-bold">Your Learning Journey</CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </div>
              <Link href="/courses">
                <Button variant="ghost" size="sm" className="text-aurora-blue text-sm">
                  View All Courses
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCourses.map((course, index) => (
                  <div 
                    key={course.id} 
                    className="flex flex-col p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-text-muted">
                          {course.lessonsCompleted} of {course.lessons} lessons completed
                        </p>
                      </div>
                      <Link href={`/courses/${course.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={course.progress} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <div className="mt-2 text-xs text-text-muted">
                      Last accessed: {formatDate(course.lastAccessed)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-dashed">
                <BookOpen className="mr-2 h-4 w-4" />
                Discover New Courses
              </Button>
            </CardFooter>
          </Card>
          
          {/* News & Updates */}
          <Card className="space-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">News & Updates</CardTitle>
              <CardDescription>Latest platform and market news</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNews.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className={`
                      mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                      ${item.category === 'new-content' ? 'bg-aurora-green/20 text-aurora-green' : 
                        item.category === 'update' ? 'bg-aurora-blue/20 text-aurora-blue' : 
                        'bg-warning/20 text-warning'}
                    `}>
                      {item.category === 'new-content' ? 
                        <BookOpen className="h-4 w-4" /> : 
                        item.category === 'update' ? 
                        <TrendingUp className="h-4 w-4" /> : 
                        <AlertTriangle className="h-4 w-4" />
                      }
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <span className="text-xs text-text-muted">{formatDate(item.date)}</span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Sidebar sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Tasks */}
          <Card className="space-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Today's Tasks</CardTitle>
              <CardDescription>Your learning checklist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sortedTasks.map((task) => (
                  <div 
                    key={task.id}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      task.completed ? 'bg-muted/10 opacity-60' : 'hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center h-5 mt-0.5">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="h-4 w-4 rounded border-border text-aurora-green focus:ring-aurora-green"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {renderTaskIcon(task.priority)}
                        <span className={`text-xs font-medium ${getPriorityClass(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                      </div>
                      <p className={`mt-1 text-sm ${task.completed ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        Due: {formatDate(task.dueDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm" className="text-text-muted">
                Clear Completed
              </Button>
              <Button variant="outline" size="sm">
                Add Task
              </Button>
            </CardFooter>
          </Card>
          
          {/* Achievements */}
          <Card className="space-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Your Achievements</CardTitle>
              <CardDescription>Recent badges and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-aurora-green/20 flex items-center justify-center border border-aurora-green/40">
                      <Award className="h-6 w-6 text-aurora-green" />
                    </div>
                    <span className="text-xs text-text-secondary mt-2 text-center">First Lesson</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-aurora-blue/20 flex items-center justify-center border border-aurora-blue/40">
                      <Target className="h-6 w-6 text-aurora-blue" />
                    </div>
                    <span className="text-xs text-text-secondary mt-2 text-center">5-Day Streak</span>
                  </div>
                  <div className="flex flex-col items-center opacity-40">
                    <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center border border-muted">
                      <Award className="h-6 w-6 text-text-muted" />
                    </div>
                    <span className="text-xs text-text-muted mt-2 text-center">Locked</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-aurora-blue">
                View All Achievements
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
