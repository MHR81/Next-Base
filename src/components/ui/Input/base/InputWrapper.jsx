import React from 'react';
import { cn } from '@/utils/helpers';
import {
    inputWrapperVariants,
    labelVariants,
    helperTextVariants,
    counterVariants,
} from './input.variants';

export const InputWrapper = ({
    label,
    helperText,
    error,
    required = false,
    // disabled = false,
    counter,
    id,
    children,
    size = 'md',
    className,
    labelClassName,
}) => {
    const errorId = id ? `${id}-error` : undefined;
    const helperId = id ? `${id}-helper` : undefined;

    const getCounterStatus = () => {
        if (!counter) return 'normal';
        const ratio = counter.current / counter.max;
        if (ratio >= 1) return 'error';
        if (ratio >= 0.9) return 'warning';
        return 'normal';
    };

    return (
        <div className={cn(inputWrapperVariants({ size }), className)}>
            {label && (
                <label
                    htmlFor={id}
                    className={cn(labelVariants({ size, required }), labelClassName)}
                >
                    {label}
                </label>
            )}

            <div className="relative">
                {children}
            </div>

            <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                    {error ? (
                        <p
                            id={errorId}
                            role="alert"
                            className={helperTextVariants({ variant: 'error' })}
                        >
                            {error}
                        </p>
                    ) : helperText ? (
                        <p
                            id={helperId}
                            className={helperTextVariants({ variant: 'default' })}
                        >
                            {helperText}
                        </p>
                    ) : null}
                </div>

                {counter && (
                    <span className={counterVariants({ status: getCounterStatus() })}>
                        {counter.current}/{counter.max}
                    </span>
                )}
            </div>
        </div>
    );
};