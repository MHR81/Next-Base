'use client';

import BooksImage from '@/_assets/images/books.png';
import AnimatedSearchBox from './AnimatedSearchBox';
import { useLanguages } from '@/langueges/useLanguages';
import Image from 'next/image';

export default function HomeBanner({ scrollY }) {
    const { t, isRTL } = useLanguages();

    return (
        <div className={`flex items-center justify-center relative w-full h-full ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#CFD0E0] to-[#7B81AA]`}>
            <div className="flex flex-col items-center justify-center px-5 pb-16 pt-16 font-[Gilroy-Medium] mb-5 sm:me-44 lg:me-80">
                <span className="bg-gradient-to-b from-[#50568e] to-transparent bg-clip-text text-transparent text-2xl sm:text-3xl">
                    {t('homeBanner.title')}
                </span>
                <span className="text-[#50568e]/95 text-center w-md text-3xl sm:text-4xl">
                    {t('homeBanner.subtitle')}
                </span>
                <AnimatedSearchBox scrollY={scrollY} variant="banner" />
            </div>

            <Image width={170} height={100} src={BooksImage} alt="Books" className={`${isRTL ? 'rotate-y-180' : ''} absolute sm:end-32 end-10 -bottom-7 w-40 sm:w-44 md:w-48 object-cover`} />
        </div>
    );
}