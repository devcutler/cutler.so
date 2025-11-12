import type { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/Header';
import { SettingsPanel } from '@/components/SettingsPanel';
import '@/tailwind.css';
import { Head } from 'vike-react/Head';

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
	return (
		<ThemeProvider>
			<Head>
				<script defer src="https://umami.cutler.so/script.js" data-website-id="7ea3b6f1-66bd-4aff-b762-fe59b2c2e516"></script>
				<script defer src="/umami-kit.js"></script>
			</Head>
			<div className="min-h-screen" data-umami-auto-track data-umami-auto-track-all-clicks="true">
				<Header />
				<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					{children}
				</main>
				<SettingsPanel />
			</div>
		</ThemeProvider>
	);
}