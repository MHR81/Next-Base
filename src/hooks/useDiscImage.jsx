'use client';

import { useMemo } from 'react';

export const useDiscImage = (imageUrl, options = {}) => {
    const {
        size = 100,
        holeSize = 25,
        borderRadius = 16,
        shadow = true,
        border = false,
        boxed = true
    } = options;

    const {
        halo = true,
        haloPadding = 12,
        haloColor = 'rgba(255,255,255,0.4)'
    } = options;

    const resolveImageSrc = (img) => {
        if (!img) return '';
        if (typeof img === 'string') return img;
        if (typeof img === 'object') {
            return img.src || img.url || img.default?.src || img?.data?.url || '';
        }
        return '';
    };

    const imageSrc = resolveImageSrc(imageUrl);

    const discStyle = useMemo(() => ({
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: imageSrc ? `url("${encodeURI(imageSrc)}")` : undefined,
        backgroundRepeat: 'no-repeat',
        backgroundSize: options.fit === 'contain' ? 'contain' : 'cover',
        backgroundPosition: 'center',
        boxShadow: shadow
            ? '0 4px 15px rgba(0,0,0,0.15), inset 0 0 20px rgba(0,0,0,0.1)'
            : 'none',
        display: 'block',
        flexShrink: 0,
    }), [imageSrc, size, shadow]);

    const holeStyle = useMemo(() => ({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: typeof holeSize === 'number' ? `${holeSize}px` : holeSize,
        height: typeof holeSize === 'number' ? `${holeSize}px` : holeSize,
        borderRadius: '50%',
        backgroundColor: '#fff',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 2,
    }), [holeSize]);

    const haloStyle = useMemo(() => {
        const hSize = (typeof holeSize === 'number' ? holeSize : parseInt(holeSize, 10) || 0) + (haloPadding * 2);
        return {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: typeof hSize === 'number' ? `${hSize}px` : hSize,
            height: typeof hSize === 'number' ? `${hSize}px` : hSize,
            borderRadius: '50%',
            backgroundColor: haloColor,
            boxShadow: shadow ? '0 6px 18px rgba(0,0,0,0.08), inset 0 2px 6px rgba(255,255,255,0.04)' : 'none',
            zIndex: 1,
            pointerEvents: 'none'
        };
    }, [holeSize, haloPadding, haloColor, shadow]);

    const containerStyle = useMemo(() => ({
        display: boxed ? 'inline-flex' : 'block',
        padding: boxed ? (typeof 8 === 'number' ? '8px' : 8) : 0,
        borderRadius: boxed ? (typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius) : '50%',
        backgroundColor: boxed ? '#fff' : 'transparent',
        boxShadow: boxed && shadow
            ? '0 2px 8px rgba(0,0,0,0.08)'
            : 'none',
        border: boxed && border
            ? '1px solid rgba(0,0,0,0.05)'
            : 'none',
        lineHeight: 0,
        fontSize: 0,
    }), [borderRadius, shadow, border, boxed]);

    return {
        containerStyle,
        discStyle,
        holeStyle,
        haloStyle,
        size,
        holeSize
    };
};

export const DiscImage = ({
    src,
    alt = '',
    className = '',
    ...options
}) => {
    const { containerStyle, discStyle, holeStyle, haloStyle } = useDiscImage(src, options);

    return (
        <div style={containerStyle} className={className}>
            <div style={discStyle} role="img" aria-label={alt}>
                {options?.halo !== false && <div style={haloStyle} />}
                <div style={holeStyle} />
            </div>
        </div>
    );
};

export default useDiscImage;