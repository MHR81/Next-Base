'use client';

import React from 'react';
import { useGlobalAudio } from '@/hooks/useGlobalAudio';
import { useLanguages } from '@/langueges/useLanguages';


export default function AudioPlayer({
    audioSrc,
    coverImage,
    title = 'Unknown Title',
    author = 'Unknown Author',
    onEnded = null,
    onNext = null,
    onPrevious = null,
}) {
    const { playAudio } = useGlobalAudio();
    const { t } = useLanguages();

    const handlePlay = () => {
        playAudio({
            audioSrc,
            coverImage,
            title,
            author,
            onEnded,
            onNext,
            onPrevious,
        });
    };

    // اگر به یک دکمه نیاز داری برای تست
    return (
        <button
            onClick={handlePlay}
            className="flex justify-center items-center text-center ps-3.5 pe-2.5 pt-1 pb-0 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors font-medium"
        >
            ▶
        </button>
    );
}
