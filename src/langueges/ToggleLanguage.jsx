'use client';

import { useLanguages } from '@/langueges/useLanguages';
import { GrLanguage } from "react-icons/gr";

export default function ToggleLanguage({ className }) {
    const { changeLanguage, lang } = useLanguages();

    return (
        <button
            onClick={() => changeLanguage(lang === 'fa' ? 'en' : 'fa')}
            className={`flex items-center justify-center text-center ${className}`}
        >
            <GrLanguage size={16} className='text-accent-hover mb-1 hover:scale-110 transition-transform' />
            {/* <span>{lang === 'fa' ? 'EN' : 'FA'}</span> */}
        </button>
    );
}