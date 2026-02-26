'use client';

import React, { useState, forwardRef, useCallback } from 'react';
import { InputWrapper } from '../base/InputWrapper';
import { inputFieldVariants } from '../base/input.variants';
import { cn } from '@/utils/helpers';
import { useCounter } from '../hooks/useCounter';

export const TextInput = forwardRef(({
    label,
    helperText,
    error,
    required,
    counter,
    maxLength,
    prefix,
    suffix,
    mask,
    allowOverflow = false,
    size = 'md',
    variant,
    rounded,
    className,
    onChange,
    value,
    defaultValue,
    disabled,
    type = 'text',
    ...props
}, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const isControlled = value !== undefined;
    const currentValue = String(isControlled ? value : internalValue);

    const { count, updateCount, isOverLimit } = useCounter({
        max: maxLength || Infinity,
        initial: currentValue.length,
    });

    const applyMask = useCallback((inputValue) => {
        if (!mask) return inputValue;

        if (typeof mask === 'function') {
            return inputValue
                .split('')
                .filter((char, index) => mask(char, index))
                .join('');
        }

        // Pattern mask like "###-###-####"
        const digits = inputValue.replace(/\D/g, '');
        let result = '';
        let digitIndex = 0;

        for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
            if (mask[i] === '#') {
                result += digits[digitIndex];
                digitIndex++;
            } else {
                result += mask[i];
            }
        }

        return result;
    }, [mask]);

    const handleChange = (e) => {
        let newValue = e.target.value;

        if (mask) {
            newValue = applyMask(newValue);
        }

        if (maxLength && !allowOverflow) {
            const isValid = updateCount(newValue);
            if (!isValid) {
                newValue = newValue.slice(0, maxLength);
                updateCount(newValue);
            }
        }

        if (!isControlled) {
            setInternalValue(newValue);
        }

        // Create synthetic event with masked value and name
        const syntheticEvent = {
            ...e,
            target: { ...e.target, name: props.name || e.target.name || '', value: newValue },
            currentTarget: { ...e.currentTarget, name: props.name || e.currentTarget?.name || '', value: newValue },
        };

        onChange?.(syntheticEvent);
    };

    const displayValue = isControlled ? value : internalValue;

    return (
        <InputWrapper
            label={label}
            helperText={helperText}
            error={error}
            required={required}
            disabled={disabled}
            size={size}
            counter={counter && maxLength ? { current: count, max: maxLength } : undefined}
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
                    type={type}
                    inputMode={type === 'number' ? 'numeric' : undefined}
                    value={displayValue}
                    onChange={handleChange}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
                    className={cn(
                        inputFieldVariants({ size, variant: error ? 'danger' : variant, rounded }),
                        prefix && (size === 'sm' ? 'pl-8' : size === 'md' ? 'pl-10' : 'pl-12'),
                        suffix && (size === 'sm' ? 'pr-8' : size === 'md' ? 'pr-10' : 'pr-12'),
                        isOverLimit && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    )}
                    {...props}
                />

                {suffix && (
                    <div className="absolute right-3 flex items-center pointer-events-none text-gray-400">
                        {suffix}
                    </div>
                )}
            </div>
        </InputWrapper>
    );
});

TextInput.displayName = 'TextInput';