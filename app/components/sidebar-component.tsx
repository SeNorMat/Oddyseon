'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  GraduationCap, 
  LineChart, 
  Users, 
  Rocket, 
  Settings, 
  HelpCircle,
  X,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/utils/utils-file';
import { Button } from '@/components/ui/button';

interface SidebarNavProps {
  isOpen: boolean;
  currentPath: string;
  isMobile: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: {
    text: string;
    variant: 'default' | 'green' | 'blue' | 'purple' | 'orange';
  };
  comingSoon?: boolean;
}

export default function SidebarNav({ 
  isOpen, 
  currentPath, 
  isMobile, 
  onClose 
}: SidebarNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside sidebar on mobile
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isMobile && 
        isOpen && 
        overlayRef.current && 
        event.target instanceof Node &&
        overlayRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMobile, isOpen, onClose]);

  // Define navigation items
  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: 'Courses',
      href: '/courses',
      icon: <GraduationCap size={20} />,
    },
    {
      name: 'Simulations',
      href: '/simulations',
      icon: <LineChart size={20} />,
      badge: {
        text: 'New',
        variant: 'green',
      },
    },
    {
      name: 'Community',
      href: '/community',
      icon: <Users size={20} />,
      comingSoon: true,
    },
    {
      name: 'Trader Hub',
      href: '/community/trader-hub',
      icon: <Rocket size={20} />,
      comingSoon: true,
    },
  ];

  // Support/settings navigation items
  const supportItems: NavItem[] = [
    {
      name: 'Help & Support',
      href: '/help',
      icon: <HelpCircle size={20} />,
    },
    {
      name: 'Settings',
      href: '/profile/settings',
      icon: <Settings size={20} />,
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 w-64 z-50 bg-surface border-r border-border transition-transform duration-300 ease-in-out transform h-screen pt-16 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16"
        )}
      >
        {/* Mobile close button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-text-muted hover:text-text-primary md:hidden"
            onClick={onClose}
          >
            <X size={18} />
          </Button>
        )}
        
        {/* Navigation links */}
        <div className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.href || currentPath.startsWith(`${item.href}/`);
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.comingSoon ? '#' : item.href}
                    className={cn(
                      "flex items-center p-2 rounded-lg group",
                      isActive 
                        ? "bg-muted text-aurora-green" 
                        : "text-text-secondary hover:bg-muted/50 hover:text-text-primary",
                      isOpen ? "" : "justify-center",
                      item.comingSoon ? "opacity-70 cursor-not-allowed" : ""
                    )}
                    onClick={(e) => {
                      if (item.comingSoon) {
                        e.preventDefault();
                      } else if (isMobile) {
                        onClose();
                      }
                    }}
                  >
                    <span className={cn(
                      "relative",
                      isActive && "text-aurora-green"
                    )}>
                      {item.icon}
                      
                      {/* Badge */}
                      {item.badge && isOpen && (
                        <span className={cn(
                          "absolute -top-1 -right-2 px-1.5 py-0.5 rounded-full text-xs font-semibold",
                          item.badge.variant === 'green' && "bg-aurora-green text-background",
                          item.badge.variant === 'blue' && "bg-aurora-blue text-background",
                          item.badge.variant === 'purple' && "bg-aurora-purple text-background",
                          item.badge.variant === 'orange' && "bg-warning text-background",
                          item.badge.variant === 'default' && "bg-muted text-text-primary"
                        )}>
                          {item.badge.text}
                        </span>
                      )}
                    </span>
                    
                    {isOpen && (
                      <span className="ml-3 flex-1">{item.name}</span>
                    )}
                    
                    {isOpen && item.comingSoon && (
                      <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs rounded bg-muted text-text-muted">
                        Coming soon
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <div className="pt-4 mt-4 border-t border-border">
            <ul className="space-y-2">
              {supportItems.map((item) => {
                const isActive = currentPath === item.href;
                
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center p-2 rounded-lg group",
                        isActive 
                          ? "bg-muted text-aurora-green" 
                          : "text-text-secondary hover:bg-muted/50 hover:text-text-primary",
                        isOpen ? "" : "justify-center"
                      )}
                      onClick={() => isMobile && onClose()}
                    >
                      <span className={cn(
                        "relative",
                        isActive && "text-aurora-green"
                      )}>
                        {item.icon}
                      </span>
                      
                      {isOpen && (
                        <span className="ml-3">{item.name}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        
        {/* Toggle button (only visible on desktop) */}
        {!isMobile && (
          <div className="p-3 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              className="w-full flex items-center justify-center text-text-muted hover:text-text-primary p-2"
              onClick={() => onClose()}
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <ChevronRight 
                size={18} 
                className={cn(
                  "transition-transform",
                  isOpen ? "rotate-180" : "rotate-0"
                )} 
              />
              {isOpen && <span className="ml-2 text-xs">Collapse</span>}
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
