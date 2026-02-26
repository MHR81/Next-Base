'use client';

import { useState, useCallback } from 'react';

export function useButtonState(initialLoading = false, initialDisabled = false) {
    const [isLoading, setIsLoading] = useState(initialLoading);
    const [isDisabled, setIsDisabled] = useState(initialDisabled);

    const startLoading = useCallback(() => setIsLoading(true), []);
    const stopLoading = useCallback(() => setIsLoading(false), []);
    const disable = useCallback(() => setIsDisabled(true), []);
    const enable = useCallback(() => setIsDisabled(false), []);

    return {
        isLoading,
        isDisabled,
        startLoading,
        stopLoading,
        disable,
        enable,
        setIsLoading,
        setIsDisabled,
    };
}