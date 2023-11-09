import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '~/components/layout/Header';
import Provider from '~/components/layout/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Tleng Tools',
    description: 'Tools for Tleng',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Provider>
                <body className={inter.className}>
                    <Header />
                    {children}
                </body>
            </Provider>
        </html>
    );
}
