"use client";

import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PageView from './PageView';
import './react-pdf-layers.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewerClient = ({
    file,
    onDocumentLoadSuccess,
    onDocumentLoadError,
    loadingComponent,
    errorComponent,
    currentPage,
    numPages,
    scale,
    isMobile,
    goNext,
    goPrev,
    rtl = false,
}) => {
    return (
        <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={loadingComponent}
            error={errorComponent}
        >
            {numPages && (
                <PageView
                    currentPage={currentPage}
                    numPages={numPages}
                    scale={scale}
                    isMobile={isMobile}
                    goNext={goNext}
                    goPrev={goPrev}
                    PageComponent={Page}
                    rtl={rtl}
                />
            )}
        </Document>
    );
};

export default PdfViewerClient;
