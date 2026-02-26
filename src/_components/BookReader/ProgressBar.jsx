import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ currentPage, numPages }) => {
    const progress = numPages ? (currentPage / numPages) * 100 : 0;

    return (
        <div className="bg-white px-4 py-2">
            <div className="max-w-4xl mx-auto flex items-center gap-3">
                <div className="flex-1 bg-amber-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-l from-amber-500 to-orange-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                </div>
                <span className="text-xs font-medium whitespace-nowrap">
                    {Math.round(progress)}%
                </span>
            </div>
        </div>
    );
};

export default ProgressBar;