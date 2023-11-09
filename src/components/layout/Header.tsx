'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const Header = () => {
    const pathname = usePathname();

    return (
        <header className="flex items-center justify-between py-5 px-8 border-b">
            <h1 className="text-4xl font-bold">
                <Link href="/">(TT)*</Link>
            </h1>
            <nav>
                <ul className="flex gap-2 text-xl font-semibold text-gray-400">
                    <li>
                        <Link
                            className={twMerge(
                                'py-2 px-3 rounded-lg hover:bg-gray-200/70 transition-all duration-150',
                                pathname === '/' && 'text-black',
                            )}
                            href="/"
                        >
                            Gramática
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={twMerge(
                                'py-2 px-3 rounded-lg hover:bg-gray-200/70 transition-all duration-150',
                                pathname === '/ll1' && 'text-black',
                            )}
                            href="/ll1"
                        >
                            LL(1)
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={twMerge(
                                'py-2 px-3 rounded-lg hover:bg-gray-200/70 transition-all duration-150',
                                pathname === '/lr' && 'text-black',
                            )}
                            href="/lr"
                        >
                            LR
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
