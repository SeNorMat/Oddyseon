'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/hooks/auth-hook';
import { Toaster } from '@/components/toaster-component';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  );
}
