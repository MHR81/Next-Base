'use client';

import { motion } from 'framer-motion';
import { Search, Home, BookX } from 'lucide-react';
import Link from 'next/link';
import { useLanguages } from '@/langueges/useLanguages';


export default function NotFound() {
    const { t } = useLanguages();
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#CFD0E0] to-[#7B81AA] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-lg w-full"
            >
                {/* 404 Illustration */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative mb-8 inline-block"
                >
                    <div className="w-48 h-48 mx-auto relative">
                        {/* Background circle */}
                        <div className="absolute inset-0 bg-white rounded-full shadow-xl" />

                        {/* Book with X */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: [-5, 5, -5] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <BookX className="w-24 h-24 text-[#F4A261]" strokeWidth={1.5} />
                            </motion.div>
                        </div>

                        {/* Floating elements */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-2 -right-2 w-12 h-12 bg-[#F4A261]/10 rounded-full flex items-center justify-center"
                        >
                            <Search className="w-6 h-6 text-[#F4A261]" />
                        </motion.div>
                    </div>

                    {/* 404 Text */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="text-8xl font-bold text-[#F4A261] mt-6"
                    >
                        404
                    </motion.h1>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        {/* {t('common.pageNotFound')} */}
                        pageNotFound
                    </h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        {/* {t('common.sorryPageNotFound')} */}
                        sorryPageNotFound
                        <br />
                        <br />
                        {/* {t('common.maybeTrySearching')} */}
                        maybeTrySearching
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F4A261] text-white rounded-xl font-medium hover:bg-[#E89550] transition-colors shadow-lg shadow-orange-200"
                            >
                                <Home size={18} />
                                {/* {t('common.home')} */}
                                home
                            </motion.button>
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.history.back()}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                        >
                          {/* {t('common.goBack')} */}
                          goBack
                        </motion.button>
                    </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-[#F4A261]/5 rounded-full blur-xl" />
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#F4A261]/5 rounded-full blur-xl" />
            </motion.div>
        </div>
    );
}