'use client';

import { useState, useCallback } from 'react';

export function useCounter({ max, initial = 0 }) {
    const [count, setCount] = useState(initial);

    const updateCount = useCallback(
        (value) => {
            const newCount = value.length;
            setCount(Math.min(newCount, max));
            return newCount <= max;
        },
        [max]
    );

    const isOverLimit = count > max;
    const remaining = max - count;

    return { count, updateCount, isOverLimit, remaining };
}