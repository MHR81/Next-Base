'use client';

// Card.jsx
import React, { forwardRef } from 'react';
import { cn } from '@/utils/helpers';

// Size classes
const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

// Variant classes
const variantClasses = {
    default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
    ghost: 'bg-transparent',
    soft: 'bg-gray-50 dark:bg-gray-800/50',
    elevated: 'bg-white dark:bg-gray-900 shadow-lg border-0',
    outlined: 'bg-transparent border-2 border-gray-200 dark:border-gray-700',
};

export const Card = forwardRef(({
    children,
    size = 'md',
    variant = 'default',
    radius = 'lg',
    hover = false,
    clickable = false,
    className,
    onClick,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            onClick={onClick}
            className={cn(
                // Base
                'relative flex flex-col',
                'transition-all duration-200',

                // Size
                sizeClasses[size],

                // Variant
                variantClasses[variant],

                // Radius
                radius === 'none' && 'rounded-none',
                radius === 'sm' && 'rounded-md',
                radius === 'md' && 'rounded-lg',
                radius === 'lg' && 'rounded-xl',
                radius === 'xl' && 'rounded-2xl',
                radius === 'full' && 'rounded-3xl',

                // Hover
                hover && !clickable && 'hover:shadow-md hover:-translate-y-0.5',

                // Clickable
                clickable && [
                    'cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                ],

                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Card.displayName = 'Card';

// Compound components
export const CardHeader = forwardRef(({
    children,
    title,
    subtitle,
    action,
    className,
    ...props
}, ref) => (
    <div
        ref={ref}
        className={cn(
            'flex items-start justify-between gap-4 mb-4',
            className
        )}
        {...props}
    >
        <div className="flex-1 min-w-0">
            {title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {title}
                </h3>
            )}
            {subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {subtitle}
                </p>
            )}
            {!title && !subtitle && children}
        </div>
        {action && (
            <div className="flex-shrink-0">
                {action}
            </div>
        )}
    </div>
));

CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef(({
    children,
    className,
    ...props
}, ref) => (
    <div
        ref={ref}
        className={cn(
            'flex-1',
            className
        )}
        {...props}
    >
        {children}
    </div>
));

CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef(({
    children,
    className,
    align = 'between',
    ...props
}, ref) => (
    <div
        ref={ref}
        className={cn(
            'flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800',
            align === 'start' && 'justify-start',
            align === 'center' && 'justify-center',
            align === 'end' && 'justify-end',
            align === 'between' && 'justify-between',
            className
        )}
        {...props}
    >
        {children}
    </div>
));

CardFooter.displayName = 'CardFooter';

export const CardImage = forwardRef(({
    src,
    alt,
    className,
    aspectRatio = 'video',
    radius,
    overlay,
    ...props
}, ref) => (
    <div
        ref={ref}
        className={cn(
            'relative overflow-hidden',
            aspectRatio === 'square' && 'aspect-square',
            aspectRatio === 'video' && 'aspect-video',
            aspectRatio === 'wide' && 'aspect-[21/9]',
            aspectRatio === 'portrait' && 'aspect-[3/4]',
            radius === 'none' ? 'rounded-none' :
                radius === 'sm' ? 'rounded-t-md' :
                    radius === 'md' ? 'rounded-t-lg' :
                        radius === 'lg' ? 'rounded-t-xl' :
                            radius === 'xl' ? 'rounded-t-2xl' :
                                'rounded-t-3xl',
            className
        )}
        {...props}
    >
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
        />
        {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                {overlay}
            </div>
        )}
    </div>
));

CardImage.displayName = 'CardImage';

// Attach compound components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;