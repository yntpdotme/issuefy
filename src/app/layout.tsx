import {Container, Theme} from '@radix-ui/themes';
import type {Metadata} from 'next';
import {ThemeProvider} from 'next-themes';
import {Inter} from 'next/font/google';
import './globals.css';
import NavBar from './NavBar';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.variable}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<Theme>
						<NavBar />
						<main className="p-5">
							<Container>{children}</Container>
						</main>
					</Theme>
				</ThemeProvider>
			</body>
		</html>
	);
}

export const metadata: Metadata = {
	title: 'Issuefy',
	description: 'Track your issues efficiently',
	icons: {
		icon: [
			{
				media: '(prefers-color-scheme: light)',
				url: '/favicon.ico',
				href: '/favicon.ico',
			},
			{
				media: '(prefers-color-scheme: dark)',
				url: '/favicon-dark.ico',
				href: '/favicon-dark.ico',
			},
		],
	},
};
