// FileInput.jsx
'use client';

import React, { useState, forwardRef, useRef } from 'react';
import { useLanguages } from '@/langueges/useLanguages';
import { InputWrapper } from '../base/InputWrapper';
import { cn } from '@/utils/helpers';
import Image from 'next/image';

export const FileInput = forwardRef(({
    label,
    helperText,
    error,
    required,
    multiple = false,
    disabled = false,
    onChange,
    size = 'md',
    className,
}, ref) => {
    const [files, setFiles] = useState([]);
    const inputRef = useRef(null);
    const { t } = useLanguages();

    const handleChange = (e) => {
        const selected = Array.from(e.target.files);
        const newFiles = multiple ? [...files, ...selected] : selected;

        const formData = new FormData();
        newFiles.forEach((file, index) => {
            formData.append(multiple ? `files[${index}]` : 'file', file);
        });

        setFiles(newFiles);
        const syntheticEvent = {
            target: {
                name: props.name || '',
                value: multiple ? newFiles : newFiles[0] || null,
            },
        };
        onChange?.(syntheticEvent);

        e.target.value = '';
    };

    const removeFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        onChange?.(multiple ? newFiles : newFiles[0] || null);
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const sizeClasses = {
        sm: 'p-3 text-sm',
        md: 'p-4 text-base',
        lg: 'p-6 text-lg',
    };

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
            <div className="space-y-3">
                {/* Drop Zone */}
                <label
                    className={cn(
                        'flex flex-col items-center justify-center gap-2',
                        'border-2 border-dashed rounded-lg cursor-pointer',
                        'transition-colors duration-200',
                        sizeClasses[size],
                        'border-gray-300 dark:border-gray-600 hover:border-blue-500',
                        disabled && 'opacity-50 cursor-not-allowed',
                        error && 'border-red-500'
                    )}
                >
                    <input
                        ref={(el) => {
                            inputRef.current = el;
                            if (typeof ref === 'function') ref(el);
                            else if (ref) ref.current = el;
                        }}
                        type="file"
                        multiple={multiple}
                        onChange={handleChange}
                        disabled={disabled}
                        className="hidden"
                    />

                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>

                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                        {multiple ? t('common.upload_files') || 'Upload Files' : t('common.upload_file') || 'Upload File'}
                    </span>
                    <span className="text-gray-400 text-sm">
                        {t('common.click_or_drag') || 'Click or drag files here to upload'}
                    </span>
                </label>

                {/* File List */}
                {files.length > 0 && (
                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            >
                                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded text-xl">
                                    {file.type.startsWith('image/') ? (
                                        <Image width={100} height={100} src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover rounded" />
                                    ) : '📄'}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatSize(file.size)}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    disabled={disabled}
                                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </InputWrapper>
    );
});

FileInput.displayName = 'FileInput';