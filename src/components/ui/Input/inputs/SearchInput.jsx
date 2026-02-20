'use client';

import React, { useState, forwardRef, useEffect } from 'react';
import { InputWrapper } from '../base/InputWrapper';
import { inputFieldVariants } from '../base/input.variants';
import { cn } from '@/utils/helpers';
import { useDebounce } from '../hooks/useDebounce';

export const SearchInput = forwardRef(({
    label,
    helperText,
    error,
    required,
    debounce = 300,
    clearable = true,
    loading = true,
    onSearch,
    onChange,
    renderResults,
    size = 'md',
    variant,
    rounded,
    className,
    value,
    defaultValue,
    disabled,
    ...props
}, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const [showResults, setShowResults] = useState(false);
    const isControlled = value !== undefined;
    const currentValue = String(isControlled ? value : internalValue);

    const debouncedValue = useDebounce(currentValue, debounce);

    useEffect(() => {
        if (debouncedValue) {
            onSearch?.(debouncedValue);
        }
    }, [debouncedValue, onSearch]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        if (!isControlled) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
        setShowResults(true);
    };

    const handleClear = () => {
        if (!isControlled) {
            setInternalValue('');
        }
        onChange?.('');
        onSearch?.('');
        setShowResults(false);
    };

    const handleSelect = (selectedValue) => {
        if (!isControlled) {
            setInternalValue(selectedValue);
        }
        onChange?.(selectedValue);
        setShowResults(false);
    };

    const searchIcon = (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );

    const clearIcon = (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    const loadingIcon = (
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
    );

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
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    {searchIcon}
                </div>

                <input
                    ref={ref}
                    type="text"
                    inputMode="search"
                    value={currentValue}
                    onChange={handleChange}
                    onFocus={() => setShowResults(true)}
                    disabled={disabled}
                    aria-invalid={!!error}
                    className={cn(
                        inputFieldVariants({ size, variant: error ? 'danger' : variant, rounded }),
                        'pl-10',
                        (clearable || loading) && currentValue && (size === 'sm' ? 'pr-16' : 'pr-20')
                    )}
                    {...props}
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {loading && (
                        <span className="text-gray-400">{loadingIcon}</span>
                    )}

                    {clearable && currentValue && !disabled && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Clear search"
                        >
                            {clearIcon}
                        </button>
                    )}
                </div>

                {showResults && renderResults && (
                    <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {renderResults({ query: currentValue, onSelect: handleSelect })}
                    </div>
                )}
            </div>
        </InputWrapper>
    );
});

SearchInput.displayName = 'SearchInput';