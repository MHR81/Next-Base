'use client';

import React, { forwardRef } from 'react';
import { InputWrapper } from '../base/InputWrapper';
import { cn } from '@/utils/helpers';

export const SwitchInput = forwardRef(({
    label,
    helperText,
    error,
    checked,
    defaultChecked,
    disabled = false,
    required,
    size = 'md',
    labels,
    onChange,
    className,
}, ref) => {
    const sizeClasses = {
        sm: { track: 'w-9 h-5', thumb: 'w-3.5 h-3.5', translate: 'translate-x-[15px]' },
        md: { track: 'w-11 h-6', thumb: 'w-4.5 h-4.5', translate: 'translate-x-[18.5px]' },
        lg: { track: 'w-14 h-7', thumb: 'w-5.5 h-5.5', translate: 'translate-x-[27px]' },
    };

    const handleChange = (e) => {
        onChange?.(e.target.checked);
    };

    return (
        <InputWrapper
            label={label}
            helperText={helperText}
            error={error}
            required={required}
            disabled={disabled}
            size={size}
            className={className}
        >
            <label className={cn(
                'inline-flex items-center gap-3 cursor-pointer',
                disabled && 'cursor-not-allowed opacity-50'
            )}>
                <div className="relative">
                    <input
                        ref={ref}
                        type="checkbox"
                        checked={checked}
                        defaultChecked={defaultChecked}
                        disabled={disabled}
                        onChange={handleChange}
                        className="peer sr-only"
                    />

                    <div className={cn(
                        sizeClasses[size].track,
                        'rounded-full transition-colors duration-200',
                        'bg-gray-200 dark:bg-gray-700',
                        'peer-checked:bg-blue-500',
                        'peer-focus:ring-2 peer-focus:ring-blue-500/20'
                    )} />

                    <div className={cn(
                        sizeClasses[size].thumb,
                        'absolute top-1/2 left-1 transform -translate-y-1/2',
                        'bg-white rounded-full shadow-sm',
                        'transition-transform duration-200',
                        `${checked ? sizeClasses[size].translate : 'translate-x-0'}`,
                    )} />
                </div>

                {labels && (
                    <span className={cn(
                        'text-sm font-medium text-gray-700 dark:text-gray-300 select-none',
                        size === 'sm' && 'text-xs',
                        size === 'lg' && 'text-base'
                    )}>
                        {checked ? labels.on : labels.off}
                    </span>
                )}
            </label>
        </InputWrapper>
    );
});

SwitchInput.displayName = 'SwitchInput';