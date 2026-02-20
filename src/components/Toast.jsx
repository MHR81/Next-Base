'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '@/redux/slices/toastSlice';

export default function Toast() {
    const { toasts } = useSelector((state) => state.toast);
    const dispatch = useDispatch();

    useEffect(() => {
        toasts.forEach((toast) => {
            const timer = setTimeout(() => {
                dispatch(removeToast(toast.id));
            }, 5000);
            return () => clearTimeout(timer);
        });
    }, [toasts, dispatch]);

    if (toasts.length === 0) return null;

    const icons = {
        success: '✓',
        error: '✕',
        warning: '!',
        info: 'i',
    };

    const colors = {
        success: 'bg-success',
        error: 'bg-error',
        warning: 'bg-warning',
        info: 'bg-primary',
    };

    return (
        <div className="fixed top-4 left-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`
            flex items-center gap-3 px-4 py-3 rounded-lg text-white shadow-lg
            toast-enter min-w-[300px]
            ${colors[toast.type]}
          `}
                >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 font-bold">
                        {icons[toast.type]}
                    </span>
                    <p className="flex-1 text-sm">{toast.message}</p>
                    <button
                        onClick={() => dispatch(removeToast(toast.id))}
                        className="text-white/80 hover:text-white"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
}