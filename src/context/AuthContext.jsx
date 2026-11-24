import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [authReason, setAuthReason] = useState('general'); // 'download' | 'general'
  const pendingActionRef = useRef(null);

  useEffect(() => {
    // 1. Check initial session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching Supabase session:', err);
      setLoading(false);
    });

    // 2. Listen to Auth changes in real time
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    
    setUser(data.user);
    setSession(data.session);
    setIsAuthModalOpen(false);

    // If there is a pending action (e.g. download resume), execute it immediately
    if (pendingActionRef.current) {
      const action = pendingActionRef.current;
      pendingActionRef.current = null;
      setTimeout(() => {
        action();
      }, 100);
    }
    return data;
  };

  const signUp = async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    if (error) throw error;

    setUser(data.user);
    setSession(data.session);
    setIsAuthModalOpen(false);

    // If there is a pending action (e.g. download resume), execute it immediately
    if (pendingActionRef.current) {
      const action = pendingActionRef.current;
      pendingActionRef.current = null;
      setTimeout(() => {
        action();
      }, 100);
    }
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Signout error:', error);
    setUser(null);
    setSession(null);
  };

  const openAuthModal = (mode = 'signin', reason = 'general') => {
    setAuthMode(mode);
    setAuthReason(reason);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    pendingActionRef.current = null;
  };

  /**
   * Guards any restricted action (e.g. downloading resume PDF).
   * If user is authenticated, executes actionCallback directly.
   * If user is not authenticated, stores actionCallback, opens the AuthModal,
   * and runs actionCallback upon successful authentication.
   */
  const requireAuthForAction = (actionCallback, reason = 'download') => {
    if (user) {
      actionCallback();
    } else {
      pendingActionRef.current = actionCallback;
      openAuthModal('signin', reason);
    }
  };

  const formattedUser = user ? {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name || user.email?.split('@')[0]?.replace(/[._]/g, ' ') || 'User',
    avatar: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.email || 'User')}&backgroundColor=2563eb`,
    role: 'Verified Member',
    plan: 'Free Pro Access',
  } : null;

  return (
    <AuthContext.Provider
      value={{
        user: formattedUser,
        rawUser: user,
        session,
        loading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        isAuthModalOpen,
        authMode,
        authReason,
        openAuthModal,
        closeAuthModal,
        requireAuthForAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
