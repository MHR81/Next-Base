// ButtonGroup.jsx
import React from 'react';
import { cn } from '@/utils/helpers';

export const ButtonGroup = ({
    children,
    orientation = 'horizontal',
    attached = false,
    className,
}) => {
    return (
        <div
            className={cn(
                'inline-flex',
                orientation === 'horizontal' ? 'flex-row' : 'flex-col',
                attached && orientation === 'horizontal' && '[&>*:not(:first-child)]:-ml-px [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child):not(:last-child)]:rounded-none',
                attached && orientation === 'vertical' && '[&>*:not(:first-child)]:-mt-px [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none [&>*:not(:first-child):not(:last-child)]:rounded-none',
                !attached && orientation === 'horizontal' && 'gap-2',
                !attached && orientation === 'vertical' && 'gap-2 flex-col',
                className
            )}
            role="group"
        >
            {children}
        </div>
    );
};