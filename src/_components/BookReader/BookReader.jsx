'use client';

import { useEffect, useState } from "react";
import { loadPdf } from "./usePdf";
import FlipBook from "./FlipBook";
import { useReadingProgress } from "./useReadingProgress";
import { useReaderControls } from "./useReaderControls";
import Controls from "./Controls";

const BookReader = ({
    pdfUrl,
    initialPage = 1,
    enableZoom = true,
    enableNavigation = true,
    enableProgressTracking = true,
    onProgress,
}) => {
    const [pdf, setPdf] = useState(null);
    const [pages, setPages] = useState(0);

    const {
        bookRef,
        zoom,
        next,
        prev,
        zoomIn,
        zoomOut,
    } = useReaderControls();

    const { markPage } = useReadingProgress(
        pages,
        onProgress,
        initialPage
    );

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const p = await loadPdf(pdfUrl);
                if (!mounted) return;
                setPdf(p);
                setPages(p.numPages || 0);
                console.debug("BookReader: setPdf -> pages", p.numPages);
            } catch (e) {
                // fail silently for now
            }
        };
        load();

        return () => { mounted = false; };
    }, [pdfUrl]);

    return (
        <div className="flex flex-col items-center py-6">
            <Controls
                next={next}
                prev={prev}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                enableZoom={enableZoom}
                enableNavigation={enableNavigation}
            />

            <FlipBook
                pdf={pdf}
                pages={pages}
                zoom={zoom}
                markPage={markPage}
                enableProgressTracking={enableProgressTracking}
                bookRef={bookRef}
                startPage={Math.min(initialPage, Math.max(1, pages))}
            />
        </div>
    );
};

export default BookReader;
