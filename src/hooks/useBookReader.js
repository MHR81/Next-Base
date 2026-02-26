'use client';

import { useState, useCallback, useEffect } from 'react';

const useBookReader = ({ initialPage = 1, onPageChange }) => {
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [scale, setScale] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // تشخیص موبایل
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const setNumPagesAndInit = useCallback((pages) => {
        setNumPages(pages);
        setIsLoading(false);
        // اگه صفحه اولیه بیشتر از تعداد صفحات بود، اصلاحش کن
        if (initialPage > pages) {
            setCurrentPage(1);
        }
    }, [initialPage]);

    const goToPage = useCallback((page) => {
        if (page >= 1 && page <= numPages) {
            setCurrentPage(page);
            onPageChange?.(page, numPages);
        }
    }, [numPages, onPageChange]);

    const goNext = useCallback(() => {
        // در حالت دسکتاپ (دو صفحه‌ای)، دو تا دو تا برو جلو
        const step = (!isMobile && currentPage > 1) ? 2 : 1;
        const nextPage = Math.min(currentPage + step, numPages || 1);
        goToPage(nextPage);
    }, [currentPage, numPages, isMobile, goToPage]);

    const goPrev = useCallback(() => {
        // در حالت دسکتاپ، دو تا دو تا برو عقب
        const step = (!isMobile && currentPage > 2) ? 2 : 1;
        const prevPage = Math.max(currentPage - step, 1);
        goToPage(prevPage);
    }, [currentPage, isMobile, goToPage]);

    const zoomIn = useCallback(() => {
        setScale(prev => Math.min(prev + 0.2, 3));
    }, []);

    const zoomOut = useCallback(() => {
        setScale(prev => Math.max(prev - 0.2, 0.5));
    }, []);

    const resetZoom = useCallback(() => {
        setScale(1.2);
    }, []);

    return {
        numPages,
        currentPage,
        scale,
        isLoading,
        error,
        isMobile,
        setNumPages: setNumPagesAndInit,
        goToPage,
        goNext,
        goPrev,
        zoomIn,
        zoomOut,
        resetZoom
    };
};

export default useBookReader;