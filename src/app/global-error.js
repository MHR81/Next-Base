'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, RefreshCw, Server } from 'lucide-react';
// import { useLanguages } from '@/langueges/useLanguages';

export default function GlobalError({ error, reset }) {
    // const { t } = useLanguages();

    useEffect(() => {
        console.error('Global Error:', error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen bg-gradient-to-br from-[#fff8f5] via-[#fff0e8] to-[#ffe8de] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl"
                    >
                        {/* Critical Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-24 h-24 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center"
                        >
                            <AlertOctagon className="w-12 h-12 text-red-500" strokeWidth={1.5} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <Server className="w-5 h-5 text-gray-400" />
                                <span className="text-sm text-gray-400 font-medium">خطای سیستمی</span>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                {/* {t('common.systemError')} */}
                                systemError
                            </h2>

                            <p className="text-gray-500 mb-8 leading-relaxed">
                                {/* {t('common.somethingWentWrong')} */}
                                somethingWentWrong
                                <br />
                                <br />
                                {/* {t('common.pleaseTryAgain')} */}
                                pleaseTryAgain
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={reset}
                                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#F4A261] text-white rounded-xl font-medium hover:bg-[#E89550] transition-colors shadow-lg shadow-orange-200"
                            >
                                <RefreshCw size={18} />
                                {/* {t('common.retry')} */}
                                retry
                            </motion.button>
                        </motion.div>

                        {/* Footer */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 text-xs text-gray-400"
                        >
                           {/* {t('common.errorOccurred')} */}
                           errorOccurred
                        </motion.p>
                    </motion.div>
                </div>
            </body>
        </html>
    );
}