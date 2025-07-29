import { useLocation } from 'wouter';

interface TerminalPromptProps {
  command?: string;
  className?: string;
}

export function TerminalPrompt({ command = '', className = '' }: TerminalPromptProps) {
  const [location] = useLocation();
  
  const getTerminalPath = () => {
    if (location === '/') return '~';
    return `~${location}`;
  };

  return (
    <div className={`font-mono text-sm ${className}`}>
      <span className="text-gray-500">cutler@cutler.so</span>
      <span className="text-gray-500 mx-1">:</span>
      <span className="text-green-400">{getTerminalPath()}</span>
      <span className="text-gray-500 ml-2">$</span>
      {command && <span className="text-white ml-2">{command}</span>}
    </div>
  );
}