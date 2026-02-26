'use client';

import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { useLanguages } from '@/langueges/useLanguages';
import { InputWrapper } from '../base/InputWrapper';
import { inputFieldVariants } from '../base/input.variants';
import { cn } from '@/utils/helpers';
import { useDebounce } from '../hooks/useDebounce';

export const SelectInput = forwardRef(({
    label,
    helperText,
    error,
    required,
    options,
    value,
    defaultValue,
    placeholder = 'Select...',
    multiple = false,
    searchable = false,
    clearable = false,
    disabled = false,
    maxDisplay = 3,
    size = 'md',
    variant,
    rounded,
    onChange,
    className,
}, ref) => {
    const { t } = useLanguages();
    const [internalValue, setInternalValue] = useState(defaultValue || (multiple ? [] : ''));
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef(null);
    const searchInputRef = useRef(null);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const debouncedSearch = useDebounce(searchQuery, 150);

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        opt.value.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const selectedOptions = multiple
        ? options.filter(opt => currentValue.includes(opt.value))
        : options.find(opt => opt.value === currentValue);

    useEffect(() => {
        if (isOpen && searchable) {
            searchInputRef.current?.focus();
        }
    }, [isOpen, searchable]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        if (option.disabled) return;

        let newValue;

        if (multiple) {
            const current = currentValue;
            newValue = current.includes(option.value)
                ? current.filter(v => v !== option.value)
                : [...current, option.value];
        } else {
            newValue = option.value;
            setIsOpen(false);
        }

        if (!isControlled) setInternalValue(newValue);
        const syntheticEvent = {
            target: {
                name: props.name || '',
                value: newValue,
            },
        };
        onChange?.(syntheticEvent);
        setSearchQuery('');
    };

    const handleClear = (e) => {
        e.stopPropagation();
        const newValue = multiple ? [] : '';
        if (!isControlled) setInternalValue(newValue);
        onChange?.(newValue);
    };

    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(i => (i + 1) % filteredOptions.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(i => (i - 1 + filteredOptions.length) % filteredOptions.length);
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredOptions[highlightedIndex]) {
                    handleSelect(filteredOptions[highlightedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };

    const displayValue = () => {
        if (multiple) {
            const selected = selectedOptions;
            if (selected.length === 0) return placeholder;
            if (selected.length <= maxDisplay) {
                return selected.map(s => s.label).join(', ');
            }
            return `${selected.length} ${t('common.items_selected') || 'items selected'}`;
        }

        const selected = selectedOptions;
        return selected?.label || placeholder;
    };

    const chevronIcon = (
        <svg
            className={cn('w-5 h-5 text-gray-400 transition-transform', isOpen && 'rotate-180')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    );

    const clearIcon = (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    const searchIcon = (
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
            <div ref={containerRef} className="relative">
                <button
                    type="button"
                    ref={ref}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    className={cn(
                        inputFieldVariants({ size, variant: error ? 'danger' : variant, rounded }),
                        'flex items-center justify-between text-left w-full',
                        !selectedOptions || (Array.isArray(selectedOptions) && selectedOptions.length === 0)
                            ? 'text-gray-400'
                            : 'text-gray-900 dark:text-gray-100'
                    )}
                >
                    <span className="truncate flex-1 text-left">{displayValue()}</span>

                    <div className="flex items-center gap-1 ml-2">
                        {clearable && ((multiple && currentValue.length > 0) || (!multiple && currentValue)) && (
                            <span
                                onClick={handleClear}
                                className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                            >
                                {clearIcon}
                            </span>
                        )}
                        {chevronIcon}
                    </div>
                </button>

                {isOpen && (
                    <div className={cn(
                        'absolute z-50 w-full mt-1',
                        'bg-white dark:bg-gray-900',
                        'border border-gray-200 dark:border-gray-700',
                        'rounded-lg shadow-lg overflow-hidden'
                    )}>
                        {searchable && (
                            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                        {searchIcon}
                                    </div>
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setHighlightedIndex(0);
                                        }}
                                        placeholder={t('common.search') || 'Search...'}
                                        className="w-full pl-9 pr-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                        )}

                        <ul
                            role="listbox"
                            className="max-h-60 overflow-auto py-1"
                        >
                            {filteredOptions.length === 0 ? (
                                <li className="px-3 py-2 text-sm text-gray-500 text-center">
                                    {t('common.no_results_found') || 'No results found'}
                                </li>
                            ) : (
                                filteredOptions.map((option, index) => {
                                    const isSelected = multiple
                                        ? currentValue.includes(option.value)
                                        : currentValue === option.value;

                                    return (
                                        <li
                                            key={option.value}
                                            role="option"
                                            aria-selected={isSelected}
                                            onClick={() => handleSelect(option)}
                                            onMouseEnter={() => setHighlightedIndex(index)}
                                            className={cn(
                                                'px-3 py-2 cursor-pointer flex items-center gap-2',
                                                'transition-colors',
                                                index === highlightedIndex && 'bg-gray-100 dark:bg-gray-800',
                                                isSelected && 'bg-blue-50 dark:bg-blue-900/20',
                                                option.disabled && 'opacity-50 cursor-not-allowed'
                                            )}
                                        >
                                            {multiple && (
                                                <div className={cn(
                                                    'w-4 h-4 rounded border flex items-center justify-center transition-colors',
                                                    isSelected
                                                        ? 'bg-blue-500 border-blue-500'
                                                        : 'border-gray-300 dark:border-gray-600'
                                                )}>
                                                    {isSelected && (
                                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            )}

                                            {option.icon && <span className="text-gray-500">{option.icon}</span>}

                                            <span className={cn(
                                                'flex-1 text-sm',
                                                isSelected ? 'font-medium text-blue-900 dark:text-blue-100' : 'text-gray-700 dark:text-gray-300'
                                            )}>
                                                {option.label}
                                            </span>

                                            {!multiple && isSelected && (
                                                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </InputWrapper>
    );
});

SelectInput.displayName = 'SelectInput';