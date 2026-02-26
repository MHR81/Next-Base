'use client';

import { useState, useRef } from "react";
import { useLanguages } from '@/langueges/useLanguages';
import { motion } from "framer-motion";
import { X } from "lucide-react";

export const DropZone = ({
    label,
    accept,
    icon: Icon,
    fileType,
    onFileSelect,
    selectedFile,
    multiple = false
}) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef(null);
    const { t } = useLanguages();

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onFileSelect(multiple ? files : files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files.length > 0) {
            onFileSelect(multiple ? e.target.files : e.target.files[0]);
        }
    };

    const clearFile = () => {
        onFileSelect(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div className="w-full">
            <label className="text-sm font-medium text-gray-700 mb-2 block">{label}</label>

            {!selectedFile ? (
                <motion.div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`
            relative border-2 border-dashed rounded-2xl p-8
            flex flex-col items-center justify-center gap-3
            cursor-pointer transition-all duration-200 min-h-[140px]
            ${isDragOver
                            ? 'border-orange-400 bg-orange-50'
                            : 'border-orange-200 hover:border-orange-300 bg-white'
                        }
          `}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        onChange={handleChange}
                        className="hidden"
                        multiple={multiple}
                    />

                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-orange-500" />
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600 font-medium">
                            {t('common.drop_drag') || 'Drop or drag files here'} {fileType} {t('common.file') || 'file'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            {t('common.or') || 'or'} <span className="text-orange-400 hover:text-orange-500">{t('common.browse') || 'browse'}</span> {t('common.file_on_your_computer') || 'file on your computer'}
                        </p>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative border-2 border-orange-200 rounded-2xl p-4 bg-orange-50"
                >
                    <button
                        onClick={clearFile}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors"
                    >
                        <X size={14} />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-orange-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-700 truncate">
                                {selectedFile.name}
                            </p>
                            <p className="text-xs text-gray-400">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};