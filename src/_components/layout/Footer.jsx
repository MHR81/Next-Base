'use client';

import React, { useState, useEffect } from 'react';
import { useLanguages } from '@/langueges/useLanguages';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Image from 'next/image';
import googlePlay from "@/_assets/SVGs/googlePlay.svg";

const footerLinks = {
    taghche: {
        title: 'Taghche',
        links: [
            { label: 'About', href: '/about' },
            { label: 'Help', href: '/help' },
        ]
    },
    contact: {
        title: 'Contact',
        items: [
            { label: 'Email Us', value: '*****@gmail.com', type: 'email' },
            { label: 'Phone', value: '0*******', type: 'phone' },
        ]
    }
};

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const { t } = useLanguages();

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="relative bg-white pt-16 w-full pb-8 mt-20">
            <div className="absolute top-0 left-0 right-0">
                <div className="max-w-6xl mx-auto px-6 relative">
                    <div className="border-t border-gray-200" />

                    <motion.button
                        onClick={scrollToTop}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: showScrollTop ? 1 : 0.5, y: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
              absolute left-1/2 -translate-x-1/2 -top-6
              w-12 h-12 rounded-full bg-white
              border border-teal-400/50
              flex items-center justify-center
              text-teal-500 shadow-sm
              hover:border-teal-400 hover:text-teal-600
              hover:shadow-md transition-all duration-300
              ${showScrollTop ? 'cursor-pointer' : 'cursor-default'}
            `}
                    >
                        <ArrowUp size={20} strokeWidth={2} />
                    </motion.button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

                    <div className="flex justify-center items-center sm:col-span-2 lg:col-span-1">
                        <span
                            className="text-5xl font-serif italic text-gray-800 tracking-tight"
                            style={{ fontFamily: "Hurricane-Regular, robotoRegular" }}
                        >
                            {t('footer.brand')}
                        </span>
                    </div>

                    <div className='self-end'>
                        <h4 className="text-gray-900 font-semibold text-base mb-4">
                            {t('footer.taghche.title')}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.taghche.links.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                                    >
                                        {link.label === 'About' ? t('footer.taghche.about') : link.label === 'Help' ? t('footer.taghche.help') : link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-semibold text-base mb-4">
                            {t('footer.contact.title')}
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.contact.items.map((item) => (
                                <li key={item.label} className="text-sm">
                                    <span className="text-gray-500">{item.type === 'email' ? t('footer.contact.email_label') : item.type === 'phone' ? t('footer.contact.phone_label') : item.label} : </span>
                                    <span className="text-gray-400">{item.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-semibold text-base mb-4">
                            {t('footer.download.title')}
                        </h4>
                        <a
                            href="https://play.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block hover:opacity-80 transition-opacity"
                        >
                            <Image
                                width={100}
                                height={40}
                                src={googlePlay}
                                alt={t('footer.download.google_play_alt')}
                                className="h-10 w-auto"
                            />
                        </a>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-1">
                        <h4 className="text-gray-900 font-semibold text-base mb-4">
                            {t('footer.account')}
                        </h4>
                        <div className="bg-gray-100 rounded-xl p-4 min-h-[80px]">
                            <p className="text-gray-500 text-sm">{t('footer.account_email_placeholder')}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-gray-100">
                    <p className="text-center text-gray-400 text-xs">
                        {t('footer.copyright_prefix')} {new Date().getFullYear()} {t('footer.brand')}. {t('footer.copyright_suffix')}
                    </p>
                </div>
            </div>
        </footer>
    );
}