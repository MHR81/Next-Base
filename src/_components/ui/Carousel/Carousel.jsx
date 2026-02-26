'use client';

import { useEffect, useRef, useState, Children, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import { useLanguages } from '@/langueges/useLanguages';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { cn } from '@/utils/helpers';

const BREAKPOINTS = { xs: 300, sm: 500, md: 768, lg: 1024, xl: 1280, xxl: 1536 };

const getVisibleItems = (itemsPerView, width) => {
    if (typeof itemsPerView === 'number') return itemsPerView;
    if (!itemsPerView || typeof itemsPerView !== 'object') return 1;

    const { default: def = 1, xs, sm, md, lg, xl, xxl } = itemsPerView;

    if (width >= BREAKPOINTS.xxl && xxl) return xxl;
    if (width >= BREAKPOINTS.xl && xl) return xl;
    if (width >= BREAKPOINTS.lg && lg) return lg;
    if (width >= BREAKPOINTS.md && md) return md;
    if (width >= BREAKPOINTS.sm && sm) return sm;
    if (width >= BREAKPOINTS.xs && xs) return xs;
    return def;
};

const getGapValue = (gap, width) => {
    if (typeof gap === 'number') return gap;
    if (!gap || typeof gap !== 'object') return 16;

    const { default: def = 16, xs, sm, md, lg, xl, xxl } = gap;

    if (width >= BREAKPOINTS.xxl && xxl) return xxl;
    if (width >= BREAKPOINTS.xl && xl) return xl;
    if (width >= BREAKPOINTS.lg && lg) return lg;
    if (width >= BREAKPOINTS.md && md) return md;
    if (width >= BREAKPOINTS.sm && sm) return sm;
    if (width >= BREAKPOINTS.xs && xs) return xs;
    return def;
};

export default function Carousel({
    children,
    itemsPerView = { default: 1, xs: 2, sm: 3, md: 4, lg: 5, xl: 5, xxl: 6 },
    gap = { default: 10, xs: 20, sm: 25, md: 30, lg: 35, xl: 40, xxl: 45 },
    loop = true,
    autoplay = true,
    autoplayInterval = 3000,
    pauseOnHover = false,
    draggable = true,
    showArrows = true,
    showDots = false,
    arrowStyle = 'minimal',
    transition = { type: 'spring', stiffness: 200, damping: 50 },
    className = '',
    containerClassName = '',
    onIndexChange,
    initialIndex = 0,
    rounded = "md",
    ...props
}) {
    const { t } = useLanguages();
    const containerRef = useRef(null);
    const autoplayTimerRef = useRef(null);
    const isHoveringRef = useRef(false);
    const isDraggingRef = useRef(false);
    const rafRef = useRef(null);

    const childrenArray = useMemo(() => Children.toArray(children), [children]);
    const total = childrenArray.length;

    const [mounted, setMounted] = useState(false);
    const [current, setCurrent] = useState(() => Math.max(0, Math.min(initialIndex, total - 1)));
    const [dimensions, setDimensions] = useState({
        width: 0,
        visible: 1,
        gap: 16,
        itemWidth: 0,
        centerOffset: 0
    });

    const x = useMotionValue(0);
    const springX = useSpring(x, transition);

    const { visible, itemWidth, gap: currentGap, centerOffset } = dimensions;

    const effectiveAutoplay = useMemo(() => {
        return Boolean(autoplay) && total > visible;
    }, [autoplay, total, visible]);

    const indexOffset = useMemo(() => (loop ? visible : 0), [loop, visible]);
    const maxIndex = useMemo(() => Math.max(0, total - visible), [total, visible]);
    const step = useMemo(() => itemWidth + currentGap, [itemWidth, currentGap]);

    const slides = useMemo(() => {
        if (!loop || visible <= 0) return childrenArray;
        const clones = Math.min(visible, total);
        return [
            ...childrenArray.slice(-clones),
            ...childrenArray,
            ...childrenArray.slice(0, clones)
        ];
    }, [childrenArray, loop, visible, total]);

    const internalIndex = useMemo(() => {
        return current + indexOffset;
    }, [current, indexOffset]);

    const [dir, setDir] = useState('ltr');

    useEffect(() => {
        setMounted(true);
        setDir(document.documentElement.dir || 'ltr');

        const observer = new MutationObserver(() => {
            setDir(document.documentElement.dir || 'ltr');
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['dir']
        });

        return () => observer.disconnect();
    }, []);

        const measure = useCallback((skipRAF = false) => {
        if (!containerRef.current || !mounted) return;

        const doMeasure = () => {
            const rect = containerRef.current.getBoundingClientRect();
            const width = rect.width || window.innerWidth;

            const newVisible = Math.max(1, Math.min(getVisibleItems(itemsPerView, width), total));
            const newGap = Math.max(0, getGapValue(gap, width));

            let newItemWidth = Math.floor((width - newGap * (newVisible - 1)) / newVisible);
            if (!isFinite(newItemWidth) || newItemWidth <= 0) {
                newItemWidth = Math.floor(width / newVisible);
            }

            const totalUsed = newItemWidth * newVisible + newGap * (newVisible - 1);
            const newCenterOffset = Math.max(0, Math.floor((width - totalUsed) / 2));

            setDimensions({
                width,
                visible: newVisible,
                gap: newGap,
                itemWidth: newItemWidth,
                centerOffset: newCenterOffset
            });
        };

        if (skipRAF) {
            doMeasure();
        } else {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(doMeasure);
        }
    }, [itemsPerView, gap, total, mounted]);

    useEffect(() => {
        if (!mounted) return;

        measure();

        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(measure, 100);
        };

        window.addEventListener('resize', handleResize);

        let ro;
        if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
            ro = new ResizeObserver(handleResize);
            ro.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
            if (ro) ro.disconnect();
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [measure, mounted]);

    useEffect(() => {
        if (!mounted || !isFinite(step) || step <= 0) return;
        if (isDraggingRef.current) return;

        const sign = dir === 'rtl' ? 1 : -1;
        const targetX = sign * (internalIndex * step) + (sign === -1 ? centerOffset : -centerOffset);

        const controls = animate(x, targetX, {
            ...transition,
            onComplete: () => {
                if (!loop) return;

                const totalSlides = slides.length;
                const maxInternal = totalSlides - visible;

                if (internalIndex < indexOffset) {
                    const realIndex = internalIndex + total;
                    const newCurrent = realIndex - indexOffset;
                    const newX = sign * (realIndex * step) + (sign === -1 ? centerOffset : -centerOffset);

                    x.set(newX);
                    setCurrent(prev => (prev === newCurrent ? prev : newCurrent));
                } else if (internalIndex > maxInternal) {
                    const realIndex = internalIndex - total;
                    const newCurrent = realIndex - indexOffset;
                    const newX = sign * (realIndex * step) + (sign === -1 ? centerOffset : -centerOffset);

                    x.set(newX);
                    setCurrent(prev => (prev === newCurrent ? prev : newCurrent));
                }
            }
        });

        return () => controls.stop();
    }, [internalIndex, step, dir, centerOffset, loop, slides.length, visible, indexOffset, x, transition, mounted]);

    useEffect(() => {
        if (!effectiveAutoplay || !mounted) return;
        if (isDraggingRef.current || isHoveringRef.current) return;

        const startAutoplay = () => {
            if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);

            autoplayTimerRef.current = setInterval(() => {
                setCurrent(prev => {
                    const next = prev + 1;
                    if (next > maxIndex) {
                        return loop ? 0 : prev;
                    }
                    return next;
                });
            }, autoplayInterval);
        };

        startAutoplay();

        return () => {
            if (autoplayTimerRef.current) {
                clearInterval(autoplayTimerRef.current);
                autoplayTimerRef.current = null;
            }
        };
    }, [effectiveAutoplay, autoplayInterval, loop, maxIndex, visible, mounted]);

    useEffect(() => {
        onIndexChange?.(current);
    }, [current, onIndexChange]);

    const handleMouseEnter = useCallback(() => {
        isHoveringRef.current = true;
        if (pauseOnHover && autoplayTimerRef.current) {
            clearInterval(autoplayTimerRef.current);
            autoplayTimerRef.current = null;
        }
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
        isHoveringRef.current = false;
        if (effectiveAutoplay && !isDraggingRef.current) {
            if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
            autoplayTimerRef.current = setInterval(() => {
                setCurrent(prev => {
                    const next = prev + 1;
                    return next > maxIndex ? (loop ? 0 : prev) : next;
                });
            }, autoplayInterval);
        }
    }, [autoplay, autoplayInterval, loop, maxIndex]);

    const handleDragStart = useCallback(() => {
        isDraggingRef.current = true;
        if (autoplayTimerRef.current) {
            clearInterval(autoplayTimerRef.current);
            autoplayTimerRef.current = null;
        }
    }, []);

    const handleDragEnd = useCallback(() => {
        isDraggingRef.current = false;

        const currentX = x.get();
        if (!isFinite(step) || step <= 0) return;

        const sign = dir === 'rtl' ? 1 : -1;
        const adjustedX = currentX - (sign === -1 ? centerOffset : -centerOffset);
        let newIndex = Math.round((adjustedX * sign) / step);

        const totalSlides = slides.length;
        const maxInternal = Math.max(0, totalSlides - visible);
        newIndex = Math.max(0, Math.min(newIndex, maxInternal));

        const newCurrent = Math.max(0, Math.min(newIndex - indexOffset, maxIndex));
        setCurrent(newCurrent);
    }, [step, dir, centerOffset, slides.length, visible, indexOffset, maxIndex, x]);

    const goTo = useCallback((index) => {
        const target = Math.max(0, Math.min(index, maxIndex));
        setCurrent(target);
    }, [maxIndex]);

    const next = useCallback(() => {
        if (dir === 'rtl') {
            setCurrent(prev => Math.max(0, prev - 1));
        } else {
            setCurrent(prev => {
                const next = prev + 1;
                return next > maxIndex ? (loop ? 0 : prev) : next;
            });
        }
    }, [dir, maxIndex, loop]);

    const prev = useCallback(() => {
        if (dir === 'rtl') {
            setCurrent(prev => {
                const next = prev + 1;
                return next > maxIndex ? (loop ? 0 : prev) : next;
            });
        } else {
            setCurrent(prev => Math.max(0, prev - 1));
        }
    }, [dir, maxIndex, loop]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowLeft') dir === 'rtl' ? next() : prev();
        else if (e.key === 'ArrowRight') dir === 'rtl' ? prev() : next();
    }, [dir, next, prev]);

    const arrowClasses = useMemo(() => {
        const styles = {
            default: 'w-10 h-10 rounded-full bg-white/90 shadow text-gray-800',
            minimal: 'w-9 h-9 rounded-full bg-transparent text-gray-600',
            filled: 'w-10 h-10 rounded-full bg-gray-900 text-white shadow',
        };
        return `flex items-center justify-center ${styles[arrowStyle] || styles.minimal}`;
    }, [arrowStyle]);

    const dragConstraints = useMemo(() => {
        const sign = dir === 'rtl' ? 1 : -1;
        const totalWidth = slides.length * step;
        const containerWidth = dimensions.width;
        const maxOffset = Math.max(0, totalWidth - containerWidth);

        return centerOffset > 0
            ? { left: 0, right: 0 }
            : { left: sign === -1 ? -maxOffset : 0, right: sign === -1 ? 0 : maxOffset };
    }, [dir, slides.length, step, dimensions.width, centerOffset]);

    if (!mounted) {
        return (
            <div className={`relative ${className}`} {...props}>
                <div className="overflow-hidden">
                    <div className="flex gap-4">
                        {childrenArray.slice(0, Math.min(4, total)).map((child, i) => (
                            <div key={i} className="shrink-0 w-1/4">{child}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`relative sm:px-3 rounded-xl ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            {...props}
        >
            <div ref={containerRef} className={`overflow-hidden py-3 ${containerClassName}`}>
                <motion.div
                    className="flex items-stretch"
                    style={{
                        x: springX,
                        gap: `${currentGap}px`,
                        touchAction: 'pan-y'
                    }}
                    drag={draggable && total > visible ? 'x' : false}
                    dragConstraints={dragConstraints}
                    dragElastic={0.12}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    {slides.map((child, idx) => {
                        const realIndex = ((idx - indexOffset + total) % total);
                        return (
                            <motion.div
                                key={`${realIndex}-${idx}`}
                                className={cn(
                                    "shrink-0 overflow-hidden",
                                    rounded && `rounded-${rounded}`
                                )}
                                style={{
                                    width: itemWidth > 0 ? itemWidth : `${100 / visible}%`
                                }}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${t('common.slide') || 'Slide'} ${realIndex + 1} ${t('common.of') || 'of'} ${total}`}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: Math.min(0.2, idx * 0.03),
                                    duration: 0.2
                                }}
                                whileHover={{ y: -6, boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)' }}
                            >
                                {child}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {showArrows && total > visible && (
                <>
                    <button
                        onClick={prev}
                        disabled={!loop && current === 0}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 disabled:opacity-30"
                        aria-label={t('common.previous_slide') || 'Previous slide'}
                    >
                        <div className={arrowClasses}>
                            <IoIosArrowBack className="w-5 h-5" />
                        </div>
                    </button>
                    <button
                        onClick={next}
                        disabled={!loop && current === maxIndex}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 disabled:opacity-30"
                        aria-label={t('common.next_slide') || 'Next slide'}
                    >
                        <div className={arrowClasses}>
                            <IoIosArrowForward className="w-5 h-5" />
                        </div>
                    </button>
                </>
            )}

            {showDots && total > visible && (
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`h-2 rounded-full transition-all duration-200 ${i === current ? 'w-8 bg-gray-900' : 'w-2 bg-gray-300'
                                }`}
                            aria-label={`${t('common.go_to_slide') || 'Go to slide'} ${i + 1}`}
                            aria-current={i === current ? 'true' : undefined}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}