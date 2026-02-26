'use client';

// Modal.jsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/helpers';
import { useLanguages } from '@/langueges/useLanguages';

// Lock body scroll
const useLockBodyScroll = (isLocked) => {
    useEffect(() => {
        if (!isLocked) return;
        const original = document.body.style.overflow;
        const paddingRight = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        if (paddingRight > 0) document.body.style.paddingRight = `${paddingRight}px`;

        return () => {
            document.body.style.overflow = original;
            document.body.style.paddingRight = '';
        };
    }, [isLocked]);
};

// Focus trap
const useFocusTrap = (isActive, onEscape) => {
    const ref = useRef(null);
    const previous = useRef(null);

    useEffect(() => {
        if (!isActive) return;
        previous.current = document.activeElement;

        const focusable = () => {
            if (!ref.current) return [];
            return Array.from(ref.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )).filter(el => !el.disabled && el.offsetParent !== null);
        };

        const elements = focusable();
        elements[0]?.focus();

        const handleKey = (e) => {
            if (e.key === 'Escape' && onEscape) {
                e.preventDefault();
                onEscape();
                return;
            }
            if (e.key !== 'Tab') return;

            const focusableElements = focusable();
            if (focusableElements.length === 0) return;

            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('keydown', handleKey);
            previous.current?.focus();
        };
    }, [isActive, onEscape]);

    return ref;
};

// Size classes
const sizeClasses = {
    xs: 'max-w-sm',
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-xl',
    xl: 'max-w-2xl',
    full: 'max-w-full mx-4',
};

// Animation classes
const animationClasses = {
    fade: 'opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100',
    slide: 'opacity-0 translate-y-4 data-[state=open]:opacity-100 data-[state=open]:translate-y-0',
    zoom: 'opacity-0 scale-75 data-[state=open]:opacity-100 data-[state=open]:scale-100',
};

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    position = 'center',
    animation = 'fade',
    closeOnOverlay = true,
    closeOnEscape = true,
    showClose = true,
    actions = [],
    className,
}) => {
    useLockBodyScroll(isOpen);
    const contentRef = useFocusTrap(isOpen, closeOnEscape ? onClose : null);
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        if (isOpen) requestAnimationFrame(() => setMounted(true));
        else setMounted(false);
    }, [isOpen]);

    if (!isOpen && !mounted) return null;

    const modal = (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm',
                    'transition-opacity duration-300',
                    mounted ? 'opacity-100' : 'opacity-0'
                )}
                onClick={() => closeOnOverlay && onClose()}
                aria-hidden="true"
            />

            {/* Content */}
            <div
                ref={contentRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                data-state={mounted ? 'open' : 'closed'}
                className={cn(
                    'fixed z-50 w-full bg-white dark:bg-gray-900 shadow-2xl',
                    'flex flex-col transition-all duration-300',
                    sizeClasses[size],
                    animationClasses[animation],
                    position === 'center' && 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl max-h-[90vh]',
                    position === 'top' && 'left-1/2 top-4 -translate-x-1/2 rounded-xl',
                    position === 'bottom' && 'left-1/2 bottom-4 -translate-x-1/2 rounded-xl',
                    className
                )}
            >
                {/* Header */}
                {(title || showClose) && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        {title && (
                            <h2 id="modal-title" className="text-lg font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h2>
                        )}
                        {showClose && (
                            <button
                                onClick={onClose}
                                className={cn(
                                    'p-2 -mr-2 rounded-lg transition-colors',
                                    'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
                                    'hover:bg-gray-100 dark:hover:bg-gray-800'
                                )}
                                aria-label={useLanguages().t('common.close') || 'close'}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {children}
                </div>

                {/* Actions */}
                {actions.length > 0 && (
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                        {actions.map((action, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={action.onClick}
                                disabled={action.disabled || action.loading}
                                className={cn(
                                    'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                                    'disabled:opacity-50 disabled:cursor-not-allowed',
                                    'flex items-center gap-2',

                                    // Variants
                                    action.variant === 'danger' && 'bg-red-500 hover:bg-red-600 text-white',
                                    action.variant === 'primary' && 'bg-blue-500 hover:bg-blue-600 text-white',
                                    action.variant === 'success' && 'bg-green-500 hover:bg-green-600 text-white',
                                    action.variant === 'ghost' && 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',

                                    // Default
                                    !action.variant && 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100',

                                    // Loading
                                    action.loading && 'opacity-70 cursor-wait'
                                )}
                            >
                                {action.loading && (
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                )}
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );

    return createPortal(modal, document.body);
};