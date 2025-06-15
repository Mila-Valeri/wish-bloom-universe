import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ForgotPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ForgotPasswordDialog = ({ open, onOpenChange }: ForgotPasswordDialogProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'success'>('email');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email);
      setStep('success');
    } catch (error) {
      // Error is handled in the auth hook
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('email');
    setEmail('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-[95vw] mx-auto">
        {step === 'email' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg md:text-xl flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Reset Password
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-sm md:text-base">
                  Email Address
                </Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="text-sm md:text-base"
                />
              </div>
              
              <p className="text-sm text-muted-foreground">
                We'll send you a link to reset your password.
              </p>

              <Button 
                type="submit" 
                className="w-full text-sm md:text-base py-2 md:py-3" 
                disabled={loading || !email}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg md:text-xl flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Check Your Email
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center py-4">
                <Mail className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm md:text-base text-muted-foreground">
                  We've sent a password reset link to:
                </p>
                <p className="font-medium text-sm md:text-base mt-2">{email}</p>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Check your email and follow the instructions to reset your password.
              </p>

              <Button 
                onClick={handleClose}
                className="w-full text-sm md:text-base py-2 md:py-3"
              >
                Got it
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};