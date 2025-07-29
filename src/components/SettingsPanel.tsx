import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import type { ThemeType } from '../types/theme';
import { Settings } from 'lucide-react';

const themes: { name: string; value: ThemeType; description: string; }[] = [
	{ name: 'Terminal', value: 'terminal', description: 'Classic black terminal' },
	{ name: 'GNOME', value: 'gnome', description: 'Ubuntu terminal style' },
	{ name: 'Modern', value: 'modern', description: 'Clean and minimal' },
	{ name: 'Neumorphic', value: 'neumorphic', description: 'Soft shadows and depth' },
	{ name: 'NieR', value: 'nier', description: 'Post-apocalyptic UI' }
];

export function SettingsPanel() {
	const [isOpen, setIsOpen] = useState(false);
	const { theme, setTheme } = useTheme();
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => document.removeEventListener('mousedown', handleClickOutside);
		}

		return undefined;
	}, [isOpen]);

	const getButtonClasses = () => {
		switch (theme) {
		case 'terminal':
			return 'fixed bottom-4 left-4 z-50 w-12 h-12 bg-transparent border border-gray-600 hover:border-gray-400 rounded-none shadow-none hover:shadow-none transition-all duration-200 flex items-center justify-center group';
		case 'neumorphic':
			return 'fixed bottom-4 left-4 z-50 w-12 h-12 neumorph-card hover:shadow-lg transition-all duration-200 flex items-center justify-center group';
		case 'nier':
			return 'fixed bottom-4 left-4 z-50 w-12 h-12 bg-gray-800 border-2 border-gray-800 rounded-none hover:bg-gray-600 transition-all duration-200 flex items-center justify-center group';
		case 'gnome':
			return 'fixed bottom-4 left-4 z-50 w-12 h-12 gnome-button hover:bg-blue-600 transition-all duration-200 flex items-center justify-center group';
		default:
			return 'fixed bottom-4 left-4 z-50 w-12 h-12 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl transition-all duration-200 flex items-center justify-center group';
		}
	};

	const getPanelClasses = () => {
		switch (theme) {
		case 'terminal':
			return 'fixed bottom-20 left-4 z-50 w-56 bg-black border border-gray-600 rounded-none shadow-none overflow-hidden';
		case 'neumorphic':
			return 'fixed bottom-20 left-4 z-50 w-56 neumorph-card border-none overflow-hidden';
		case 'nier':
			return 'fixed bottom-20 left-4 z-50 w-56 bg-amber-50 border-2 border-gray-800 rounded-none overflow-hidden';
		case 'gnome':
			return 'fixed bottom-20 left-4 z-50 w-56 gnome-card border-none overflow-hidden';
		default:
			return 'fixed bottom-20 left-4 z-50 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden';
		}
	};

	return (
		<>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={getButtonClasses()}
				style={{
					color: 'var(--text-primary)'
				}}
				aria-label="Open settings"
			>
				<Settings
					size={20}
					className={`transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
					style={{ color: 'inherit' }}
				/>
			</button>

			{isOpen && (
				<div
					ref={panelRef}
					className={`${getPanelClasses()} settings-panel`}
				>
					<div className="p-3">
						<div>
							<label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Theme
							</label>
							<div className="space-y-1">
								{themes.map((themeOption) => {
									const getThemeButtonClasses = (buttonTheme: ThemeType) => {
										const baseClasses = "w-full text-left p-2 text-sm leading-tight transition-colors h-14 border-2";
										const fontClass = `theme-button-${buttonTheme}`;

										switch (buttonTheme) {
										case 'terminal':
											return `${baseClasses} ${fontClass} rounded-none`;
										case 'modern':
											return `${baseClasses} ${fontClass} rounded`;
										case 'neumorphic':
											return `${baseClasses} ${fontClass} transition-all rounded-lg border-transparent`;
										case 'nier':
											return `${baseClasses} ${fontClass} rounded-none font-semibold`;
										case 'gnome':
											return `${baseClasses} ${fontClass} rounded-none`;
										default:
											return `${baseClasses} ${fontClass} rounded`;
										}
									};

									const getThemeButtonStyle = (buttonTheme: ThemeType) => {
										const isSelected = themeOption.value === theme;
										const baseStyle: React.CSSProperties = {
											backgroundColor: isSelected ? 'var(--accent-color)' : 'var(--bg-secondary)',
											color: isSelected ? 'var(--bg-primary)' : 'var(--text-primary)',
											borderColor: isSelected ? 'var(--accent-color)' : 'var(--border-color)'
										};

										switch (buttonTheme) {
										case 'neumorphic':
											baseStyle.boxShadow = isSelected
												? 'inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff'
												: 'inset -2px -2px 4px #ffffff, inset 2px 2px 4px #d1d1d1';
											baseStyle.backgroundColor = 'var(--bg-secondary)';
											baseStyle.color = isSelected ? 'var(--accent-color)' : 'var(--text-primary)';
											break;
										}

										return baseStyle;
									};

									return (
										<button
											key={themeOption.value}
											onClick={() => setTheme(themeOption.value)}
											className={getThemeButtonClasses(themeOption.value)}
											style={getThemeButtonStyle(themeOption.value)}
										>
											<div className="font-medium">{themeOption.name}</div>
											<div className="text-xs opacity-70">
												{themeOption.description}
											</div>
										</button>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}