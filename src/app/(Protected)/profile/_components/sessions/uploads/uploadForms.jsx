'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Image, Headphones } from 'lucide-react';
import { FormInput } from '@/_components/ui/Input';
import { DropZone } from '@/_components/ui/DropZone/DropZone';

// const Input = ({ label, placeholder, value, onChange, name, type = "text", className = "" }) => (
//     <div className={`w-full ${className}`}>
//         <label className="text-sm font-medium text-gray-800 mb-2 block">{label}</label>
//         <input
//             type={type}
//             name={name}
//             placeholder={placeholder}
//             value={value}
//             onChange={onChange}
//             className="w-full px-4 py-3 bg-[#E8E8E8] rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all"
//         />
//     </div>
// );


// Note: textarea handled via <FormInput type="textarea" />

export const PdfBookForm = ({ onSubmit, onBack }) => {
    const MOCK_CATEGORY = [
        { value: 'LifeStyle', label: 'LifeStyle' },
        { value: 'Business', label: 'Business' },
        { value: 'Science', label: 'Science' },
        { value: 'Fiction', label: 'Fiction' },
    ];
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: 'LifeStyle',
        description: '',
        pdfFile: null,
        coverImage: null
    });

    const handleChange = (e) => {
        console.log('Input change:', e.target.name, e.target.value);
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(formData);
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-3">
                    <FormInput
                        label="Book Title"
                        type="text"
                        name="title"
                        placeholder="enter your book name"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Author"
                        type="text"
                        name="author"
                        placeholder="author name"
                        value={formData.author}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Category"
                        type='select'
                        options={MOCK_CATEGORY}
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Description"
                        type="textarea"
                        name="description"
                        placeholder="enter your more detail"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-6 pt-1">
                    <DropZone
                        label="Book File"
                        accept=".pdf"
                        icon={FileText}
                        fileType="pdf"
                        selectedFile={formData.pdfFile}
                        onFileSelect={(file) => setFormData(prev => ({ ...prev, pdfFile: file }))}
                    />

                    <DropZone
                        label="Book Cover"
                        accept="image/*"
                        icon={Image}
                        fileType="image"
                        selectedFile={formData.coverImage}
                        onFileSelect={(file) => setFormData(prev => ({ ...prev, coverImage: file }))}
                    />
                </div>
            </div>

            <div className="flex gap-4 mt-12 max-w-md mx-auto">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 py-3 px-6 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                    Back
                </button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-xl bg-[#F4A261] text-white font-medium hover:bg-[#E89550] transition-colors"
                >
                    Publish book
                </motion.button>
            </div>
        </motion.form>
    );
};


export const AudiobookForm = ({ onSubmit, onBack }) => {
    const MOCK_CATEGORY = [
        { value: 'LifeStyle', label: 'LifeStyle' },
        { value: 'Business', label: 'Business' },
        { value: 'Science', label: 'Science' },
        { value: 'Fiction', label: 'Fiction' },
    ];

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        narrator: '',
        category: 'LifeStyle1',
        description: '',
        audioFile: null,
        coverImage: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(formData);
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-1">
                    <FormInput
                        label="Book Title"
                        name="title"
                        placeholder="enter your book name"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormInput
                            label="Author"
                            name="author"
                            placeholder="author name"
                            value={formData.author}
                            onChange={handleChange}
                        />

                        <FormInput
                            label="Narrator"
                            name="narrator"
                            placeholder="narrator name"
                            value={formData.narrator}
                            onChange={handleChange}
                        />
                    </div>

                    <FormInput
                        label="Category"
                        type='select'
                        options={MOCK_CATEGORY}
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Description"
                        type="textarea"
                        name="description"
                        placeholder="enter your more detail"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-6 pt-1">
                    <DropZone
                        label="Audio Book File"
                        accept="audio/mp3,audio/mpeg"
                        icon={Headphones}
                        fileType="mp3"
                        selectedFile={formData.audioFile}
                        onFileSelect={(file) => setFormData(prev => ({ ...prev, audioFile: file }))}
                    />

                    <DropZone
                        label="Book Cover"
                        accept="image/*"
                        icon={Image}
                        fileType="image"
                        selectedFile={formData.coverImage}
                        onFileSelect={(file) => setFormData(prev => ({ ...prev, coverImage: file }))}
                    />
                </div>
            </div>

            <div className="flex gap-4 mt-12 max-w-md mx-auto">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 py-3 px-6 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                    Back
                </button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-xl bg-[#F4A261] text-white font-medium hover:bg-[#E89550] transition-colors"
                >
                    Publish Audiobook
                </motion.button>
            </div>
        </motion.form>
    );
};

export default function UploadBookForms({ activeTab, onBack }) {
     // 'pdf' | 'audio'

    const handleSubmit = (data) => {
        console.log('Form submitted:', data);
        // API call here
    };

    return (
        <div className="min-h-screen bg-white py-12">
           

            {activeTab === 'pdf' ? (
                <PdfBookForm
                    onSubmit={handleSubmit}
                    onBack={onBack}
                />
            ) : (
                <AudiobookForm
                    onSubmit={handleSubmit}
                    onBack={onBack}
                />
            )}
        </div>
    );
}