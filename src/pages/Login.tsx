import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, resetPassword, user } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [magicLinkEmail, setMagicLinkEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    try {
      await signIn(email, password);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!magicLinkEmail) return;

    setIsLoading(true);
    try {
      await resetPassword(magicLinkEmail);
      toast({
        title: 'Magic Link Sent',
        description: 'Check your email for a secure login link.',
      });
    } catch (error) {
      console.error('Magic link error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground">
        <div className="max-w-md">
          <Shield className="w-16 h-16 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Welcome to InVision Network</h1>
          <p className="text-lg mb-6 opacity-90">
            Protecting families from AI-powered scams with expert education and community support.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <Lock className="w-5 h-5" />
              <span>Bank-level security & encryption</span>
            </li>
            <li className="flex items-center gap-3">
              <Shield className="w-5 h-5" />
              <span>GDPR & CCPA compliant</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span>Passwordless login options</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:hidden mb-8">
            <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h1 className="text-2xl font-bold">Welcome Back</h1>
          </div>

          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="magic">Magic Link</TabsTrigger>
            </TabsList>

            {/* Password Login */}
            <TabsContent value="password">
              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ruben@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <label htmlFor="remember" className="text-sm cursor-pointer">
                      Remember me for 30 days
                    </label>
                  </div>
                  <Link to="/password-reset" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            {/* Magic Link Login */}
            <TabsContent value="magic">
              <form onSubmit={handleMagicLink} className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="magic-email">Email</Label>
                  <Input
                    id="magic-email"
                    type="email"
                    placeholder="ruben@example.com"
                    value={magicLinkEmail}
                    onChange={(e) => setMagicLinkEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll send you a secure login link to your email
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Magic Link'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline font-semibold">
                Sign up
              </Link>
            </p>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                <Shield className="w-3 h-3" />
                Encrypted & Secure • GDPR & CCPA Compliant
              </p>
              <div className="flex justify-center gap-4 mt-2 text-xs">
                <Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy</Link>
                <Link to="/terms" className="text-muted-foreground hover:text-primary">Terms</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;