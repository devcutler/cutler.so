import { useState, type ReactElement } from 'react';
import { useUmami } from '@/hooks/useUmami';
import { Settings, Check } from 'lucide-react';
import type { ThemeType } from '@/types/theme';
import { useTheme } from '@/contexts/useTheme';

interface ThemeOption {
	name: ThemeType;
	label: string;
	description: string;
}

const themeOptions: ThemeOption[] = [
	{
		name: 'modern',
		label: 'Modern',
		description: 'Clean',
	},
	{
		name: 'terminal',
		label: 'Terminal',
		description: 'Hacker',
	},
	{
		name: 'neumorphic',
		label: 'Neumorphic',
		description: 'Soft',
	},
	{
		name: 'nier',
		label: 'NieR',
		description: 'Retro',
	},
	{
		name: 'gnome',
		label: 'GNOME',
		description: 'Desktop',
	},
];

export function SettingsPanel(): ReactElement {
	const [ isOpen, setIsOpen ] = useState(false);
	const { theme, setTheme } = useTheme();
	const { track } = useUmami();

	const handleThemeChange = (newTheme: ThemeType): void => {
		track('Theme Change', { theme: newTheme });
		setTheme(newTheme);
	};

	const getSettingsButtonClasses = (): string => {
		const baseClasses = 'fixed bottom-4 left-4 z-[9999] w-12 h-12 text-base cursor-pointer transition-all duration-300 flex items-center justify-center';
    
		switch (theme) {
			case 'modern':
				return `${baseClasses} rounded-full border-2 border-slate-200 bg-white text-slate-800 shadow-md`;
			case 'terminal':
				return `${baseClasses} rounded-none border border-gray-500 bg-black text-blue-300 font-mono shadow-none text-base`;
			case 'neumorphic':
				return `${baseClasses} rounded-full border-none text-gray-600` + 
               ' [background:_#e0e5ec] [box-shadow:_6px_6px_12px_#a3b1c6,_-6px_-6px_12px_#ffffff]';
			case 'nier':
				return `${baseClasses} rounded-none border-2 text-amber-900` +
               ' [background:_#c8b99c] [border-color:_#9f8f7f] [box-shadow:_4px_4px_0_#9f8f7f,_8px_8px_0_#8b7f6f]';
			case 'gnome':
				return `${baseClasses} rounded-full border text-white` +
               ' [background:_#2c0a1e] [border-color:_#75507b] [box-shadow:_0_2px_4px_rgba(0,0,0,0.3)]';
			default:
				return `${baseClasses} rounded-full border-2 border-gray-500 bg-white text-gray-700 shadow-md`;
		}
	};

	return (
		<>
      
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={getSettingsButtonClasses()}
				onMouseEnter={(e) => {
					switch (theme) {
						case 'modern':
							e.currentTarget.style.backgroundColor = '#f8fafc';
							e.currentTarget.style.transform = 'scale(1.05)';
							break;
						case 'terminal':
							e.currentTarget.style.backgroundColor = '#1a1a2e';
							e.currentTarget.style.color = '#93c5fd';
							e.currentTarget.style.textShadow = '0 0 3px #93c5fd';
							break;
						case 'neumorphic':
							e.currentTarget.style.boxShadow = '4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff';
							e.currentTarget.style.transform = 'scale(1.05)';
							break;
						case 'nier':
							e.currentTarget.style.backgroundColor = '#bcad88';
							e.currentTarget.style.transform = 'translate(-2px, -2px)';
							e.currentTarget.style.boxShadow = '6px 6px 0 #9f8f7f, 10px 10px 0 #8b7f6f';
							break;
						case 'gnome':
							e.currentTarget.style.backgroundColor = '#3c1028';
							e.currentTarget.style.transform = 'scale(1.05)';
							break;
						default:
							e.currentTarget.style.backgroundColor = '#f3f4f6';
							e.currentTarget.style.transform = 'scale(1.05)';
					}
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.backgroundColor = '';
					e.currentTarget.style.transform = '';
					e.currentTarget.style.boxShadow = '';
					e.currentTarget.style.color = '';
					e.currentTarget.style.textShadow = '';
				}}
				aria-label="Theme settings"
			>
				<Settings size={20} />
			</button>

      
			{isOpen && (
				<>
          
					<div
						className="fixed inset-0 z-[9998] bg-black/20"
						onClick={() => setIsOpen(false)}
					/>
          
          
					<div className={`fixed bottom-[4.5rem] left-4 z-[9999] w-48 max-w-[calc(100vw-2rem)] p-3 ${
						theme === 'terminal' 
							? 'bg-black border border-gray-500 rounded-none shadow-none font-mono' 
							: 'bg-white border border-gray-200 rounded-lg shadow-xl'
					}`}>
						<h3 className={`text-sm font-semibold mb-2 ${
							theme === 'terminal' 
								? 'text-blue-300 font-mono text-sm' 
								: 'text-gray-700'
						}`}>
							{theme === 'terminal' ? '> THEMES' : 'Themes'}
						</h3>
            
						<div className="flex flex-col gap-1">
							{themeOptions.map((option) => (
								<ThemePreviewButton
									key={option.name}
									theme={option}
									isSelected={theme === option.name}
									onClick={() => handleThemeChange(option.name)}
								/>
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
}

interface ThemePreviewButtonProps {
	theme: ThemeOption;
	isSelected: boolean;
	onClick: () => void;
}

function ThemePreviewButton({ theme, isSelected, onClick }: ThemePreviewButtonProps): ReactElement {
	const getThemeClasses = (): string => {
		const baseClasses = 'w-full p-2 cursor-pointer transition-all duration-200 text-xs text-left flex justify-between items-center hover:opacity-80';

		switch (theme.name) {
			case 'modern':
				return `${baseClasses} bg-white rounded-lg text-gray-800 font-sans shadow-sm ${
					isSelected 
						? 'border border-blue-500 ring-2 ring-blue-200' 
						: 'border border-gray-200'
				}`;
			case 'terminal':
				return `${baseClasses} rounded-none font-mono text-sm ${
					isSelected 
						? 'text-black bg-blue-300 border border-blue-300' 
						: 'text-blue-300 bg-black border border-gray-600'
				}`;
			case 'neumorphic':
				return `${baseClasses} border-none rounded-2xl text-gray-600 font-sans ${
					isSelected 
						? '[background:_#e0e5ec] [box-shadow:_0_0_0_2px_rgba(102,126,234,0.3),6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]'
						: '[background:_#e0e5ec] [box-shadow:_6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]'
				}`;
			case 'nier':
				return `${baseClasses} rounded-none text-amber-900 font-mono font-bold uppercase tracking-wider border-2 ${
					isSelected 
						? 'ring-2 ring-amber-800/30 [background:_#c8b99c] [border-color:_#8b4513] [box-shadow:_0_0_0_2px_rgba(139,69,19,0.3),4px_4px_0_#9f8f7f,8px_8px_0_#8b7f6f]'
						: '[background:_#c8b99c] [border-color:_#9f8f7f] [box-shadow:_4px_4px_0_#9f8f7f,8px_8px_0_#8b7f6f]'
				}`;
			case 'gnome':
				return `${baseClasses} rounded-xl text-white font-medium border ${
					isSelected 
						? 'border-blue-500 ring-2 ring-blue-500/15 [background:_linear-gradient(180deg,#3c1028_0%,#300a24_100%)] [box-shadow:_0_0_0_2px_rgba(53,132,228,0.15),0_2px_4px_rgba(0,0,0,0.1)]'
						: '[background:_linear-gradient(180deg,#3c1028_0%,#300a24_100%)] [border-color:_#75507b] [box-shadow:_0_2px_4px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)]'
				} [font-family:_"Inter","Cantarell","Ubuntu",sans-serif]`;
			default:
				return baseClasses;
		}
	};

	return (
		<button
			onClick={onClick}
			className={getThemeClasses()}
		>
			<div>
				<div className="font-medium">
					{theme.label}
				</div>
				<div className="opacity-70 text-[0.625rem]">
					{theme.description}
				</div>
			</div>
      
			{isSelected && (
				<Check size={12} />
			)}
		</button>
	);
}