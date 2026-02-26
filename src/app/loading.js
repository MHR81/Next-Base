'use client';

// import { useLanguages } from '@/langueges/useLanguages';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function Loading() {
    // const { t } = useLanguages();
    return (
        <div className="min-h-screen bg-gradient-white/5 backdrop:blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                <motion.div
                    animate={{
                        rotateY: [0, 180, 360],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative"
                >
                    <div className="w-20 h-24 bg-gradient-to-br from-[#F4A261] to-[#E89550] rounded-r-lg rounded-l-sm shadow-lg flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute -right-2 top-1 w-4 h-22 bg-white/30 rounded-r"
                    />
                </motion.div>

                <div className="text-center">
                    <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-gray-600 font-medium"
                    >
                        {/* {t('common.loading')} */}
                        loading
                    </motion.p>
                    <div className="flex gap-1 justify-center mt-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                                className="w-2 h-2 bg-[#F4A261] rounded-full"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}