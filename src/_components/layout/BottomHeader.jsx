'use client';

import { useRef } from 'react';
import { useLanguages } from '@/langueges/useLanguages';
import Image from 'next/image';
import Upload_book from '@/_assets/images/upload_book.png';
import Upload_Audio from '@/_assets/images/upload_Audio.png';
import Popular_Audio from '@/_assets/images/Popular_Audio.png';
import Electronic_books from '@/_assets/images/Electronic_books.png';
import Audio_books from '@/_assets/images/Audio_books.png';

export default function BottomHeader() {
    const { t } = useLanguages();
    const scrollRef = useRef(null);

    const categories = [
        { id: 1, name: t('common.upload book'), icon: Upload_book },
        { id: 2, name: t('common.upload Audio'), icon: Upload_Audio },
        { id: 3, name: t('common.Audio books'), icon: Audio_books },
        { id: 4, name: t('common.Electronic books'), icon: Electronic_books },
        { id: 5, name: t('common.Popular Audio'), icon: Popular_Audio },
    ];

    return (
        <nav className="sticky top-[63px] z-40 w-full bg-white md:px-10 lg:px-5 xl:px-0 max-w-6xl">
            <div className="relative mx-auto px-4 flex items-center justify-center">
                <div ref={scrollRef} className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide scroll-smooth">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-t from-[#FAFAFA] to-[#d8d8d889] transition-all duration-200 whitespace-nowrap group hover:shadow-md hover:from-[#F5F5F5] hover:to-[#d8d8d8cc]"
                        >
                            <span className="text-lg group-hover:scale-110 transition-transform flex-shrink-0">
                                <Image width={16} height={16} src={cat.icon} alt={cat.name} className="sm:w-5 sm:h-5" />
                            </span>
                            <span className="text-xs sm:text-sm font-medium">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}