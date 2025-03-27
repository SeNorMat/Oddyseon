'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, LineChart, Users } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Add stars to background
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
  }));

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white opacity-70"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.5)',
            animation: `pulse ${3 + star.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* Navigation bar */}
      <header className="w-full p-4 z-10">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-aurora-gradient">
              Odysseon
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-text-primary">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-aurora-gradient hover:shadow-aurora transition-shadow">
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero section */}
      <section className="flex-1 container mx-auto flex flex-col md:flex-row items-center justify-center px-4 py-12 z-10">
        <div className="md:w-1/2 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            Master Crypto <span className="text-aurora-green">Trading</span> & 
            <span className="text-aurora-blue"> Finance</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary mb-8"
          >
            Learn cryptocurrency trading skills and financial literacy through interactive lessons, simulations, and expert guidance.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Button 
              size="lg" 
              className="bg-aurora-gradient hover:shadow-aurora text-white font-semibold"
              onClick={() => router.push('/register')}
            >
              Start Your Journey <ChevronRight className="ml-2" size={18} />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => router.push('/courses')}
            >
              Browse Courses
            </Button>
          </motion.div>
        </div>
        
        {/* 3D floating planet/sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:w-1/2 flex justify-center mt-12 md:mt-0"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Main orb */}
            <div className="absolute inset-0 rounded-full bg-surface border border-border animate-float" 
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(27, 34, 48, 0.8), rgba(11, 15, 25, 1))',
                boxShadow: '0 0 80px rgba(0, 234, 141, 0.3), inset 0 0 40px rgba(20, 232, 30, 0.2)'
              }}
            />
            
            {/* Orbit rings */}
            <div className="absolute inset-0 rounded-full border border-aurora-blue/20 animate-spin"
              style={{ 
                borderRadius: '100%', 
                transformStyle: 'preserve-3d',
                transform: 'rotateX(80deg)',
                animationDuration: '20s'
              }} 
            />
            <div className="absolute inset-0 rounded-full border border-aurora-green/30 animate-spin"
              style={{ 
                borderRadius: '100%', 
                transformStyle: 'preserve-3d',
                transform: 'rotateX(70deg) rotateY(20deg)',
                width: '110%',
                height: '110%',
                top: '-5%',
                left: '-5%',
                animationDuration: '15s'
              }} 
            />
            
            {/* Small moons/satellites */}
            <div className="absolute w-6 h-6 rounded-full bg-aurora-green animate-float"
              style={{ 
                top: '10%', 
                left: '15%',
                boxShadow: '0 0 15px rgba(20, 232, 30, 0.7)',
                animationDelay: '-2s'
              }} 
            />
            <div className="absolute w-4 h-4 rounded-full bg-aurora-blue animate-float"
              style={{ 
                bottom: '20%', 
                right: '15%',
                boxShadow: '0 0 15px rgba(0, 234, 141, 0.7)',
                animationDelay: '-1s'
              }} 
            />
            <div className="absolute w-3 h-3 rounded-full bg-aurora-purple animate-float"
              style={{ 
                top: '60%', 
                right: '20%',
                boxShadow: '0 0 15px rgba(141, 0, 196, 0.7)',
                animationDelay: '-3s'
              }} 
            />
          </div>
        </motion.div>
      </section>

      {/* Features section */}
      <section className="container mx-auto px-4 py-16 z-10">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Odysseon</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-card p-6"
          >
            <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-4 border border-aurora-green/50">
              <BookOpen size={24} className="text-aurora-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
            <p className="text-text-secondary">
              Engage with dynamic courses, quizzes, and practical exercises tailored to your level.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-card p-6"
          >
            <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-4 border border-aurora-blue/50">
              <LineChart size={24} className="text-aurora-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trading Simulations</h3>
            <p className="text-text-secondary">
              Practice with no-risk trading environments before putting real capital on the line.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-card p-6"
          >
            <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-4 border border-aurora-purple/50">
              <Users size={24} className="text-aurora-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community & Mentors</h3>
            <p className="text-text-secondary">
              Connect with expert traders and a supportive community to accelerate your growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="container mx-auto px-4 py-16 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(27, 34, 48, 0.8), rgba(11, 15, 25, 0.8))',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Background aurora effect */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -inset-[10%] blur-3xl opacity-30"
              style={{
                background: 'radial-gradient(circle at top right, rgba(141, 0, 196, 0.4), transparent 40%), radial-gradient(circle at bottom left, rgba(20, 232, 30, 0.4), transparent 40%), radial-gradient(circle at center, rgba(0, 234, 141, 0.4), transparent 40%)'
              }}
            ></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Begin Your Odyssey?</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Join thousands of users learning crypto trading and financial literacy in an engaging, interactive environment.
          </p>
          <Button 
            size="lg" 
            className="bg-aurora-gradient hover:shadow-aurora text-white font-semibold"
            onClick={() => router.push('/register')}
          >
            Start For Free <ChevronRight className="ml-2" size={18} />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-muted mb-4 md:mb-0">
            © {new Date().getFullYear()} Odysseon. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-text-secondary hover:text-text-primary">Privacy</Link>
            <Link href="/terms" className="text-text-secondary hover:text-text-primary">Terms</Link>
            <Link href="/help" className="text-text-secondary hover:text-text-primary">Help</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
