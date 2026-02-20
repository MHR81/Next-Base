'use client';

import React, { useState, forwardRef } from 'react';
import { InputWrapper } from '../base/InputWrapper';
import { inputFieldVariants } from '../base/input.variants';
import { cn } from '@/utils/helpers';

const getStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
        { label: 'Very Weak', color: 'bg-red-500' },
        { label: 'Weak', color: 'bg-orange-500' },
        { label: 'Fair', color: 'bg-yellow-500' },
        { label: 'Good', color: 'bg-blue-500' },
        { label: 'Strong', color: 'bg-green-500' },
        { label: 'Very Strong', color: 'bg-emerald-500' },
    ];

    return { score, ...levels[score] };
};

export const PasswordInput = forwardRef(({
    label,
    helperText,
    error,
    required,
    showStrength = true,
    showToggle = true,
    toggleIcons,
    size = 'md',
    variant,
    rounded,
    className,
    onChange,
    value,
    defaultValue,
    disabled,
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const isControlled = value !== undefined;
    const currentValue = String(isControlled ? value : internalValue);

    const strength = getStrength(currentValue);

    const handleChange = (e) => {
        if (!isControlled) {
            setInternalValue(e.target.value);
        }
        onChange?.(e);
    };

    const defaultVisibleIcon = (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    );

    const defaultHiddenIcon = (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
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
                <input
                    ref={ref}
                    type={showPassword ? 'text' : 'password'}
                    value={currentValue}
                    onChange={handleChange}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${props.id}-error` : undefined}
                    className={cn(
                        inputFieldVariants({ size, variant: error ? 'danger' : variant, rounded }),
                        showToggle && (size === 'sm' ? 'pr-8' : size === 'md' ? 'pr-10' : 'pr-12')
                    )}
                    {...props}
                />

                {showToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={disabled}
                        className={cn(
                            'absolute right-3 top-1/2 -translate-y-1/2',
                            'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
                            'focus:outline-none focus:text-gray-600',
                            'disabled:opacity-50 disabled:cursor-not-allowed',
                            'transition-colors'
                        )}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword
                            ? (toggleIcons?.hidden ?? defaultHiddenIcon)
                            : (toggleIcons?.visible ?? defaultVisibleIcon)
                        }
                    </button>
                )}
            </div>

            {showStrength && currentValue.length > 0 && (
                <div className="mt-2 space-y-1">
                    <div className="flex gap-1 h-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                            <div
                                key={level}
                                className={cn(
                                    'flex-1 rounded-full transition-all duration-300',
                                    level <= strength.score ? strength.color : 'bg-gray-200 dark:bg-gray-700'
                                )}
                            />
                        ))}
                    </div>
                    <p className={cn('text-xs', strength.score <= 2 ? 'text-red-500' : strength.score <= 3 ? 'text-yellow-500' : 'text-green-500')}>
                        {strength.label}
                    </p>
                </div>
            )}
        </InputWrapper>
    );
});

PasswordInput.displayName = 'PasswordInput';