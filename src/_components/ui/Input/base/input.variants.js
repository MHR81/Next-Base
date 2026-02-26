import { cva } from 'class-variance-authority';

export const inputWrapperVariants = cva(
    'relative flex flex-col gap-1.5 w-full',
    {
        variants: {
            size: {
                sm: 'gap-1',
                md: 'gap-1.5',
                lg: 'gap-2',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    }
);

export const labelVariants = cva(
    'font-medium text-gray-700 dark:text-gray-200 select-none',
    {
        variants: {
            size: {
                sm: 'text-xs',
                md: 'text-sm',
                lg: 'text-base',
            },
            required: {
                true: 'after:content-["*"] after:ml-0.5 after:text-red-500',
            },
        },
        defaultVariants: {
            size: 'lg',
            required: false,
        },
    }
);

export const inputFieldVariants = cva(
    [
        'w-full bg-white dark:bg-gray-900 border transition-all duration-200',
        'placeholder:text-gray-400 dark:placeholder:text-gray-500',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-800',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    ],
    {
        variants: {
            size: {
                sm: 'h-8 px-2.5 text-xs rounded-md',
                md: 'h-10 px-3 text-sm rounded-lg',
                lg: 'h-15 px-4 text-base rounded-xl',
                custom: 'h-11 px-3 text-sm rounded-lg',
            },
            variant: {
                default: [
                    'border-gray-300 dark:border-gray-600',
                    'focus:border-blue-500 focus:ring-blue-500/20',
                    'hover:border-gray-400 dark:hover:border-gray-500',
                ],
                danger: [
                    'border-red-300 dark:border-red-600',
                    'focus:border-red-500 focus:ring-red-500/20',
                    'text-red-900 dark:text-red-100',
                ],
                success: [
                    'border-green-300 dark:border-green-600',
                    'focus:border-green-500 focus:ring-green-500/20',
                    'text-green-900 dark:text-green-100',
                ],
                custom: [
                    'bg-input placeholder:text-input-text border-gray-300 dark:border-gray-600',
                    'focus:ring-accent',
                    'hover:border-accent dark:hover:border-accent',
                ],
                custom2: [
                    'bg-input2 placeholder:text-input-text border-gray-300 dark:border-gray-600',
                    'focus:ring-accent',
                    'hover:border-accent dark:hover:border-accent',
                ],
            },
            rounded: {
                none: 'rounded-none',
                sm: 'rounded-md',
                md: 'rounded-lg',
                lg: 'rounded-xl',
                full: 'rounded-full',
            },
        },
        defaultVariants: {
            size: 'md',
            variant: 'custom',
            rounded: 'md',
        },
    }
);

export const helperTextVariants = cva(
    'text-xs transition-colors',
    {
        variants: {
            variant: {
                default: 'text-gray-500 dark:text-gray-400',
                error: 'text-red-500 dark:text-red-400',
                success: 'text-green-500 dark:text-green-400',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export const counterVariants = cva(
    'text-xs text-gray-400 dark:text-gray-500 tabular-nums',
    {
        variants: {
            status: {
                normal: '',
                warning: 'text-yellow-500',
                error: 'text-red-500',
            },
        },
        defaultVariants: {
            status: 'normal',
        },
    }
);