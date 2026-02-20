'use client';

import React, { useState, useRef, forwardRef, useEffect } from 'react';
import { InputWrapper } from '../base/InputWrapper';
import { cn } from '@/utils/helpers';

export const OtpInput = forwardRef(({
    label,
    helperText,
    error,
    required,
    length = 6,
    value,
    defaultValue,
    disabled = false,
    autoFocus = true,
    allowAlpha = false,
    onChange,
    onComplete,
    size = 'md',
    className,
}, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRefs = useRef([]);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const valueArray = currentValue.split('').slice(0, length);

    while (valueArray.length < length) {
        valueArray.push('');
    }

    useEffect(() => {
        if (autoFocus) {
            inputRefs.current[0]?.focus();
        }
    }, [autoFocus]);

    const updateValue = (newValue) => {
        const sanitized = newValue.slice(0, length);
        if (!isControlled) {
            setInternalValue(sanitized);
        }
        onChange?.(sanitized);

        if (sanitized.length === length) {
            onComplete?.(sanitized);
        }
    };

    const handleChange = (index, e) => {
        const char = e.target.value.slice(-1);

        if (allowAlpha) {
            if (!/[a-zA-Z0-9]/.test(char)) return;
        } else {
            if (!/[0-9]/.test(char)) return;
        }

        const newValueArray = [...valueArray];
        newValueArray[index] = char.toUpperCase();
        const newValue = newValueArray.join('');

        updateValue(newValue);

        if (index < length - 1) {
            setActiveIndex(index + 1);
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            e.preventDefault();

            if (valueArray[index]) {
                const newValueArray = [...valueArray];
                newValueArray[index] = '';
                updateValue(newValueArray.join(''));
            } else if (index > 0) {
                const newValueArray = [...valueArray];
                newValueArray[index - 1] = '';
                updateValue(newValueArray.join(''));
                setActiveIndex(index - 1);
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            setActiveIndex(index - 1);
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            setActiveIndex(index + 1);
            inputRefs.current[index + 1]?.focus();
        } else if (e.key === 'Enter' && currentValue.length === length) {
            onComplete?.(currentValue);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text');
        const cleaned = allowAlpha
            ? pasted.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
            : pasted.replace(/\D/g, '');

        updateValue(cleaned);

        const focusIndex = Math.min(cleaned.length, length - 1);
        setActiveIndex(focusIndex);
        inputRefs.current[focusIndex]?.focus();
    };

    const handleFocus = (index) => {
        setActiveIndex(index);
        inputRefs.current[index]?.select();
    };

    const sizeClasses = {
        sm: 'w-8 h-10 text-lg',
        md: 'w-10 h-12 text-xl',
        lg: 'w-12 h-14 text-2xl',
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
            <div ref={ref} className="flex items-center gap-2 justify-center">
                {Array.from({ length }).map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        inputMode={allowAlpha ? 'text' : 'numeric'}
                        maxLength={1}
                        value={valueArray[index] || ''}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        onFocus={() => handleFocus(index)}
                        disabled={disabled}
                        aria-label={`Digit ${index + 1} of ${length}`}
                        className={cn(
                            'text-center font-mono font-semibold',
                            'bg-white dark:bg-gray-900',
                            'border-2 rounded-lg',
                            'transition-all duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-offset-0',
                            sizeClasses[size],
                            error
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 text-red-900'
                                : activeIndex === index
                                    ? 'border-blue-500 ring-2 ring-blue-500/20 text-gray-900 dark:text-gray-100'
                                    : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:border-gray-400',
                            disabled && 'opacity-50 cursor-not-allowed bg-gray-50'
                        )}
                    />
                ))}
            </div>
        </InputWrapper>
    );
});

OtpInput.displayName = 'OtpInput';