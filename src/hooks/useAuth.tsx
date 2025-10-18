import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  isAdmin: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }

    toast({
      title: 'Success',
      description: 'Logged in successfully',
    });
  };

  const signUp = async (email: string, password: string, username: string) => {
    // Check if password has been leaked in a data breach
    try {
      const { data: breachData, error: breachError } = await supabase.functions.invoke('check-password-breach', {
        body: { password }
      });

      if (breachError) {
        console.error('Password breach check failed:', breachError);
        // Continue with sign-up even if breach check fails (fail open)
      } else if (breachData?.isBreached) {
        toast({
          title: 'Insecure Password',
          description: `This password has been exposed in ${breachData.breachCount?.toLocaleString()} data breaches. Please choose a different password.`,
          variant: 'destructive',
        });
        throw new Error('Password has been compromised in a data breach');
      }
    } catch (breachCheckError) {
      // If it's the "password compromised" error, re-throw it
      if (breachCheckError instanceof Error && breachCheckError.message.includes('compromised')) {
        throw breachCheckError;
      }
      // Otherwise, log and continue (fail open)
      console.error('Password breach check error:', breachCheckError);
    }

    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          username: username,
        },
      },
    });

    if (error) {
      toast({
        title: 'Sign Up Failed',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }

    toast({
      title: 'Success',
      description: 'Account created successfully! You can now log in.',
    });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/password-reset`,
    });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }

    toast({
      title: 'Success',
      description: 'Password reset email sent! Check your inbox.',
    });
  };

  const updatePassword = async (newPassword: string) => {
    // Check if new password has been leaked in a data breach
    try {
      const { data: breachData, error: breachError } = await supabase.functions.invoke('check-password-breach', {
        body: { password: newPassword }
      });

      if (breachError) {
        console.error('Password breach check failed:', breachError);
        // Continue with password update even if breach check fails (fail open)
      } else if (breachData?.isBreached) {
        toast({
          title: 'Insecure Password',
          description: `This password has been exposed in ${breachData.breachCount?.toLocaleString()} data breaches. Please choose a different password.`,
          variant: 'destructive',
        });
        throw new Error('Password has been compromised in a data breach');
      }
    } catch (breachCheckError) {
      // If it's the "password compromised" error, re-throw it
      if (breachCheckError instanceof Error && breachCheckError.message.includes('compromised')) {
        throw breachCheckError;
      }
      // Otherwise, log and continue (fail open)
      console.error('Password breach check error:', breachCheckError);
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }

    toast({
      title: 'Success',
      description: 'Password updated successfully!',
    });
  };

  const isAdmin = async (): Promise<boolean> => {
    if (!user) return false;

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    return !error && data !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
