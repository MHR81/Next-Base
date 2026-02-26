'use client';

import React, { useState, forwardRef, useMemo, useEffect } from 'react';
import { useLanguages } from '@/langueges/useLanguages';
import { InputWrapper } from '../base/InputWrapper';
import { inputFieldVariants } from '../base/input.variants';
import { cn } from '@/utils/helpers';
import { formatPhone } from '../utils/formatters';

const defaultCountries = [
    { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸', pattern: '###-###-####' },
    { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧', pattern: '#### ######' },
    { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪', pattern: '#### #######' },
    { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷', pattern: '# ## ## ## ##' },
    { code: 'IR', name: 'Iran', dial: '+98', flag: '🇮🇷', pattern: '###-###-####' },
    { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦', pattern: '###-###-####' },
    { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺', pattern: '#### ### ###' },
    { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵', pattern: '##-####-####' },
    { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳', pattern: '###-####-####' },
    { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳', pattern: '#####-#####' },
];

export const PhoneInput = forwardRef(({
    label,
    helperText,
    error,
    required,
    value,
    defaultValue,
    defaultCountry = 'IR',
    countries = defaultCountries,
    countriesVariant = 'custom2',
    searchable = true,
    size = 'md',
    variant,
    rounded = 'md',
    className,
    onChange,
    disabled,
    ...props
}, ref) => {
    const { t } = useLanguages();
    const getDigits = (s = '') => (s + '').replace(/\D/g, '');
    const [selectedCountry, setSelectedCountry] = useState(() =>
        countries.find(c => c.code === defaultCountry) || countries[0]
    );
    const [internalValue, setInternalValue] = useState(() => {
        const digits = getDigits(defaultValue) || '';
        const dialNumeric = (countries.find(c => c.code === defaultCountry)?.dial || '').replace(/\D/g, '');
        if (dialNumeric && digits.startsWith(dialNumeric)) return digits.slice(dialNumeric.length);
        return digits;
    });
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const displayValue = useMemo(() => {
        const allDigits = getDigits(currentValue);
        const dialNumeric = (selectedCountry?.dial || '').replace(/\D/g, '');
        let local = allDigits;
        if (dialNumeric && local.startsWith(dialNumeric)) {
            local = local.slice(dialNumeric.length);
        }
        return formatPhone(local, selectedCountry.pattern);
    }, [currentValue, selectedCountry.pattern, selectedCountry.dial]);

    const filteredCountries = useMemo(() => {
        if (!searchable || !searchQuery) return countries;
        const query = searchQuery.toLowerCase();
        return countries.filter(c =>
            c.name.toLowerCase().includes(query) ||
            c.dial.includes(query) ||
            c.code.toLowerCase().includes(query)
        );
    }, [countries, searchable, searchQuery]);

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setShowDropdown(false);
        setSearchQuery('');
        const allDigits = getDigits(currentValue);
        const newDialNumeric = (country.dial || '').replace(/\D/g, '');
        let local = allDigits;
        if (newDialNumeric && local.startsWith(newDialNumeric)) {
            local = local.slice(newDialNumeric.length);
        }
        if (!isControlled) {
            setInternalValue(local);
        }
        const syntheticEvent = {
            target: {
                name: props.name || '',
                value: local,
                dial: country.dial,
                country: country.code,
            },
        };
        onChange?.(syntheticEvent);
        props.onDialChange?.(country.dial);
    };

    const handleChange = (e) => {
        const digits = getDigits(e.target.value);

        if (!isControlled) {
            setInternalValue(digits);
        }
        const syntheticEvent = {
            target: {
                name: props.name || '',
                value: digits,
                dial: selectedCountry.dial,
                country: selectedCountry.code,
            },
        };
        onChange?.(syntheticEvent);
    };

    useEffect(() => {
        // notify initial or changed dial to parent
        props.onDialChange?.(selectedCountry?.dial);
    }, [selectedCountry]);

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
            <div dir='ltr' className="relative flex">
                <button
                    type="button"
                    onClick={() => !disabled && setShowDropdown(!showDropdown)}
                    disabled={disabled}
                    className={cn(
                        'flex items-center gap-2 px-3 border-r-0 rounded-r-none',
                        'bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600',
                        'hover:bg-gray-100 dark:hover:bg-gray-700',
                        'focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        size === 'sm' && 'h-8 text-xs',
                        size === 'md' && 'h-10 text-sm',
                        size === 'lg' && 'h-12 text-base',
                        rounded === 'none' && 'rounded-l-none',
                        rounded === 'sm' && 'rounded-l-md',
                        rounded === 'md' && 'rounded-l-lg',
                        rounded === 'lg' && 'rounded-l-xl',
                        rounded === 'full' && 'rounded-l-full',
                        countriesVariant === 'custom' && 'bg-input border-gray-300 dark:border-gray-600',
                        countriesVariant === 'custom2' && 'bg-input2 border-gray-300 dark:border-gray-600'
                    )}
                >
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">{selectedCountry.dial}</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <input
                    ref={ref}
                    type="tel"
                    inputMode="tel"
                    value={displayValue}
                    onChange={handleChange}
                    disabled={disabled}
                    placeholder={selectedCountry.pattern?.replace(/#/g, '0')}
                    aria-invalid={!!error}
                    className={cn(
                        inputFieldVariants({ size, variant: error ? 'danger' : variant, rounded }),
                        'rounded-l-none border-l-0 flex-1',
                        'tabular-nums'
                    )}
                    {...props}
                />

                {showDropdown && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowDropdown(false)}
                        />
                        <div className={cn(
                            'absolute z-50 left-0 top-full mt-1 w-64',
                            'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
                            'rounded-lg shadow-lg overflow-hidden'
                        )}>
                            {searchable && (
                                <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                                    <input
                                        type="text"
                                        placeholder={t('common.search_countries') || 'Search countries...'}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-accent"
                                        autoFocus
                                    />
                                </div>
                            )}
                            <div className="max-h-60 overflow-auto">
                                {filteredCountries.map((country) => (
                                    <button
                                        key={country.code}
                                        type="button"
                                        onClick={() => handleCountrySelect(country)}
                                        className={cn(
                                            'w-full flex items-center gap-3 px-3 py-2 text-left',
                                            'hover:bg-accent/10 dark:hover:bg-gray-800',
                                            'transition-colors',
                                            selectedCountry.code === country.code && 'bg-accent/20 dark:bg-accent'
                                        )}
                                    >
                                        <span className="text-xl">{country.flag}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                                {country.name}
                                            </p>
                                            <p className="text-xs text-gray-500">{country.dial}</p>
                                        </div>
                                        {selectedCountry.code === country.code && (
                                            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </InputWrapper>
    );
});

PhoneInput.displayName = 'PhoneInput';