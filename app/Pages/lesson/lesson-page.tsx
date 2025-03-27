'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  List, 
  X, 
  ChevronRight, 
  CheckCircle2, 
  Circle,
  PlayCircle,
  PauseCircle,
  Maximize2,
  Volume2,
  VolumeX,
  MessageSquareText,
  ThumbsUp,
  ThumbsDown,
  Settings,
  Download,
  Check,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/utils/utils-file';

// Mock lesson data
const getLessonData = (courseId: string, lessonId: string) => {
  // This would come from an API in a real app
  return {
    id: lessonId,
    courseId,
    title: 'Introduction to Technical Analysis',
    duration: '30 mins',
    description: 'Learn the fundamentals of technical analysis for cryptocurrency trading.',
    content: `
      <div class="prose prose-invert max-w-none">
        <h2>Welcome to Technical Analysis</h2>
        <p>Technical analysis is the study of past market data, primarily price and volume, to forecast future price movements. In this lesson, we'll cover the basic principles and tools used in technical analysis for cryptocurrency trading.</p>
        
        <h3>Key Principles of Technical Analysis</h3>
        <p>Before diving into specific patterns and indicators, it's important to understand the three fundamental principles that form the foundation of technical analysis:</p>
        
        <ol>
          <li><strong>Market Price Discounts Everything</strong> - This principle assumes that a cryptocurrency's current price reflects all available information, including fundamentals and market psychology.</li>
          <li><strong>Price Moves in Trends</strong> - Technical analysts believe that prices move in short, medium, and long-term trends rather than in random, erratic ways.</li>
          <li><strong>History Tends to Repeat Itself</strong> - Market patterns tend to repeat themselves over time, which is attributed to market psychology.</li>
        </ol>
        
        <h3>Getting Started with Chart Analysis</h3>
        <p>The first step in technical analysis is understanding the different types of charts and how to read them. The most common types include:</p>
        
        <ul>
          <li><strong>Line Charts</strong> - The simplest form, showing closing prices connected by a line</li>
          <li><strong>Bar Charts</strong> - Display open, high, low, and close (OHLC) prices</li>
          <li><strong>Candlestick Charts</strong> - Similar to bar charts but with a visual emphasis on the relationship between opening and closing prices</li>
        </ul>
        
        <p>Candlestick charts are the most popular among crypto traders due to their visual clarity and the amount of information they convey at a glance.</p>
        
        <h3>Understanding Support and Resistance</h3>
        <p>Support and resistance levels are price points where a cryptocurrency has historically had difficulty falling below (support) or rising above (resistance). These levels are key to identifying potential entry and exit points.</p>
        
        <p>Support and resistance can be horizontal lines or diagonal (as in trend lines). They form due to market psychology - traders remember price points where significant buying or selling occurred and often make similar decisions when those levels are approached again.</p>
        
        <h3>Common Technical Indicators</h3>
        <p>Technical indicators are mathematical calculations based on price, volume, or open interest. They help traders analyze past patterns and predict future movements. Some popular indicators include:</p>
        
        <ul>
          <li><strong>Moving Averages (MA)</strong> - Smooth out price data to identify trends</li>
          <li><strong>Relative Strength Index (RSI)</strong> - Measures the speed and change of price movements to identify overbought or oversold conditions</li>
          <li><strong>Moving Average Convergence Divergence (MACD)</strong> - Shows the relationship between two moving averages</li>
          <li><strong>Bollinger Bands</strong> - Indicate volatility by placing bands above and below a moving average</li>
        </ul>
        
        <h3>Practical Application</h3>
        <p>In the next lessons, we'll dive deeper into how to apply these concepts to real-world cryptocurrency trading. We'll explore specific patterns, practice reading charts, and learn how to use technical indicators to make informed trading decisions.</p>
        
        <h3>Key Takeaways</h3>
        <p>Remember these important points from today's lesson:</p>
        
        <ul>
          <li>Technical analysis is based on the study of market action through price charts</li>
          <li>The three fundamental principles are: market price discounts everything, price moves in trends, and history tends to repeat itself</li>
          <li>Candlestick charts provide the most comprehensive visual information for traders</li>
          <li>Support and resistance levels help identify key price points for potential trades</li>
          <li>Technical indicators can help confirm trends and provide additional insights</li>
        </ul>
      </div>
    `,
    videoUrl: 'https://example.com/video.mp4',
    hasVideo: true,
    hasQuiz: true,
    isCompleted: false,
    nextLesson: {
      id: 'lesson-3-3',
      title: 'Moving Averages and MACD',
    },
    prevLesson: {
      id: 'lesson-3-1',
      title: 'Support and Resistance Levels',
    },
    course: {
      title: 'Crypto Trading 101',
      progress: 65,
    },
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'Which of the following is NOT a fundamental principle of technical analysis?',
          options: [
            'Market price discounts everything',
            'Price moves in trends',
            'Past performance guarantees future results',
            'History tends to repeat itself',
          ],
          correctAnswer: 2,
        },
        {
          id: 'q2',
          question: 'Which chart type is most popular among cryptocurrency traders?',
          options: [
            'Line charts',
            'Bar charts',
            'Candlestick charts',
            'Point and figure charts',
          ],
          correctAnswer: 2,
        },
        {
          id: 'q3',
          question: 'What does the RSI indicator measure?',
          options: [
            'Volume of trades',
            'Speed and change of price movements',
            'Market capitalization',
            'Trading frequency',
          ],
          correctAnswer: 1,
        },
      ],
    },
    resources: [
      {
        title: 'Technical Analysis Cheat Sheet',
        description: 'A quick reference guide for all key technical analysis concepts.',
        type: 'pdf',
        url: '#',
      },
      {
        title: 'Candlestick Patterns Reference',
        description: 'Comprehensive guide to identifying and interpreting candlestick patterns.',
        type: 'pdf',
        url: '#',
      },
      {
        title: 'Chart Analysis Practice Problems',
        description: 'Additional exercises to practice identifying patterns and trends.',
        type: 'archive',
        url: '#',
      },
    ],
    module: {
      id: 'module-3',
      title: 'Chart Patterns and Indicators',
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'Support and Resistance Levels',
          duration: '24 mins',
          isCompleted: true,
          isLocked: false,
        },
        {
          id: 'lesson-3-2',
          title: 'Trend Lines and Channels',
          duration: '20 mins',
          isCompleted: false,
          isLocked: false,
          isCurrent: true,
        },
        {
          id: 'lesson-3-3',
          title: 'Moving Averages and MACD',
          duration: '26 mins',
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 'lesson-3-4',
          title: 'RSI, Stochastic, and Other Oscillators',
          duration: '22 mins',
          isCompleted: false,
          isLocked: false,
        },
      ],
    },
    otherModules: [
      {
        id: 'module-1',
        title: 'Getting Started with Cryptocurrency',
        lessonsCompleted: 3,
        totalLessons: 3,
      },
      {
        id: 'module-2',
        title: 'Trading Fundamentals',
        lessonsCompleted: 4,
        totalLessons: 4,
      },
      {
        id: 'module-3',
        title: 'Chart Patterns and Indicators',
        lessonsCompleted: 1,
        totalLessons: 4,
        isCurrent: true,
      },
      {
        id: 'module-4',
        title: 'Risk Management and Trading Psychology',
        lessonsCompleted: 0,
        totalLessons: 4,
        isLocked: true,
      },
    ],
  };
};

export default function LessonPage({ 
  params 
}: { 
  params: { courseId: string; lessonId: string } 
}) {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [videoFullscreen, setVideoFullscreen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  
  // Load lesson data
  useEffect(() => {
    const loadLesson = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch data from an API
        const data = getLessonData(params.courseId, params.lessonId);
        setLesson(data);
        setLessonCompleted(data.isCompleted);
        setQuizAnswers(new Array(data.quiz?.questions.length).fill(-1));
      } catch (error) {
        console.error('Failed to load lesson:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadLesson();
  }, [params.courseId, params.lessonId]);
  
  // Handle quiz answer selection
  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };
  
  // Handle quiz submission
  const handleQuizSubmit = () => {
    if (!lesson?.quiz) return;
    
    let correctAnswers = 0;
    lesson.quiz.questions.forEach((question: any, index: number) => {
      if (quizAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / lesson.quiz.questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
    
    // If score is passing, mark lesson as completed
    if (score >= 80 && !lessonCompleted) {
      setLessonCompleted(true);
      // In a real app, you would send this to an API
    }
  };
  
  // Complete lesson
  const completeLesson = () => {
    setLessonCompleted(true);
    // In a real app, you would send this to an API
  };
  
  // Navigate to the next lesson
  const goToNextLesson = () => {
    if (lesson?.nextLesson) {
      router.push(`/courses/${params.courseId}/lesson/${lesson.nextLesson.id}`);
    } else {
      // If no next lesson, go back to course page
      router.push(`/courses/${params.courseId}`);
    }
  };
  
  // Calculate overall course progress
  const calculateOverallProgress = () => {
    if (!lesson?.otherModules) return 0;
    
    const totalLessons = lesson.otherModules.reduce((total: number, module: any) => total + module.totalLessons, 0);
    const completedLessons = lesson.otherModules.reduce((total: number, module: any) => total + module.lessonsCompleted, 0);
    
    // Add current lesson if it's completed
    const adjustedCompleted = lessonCompleted ? completedLessons + 1 : completedLessons;
    
    return Math.round((adjustedCompleted / totalLessons) * 100);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-muted rounded-md"></div>
          <div className="h-64 w-full max-w-3xl bg-muted rounded-md"></div>
        </div>
      </div>
    );
  }
  
  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
        <p className="text-text-secondary mb-6">
          The lesson you're looking for doesn't exist or has been removed.
        </p>
        <Link href={`/courses/${params.courseId}`}>
          <Button>Back to Course</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navigation bar */}
      <div className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.push(`/courses/${params.courseId}`)}
              className="mr-2"
              aria-label="Back to course"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="hidden md:block">
              <h1 className="text-lg font-medium truncate max-w-md">
                {lesson.title}
              </h1>
              <p className="text-xs text-text-muted">
                {lesson.course.title}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center mr-4">
              <span className="text-sm text-text-secondary mr-3">Course Progress</span>
              <div className="w-48 mr-2">
                <Progress value={calculateOverallProgress()} className="h-2" />
              </div>
              <span className="text-sm font-medium">{calculateOverallProgress()}%</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <List className="h-4 w-4 mr-2" />
              Course Content
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle course content"
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content with sidebar */}
      <div className="flex-1 flex">
        {/* Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
        
        {/* Sidebar / Course Outline */}
        <motion.div
          className={cn(
            "fixed md:sticky top-16 h-[calc(100vh-4rem)] w-80 z-50 md:z-0 bg-surface border-r border-border overflow-y-auto",
            sidebarOpen ? "left-0" : "-left-80 md:left-0"
          )}
          initial={false}
          animate={{ x: sidebarOpen ? 0 : -320 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          {/* Sidebar header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-bold">Course Content</h2>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Module navigation */}
          <div className="space-y-4 p-2">
            {lesson.otherModules.map((module: any, moduleIndex: number) => (
              <div key={module.id} className="space-y-1">
                <div className={cn(
                  "flex items-center justify-between p-2 rounded-md",
                  module.isCurrent ? "bg-muted" : "hover:bg-muted/50",
                  module.isLocked && "opacity-60"
                )}>
                  <div>
                    <p className="font-medium">Module {moduleIndex + 1}: {module.title}</p>
                    <p className="text-xs text-text-muted">
                      {module.lessonsCompleted}/{module.totalLessons} lessons completed
                    </p>
                  </div>
                  {module.isLocked ? (
                    <Lock className="h-4 w-4 text-text-muted" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-text-muted" />
                  )}
                </div>
                
                {/* List lessons within current module */}
                {module.isCurrent && (
                  <div className="ml-4 space-y-1">
                    {lesson.module.lessons.map((moduleLesson: any) => (
                      <Link
                        key={moduleLesson.id}
                        href={moduleLesson.isLocked ? "#" : `/courses/${params.courseId}/lesson/${moduleLesson.id}`}
                        className={cn(
                          "flex items-center p-2 rounded-md text-sm",
                          moduleLesson.isCurrent ? "bg-muted/80 text-aurora-green font-medium" : "hover:bg-muted/50",
                          moduleLesson.isLocked && "opacity-60 cursor-not-allowed"
                        )}
                        onClick={(e) => {
                          if (moduleLesson.isLocked) e.preventDefault();
                        }}
                      >
                        <div className="mr-2 flex-shrink-0">
                          {moduleLesson.isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-aurora-green" />
                          ) : moduleLesson.isCurrent ? (
                            <PlayCircle className="h-4 w-4 text-aurora-green" />
                          ) : moduleLesson.isLocked ? (
                            <Lock className="h-4 w-4 text-text-muted" />
                          ) : (
                            <Circle className="h-4 w-4 text-text-muted" />
                          )}
                        </div>
                        <div className="flex-1 truncate">{moduleLesson.title}</div>
                        <div className="text-xs text-text-muted ml-2">{moduleLesson.duration}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Main content area */}
        <div className={cn(
          "flex-1 min-w-0 transition-all duration-300 ease-in-out",
          sidebarOpen ? "md:ml-80" : "ml-0"
        )}>
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            {/* Mobile title */}
            <div className="md:hidden mb-6">
              <h1 className="text-xl font-bold">
                {lesson.title}
              </h1>
              <p className="text-sm text-text-muted mt-1">
                {lesson.course.title}
              </p>
            </div>
            
            {/* Lesson tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="content">Lesson Content</TabsTrigger>
                {lesson.hasQuiz && <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>}
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="notes">My Notes</TabsTrigger>
              </TabsList>
              
              {/* Lesson content tab */}
              <TabsContent value="content" className="space-y-6">
                {/* Video player (if lesson has video) */}
                {lesson.hasVideo && (
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
                    {/* Video placeholder - in a real app, you would use a video player component */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-background/80 to-transparent">
                      {!videoPlaying ? (
                        <Button 
                          size="lg" 
                          className="bg-aurora-gradient rounded-full shadow-lg"
                          onClick={() => setVideoPlaying(true)}
                        >
                          <PlayCircle className="h-6 w-6 mr-2" />
                          Play Video
                        </Button>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="bg-background/50 backdrop-blur-sm rounded-full h-12 w-12"
                            onClick={() => setVideoPlaying(false)}
                          >
                            <PauseCircle className="h-6 w-6 text-white" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {/* Video controls */}
                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center px-4">
                      <div className="flex items-center w-full gap-4">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-white"
                          onClick={() => setVideoPlaying(!videoPlaying)}
                        >
                          {videoPlaying ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                        </Button>
                        
                        <div className="flex-1">
                          <Progress value={30} className="h-1.5" />
                        </div>
                        
                        <span className="text-xs text-white">10:25 / 30:00</span>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-white"
                          onClick={() => setVideoMuted(!videoMuted)}
                        >
                          {videoMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-white"
                          onClick={() => setVideoFullscreen(!videoFullscreen)}
                        >
                          <Maximize2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Lesson text content */}
                <div 
                  ref={contentRef}
                  className="prose prose-invert prose-headings:text-text-primary prose-p:text-text-secondary max-w-none prose-pre:bg-muted prose-pre:text-text-primary"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
                
                {/* Feedback and navigation */}
                <div className="pt-8 mt-8 border-t border-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Was this lesson helpful?</h3>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Yes, it was helpful
                        </Button>
                        <Button variant="outline" size="sm">
                          <ThumbsDown className="h-4 w-4 mr-2" />
                          No, needs improvement
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      {!lessonCompleted && (
                        <Button 
                          onClick={completeLesson}
                          className="bg-aurora-gradient"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Mark as Completed
                        </Button>
                      )}
                      
                      <div className="flex gap-3">
                        {lesson.prevLesson && (
                          <Button 
                            variant="outline"
                            onClick={() => router.push(`/courses/${params.courseId}/lesson/${lesson.prevLesson.id}`)}
                          >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Previous Lesson
                          </Button>
                        )}
                        
                        {lesson.nextLesson && (
                          <Button 
                            onClick={() => {
                              if (lessonCompleted) {
                                goToNextLesson();
                              } else {
                                // Prompt to complete lesson first
                                completeLesson();
                                setTimeout(goToNextLesson, 500);
                              }
                            }}
                          >
                            Next Lesson
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Practice quiz tab */}
              <TabsContent value="quiz" className="space-y-8">
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h2 className="text-xl font-bold mb-2">Practice Quiz: {lesson.title}</h2>
                  <p className="text-text-secondary mb-6">
                    Test your understanding of this lesson by answering the following questions.
                  </p>
                  
                  {!quizSubmitted ? (
                    <>
                      <div className="space-y-8">
                        {lesson.quiz.questions.map((question: any, qIndex: number) => (
                          <div key={question.id} className="space-y-4">
                            <h3 className="font-medium">
                              {qIndex + 1}. {question.question}
                            </h3>
                            <div className="space-y-2">
                              {question.options.map((option: string, oIndex: number) => (
                                <div 
                                  key={oIndex} 
                                  className={cn(
                                    "flex items-center p-3 rounded-md border border-border hover:bg-muted/50 cursor-pointer transition-colors",
                                    quizAnswers[qIndex] === oIndex && "bg-muted border-aurora-blue"
                                  )}
                                  onClick={() => handleAnswerSelect(qIndex, oIndex)}
                                >
                                  <div className={cn(
                                    "w-5 h-5 rounded-full border border-border mr-3 flex items-center justify-center",
                                    quizAnswers[qIndex] === oIndex && "border-aurora-blue"
                                  )}>
                                    {quizAnswers[qIndex] === oIndex && (
                                      <div className="w-3 h-3 rounded-full bg-aurora-blue"></div>
                                    )}
                                  </div>
                                  <span>{option}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-end">
                        <Button 
                          className="bg-aurora-gradient"
                          disabled={quizAnswers.some(answer => answer === -1)}
                          onClick={handleQuizSubmit}
                        >
                          Submit Answers
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-muted/50 p-6 rounded-lg text-center">
                        <h3 className="text-xl font-bold mb-2">Quiz Results</h3>
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface border-4 border-aurora-blue mb-4">
                          <span className="text-2xl font-bold text-aurora-blue">{quizScore}%</span>
                        </div>
                        <p className="text-text-secondary">
                          {quizScore >= 80 
                            ? 'Great job! You have a good understanding of this material.' 
                            : 'You might want to review the lesson material again.'}
                        </p>
                      </div>
                      
                      <div className="space-y-8">
                        {lesson.quiz.questions.map((question: any, qIndex: number) => {
                          const isCorrect = quizAnswers[qIndex] === question.correctAnswer;
                          
                          return (
                            <div key={question.id} className="space-y-4">
                              <h3 className="font-medium flex items-center">
                                {qIndex + 1}. {question.question}
                                {isCorrect ? (
                                  <Badge className="ml-2 bg-green-500/20 text-green-500 hover:bg-green-500/30">
                                    Correct
                                  </Badge>
                                ) : (
                                  <Badge className="ml-2 bg-red-500/20 text-red-500 hover:bg-red-500/30">
                                    Incorrect
                                  </Badge>
                                )}
                              </h3>
                              <div className="space-y-2">
                                {question.options.map((option: string, oIndex: number) => (
                                  <div 
                                    key={oIndex} 
                                    className={cn(
                                      "flex items-center p-3 rounded-md border",
                                      oIndex === question.correctAnswer && "bg-green-500/10 border-green-500/30",
                                      quizAnswers[qIndex] === oIndex && oIndex !== question.correctAnswer && "bg-red-500/10 border-red-500/30"
                                    )}
                                  >
                                    <div className={cn(
                                      "w-5 h-5 rounded-full border mr-3 flex items-center justify-center",
                                      oIndex === question.correctAnswer ? "border-green-500" : 
                                      quizAnswers[qIndex] === oIndex ? "border-red-500" : "border-border"
                                    )}>
                                      {oIndex === question.correctAnswer && (
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                      )}
                                      {quizAnswers[qIndex] === oIndex && oIndex !== question.correctAnswer && (
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                      )}
                                    </div>
                                    <span>{option}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="flex justify-between mt-8">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setQuizSubmitted(false);
                            setQuizAnswers(new Array(lesson.quiz?.questions.length).fill(-1));
                          }}
                        >
                          Try Again
                        </Button>
                        
                        <Button
                          className="bg-aurora-gradient"
                          onClick={() => {
                            setActiveTab('content');
                            if (quizScore >= 80) {
                              setLessonCompleted(true);
                            }
                          }}
                        >
                          Continue Learning
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Resources tab */}
              <TabsContent value="resources" className="space-y-6">
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h2 className="text-xl font-bold mb-2">Lesson Resources</h2>
                  <p className="text-text-secondary mb-6">
                    Download these resources to enhance your learning experience.
                  </p>
                  
                  <div className="space-y-4">
                    {lesson.resources.map((resource: any) => (
                      <Card key={resource.title} className="space-card overflow-hidden">
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{resource.title}</h3>
                            <p className="text-sm text-text-secondary mt-1">{resource.description}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Notes tab */}
              <TabsContent value="notes" className="space-y-6">
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h2 className="text-xl font-bold mb-2">My Notes</h2>
                  <p className="text-text-secondary mb-6">
                    Take notes while studying this lesson. Your notes are saved automatically.
                  </p>
                  
                  <div className="space-y-4">
                    <textarea
                      className="w-full h-64 bg-muted border border-border rounded-lg p-4 text-text-primary resize-none focus:outline-none focus:ring-1 focus:ring-aurora-blue"
                      placeholder="Start typing your notes here..."
                    />
                    
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Format
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                      
                      <Button size="sm" className="bg-aurora-blue hover:bg-aurora-blue/90">
                        Save Notes
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Discussion section */}
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Discussion</h2>
                <Button>
                  <MessageSquareText className="h-4 w-4 mr-2" />
                  Ask a Question
                </Button>
              </div>
              
              <Card className="space-card mb-6">
                <CardContent className="p-6">
                  <p className="text-center text-text-secondary py-10">
                    Join the discussion by asking a question or sharing your insights about this lesson.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
