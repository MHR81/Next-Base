'use client';

// inputs/TextareaInput.jsx
import React, { useState, useCallback, forwardRef, useEffect, useRef } from 'react';
import { InputWrapper } from '../base/InputWrapper';
import { inputFieldVariants } from '../base/input.variants';
import { cn } from '@/utils/helpers';
import { useCounter } from '../hooks/useCounter';

export const TextareaInput = forwardRef(({
    label,
    helperText,
    error,
    required,
    counter,
    maxLength,
    autoResize = true,
    minRows = 3,
    maxRows = 10,
    allowOverflow = false,
    size = 'md',
    variant,
    rounded,
    className,
    onChange,
    value,
    defaultValue,
    disabled,
    style,
    ...props
}, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const [height, setHeight] = useState(undefined);
    const textareaRef = useRef(null);

    const isControlled = value !== undefined;
    const currentValue = String(isControlled ? value : internalValue);

    const { count, updateCount, isOverLimit } = useCounter({
        max: maxLength || Infinity,
        initial: currentValue.length,
    });

    useEffect(() => {
        if (!autoResize || !textareaRef.current) return;

        const textarea = textareaRef.current;
        textarea.style.height = 'auto';

        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
        const minHeight = minRows * lineHeight;
        const maxHeight = maxRows * lineHeight;

        const scrollHeight = Math.max(textarea.scrollHeight, minHeight);
        const newHeight = Math.min(scrollHeight, maxHeight);

        textarea.style.height = `${newHeight}px`;
        setHeight(newHeight);
    }, [currentValue, autoResize, minRows, maxRows]);

    const handleChange = (e) => {
        let newValue = e.target.value;

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

        const syntheticEvent = {
            ...e,
            target: { ...e.target, name: props.name || e.target.name || '', value: newValue },
            currentTarget: { ...e.currentTarget, name: props.name || e.currentTarget?.name || '', value: newValue },
        };

        onChange?.(syntheticEvent);
    };

    const setRefs = useCallback((element) => {
        textareaRef.current = element;
        if (typeof ref === 'function') {
            ref(element);
        } else if (ref) {
            ref.current = element;
        }
    }, [ref]);

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
            <textarea
                ref={setRefs}
                value={currentValue}
                onChange={handleChange}
                disabled={disabled}
                rows={minRows}
                aria-invalid={!!error}
                className={cn(
                    inputFieldVariants({ size, variant: error ? 'danger' : variant, rounded }),
                    'py-2.5 resize-none min-h-[80px]',
                    autoResize && 'overflow-hidden',
                    isOverLimit && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                )}
                style={{
                    ...style,
                    height: autoResize ? height : style?.height,
                }}
                {...props}
            />
        </InputWrapper>
    );
});

TextareaInput.displayName = 'TextareaInput';