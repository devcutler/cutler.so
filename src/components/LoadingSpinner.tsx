import { useTheme } from '../contexts/ThemeContext';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  const { theme } = useTheme();

  const getSpinnerColor = () => {
    switch (theme) {
      case 'terminal':
        return 'border-green-400';
      case 'gnome':
        return 'border-cyan-400';
      case 'nier':
        return 'border-amber-600';
      case 'neumorphic':
        return 'border-purple-500';
      default:
        return 'border-blue-500';
    }
  };

  const getTextColor = () => {
    switch (theme) {
      case 'terminal':
        return 'text-green-400';
      case 'gnome':
        return 'text-cyan-400';
      case 'nier':
        return 'text-amber-800';
      case 'neumorphic':
        return 'text-purple-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div 
          className={`animate-spin rounded-full h-12 w-12 border-b-2 ${getSpinnerColor()} mx-auto mb-4`}
        />
        <p className={`${getTextColor()} font-mono text-sm`}>
          {message}
        </p>
      </div>
    </div>
  );
}