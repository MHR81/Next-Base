'use client';

// Button.jsx
import React, { forwardRef } from 'react';
import { cn } from '@/utils/helpers';

// Size classes
const sizeClasses = {
    xs: 'h-7 px-2.5 text-xs gap-1',
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2',
    xl: 'h-14 px-8 text-lg gap-3',
    icon: {
        xs: 'h-7 w-7',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-14 w-14',
    },
};

// Variant classes
const variantClasses = {
    solid: {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500/20',
        secondary: 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 focus:ring-gray-500/20',
        success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500/20',
        danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500/20',
        warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500/20',
        info: 'bg-cyan-500 hover:bg-cyan-600 text-white focus:ring-cyan-500/20',
        ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-gray-500/20',
        white: 'bg-white hover:bg-gray-50 text-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 focus:ring-gray-500/20',
    },
    outline: {
        primary: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500/20',
        secondary: 'border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-500/20',
        success: 'border-2 border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 focus:ring-green-500/20',
        danger: 'border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 focus:ring-red-500/20',
        warning: 'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 focus:ring-yellow-500/20',
        ghost: 'border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 text-gray-700 dark:text-gray-300',
    },
    soft: {
        primary: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 focus:ring-blue-500/20',
        secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-500/20',
        success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 focus:ring-green-500/20',
        danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 focus:ring-red-500/20',
    },
};

// Shape classes
const shapeClasses = {
    default: 'rounded-lg',
    pill: 'rounded-full',
    square: 'rounded-none',
    soft: 'rounded-xl',
};

export const Button = forwardRef(({
    children,
    variant = 'solid',
    color = 'primary',
    size = 'md',
    shape = 'default',
    isIcon = false,
    isLoading = false,
    isDisabled = false,
    isFullWidth = false,
    isActive = false,
    leftIcon,
    rightIcon,
    spinner,
    className,
    as: Component = 'button',
    ...props
}, ref) => {

    // Loading spinner default
    const defaultSpinner = (
        <svg className="animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
    );

    const content = (
        <>
            {isLoading && (
                <span className={cn(
                    'flex-shrink-0',
                    isIcon ? 'w-5 h-5' : 'w-4 h-4'
                )}>
                    {spinner || defaultSpinner}
                </span>
            )}

            {!isLoading && leftIcon && (
                <span className="flex-shrink-0 w-4 h-4">{leftIcon}</span>
            )}

            {children && (
                <span className={cn(
                    'flex-1',
                    isLoading && 'opacity-0'
                )}>
                    {children}
                </span>
            )}

            {!isLoading && rightIcon && (
                <span className="flex-shrink-0 w-4 h-4">{rightIcon}</span>
            )}
        </>
    );

    return (
        <Component
            ref={ref}
            disabled={isDisabled || isLoading}
            className={cn(
                // Base
                'inline-flex items-center justify-center font-medium',
                'transition-all duration-200 ease-out',
                'focus:outline-none focus:ring-2 focus:ring-offset-0',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'active:scale-[0.98]',

                // Size
                isIcon ? sizeClasses.icon[size] : sizeClasses[size],

                // Variant & Color
                variantClasses[variant]?.[color] || variantClasses.solid.primary,

                // Shape
                shapeClasses[shape],

                // Full width
                isFullWidth && 'w-full',

                // Active state
                isActive && 'ring-2 ring-offset-2',

                className
            )}
            {...props}
        >
            {content}
        </Component>
    );
});

Button.displayName = 'Button';