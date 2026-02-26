'use client';

import ToggleLanguage from '@/langueges/ToggleLanguage';
import AnimatedSearchBox from './AnimatedSearchBox';
import MenuSvg from '@/_assets/SVGs/menu.svg';
import { useLanguages } from '@/langueges/useLanguages';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils/helpers';

export default function TopHeader({ opacity, isTransparent, setIsMenuOpen, isMenuOpen, scrollY }) {
    const { isRTL, t } = useLanguages();

    const headerButtons = [
        { label: t('common.Login'), href: '/login', id: 'login' },
        { label: t('common.Contact'), href: '/contact', id: 'contact' },
        { label: t('common.About'), href: '/about', id: 'about' },
        { label: t('common.Download App'), href: '/download', id: 'download' }
    ];

    return (
        <header
            className="fixed top-0 z-40 w-full transition-all duration-300"
            style={{
                backgroundColor: isTransparent ? `rgba(255, 255, 255, ${opacity})` : 'white',
                backdropFilter: isTransparent ? 'blur(10px)' : 'none',
            }}
        >
            <div className="relative max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                <button
                    className={`${isRTL ? 'rotate-y-180' : ''} absolute start-0 p-1 rounded-lg hover:bg-[#d4d6e4] transition-colors`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Image src={MenuSvg} alt='menu' className='text-gray-700 transition-colors' width={30} height={30} />
                </button>

                <Link href={"/"} className='text-3xl ms-8 font-medium' style={{ fontFamily: "Hurricane-Regular, robotoRegular" }}>
                    {t('common.Taghche')}
                </Link>

                <AnimatedSearchBox scrollY={scrollY} variant="header" />

                <div className="hidden lg:flex justify-end items-center gap-3 lg:gap-5 text-sm sm:-me-5 md:me-0">
                    <ToggleLanguage />
                    {headerButtons.map((button, index) => (
                        <Link
                            key={index}
                            href={button.href}
                            className={cn(
                                "text-text2 hover:text-text transition-colors hover:scale-110 transition-transform",
                                button.id === 'download' && "border border-accent py-1 px-2 rounded-lg hover:bg-accent hover:text-white"
                            )}
                        >
                            {button.label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}