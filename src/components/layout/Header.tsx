import Link from 'next/link';

const Header = () => {
    return (
        <header className="flex items-center justify-between py-3 px-8">
            <h1 className="text-4xl font-bold">(TT)*</h1>
            <nav>
                <ul className="flex gap-5">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/ll1">LL1</Link>
                    </li>
                    <li>
                        <Link href="/lr">LR</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
