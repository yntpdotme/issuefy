import {auth} from '@/auth';
import SourceCode from '@/components/source-code';
import {Container, Theme} from '@radix-ui/themes';
import type {Metadata} from 'next';
import {SessionProvider} from 'next-auth/react';
import {ThemeProvider} from 'next-themes';
import {Inter} from 'next/font/google';
import './globals.css';
import NavBar from './NavBar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} h-screen antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Theme className="flex flex-col">
              <NavBar />
              <main className="flex-1 overflow-scroll p-5">
                <Container>{children}</Container>
              </main>
              <SourceCode link="https://github.com/issuefy" />
            </Theme>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
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
