'use client';

// Table.jsx
import React, { forwardRef } from 'react';
import { useLanguages } from '@/langueges/useLanguages';
import { cn } from '@/utils/helpers';

export const Table = forwardRef(({
    children,
    size = 'md',
    className,
    ...props
}, ref) => (
    <div className="w-full overflow-x-auto">
        <table
            ref={ref}
            className={cn(
                'w-full text-left border-collapse',
                size === 'sm' && 'text-xs',
                size === 'md' && 'text-sm',
                size === 'lg' && 'text-base',
                className
            )}
            {...props}
        >
            {children}
        </table>
    </div>
));

Table.displayName = 'Table';

export const TableHead = forwardRef(({
    children,
    className,
    ...props
}, ref) => (
    <thead
        ref={ref}
        className={cn(
            'bg-gray-50 dark:bg-gray-800/50',
            className
        )}
        {...props}
    >
        {children}
    </thead>
));

TableHead.displayName = 'TableHead';

export const TableBody = forwardRef(({
    children,
    className,
    ...props
}, ref) => (
    <tbody
        ref={ref}
        className={cn(
            'divide-y divide-gray-200 dark:divide-gray-700',
            className
        )}
        {...props}
    >
        {children}
    </tbody>
));

TableBody.displayName = 'TableBody';

export const TableRow = forwardRef(({
    children,
    className,
    hover = true,
    selected = false,
    onClick,
    ...props
}, ref) => (
    <tr
        ref={ref}
        onClick={onClick}
        className={cn(
            'transition-colors',
            hover && !selected && 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
            selected && 'bg-blue-50 dark:bg-blue-900/20',
            onClick && 'cursor-pointer',
            className
        )}
        {...props}
    >
        {children}
    </tr>
));

TableRow.displayName = 'TableRow';

export const TableHeader = forwardRef(({
    children,
    className,
    align = 'left',
    ...props
}, ref) => (
    <th
        ref={ref}
        className={cn(
            'px-4 py-3 font-semibold text-gray-900 dark:text-gray-100',
            'border-b border-gray-200 dark:border-gray-700',
            align === 'left' && 'text-left',
            align === 'center' && 'text-center',
            align === 'right' && 'text-right',
            className
        )}
        {...props}
    >
        {children}
    </th>
));

TableHeader.displayName = 'TableHeader';

export const TableCell = forwardRef(({
    children,
    className,
    align = 'left',
    truncate = false,
    ...props
}, ref) => (
    <td
        ref={ref}
        className={cn(
            'px-4 py-3 text-gray-700 dark:text-gray-300',
            align === 'left' && 'text-left',
            align === 'center' && 'text-center',
            align === 'right' && 'text-right',
            truncate && 'truncate max-w-xs',
            className
        )}
        {...props}
    >
        {children}
    </td>
));

TableCell.displayName = 'TableCell';

export const TableEmpty = forwardRef(({
    children,
    colSpan,
    className,
    ...props
}, ref) => {
    const { t } = useLanguages();
    return (
        <tr ref={ref} {...props}>
            <td
                colSpan={colSpan}
                className={cn(
                    'px-4 py-12 text-center text-gray-500 dark:text-gray-400',
                    className
                )}
            >
                {children || t('common.no_data_available') || 'No data available'}
            </td>
        </tr>
    );
});

TableEmpty.displayName = 'TableEmpty';

export const TableLoading = forwardRef(({
    colSpan,
    className,
    ...props
}, ref) => {
    const { t } = useLanguages();
    return (
        <tr ref={ref} {...props}>
            <td
                colSpan={colSpan}
                className={cn(
                    'px-4 py-12 text-center',
                    className
                )}
            >
                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{t('common.loading') || 'Loading...'}</span>
                </div>
            </td>
        </tr>
    );
});

TableLoading.displayName = 'TableLoading';

// Attach compound components
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Header = TableHeader;
Table.Cell = TableCell;
Table.Empty = TableEmpty;
Table.Loading = TableLoading;