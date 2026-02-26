'use client';

import React, { useState, useRef, forwardRef, useEffect } from 'react';
import { InputWrapper } from '../base/InputWrapper';
import { cn } from '@/utils/helpers';

export const OtpInput = forwardRef(({
    label,
    helperText,
    error,
    required,
    name,
    length = 6,
    value,
    placeholder="----",
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
        const syntheticEvent = {
            target: {
                name: name || '',
                value: sanitized,
            },
        };
        onChange?.(syntheticEvent);

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

        const domValues = Array.from({ length }).map((_, i) => inputRefs.current[i]?.value || '');
        domValues[index] = char.toUpperCase();
        const newValue = domValues.join('');

        updateValue(newValue);

        if (index < length - 1) {
            setActiveIndex(index + 1);
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const domValues = Array.from({ length }).map((_, i) => inputRefs.current[i]?.value || '');
            if (domValues[index]) {
                domValues[index] = '';
                updateValue(domValues.join(''));
            } else if (index > 0) {
                domValues[index - 1] = '';
                updateValue(domValues.join(''));
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

        const fill = cleaned.slice(0, length).split('');
        const domValues = Array.from({ length }).map((_, i) => fill[i] || '');
        updateValue(domValues.join(''));

        const focusIndex = Math.min(cleaned.length, length) - 1;
        const idx = focusIndex < 0 ? 0 : focusIndex;
        setActiveIndex(idx);
        inputRefs.current[idx]?.focus();
    };

    const handleFocus = (index) => {
        setActiveIndex(index);
        inputRefs.current[index]?.select();
    };

    const sizeClasses = {
        sm: 'w-8 h-10 text-lg',
        md: 'w-10 h-12 text-xl',
        lg: 'w-12 h-14 text-2xl',
        xl: 'w-14 h-14 sm:w-18 sm:h-18 text-3xl',
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
            <div dir='ltr' ref={ref} className="flex items-center gap-2 justify-center">
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
                        placeholder={placeholder ? placeholder[index] || '' : ''}
                        className={cn(
                            'text-center font-mono font-semibold',
                            'bg-input placeholder:text-gray-500',
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