'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Clock, 
  BookOpen, 
  BarChart3, 
  Settings, 
  GraduationCap, 
  Upload,
  CheckCircle,
  Star,
  Circle,
  PencilLine,
  Medal,
  Trophy,
  ArrowRight,
  FileText,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/auth-hook';

// Mock data for profile
const mockUserData = {
  id: 'user123',
  displayName: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  photoURL: null,
  joinDate: new Date(2023, 9, 15), // Oct 15, 2023
  completedCourses: 3,
  inProgressCourses: 2,
  achievements: [
    {
      id: 'ach1',
      title: 'First Course Completed',
      description: 'Completed your first course',
      icon: <CheckCircle />,
      date: new Date(2023, 10, 2),
      type: 'course'
    },
    {
      id: 'ach2',
      title: '5-Day Streak',
      description: 'Logged in for 5 consecutive days',
      icon: <Star />,
      date: new Date(2023, 10, 8),
      type: 'engagement'
    },
    {
      id: 'ach3',
      title: 'Trading Simulator',
      description: 'Executed your first simulated trade',
      icon: <Medal />,
      date: new Date(2023, 10, 15),
      type: 'simulation'
    },
    {
      id: 'ach4',
      title: 'Quiz Master',
      description: 'Scored 100% on 3 quizzes',
      icon: <Trophy />,
      date: new Date(2023, 11, 1),
      type: 'quiz'
    }
  ],
  recentActivity: [
    {
      id: 'act1',
      type: 'course_progress',
      description: 'Completed lesson "Introduction to Technical Analysis"',
      date: new Date(2023, 11, 28),
      course: 'Crypto Trading 101'
    },
    {
      id: 'act2',
      type: 'quiz_completed',
      description: 'Scored 85% on "Chart Patterns Quiz"',
      date: new Date(2023, 11, 27),
      course: 'Crypto Trading 101'
    },
    {
      id: 'act3',
      type: 'simulation',
      description: 'Made 6 trades in Trading Simulator',
      date: new Date(2023, 11, 26),
      simulation: 'Trading Simulator'
    },
    {
      id: 'act4',
      type: 'course_started',
      description: 'Started "DeFi Fundamentals" course',
      date: new Date(2023, 11, 25),
      course: 'DeFi Fundamentals'
    },
    {
      id: 'act5',
      type: 'note_created',
      description: 'Added notes to "Blockchain Basics" lesson',
      date: new Date(2023, 11, 24),
      course: 'Blockchain Fundamentals'
    }
  ],
  completedLessons: 24,
  totalLessons: 57,
  progress: 42, // percent
  learningStats: {
    totalHours: 18.5,
    quizzesCompleted: 12,
    simulationsRun: 8,
    certificatesEarned: 1
  },
  courses: [
    {
      id: 'course1',
      title: 'Crypto Trading 101',
      progress: 65,
      enrolled: new Date(2023, 10, 1),
      lastAccessed: new Date(2023, 11, 28),
      status: 'in_progress'
    },
    {
      id: 'course2',
      title: 'Blockchain Fundamentals',
      progress: 100,
      enrolled: new Date(2023, 9, 15),
      lastAccessed: new Date(2023, 10, 20),
      status: 'completed',
      certificateId: 'cert123'
    },
    {
      id: 'course3',
      title: 'Risk Management in Crypto',
      progress: 100,
      enrolled: new Date(2023, 8, 10),
      lastAccessed: new Date(2023, 9, 5),
      status: 'completed'
    },
    {
      id: 'course4',
      title: 'DeFi Fundamentals',
      progress: 25,
      enrolled: new Date(2023, 11, 25),
      lastAccessed: new Date(2023, 11, 25),
      status: 'in_progress'
    },
    {
      id: 'course5',
      title: 'NFT Creation and Marketing',
      progress: 100,
      enrolled: new Date(2023, 7, 15),
      lastAccessed: new Date(2023, 8, 20),
      status: 'completed'
    }
  ],
  certificates: [
    {
      id: 'cert123',
      title: 'Blockchain Fundamentals',
      issueDate: new Date(2023, 10, 20),
      courseId: 'course2'
    }
  ]
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real app, you would fetch this data from your backend
  const userData = {
    ...mockUserData,
    displayName: user?.displayName || mockUserData.displayName,
    email: user?.email || mockUserData.email,
    photoURL: user?.photoURL || mockUserData.photoURL,
  };
  
  // Format date string
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    
    if (diffInDays > 30) return formatDate(date);
    if (diffInDays > 1) return `${diffInDays} days ago`;
    if (diffInDays === 1) return 'Yesterday';
    if (diffInHours > 1) return `${diffInHours} hours ago`;
    if (diffInHours === 1) return '1 hour ago';
    if (diffInMinutes > 1) return `${diffInMinutes} minutes ago`;
    return 'Just now';
  };
  
  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-text-secondary">
            View and manage your profile, progress, and achievements
          </p>
        </motion.div>
      </div>
      
      {/* Profile header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile card */}
        <Card className="md:col-span-2 space-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-aurora-green">
                  <AvatarImage src={userData.photoURL || undefined} />
                  <AvatarFallback className="text-xl bg-muted">
                    {getInitials(userData.displayName)}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4 text-center sm:text-left flex-1">
                <div>
                  <h2 className="text-2xl font-bold">{userData.displayName}</h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-text-secondary">
                    <div className="flex items-center justify-center sm:justify-start">
                      <Mail className="h-4 w-4 mr-1" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Joined {formatDate(userData.joinDate)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center sm:justify-start items-center gap-3">
                  <Badge variant="aurora">Beginner</Badge>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-aurora-blue mr-1" />
                    <span>{userData.achievements.length} Achievements</span>
                  </div>
                </div>
                
                <div className="flex justify-center sm:justify-start gap-4">
                  <Button asChild>
                    <Link href="/profile/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Your Certificates
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Progress card */}
        <Card className="space-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Learning Progress</CardTitle>
            <CardDescription>Your overall course completion</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  {/* Circular progress indicator */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="8"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                    ></circle>
                    
                    {/* Progress circle */}
                    <circle
                      className="text-aurora-green stroke-current"
                      strokeWidth="8"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - userData.progress / 100)}`}
                      transform="rotate(-90 50 50)"
                    ></circle>
                  </svg>
                  
                  {/* Percentage text in center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{userData.progress}%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-text-secondary">
                  <span className="font-medium text-text-primary">{userData.completedLessons}</span> of {userData.totalLessons} lessons completed
                </div>
                <Progress value={userData.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-aurora-blue">{userData.completedCourses}</div>
                  <div className="text-xs text-text-secondary">Courses Completed</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-aurora-purple">{userData.inProgressCourses}</div>
                  <div className="text-xs text-text-secondary">Courses In Progress</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex gap-1">
            <User className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex gap-1">
            <BookOpen className="h-4 w-4" />
            <span>Courses</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex gap-1">
            <Award className="h-4 w-4" />
            <span>Achievements</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex gap-1">
            <Clock className="h-4 w-4" />
            <span>Activity</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Learning stats */}
            <Card className="space-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Learning Stats</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-aurora-green" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Study Hours</div>
                        <div className="text-xs text-text-muted">Total time spent learning</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold">{userData.learningStats.totalHours}</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <GraduationCap className="h-5 w-5 text-aurora-blue" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Quizzes</div>
                        <div className="text-xs text-text-muted">Quizzes completed</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold">{userData.learningStats.quizzesCompleted}</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <BarChart3 className="h-5 w-5 text-aurora-purple" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Simulations</div>
                        <div className="text-xs text-text-muted">Trading simulation runs</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold">{userData.learningStats.simulationsRun}</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <Award className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Certificates</div>
                        <div className="text-xs text-text-muted">Certificates earned</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold">{userData.learningStats.certificatesEarned}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Activity */}
            <Card className="space-card md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#" onClick={() => setActiveTab('activity')}>
                      View All
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {userData.recentActivity.slice(0, 4).map((activity) => (
                    <div key={activity.id} className="p-4 flex items-start gap-3">
                      <div className="mt-1">
                        {activity.type === 'course_progress' && (
                          <BookOpen className="h-5 w-5 text-aurora-green" />
                        )}
                        {activity.type === 'quiz_completed' && (
                          <CheckCircle className="h-5 w-5 text-aurora-blue" />
                        )}
                        {activity.type === 'simulation' && (
                          <BarChart3 className="h-5 w-5 text-aurora-purple" />
                        )}
                        {activity.type === 'course_started' && (
                          <GraduationCap className="h-5 w-5 text-amber-500" />
                        )}
                        {activity.type === 'note_created' && (
                          <PencilLine className="h-5 w-5 text-emerald-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          {activity.description}
                        </p>
                        <div className="flex items-center mt-1 text-xs text-text-muted">
                          <span>{formatRelativeTime(activity.date)}</span>
                          {activity.course && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{activity.course}</span>
                            </>
                          )}
                          {activity.simulation && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{activity.simulation}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Achievements and Certificates */}
            <Card className="space-card md:col-span-3">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Recent Achievements</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#" onClick={() => setActiveTab('achievements')}>
                      View All
                    </Link>
                  </Button>
                </div>
                <CardDescription>Your learning milestones and certificates</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {userData.achievements.slice(0, 4).map((achievement) => (
                    <Card key={achievement.id} className="space-card border-aurora-blue/20 overflow-hidden">
                      <div className="h-1 w-full bg-aurora-gradient"></div>
                      <CardContent className="p-4 text-center">
                        <div className="mx-auto my-4 h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center">
                          {React.cloneElement(achievement.icon, { className: 'h-6 w-6 text-aurora-blue' })}
                        </div>
                        <h3 className="font-semibold mb-1">{achievement.title}</h3>
                        <p className="text-xs text-text-secondary mb-2">{achievement.description}</p>
                        <div className="text-xs text-text-muted">
                          {formatDate(achievement.date)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Certificate showcase (if any) */}
            {userData.certificates.length > 0 && (
              <Card className="md:col-span-3 space-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Certificates</CardTitle>
                  <CardDescription>Showcase your achievements</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {userData.certificates.map(certificate => {
                      const course = userData.courses.find(c => c.id === certificate.courseId);
                      
                      return (
                        <div key={certificate.id} className="relative group">
                          {/* Certificate card with fancy border */}
                          <div className="absolute inset-0 rounded-lg bg-aurora-gradient blur opacity-50 group-hover:opacity-70 transition-opacity"></div>
                          <Card className="relative border-0 overflow-hidden">
                            <CardContent className="p-6 text-center">
                              <Trophy className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                              <h3 className="font-bold mb-1">{certificate.title}</h3>
                              <p className="text-sm text-text-secondary mb-3">
                                Issued on {formatDate(certificate.issueDate)}
                              </p>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-6">
          <Card className="space-card overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Courses</CardTitle>
              <CardDescription>Track your enrolled courses and progress</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {userData.courses.map((course) => (
                  <div key={course.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="font-semibold">{course.title}</h3>
                        {course.status === 'completed' && (
                          <Badge variant="aurora" className="ml-2">Completed</Badge>
                        )}
                        {course.status === 'in_progress' && (
                          <Badge variant="aurora-blue" className="ml-2">In Progress</Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-4 text-xs text-text-secondary">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Enrolled: {formatDate(course.enrolled)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Last accessed: {formatRelativeTime(course.lastAccessed)}</span>
                        </div>
                      </div>
                      
                      {course.status === 'in_progress' && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-1.5" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      {course.status === 'in_progress' && (
                        <Button size="sm" className="bg-aurora-gradient w-full sm:w-auto">
                          Continue Course
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                      
                      {course.status === 'completed' && (
                        <div className="flex gap-2 flex-col sm:flex-row">
                          {course.certificateId && (
                            <Button variant="outline" size="sm">
                              <Award className="h-4 w-4 mr-2" />
                              View Certificate
                            </Button>
                          )}
                          <Button variant="secondary" size="sm">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Review Materials
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-border p-4 flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/courses">
                  Explore More Courses
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-6">
          <Card className="space-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Achievements & Badges</CardTitle>
              <CardDescription>Milestones you've reached in your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userData.achievements.map((achievement) => (
                  <Card key={achievement.id} className="space-card border-aurora-blue/20 overflow-hidden">
                    <div className="h-1 w-full bg-aurora-gradient"></div>
                    <CardContent className="p-4 text-center">
                      <div className="mx-auto my-4 h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center">
                        {React.cloneElement(achievement.icon, { className: 'h-8 w-8 text-aurora-blue' })}
                      </div>
                      <h3 className="font-semibold mb-1">{achievement.title}</h3>
                      <p className="text-sm text-text-secondary mb-2">{achievement.description}</p>
                      <div className="flex justify-center items-center gap-2 text-xs text-text-muted">
                        <Badge variant={
                          achievement.type === 'course' ? 'aurora-green' : 
                          achievement.type === 'engagement' ? 'aurora-blue' : 
                          achievement.type === 'simulation' ? 'aurora-purple' : 
                          'secondary'
                        }>
                          {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                        </Badge>
                        <span>{formatDate(achievement.date)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Locked achievements */}
                <Card className="space-card border-dashed opacity-60">
                  <CardContent className="p-4 text-center">
                    <div className="mx-auto my-4 h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center">
                      <Circle className="h-8 w-8 text-text-muted" />
                    </div>
                    <h3 className="font-semibold mb-1">10-Day Streak</h3>
                    <p className="text-sm text-text-secondary mb-2">Log in for 10 consecutive days</p>
                    <div className="text-xs text-text-muted">
                      <Badge variant="outline">Locked</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="space-card border-dashed opacity-60">
                  <CardContent className="p-4 text-center">
                    <div className="mx-auto my-4 h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center">
                      <Circle className="h-8 w-8 text-text-muted" />
                    </div>
                    <h3 className="font-semibold mb-1">Portfolio Manager</h3>
                    <p className="text-sm text-text-secondary mb-2">Create a virtual portfolio with 5+ assets</p>
                    <div className="text-xs text-text-muted">
                      <Badge variant="outline">Locked</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          {/* Certificates section */}
          <Card className="space-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Certificates</CardTitle>
              <CardDescription>Proof of your course completions</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              {userData.certificates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userData.certificates.map(certificate => {
                    const course = userData.courses.find(c => c.id === certificate.courseId);
                    
                    return (
                      <div key={certificate.id} className="relative group">
                        {/* Certificate card with fancy border */}
                        <div className="absolute -inset-0.5 rounded-lg bg-aurora-gradient blur opacity-50 group-hover:opacity-70 transition-opacity"></div>
                        <Card className="relative border-0 overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <Trophy className="h-10 w-10 text-amber-500" />
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Share className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <h3 className="font-bold mb-1">{certificate.title}</h3>
                            <p className="text-sm text-text-secondary mb-6">
                              Successfully completed all required course material and assessments.
                            </p>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-text-muted">
                                Issued: {formatDate(certificate.issueDate)}
                              </span>
                              <Button variant="outline" size="sm">View</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-text-muted" />
                  </div>
                  <h3 className="font-semibold mb-2">No Certificates Yet</h3>
                  <p className="text-text-secondary max-w-sm mx-auto mb-6">
                    Complete courses to earn certificates that you can showcase on your profile or share with others.
                  </p>
                  <Button asChild>
                    <Link href="/courses">
                      Explore Courses
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-6">
          <Card className="space-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Activity Timeline</CardTitle>
              <CardDescription>Your recent learning activities</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-6">
                {Array.from(new Set(userData.recentActivity.map(activity => 
                  new Date(activity.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                ))).map(dateString => {
                  const activitiesOnDate = userData.recentActivity.filter(activity => 
                    new Date(activity.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) === dateString
                  );
                  
                  return (
                    <div key={dateString}>
                      <h3 className="font-medium text-sm mb-3">{dateString}</h3>
                      <div className="space-y-4 pl-4 border-l-2 border-border">
                        {activitiesOnDate.map(activity => (
                          <div key={activity.id} className="relative">
                            {/* Timeline dot */}
                            <div className="absolute w-3 h-3 rounded-full bg-surface border border-aurora-blue -left-[18px] top-1.5"></div>
                            
                            <div className="p-3 bg-muted/20 rounded-lg">
                              <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1 mr-3">
                                  {activity.type === 'course_progress' && (
                                    <div className="h-8 w-8 rounded-full bg-aurora-green/20 flex items-center justify-center">
                                      <BookOpen className="h-4 w-4 text-aurora-green" />
                                    </div>
                                  )}
                                  {activity.type === 'quiz_completed' && (
                                    <div className="h-8 w-8 rounded-full bg-aurora-blue/20 flex items-center justify-center">
                                      <CheckCircle className="h-4 w-4 text-aurora-blue" />
                                    </div>
                                  )}
                                  {activity.type === 'simulation' && (
                                    <div className="h-8 w-8 rounded-full bg-aurora-purple/20 flex items-center justify-center">
                                      <BarChart3 className="h-4 w-4 text-aurora-purple" />
                                    </div>
                                  )}
                                  {activity.type === 'course_started' && (
                                    <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                                      <GraduationCap className="h-4 w-4 text-amber-500" />
                                    </div>
                                  )}
                                  {activity.type === 'note_created' && (
                                    <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                      <PencilLine className="h-4 w-4 text-emerald-500" />
                                    </div>
                                  )}
                                </div>
                                
                                <div>
                                  <p className="font-medium">
                                    {activity.description}
                                  </p>
                                  <div className="mt-1 text-xs text-text-muted">
                                    <span>{new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    {activity.course && (
                                      <>
                                        <span className="mx-1">•</span>
                                        <span>{activity.course}</span>
                                      </>
                                    )}
                                    {activity.simulation && (
                                      <>
                                        <span className="mx-1">•</span>
                                        <span>{activity.simulation}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Import this separately to avoid linting errors since it's conditionally used
function Share(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
      <polyline points="16 6 12 2 8 6"></polyline>
      <line x1="12" y1="2" x2="12" y2="15"></line>
    </svg>
  )
}
