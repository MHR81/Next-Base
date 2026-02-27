'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }) {

    useEffect(() => {
        console.error('Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-linear-to-br from-[#fff8f5] via-[#fff0e8] to-[#ffe8de] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-lg w-full"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="relative mb-8 inline-block"
                >
                    <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-xl flex items-center justify-center relative">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <AlertTriangle className="w-16 h-16 text-red-500" strokeWidth={1.5} />
                        </motion.div>

                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-red-100 rounded-full -z-10"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        pageError
                    </h2>
                    <p className="text-gray-500 mb-6 leading-relaxed">
                        unexpectedError
                        <br />
                        <br />
                       tryAgainLater
                    </p>

                    {process.env.NODE_ENV === 'development' && error?.message && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-left"
                        >
                            <div className="flex items-center gap-2 text-red-600 mb-2">
                                <Bug size={16} />
                                <span className="text-sm font-medium">
                                    errorDetails
                                    </span>
                            </div>
                            <p className="text-red-500 text-xs font-mono break-all">
                                {error.message}
                            </p>
                        </motion.div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={reset}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F4A261] text-white rounded-xl font-medium hover:bg-[#E89550] transition-colors shadow-lg shadow-orange-200"
                        >
                            <RefreshCw size={18} />
                            retry
                        </motion.button>

                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors w-full"
                            >
                                <Home size={18} />
                                goHome
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}