'use client';

import React, { forwardRef } from 'react';
import { InputWrapper } from '../base/InputWrapper';
import { cn } from '@/utils/helpers';

export const RadioInput = forwardRef(({
    label,
    helperText,
    error,
    options,
    value,
    name,
    disabled = false,
    required,
    size = 'md',
    layout = 'vertical',
    onChange,
    className,
}, ref) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    const handleChange = (optionValue) => {
        onChange?.(optionValue);
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
            <div
                ref={ref}
                role="radiogroup"
                className={cn(
                    'space-y-3',
                    layout === 'horizontal' && 'flex flex-wrap gap-4 space-y-0'
                )}
            >
                {options.map((option) => {
                    const isSelected = value === option.value;
                    const isDisabled = disabled || option.disabled;

                    return (
                        <label
                            key={option.value}
                            className={cn(
                                'flex items-start gap-3 cursor-pointer',
                                isDisabled && 'cursor-not-allowed opacity-50'
                            )}
                        >
                            <div className="relative flex items-center">
                                <input
                                    type="radio"
                                    name={name}
                                    value={option.value}
                                    checked={isSelected}
                                    disabled={isDisabled}
                                    onChange={() => handleChange(option.value)}
                                    className="peer sr-only"
                                />

                                <div className={cn(
                                    sizeClasses[size],
                                    'rounded-full border-2 transition-all duration-200',
                                    'flex items-center justify-center',
                                    isSelected
                                        ? 'border-blue-500 bg-blue-500'
                                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:border-gray-400',
                                    'peer-focus:ring-2 peer-focus:ring-blue-500/20'
                                )}>
                                    <div className={cn(
                                        'bg-white rounded-full transition-transform duration-200',
                                        size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5',
                                        isSelected ? 'scale-100' : 'scale-0'
                                    )} />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <span className={cn(
                                    'text-gray-700 dark:text-gray-300 select-none',
                                    size === 'sm' && 'text-sm',
                                    size === 'md' && 'text-base',
                                    size === 'lg' && 'text-lg',
                                    isSelected && 'font-medium'
                                )}>
                                    {option.label}
                                </span>

                                {option.description && (
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {option.description}
                                    </span>
                                )}
                            </div>
                        </label>
                    );
                })}
            </div>
        </InputWrapper>
    );
});

RadioInput.displayName = 'RadioInput';