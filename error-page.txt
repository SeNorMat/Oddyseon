'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  // Add stars to the background (purely decorative)
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'absolute rounded-full bg-white opacity-70';
      
      // Random size between 1-3px
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Add animation
      star.style.animation = `pulse ${3 + Math.random() * 4}s infinite alternate`;
      
      // Add shadow for the glow effect
      star.style.boxShadow = '0 0 4px 1px rgba(255, 255, 255, 0.5)';
      
      document.getElementById('stars-container')?.appendChild(star);
    };
    
    // Create stars
    for (let i = 0; i < 50; i++) {
      createStar();
    }
    
    // Cleanup
    return () => {
      const container = document.getElementById('stars-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4">
      {/* Stars background */}
      <div id="stars-container" className="fixed inset-0 -z-10"></div>
      
      {/* Aurora glow effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute w-full h-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle at 70% 30%, rgba(20, 232, 30, 0.4), transparent 40%), radial-gradient(circle at 30% 60%, rgba(0, 234, 141, 0.4), transparent 40%), radial-gradient(circle at 50% 50%, rgba(141, 0, 196, 0.4), transparent 50%)'
          }}
        ></div>
      </div>
      
      <div className="container max-w-5xl mx-auto">
        <div className="text-center space-y-8">
          {/* Logo */}
          <Link href="/" className="inline-block mb-12">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-aurora-gradient">
              Odysseon
            </h1>
          </Link>
          
          {/* 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mb-6"
          >
            <h2 className="text-[150px] md:text-[200px] font-bold leading-none">
              <span className="text-aurora-green">4</span>
              <span className="text-aurora-blue">0</span>
              <span className="text-aurora-purple">4</span>
            </h2>
          </motion.div>
          
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl md:text-3xl font-bold">Page Not Found</h3>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              The page you're looking for may have been moved, deleted, or possibly never existed.
              Let's get you back on your journey.
            </p>
          </motion.div>
          
          {/* Planet illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative py-8 flex justify-center"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              {/* Planet */}
              <div className="absolute inset-0 rounded-full animate-float" 
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #1B2230, #0B0F19)',
                  boxShadow: '0 0 30px rgba(0, 234, 141, 0.3), inset 0 0 20px rgba(20, 232, 30, 0.2)'
                }}
              ></div>
              
              {/* Orbit ring */}
              <div className="absolute inset-0 rounded-full border border-aurora-blue/30 animate-spin"
                style={{ 
                  borderRadius: '100%', 
                  transform: 'rotateX(70deg)',
                  animationDuration: '20s'
                }} 
              ></div>
              
              {/* Small moon */}
              <div className="absolute w-6 h-6 rounded-full bg-aurora-green/80 animate-float"
                style={{ 
                  top: '15%', 
                  left: '15%',
                  boxShadow: '0 0 15px rgba(20, 232, 30, 0.7)',
                  animationDelay: '-2s'
                }} 
              ></div>
            </div>
          </motion.div>
          
          {/* Navigation options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/courses">
                Explore Courses
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="group">
              <Search className="mr-2 h-4 w-4 group-hover:text-aurora-green transition-colors" />
              Search
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-4 text-center text-text-muted text-sm">
        <p>© {new Date().getFullYear()} Odysseon. All rights reserved.</p>
      </div>
      
      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-orbit {
          animation: orbit 20s linear infinite;
        }
        
        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
