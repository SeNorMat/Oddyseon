import { useEffect, useState, createContext, useContext } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

// Interface for our extended user
export interface OdysseonUser extends User {
  customClaims?: {
    isTrader?: boolean;
    isPremium?: boolean;
  };
  displayName: string | null;
  progress?: {
    // We'll extend this as needed for the learning platform
    completedCourses: string[];
    completedLessons: string[];
    currentCourse?: string;
    currentLesson?: string;
  };
}

// Type for context state
interface AuthState {
  user: OdysseonUser | null;
  loading: boolean;
  error: string | null;
}

// Type for auth context
interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps your app and provides auth context
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Listen for auth state changes when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          
          // Extend the user object with additional data
          const odysseonUser: OdysseonUser = user as OdysseonUser;
          if (userData) {
            odysseonUser.customClaims = userData.customClaims;
            odysseonUser.progress = userData.progress;
          }
          
          setState({ user: odysseonUser, loading: false, error: null });
        } catch (error) {
          console.error("Error fetching user data:", error);
          setState({ user: user as OdysseonUser, loading: false, error: null });
        }
      } else {
        setState({ user: null, loading: false, error: null });
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  // Sign up handler
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setState({ ...state, loading: true });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      await updateProfile(userCredential.user, { displayName });
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        displayName,
        createdAt: new Date().toISOString(),
        customClaims: {
          isTrader: false,
          isPremium: false,
        },
        progress: {
          completedCourses: [],
          completedLessons: [],
        },
      });
      
      setState({
        ...state,
        loading: false,
        user: userCredential.user as OdysseonUser,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: (error as Error).message,
      });
      throw error;
    }
  };

  // Sign in handler
  const signIn = async (email: string, password: string) => {
    try {
      setState({ ...state, loading: true });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setState({
        ...state,
        loading: false,
        user: userCredential.user as OdysseonUser,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: (error as Error).message,
      });
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setState({ ...state, loading: true });
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Check if this is a new user and create Firestore doc if needed
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          createdAt: new Date().toISOString(),
          customClaims: {
            isTrader: false,
            isPremium: false,
          },
          progress: {
            completedCourses: [],
            completedLessons: [],
          },
        });
      }
      
      setState({
        ...state,
        loading: false,
        user: userCredential.user as OdysseonUser,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: (error as Error).message,
      });
      throw error;
    }
  };

  // Sign out handler
  const signOut = async () => {
    try {
      setState({ ...state, loading: true });
      await firebaseSignOut(auth);
      setState({ user: null, loading: false, error: null });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: (error as Error).message,
      });
      throw error;
    }
  };

  // Reset password handler
  const resetPassword = async (email: string) => {
    try {
      setState({ ...state, loading: true });
      await sendPasswordResetEmail(auth, email);
      setState({ ...state, loading: false, error: null });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: (error as Error).message,
      });
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (displayName: string) => {
    try {
      setState({ ...state, loading: true });
      
      if (state.user) {
        await updateProfile(state.user, { displayName });
        
        // Update Firestore
        await setDoc(doc(db, 'users', state.user.uid), 
          { displayName }, 
          { merge: true }
        );
        
        // Update local state
        setState({
          ...state,
          loading: false,
          user: { ...state.user, displayName } as OdysseonUser,
          error: null,
        });
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: (error as Error).message,
      });
      throw error;
    }
  };

  // Context value
  const value = {
    ...state,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
