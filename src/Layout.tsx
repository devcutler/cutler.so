import type { ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/Header';
import { SettingsPanel } from '@/components/SettingsPanel';
import '@/tailwind.css';
import { Head } from 'vike-react/Head';

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<ThemeProvider>
			<Head>
				<script defer src="https://umami.cutler.so/script.js" data-website-id="8407a706-95dd-4ba5-81de-29e0a5700c80"></script>
			</Head>
			<div className="min-h-screen">
				<Header />
				<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					{children}
				</main>
				<SettingsPanel />
			</div>
		</ThemeProvider>
	);
}