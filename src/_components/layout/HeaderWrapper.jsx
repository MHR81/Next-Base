 'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import TopHeader from './TopHeader';
import BottomHeader from './BottomHeader';
import HomeBanner from './HomeBanner';

const BANNER_MAX = 280;

export default function HeaderWrapper({ isHome }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const pathname = usePathname();
    const localIsHome = pathname === '/';
    const finalIsHome = typeof isHome === 'boolean' ? isHome : localIsHome;

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const topHeaderOpacity = Math.min(scrollY / 100, 1);

    return (
        <>
            <TopHeader
                scrollY={scrollY}
                setIsMenuOpen={setIsMenuOpen}
                isMenuOpen={isMenuOpen}
                opacity={finalIsHome ? topHeaderOpacity : 1}
                isTransparent={finalIsHome && scrollY < 400}
            />

            {finalIsHome && (
                <div
                    className="relative w-full overflow-hidden"
                    style={{
                        height: Math.max(BANNER_MAX - scrollY, 0),
                        opacity: Math.max(1 - scrollY / 200, 0),
                        willChange: 'transform, height, opacity',
                    }}
                >
                    <HomeBanner scrollY={scrollY} />
                </div>
            )}

            <BottomHeader />
        </>
    );
}