import { useEffect } from 'react';

interface AuthViewProps {
  onLoginSuccess: () => void;
}

export default function AuthView({ onLoginSuccess }: AuthViewProps) {
  
  // This instantly bypasses the login screen the moment it renders
  useEffect(() => {
    onLoginSuccess();
  }, [onLoginSuccess]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-400 text-sm font-medium">
      Bypassing security lock... opening dashboard...
    </div>
  );
}