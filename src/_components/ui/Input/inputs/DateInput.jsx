'use client';

import React, { useState, forwardRef, useMemo } from 'react';
import { InputWrapper } from '../base/InputWrapper';
import { inputFieldVariants } from '../base/input.variants';
import { cn } from '@/utils/helpers';

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const DateInput = forwardRef(({
    label,
    helperText,
    error,
    required,
    value,
    defaultValue,
    min,
    max,
    disabled = false,
    placeholder = 'Select date',
    format = 'YYYY/MM/DD',
    size = 'md',
    variant,
    rounded,
    onChange,
    className,
}, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [viewDate, setViewDate] = useState(value || defaultValue || new Date());

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const formatDate = (date) => {
        if (!date) return '';
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');

        switch (format) {
            case 'DD/MM/YYYY': return `${d}/${m}/${y}`;
            case 'MM/DD/YYYY': return `${m}/${d}/${y}`;
            default: return `${y}/${m}/${d}`;
        }
    };

    const calendarDays = useMemo(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const startPadding = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        const days = [];

        for (let i = 0; i < startPadding; i++) {
            days.push({ date: null, isCurrentMonth: false });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true
            });
        }

        return days;
    }, [viewDate]);

    const isDateDisabled = (date) => {
        if (min && date < new Date(min.setHours(0, 0, 0, 0))) return true;
        if (max && date > new Date(max.setHours(23, 59, 59, 999))) return true;
        return false;
    };

    const isSameDay = (d1, d2) => {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    };

    const handleSelectDate = (date) => {
        if (isDateDisabled(date)) return;

        if (!isControlled) {
            setInternalValue(date);
        }
        const syntheticEvent = {
            target: {
                name: props.name || '',
                value: date,
            },
        };
        onChange?.(syntheticEvent);
        setShowCalendar(false);
    };

    const navigateMonth = (direction) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + direction, 1));
    };

    const calendarIcon = (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    );

    const clearIcon = (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
            <div className="relative" ref={ref}>
                <div className="relative flex items-center">
                    <div className="absolute left-3 text-gray-400 pointer-events-none">
                        {calendarIcon}
                    </div>

                    <input
                        type="text"
                        readOnly
                        value={formatDate(currentValue)}
                        placeholder={placeholder}
                        onClick={() => !disabled && setShowCalendar(true)}
                        disabled={disabled}
                        className={cn(
                            inputFieldVariants({ size, variant: error ? 'danger' : variant, rounded }),
                            'pl-10 cursor-pointer',
                            currentValue && 'pr-10'
                        )}
                    />

                    {currentValue && !disabled && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!isControlled) setInternalValue(null);
                                onChange?.(null);
                            }}
                            className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {clearIcon}
                        </button>
                    )}
                </div>

                {showCalendar && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowCalendar(false)}
                        />
                        <div className={cn(
                            'absolute z-50 mt-1 p-4',
                            'bg-white dark:bg-gray-900',
                            'border border-gray-200 dark:border-gray-700',
                            'rounded-lg shadow-lg',
                            'w-72'
                        )}>
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    type="button"
                                    onClick={() => navigateMonth(-1)}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <div className="font-semibold text-gray-900 dark:text-gray-100">
                                    {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => navigateMonth(1)}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-7 mb-2">
                                {WEEKDAYS.map(day => (
                                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                                {calendarDays.map((day, index) => (
                                    <div key={index} className="aspect-square">
                                        {day.date ? (
                                            <button
                                                type="button"
                                                onClick={() => handleSelectDate(day.date)}
                                                disabled={isDateDisabled(day.date)}
                                                className={cn(
                                                    'w-full h-full rounded-lg text-sm font-medium transition-all',
                                                    currentValue && isSameDay(day.date, currentValue)
                                                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
                                                    isDateDisabled(day.date) && 'opacity-30 cursor-not-allowed',
                                                    !day.isCurrentMonth && 'text-gray-400'
                                                )}
                                            >
                                                {day.date.getDate()}
                                            </button>
                                        ) : (
                                            <div />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const today = new Date();
                                        handleSelectDate(today);
                                        setViewDate(today);
                                    }}
                                    className="w-full py-1.5 text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
                                >
                                    Today
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </InputWrapper>
    );
});

DateInput.displayName = 'DateInput';