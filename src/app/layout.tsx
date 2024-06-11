import {Theme} from '@radix-ui/themes';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';

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
		<html lang="en">
			<body className={inter.variable}>
				<Theme>{children}</Theme>
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
