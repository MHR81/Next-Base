'use client';

import React, { forwardRef } from 'react';
import { InputWrapper } from '../base/InputWrapper';
import { cn } from '@/utils/helpers';

export const CheckboxInput = forwardRef(({
    label,
    helperText,
    error,
    checked,
    defaultChecked,
    indeterminate = false,
    disabled = false,
    required,
    size = 'md',
    onChange,
    className,
}, ref) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    const iconSizeClasses = {
        sm: 'w-2.5 h-2.5',
        md: 'w-3.5 h-3.5',
        lg: 'w-4 h-4',
    };

    const handleChange = (e) => {
        onChange?.(e.target.checked);
    };

    return (
        <InputWrapper
            label={undefined}
            helperText={helperText}
            error={error}
            required={required}
            disabled={disabled}
            size={size}
            className={className}
        >
            <label className={cn(
                'flex items-start gap-3 cursor-pointer',
                disabled && 'cursor-not-allowed opacity-50'
            )}>
                <div className="relative flex items-center">
                    <input
                        ref={ref}
                        type="checkbox"
                        checked={checked}
                        defaultChecked={defaultChecked}
                        disabled={disabled}
                        required={required}
                        onChange={handleChange}
                        className="peer sr-only"
                    />

                    <div className={cn(
                        sizeClasses[size],
                        'border-2 rounded transition-all duration-200',
                        'flex items-center justify-center',
                        'peer-checked:bg-blue-500 peer-checked:border-blue-500',
                        'peer-indeterminate:bg-blue-500 peer-indeterminate:border-blue-500',
                        'peer-focus:ring-2 peer-focus:ring-blue-500/20',
                        error
                            ? 'border-red-300 dark:border-red-600'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
                        'bg-white dark:bg-gray-900'
                    )}>
                        <svg
                            className={cn(
                                iconSizeClasses[size],
                                'text-white transition-transform duration-200',
                                'scale-0 peer-checked:scale-100',
                                indeterminate && 'hidden'
                            )}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>

                        <div
                            className={cn(
                                'bg-white rounded-sm transition-transform duration-200',
                                size === 'sm' ? 'w-2 h-0.5' : size === 'md' ? 'w-2.5 h-0.5' : 'w-3 h-0.5',
                                'scale-0 peer-indeterminate:scale-100'
                            )}
                        />
                    </div>
                </div>

                {label && (
                    <span className={cn(
                        'text-gray-700 dark:text-gray-300 select-none',
                        size === 'sm' && 'text-sm',
                        size === 'md' && 'text-base',
                        size === 'lg' && 'text-lg'
                    )}>
                        {label}
                    </span>
                )}
            </label>
        </InputWrapper>
    );
});

CheckboxInput.displayName = 'CheckboxInput';