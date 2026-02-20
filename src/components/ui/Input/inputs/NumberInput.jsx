'use client';

import React, { useState, forwardRef } from 'react';
import { InputWrapper } from '../base/InputWrapper';
import { inputFieldVariants } from '../base/input.variants';
import { cn } from '@/utils/helpers';
import { formatNumber, unformatNumber } from '../utils/formatters';

export const NumberInput = forwardRef(({
    label,
    helperText,
    error,
    required,
    value,
    defaultValue,
    min = -Infinity,
    max = Infinity,
    step = 1,
    precision = 0,
    formatter,
    parser,
    showStepper = true,
    prefix,
    suffix,
    locale = 'en-US',
    size = 'md',
    variant,
    rounded,
    className,
    onChange,
    onKeyDown,
    disabled,
    ...props
}, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? null);
    const [inputValue, setInputValue] = useState(() => {
        const initial = defaultValue ?? null;
        return initial !== null ? (formatter ? formatter(initial) : formatNumber(initial, locale)) : '';
    });
    const [isFocused, setIsFocused] = useState(false);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const formatValue = (num) => {
        if (num === null) return '';
        if (formatter) return formatter(num);
        return formatNumber(num, locale);
    };

    const parseValue = (str) => {
        const cleaned = parser ? String(parser(str)) : unformatNumber(str);
        if (cleaned === '' || cleaned === '-') return null;
        const num = parseFloat(cleaned);
        return isNaN(num) ? null : num;
    };

    const clamp = (num) => {
        let clamped = Math.min(Math.max(num, min), max);
        if (precision > 0) {
            clamped = parseFloat(clamped.toFixed(precision));
        } else {
            clamped = Math.round(clamped);
        }
        return clamped;
    };

    const updateValue = (newValue) => {
        const clamped = newValue !== null ? clamp(newValue) : null;

        if (!isControlled) {
            setInternalValue(clamped);
            setInputValue(formatValue(clamped));
        }

        onChange?.(clamped);
    };

    const handleChange = (e) => {
        const rawValue = e.target.value;

        if (rawValue === '' || rawValue === '-' || /^-?\d*\.?\d*$/.test(rawValue)) {
            setInputValue(rawValue);
            const parsed = parseValue(rawValue);
            updateValue(parsed);
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
        const parsed = parseValue(inputValue);
        const clamped = parsed !== null ? clamp(parsed) : null;
        setInputValue(formatValue(clamped));
        if (clamped !== currentValue) {
            updateValue(clamped);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        if (currentValue !== null) {
            setInputValue(String(currentValue));
        }
    };

    const stepValue = (direction) => {
        const current = currentValue ?? 0;
        const newValue = clamp(current + direction * step);
        updateValue(newValue);
        if (!isControlled) {
            setInputValue(formatValue(newValue));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            stepValue(1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            stepValue(-1);
        }
        onKeyDown?.(e);
    };

    const handleWheel = (e) => {
        e.preventDefault();
    };

    const displayValue = isFocused ? inputValue : formatValue(currentValue);

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
            <div className="relative flex items-center">
                {prefix && (
                    <div className="absolute left-3 flex items-center pointer-events-none text-gray-400">
                        {prefix}
                    </div>
                )}

                <input
                    ref={ref}
                    type="text"
                    inputMode="decimal"
                    value={displayValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onKeyDown={handleKeyDown}
                    onWheel={handleWheel}
                    disabled={disabled}
                    aria-invalid={!!error}
                    className={cn(
                        inputFieldVariants({ size, variant: error ? 'danger' : variant, rounded }),
                        prefix && (size === 'sm' ? 'pl-8' : size === 'md' ? 'pl-10' : 'pl-12'),
                        (suffix || showStepper) && (size === 'sm' ? 'pr-16' : size === 'md' ? 'pr-20' : 'pr-24'),
                        'tabular-nums'
                    )}
                    {...props}
                />

                {showStepper && (
                    <div className={cn(
                        'absolute right-0 top-0 bottom-0 flex flex-col border-l border-gray-200 dark:border-gray-700',
                        size === 'sm' ? 'w-6' : size === 'md' ? 'w-8' : 'w-10'
                    )}>
                        <button
                            type="button"
                            onClick={() => stepValue(1)}
                            disabled={disabled || (currentValue !== null && currentValue >= max)}
                            className="flex-1 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors rounded-tr-lg"
                        >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => stepValue(-1)}
                            disabled={disabled || (currentValue !== null && currentValue <= min)}
                            className="flex-1 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors rounded-br-lg border-t border-gray-200 dark:border-gray-700"
                        >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                )}

                {suffix && !showStepper && (
                    <div className="absolute right-3 flex items-center pointer-events-none text-gray-400">
                        {suffix}
                    </div>
                )}
            </div>
        </InputWrapper>
    );
});

NumberInput.displayName = 'NumberInput';