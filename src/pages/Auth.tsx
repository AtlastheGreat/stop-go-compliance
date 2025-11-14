import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/Layout';
import { Loader2 } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('driver');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp, skipLogin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isLogin
        ? await signIn(email, password)
        : await signUp(email, password, fullName, role);

      if (error) {
        toast({
          title: t('error'),
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('success'),
          description: isLogin ? t('loginSuccess') : t('signupSuccess'),
        });
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkipLogin = () => {
    skipLogin();
    toast({
      title: t('guestMode'),
      description: t('guestModeDesc'),
    });
  };

  return (
    <div className="min-h-screen gradient-bg-animated flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2 fade-slide-up">
          <h1 className="text-4xl font-bold">
            <span className="text-stop-red">Stop</span>
            <span className="text-go-green">&Go</span>
          </h1>
          <p className="text-muted-foreground">{t('tagline')}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 float-shadow fade-slide-up space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              {isLogin ? t('loginTitle') : t('signupTitle')}
            </h2>
            <p className="text-muted-foreground">
              {isLogin ? t('loginSubtitle') : t('signupSubtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  {t('fullName')}
                </label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('fullName')}
                  required
                  className="h-12"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                {t('email')}
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('email')}
                required
                className="h-12"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                {t('password')}
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('password')}
                required
                minLength={6}
                className="h-12"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  {t('roleSelect')}
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-12 px-3 rounded-md border border-input bg-background"
                >
                  <option value="driver">{t('driverRole')}</option>
                  <option value="manager">{t('managerRole')}</option>
                </select>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 button-hover-scale"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isLogin ? (
                t('loginButton')
              ) : (
                t('signupButton')
              )}
            </Button>
          </form>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-muted-foreground">{t('or')}</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 button-hover-scale"
              onClick={handleSkipLogin}
            >
              {t('skipLogin')}
            </Button>

            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-center text-sm text-primary hover:underline"
            >
              {isLogin ? t('noAccount') : t('hasAccount')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
