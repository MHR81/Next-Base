'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Pencil } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/utils/helpers';
import { DiscImage } from '@/hooks/useDiscImage';
import { useLanguages } from '@/langueges/useLanguages';
import UploadBookForms from './uploadForms';
import book1 from '@/_assets/images/book1.png';
import book2 from '@/_assets/images/book2.png';
import book3 from '@/_assets/images/book3.png';
import book4 from '@/_assets/images/book4.png';

const booksData = [
    {
        id: 1,
        title: "Man's Search for Meaning",
        author: "Viktor E. Frankl",
        category: "Book > Political",
        type: "audio",
        status: "approved",
        cover: book1,
        description: "He observes that those who found meaning in their suffering were more likely to survive. Frankl argues that even in the worst conditions, humans retain the freedom to choose their attitude..."
    },
    {
        id: 2,
        title: "Animal Farm",
        author: "George Orwell",
        category: "Book > Political",
        type: "book",
        status: "rejected",
        cover: book2,
        description: "Animal Farm tells the story of farm animals who rebel against their human owner to create an equal society. At first, the farm is run on principles of fairness and shared power..."
    },
    {
        id: 3,
        title: "Animal Farm",
        author: "George Orwell",
        category: "Book > Political",
        type: "book",
        status: "approved",
        cover: book3,
        description: "Animal Farm tells the story of farm animals who rebel against their human owner to create an equal society. At first, the farm is run on principles of fairness and shared power..."
    },
    {
        id: 4,
        title: "Man's Search for Meaning",
        author: "Viktor E. Frankl",
        category: "Book > Political",
        type: "audio",
        status: "rejected",
        cover: book4,
        description: "He observes that those who found meaning in their suffering were more likely to survive. Frankl argues that even in the worst conditions, humans retain the freedom to choose their attitude..."
    }
];

const filters = [
    { id: 'new', label: 'New', color: 'bg-[#F4A261]' },
    { id: 'book', label: 'Book', color: 'bg-[#F4A261]/70' },
    { id: 'audio', label: 'Audio', color: 'bg-[#F4A261]/70' }
];

const BookCard = ({ book, index, type }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-5 border border-orange-100 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex gap-5">
                <div className="shrink-0">
                    <div className={cn(type === 'audio' ? "" : "w-28 h-40 rounded-xl overflow-hidden shadow-md")}>
                        {type === 'audio' ? (
                            <DiscImage haloPadding={10} holeSize={25} src={book.cover} alt={book.title} />
                        ) : (
                            <Image
                                width={100}
                                height={100}
                                src={book.cover}
                                alt={book.title}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-gray-900 font-bold text-base">
                                {book.title}
                                <span className="text-gray-500 font-normal"> - {book.author}</span>
                            </h3>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                <Pencil size={14} />
                            </button>
                        </div>

                        <span className={`text-sm font-medium ${book.status === 'approved' ? 'text-green-500' : 'text-red-400'
                            }`}>
                            {book.status === 'approved' ? 'Approved' : 'Rejected'}
                        </span>
                    </div>

                    <p className="text-gray-400 text-xs mb-3">{book.category}</p>

                    <p className="text-gray-500 text-sm leading-6">
                        {expanded ? book.description : book.description.slice(0, 120)}
                        {!expanded && book.description.length > 120 && '...'}
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-orange-400 hover:text-orange-500 font-medium ml-1"
                        >
                            {expanded ? 'See less' : 'See more'}
                        </button>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default function BooksList() {
    const { t, isRTL } = useLanguages();
    const [activeFilter, setActiveFilter] = useState('new');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [showUploadDropdown, setShowUploadDropdown] = useState(false);
    const [activeTab, setActiveTab] = useState(null); // 'pdf' | 'audio' | null
    const uploadRef = useRef(null);
    const firstItemRef = useRef(null);

    useEffect(() => {
        function handleOutside(e) {
            if (uploadRef.current && !uploadRef.current.contains(e.target)) {
                setShowUploadDropdown(false);
            }
        }

        function handleEsc(e) {
            if (e.key === 'Escape') setShowUploadDropdown(false);
        }

        document.addEventListener('mousedown', handleOutside);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    useEffect(() => {
        if (showUploadDropdown) firstItemRef.current?.focus();
    }, [showUploadDropdown]);

    const filteredBooks = booksData.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        activeTab === null ? (
            <div className="min-h-screen bg-white px-4">
                <div className="max-w-4xl mx-auto">
                    <div className={cn('flex  sm:flex-row gap-4 mb-8', isRTL ? 'justify-end' : 'justify-start')}>
                        <div className="relative" ref={uploadRef}>
                            <button
                                onClick={() => setShowUploadDropdown((s) => !s)}
                                aria-haspopup="menu"
                                aria-expanded={showUploadDropdown}
                                className="inline-flex items-center justify-center w-23 h-9 gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium shadow-sm hover:bg-accent-hover transition"
                            >
                                New
                                <ChevronDown size={16} />
                            </button>

                            <div
                                role="menu"
                                aria-hidden={!showUploadDropdown}
                                className={`absolute right-0 top-8 flex flex-col gap-1 mt-2 w-23 z-20 rounded-lg overflow-hidden transform transition-all ${showUploadDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    ref={firstItemRef}
                                    role="menuitem"
                                    onClick={() => { setActiveTab('pdf'); setShowUploadDropdown(false); }}
                                    className="w-full h-9 text-center text-white px-4 z-30 py-2 rounded-lg bg-accent2 hover:bg-accent-hover"
                                >
                                    Book
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    role="menuitem"
                                    onClick={() => { setActiveTab('audio'); setShowUploadDropdown(false); }}
                                    className="w-full h-9 text-center text-white px-4 py-2 z-30 rounded-lg bg-accent2 hover:bg-accent-hover"
                                >
                                    Audio
                                </motion.button>
                            </div>
                        </div>

                    </div>

                    <div className="space-y-4 mt-20">
                        <AnimatePresence>
                            {filteredBooks.map((book, index) => (
                                <BookCard key={book.id} book={book} index={index} type={book.type} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredBooks.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 text-gray-400"
                        >
                            No books found
                        </motion.div>
                    )}
                </div>
            </div>
        ) : (
            <UploadBookForms activeTab={activeTab} onBack={() => setActiveTab(null)} />
        )
    );
}
