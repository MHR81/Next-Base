"use client";

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageView = ({ currentPage, numPages, scale, isMobile, goNext, goPrev, PageComponent, rtl = false }) => {
    const showDoublePage = !isMobile && currentPage > 1 && currentPage < numPages;

    const pageVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const prevPageRef = useRef(currentPage);
    const direction = currentPage > prevPageRef.current ? 1 : -1;
    const effectiveDirection = rtl ? direction : +direction;
    useEffect(() => {
        prevPageRef.current = currentPage;
    }, [currentPage]);

    const renderPage = (pageNumber, className = '', single = false) => {
        const effectiveScale = scale;

        return (
            <motion.div
                key={pageNumber}
                custom={effectiveDirection}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                }}
                className={`bg-white overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]
                    ${single ? 'w-[min(600px,100vw)] xl:w-[min(880px,30vw)]' : 'w-[min(350px,100vw)] lg:w-[min(450px,100vw)] xl:w-[min(520px,30vw)]'}
                    ${className}
                    `}
            >
                {PageComponent ? (
                    <PageComponent
                        pageNumber={pageNumber}
                        scale={effectiveScale}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="shadow-inner"
                        onRenderSuccess={() => console.debug('Page rendered', pageNumber)}
                        onRenderError={(err) => console.error('Page render error', pageNumber, err)}
                    />
                ) : (
                    <div className="p-8 text-center">PDF renderer unavailable</div>
                )}
            </motion.div>
        );
    };

    return (
        <div className="relative flex items-center justify-center gap-1">
            <AnimatePresence mode="wait" initial={false}>
                {showDoublePage ? (
                    <div className="flex flex-row-reverse items-center gap-2">
                        {renderPage(currentPage + 1, 'rounded-l-lg')}
                        <div className="w-4 h-full shadow-inner" />
                        {renderPage(currentPage, 'rounded-r-lg')}
                    </div>
                ) : (
                    renderPage(currentPage, 'rounded-lg', true)
                )}
            </AnimatePresence>
        </div>
    );
};

export default PageView;
