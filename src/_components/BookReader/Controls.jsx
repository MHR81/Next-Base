'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const IconButton = ({ onClick, disabled, children, title }) => (
    <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        disabled={disabled}
        title={title}
        className="p-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md "
    >
        {children}
    </motion.button>
);

const Controls = ({
    currentPage,
    numPages,
    scale,
    goPrev,
    goNext,
    goToPage,
    zoomIn,
    zoomOut,
    resetZoom
}) => {
    const [inputPage, setInputPage] = useState('');

    const handlePageInput = (e) => {
        e.preventDefault();
        const page = parseInt(inputPage);
        if (page >= 1 && page <= numPages) {
            goToPage(page);
            setInputPage('');
        }
    };

    return (
        <div className="bg-white/95 backdrop-blur-md px-4 py-3 ">
            <div className="max-w-4xl mx-auto flex items-center justify-center gap-4 flex-wrap">

                <div className="flex items-center gap-2">
                    <IconButton onClick={goNext} disabled={currentPage >= numPages} title="صفحه بعد">
                        <ChevronRightIcon />

                    </IconButton>

                    <form onSubmit={handlePageInput} className="flex items-center gap-2">
                        <input
                            type="number"
                            min={1}
                            max={numPages}
                            value={inputPage || currentPage}
                            onChange={(e) => setInputPage(e.target.value)}
                            className="w-16 text-center px-2 py-1 rounded-lg focus:ring-2 outline-none"
                        />
                        <span className="">از {numPages || '...'}</span>
                    </form>


                    <IconButton onClick={goPrev} disabled={currentPage <= 1} title="صفحه قبل">
                        <ChevronLeftIcon />

                    </IconButton>
                </div>

                {/* کنترل زوم */}
                {/* <div className="flex items-center gap-2">
                    <IconButton onClick={zoomOut} title="کوچک‌تر">
                        <ZoomOutIcon />
                    </IconButton>

                    <span className="text-sm w-16 text-center font-medium">
                        {Math.round(scale * 100)}%
                    </span>

                    <IconButton onClick={zoomIn} title="بزرگ‌تر">
                        <ZoomInIcon />
                    </IconButton>

                    <div className="w-px h-6 mx-2" />

                    <IconButton onClick={resetZoom} title="ریست زوم">
                        <ResetIcon />
                    </IconButton>
                </div> */}
            </div>
        </div>
    );
};

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
);

const ZoomInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="11" x2="11" y1="8" y2="14" /><line x1="8" x2="14" y1="11" y2="11" /></svg>
);

const ZoomOutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="8" x2="14" y1="11" y2="11" /></svg>
);

const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" /></svg>
);

export default Controls;