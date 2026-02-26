"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import useBookReader from '@/hooks/useBookReader';
import useSwipe from './useSwipe';
import { useLanguages } from '@/langueges/useLanguages';

const PdfViewerClient = dynamic(() => import('./PdfViewerClient'), { ssr: false });

const BookReader = ({
    pdfUrl,
    pdfFile,
    title = 'کتاب',
    initialPage = 1,
    onPageChange,
    onLoadComplete,
    showControls = true,
    onProgress, // (progress) => void
    setProgress, // { readPages: number[], lastReadPage: number }
    readingTime = 5000,
}) => {
    const containerRef = useRef(null);
    const { t } = useLanguages();

    const {
        numPages,
        currentPage,
        scale,
        isLoading,
        error,
        isMobile,
        setNumPages,
        goToPage,
        goNext,
        goPrev,
        zoomIn,
        zoomOut,
        resetZoom,
    } = useBookReader({ initialPage, onPageChange });

    const file = pdfFile || pdfUrl;

    const perPageTimeRef = useRef({});
    const startTimeRef = useRef(null);
    const readPagesRef = useRef(new Set());
    const currentPageRef = useRef(currentPage);

    const reportProgress = useCallback(() => {
        if (!onProgress) return;
        const total = numPages || 0;
        const read = Array.from(readPagesRef.current).sort((a, b) => a - b);
        const last = read.length ? read[read.length - 1] : null;
        const percent = total ? Math.round((read.length / total) * 100) : 0;
        onProgress({ readPages: read, totalPages: total, percent, lastReadPage: last });
    }, [onProgress, numPages]);

    const getDisplayedPages = useCallback((page) => {
        if (!page) return [];
        const pages = [];
        if (!isMobile && page > 1 && page < (numPages || Infinity)) {
            if (page <= (numPages || 0)) pages.push(page);
            if (page + 1 <= (numPages || 0)) pages.push(page + 1);
        } else {
            pages.push(page);
        }
        return pages;
    }, [isMobile, numPages]);

    const addTimeForPages = useCallback((pages, deltaMs) => {
        if (!pages || pages.length === 0) return;
        let added = false;
        pages.forEach((p) => {
            const prev = perPageTimeRef.current[p] || 0;
            const updated = prev + deltaMs;
            perPageTimeRef.current[p] = updated;
            if (updated >= readingTime && !readPagesRef.current.has(p)) {
                readPagesRef.current.add(p);
                added = true;
            }
        });
        if (added) reportProgress();
    }, [reportProgress, readingTime]);

    useEffect(() => {
        if (numPages) reportProgress();
    }, [numPages, reportProgress]);

    useEffect(() => {
        if (!setProgress) return;
        const saved = Array.isArray(setProgress.readPages) ? setProgress.readPages : [];
        saved.forEach(p => {
            readPagesRef.current.add(p);
            perPageTimeRef.current[p] = Math.max(perPageTimeRef.current[p] || 0, 1000);
        });
        reportProgress();
        const last = setProgress.lastReadPage || (saved.length ? Math.max(...saved) : null);
        if (last) {
            setTimeout(() => {
                goToPage(Math.max(1, Math.min(last, numPages || last)));
            }, 50);
        }
    }, [setProgress, reportProgress, goToPage, numPages]);

    const onDocumentLoadSuccess = ({ numPages: pages }) => {
        setNumPages(pages);
        onLoadComplete?.({ numPages: pages });
    };

    const onDocumentLoadError = (err) => {
        console.error('PDF Load Error:', err);
    };

    useEffect(() => {
        const checkMobile = () => window.innerWidth < 768;
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
        // onSwipeLeft: goNext,
        // onSwipeRight: goPrev,
        // threshold: 50,
    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') goPrev();
            if (e.key === 'ArrowLeft') goNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goNext, goPrev]);

    useEffect(() => {
        startTimeRef.current = Date.now();
        currentPageRef.current = currentPage;
        return () => {
            if (startTimeRef.current) {
                const pages = getDisplayedPages(currentPageRef.current);
                addTimeForPages(pages, Date.now() - startTimeRef.current);
                startTimeRef.current = null;
            }
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const prev = currentPageRef.current;
        if (prev !== currentPage) {
            if (startTimeRef.current) {
                const pages = getDisplayedPages(prev);
                addTimeForPages(pages, Date.now() - startTimeRef.current);
            }
            startTimeRef.current = Date.now();
            currentPageRef.current = currentPage;
        }
    }, [currentPage, addTimeForPages, getDisplayedPages]);

    useEffect(() => {
        const handleVisibility = () => {
            if (document.hidden) {
                if (startTimeRef.current) {
                    const pages = getDisplayedPages(currentPageRef.current);
                    addTimeForPages(pages, Date.now() - startTimeRef.current);
                    startTimeRef.current = null;
                }
            } else {
                startTimeRef.current = Date.now();
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, [addTimeForPages, getDisplayedPages]);


    if (!file) {
        return (
            <div className="flex items-center justify-center h-96 rounded-xl">
                <p className="">{t('common.noFile')}</p>
            </div>
        );
    }

    const loadingNode = (
        <div className="flex flex-col items-center justify-center gap-4">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full"
            />
            <p className="">{t('common.loading')}</p>
        </div>
    );

    const errorNode = (
        <div className="text-center p-8 bg-red-50 rounded-xl">
            <p className="text-red-600 mb-2">{t('common.loadError')}</p>
            <p className="text-red-400 text-sm">{t('common.checkFile')}</p>
        </div>
    );

    return (
        <div ref={containerRef} className="flex flex-col h-screen overflow-hidden" dir="rtl">
            <div className="bg-white/90 backdrop-blur-md px-4 py-3 shadow-sm shrink-0 z-10">
                <h2 className="text-lg font-bold truncate">{title}</h2>
            </div>

            <div
                className="flex-1 max-h-[570px] relative overflow-hidden flex items-center justify-center p-4 touch-pan-y"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <PdfViewerClient
                    file={file}
                    onDocumentLoadSuccess={onDocumentLoadSuccess}
                    onDocumentLoadError={onDocumentLoadError}
                    loadingComponent={loadingNode}
                    errorComponent={errorNode}
                    currentPage={currentPage}
                    numPages={numPages}
                    scale={scale}
                    isMobile={isMobile}
                    goNext={goNext}
                    goPrev={goPrev}
                    rtl={true}
                />
            </div>

            {showControls && numPages && (
                <Controls
                    currentPage={currentPage}
                    numPages={numPages}
                    scale={scale}
                    goPrev={goPrev}
                    goNext={goNext}
                    goToPage={goToPage}
                    zoomIn={zoomIn}
                    zoomOut={zoomOut}
                    resetZoom={resetZoom}
                />
            )}

            {numPages && <ProgressBar currentPage={currentPage} numPages={numPages} />}
        </div>
    );
};

export default BookReader;
