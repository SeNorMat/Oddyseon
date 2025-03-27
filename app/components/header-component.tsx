'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Bell, User, Search } from 'lucide-react';
import { OdysseonUser } from '@/hooks/auth-hook';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getInitials } from '@/utils/utils-file';

interface HeaderProps {
  user: OdysseonUser;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ user, toggleSidebar, isSidebarOpen }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="bg-surface/50 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left section - Logo and menu toggle */}
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2 text-text-secondary hover:text-text-primary" 
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu size={24} />
          </Button>
          
          <Link href="/dashboard" className="flex items-center">
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-aurora-gradient">
              Odysseon
            </span>
          </Link>
        </div>
        
        {/* Center section - Search (hidden on mobile unless active) */}
        <div className={`${showSearch ? 'flex' : 'hidden md:flex'} items-center max-w-md w-full mx-4`}>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-text-muted" />
            </div>
            <input
              type="text"
              placeholder="Search courses, lessons..."
              className="w-full bg-muted/50 border border-border rounded-md py-2 pl-10 pr-4 focus:ring-aurora-green focus:border-aurora-green text-sm"
            />
          </div>
        </div>
        
        {/* Right section - Notifications and profile */}
        <div className="flex items-center">
          {/* Search toggle (mobile only) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-text-secondary hover:text-text-primary"
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Toggle search"
          >
            <Search size={20} />
          </Button>
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-text-secondary hover:text-text-primary"
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-aurora-green rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* Sample notifications */}
              <div className="max-h-[300px] overflow-y-auto p-1">
                <div className="p-3 hover:bg-muted rounded-md transition-colors">
                  <p className="text-sm font-medium">Course Update</p>
                  <p className="text-xs text-text-muted mt-1">
                    New lesson available: "Introduction to DeFi"
                  </p>
                  <p className="text-xs text-text-muted mt-1">2 hours ago</p>
                </div>
                
                <div className="p-3 hover:bg-muted rounded-md transition-colors">
                  <p className="text-sm font-medium">Achievement Unlocked</p>
                  <p className="text-xs text-text-muted mt-1">
                    You've completed your first course!
                  </p>
                  <p className="text-xs text-text-muted mt-1">Yesterday</p>
                </div>
              </div>
              
              <DropdownMenuSeparator />
              <Link href="/notifications" className="block w-full">
                <DropdownMenuItem className="cursor-pointer text-center text-aurora-blue">
                  View all notifications
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-2 rounded-full h-9 w-9 relative"
                aria-label="User menu"
              >
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                  <AvatarFallback className="bg-muted text-text-primary">
                    {getInitials(user.displayName || 'User')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user.displayName || 'User'}</span>
                  <span className="text-xs text-text-muted">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href="/profile/settings">
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => {
                  // We'll implement signOut in the actual component
                  console.log('Sign out');
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
