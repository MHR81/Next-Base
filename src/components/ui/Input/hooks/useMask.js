'use client';

import { useCallback } from 'react';

export function useMask(pattern) {
    const applyMask = useCallback(
        (value) => {
            if (typeof pattern === 'function') {
                return value
                    .split('')
                    .filter((char, index) => pattern(char, index))
                    .join('');
            }

            const digits = value.replace(/\D/g, '');
            let result = '';
            let digitIndex = 0;

            for (let i = 0; i < pattern.length && digitIndex < digits.length; i++) {
                if (pattern[i] === '#') {
                    result += digits[digitIndex];
                    digitIndex++;
                } else {
                    result += pattern[i];
                }
            }

            return result;
        },
        [pattern]
    );

    return { applyMask };
}