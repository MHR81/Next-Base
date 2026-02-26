'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DiscImage } from '@/hooks/useDiscImage';
import Image from 'next/image';
import Link from 'next/link';

// const booksData = [
//     { id: 1, title: "The Stranger", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop", type: "book" },
//     { id: 2, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop", type: "book" },
//     { id: 3, title: "The Fall", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop", type: "book" },
//     { id: 4, title: "The Fall", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop", type: "book" },
//     { id: 5, title: "The Fall", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop", type: "book" },
//     { id: 6, title: "The Stranger", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop", type: "book" },
//     { id: 7, title: "The Fall", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop", type: "book" },
//     { id: 8, title: "The Fall", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop", type: "book" },
//     // Audiobooks (disc style)
//     { id: 9, title: "The Fall", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=300&fit=crop", type: "audio" },
//     { id: 10, title: "The Fall", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=300&fit=crop", type: "audio" },
//     { id: 11, title: "The Stranger", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop", type: "audio" },
//     { id: 12, title: "The Fall", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=300&fit=crop", type: "audio" },
//     { id: 13, title: "The Stranger", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop", type: "audio" },
//     { id: 14, title: "The Stranger", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop", type: "audio" },
//     { id: 15, title: "The Fall", author: "Albert Camus", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=300&fit=crop", type: "audio" },
// ];

const BookCard = ({ book, index }) => {
    const isAudio = book.type !== "book";

    return (
        <Link href={`/books/${book._id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group cursor-pointer"
            >
                {/* Cover Container */}
                <div className={`
        relative bg-white rounded-2xl p-4 shadow-sm border border-gray-100 
        hover:shadow-lg hover:border-orange-200 transition-all duration-300
        flex items-center justify-center
        ${isAudio ? 'aspect-square' : 'aspect-[3/4]'}
      `}>
                    {isAudio ? (
                        <DiscImage
                            src={book?.image?.path}
                            size={140}
                            holeSize={20}
                            halo={true}
                            haloPadding={10}
                            shadow={true}
                            border={false}
                            boxed={false}
                        />
                    ) : (
                        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md">
                            <Image
                                width={100}
                                height={100}
                                src={book?.image?.path}
                                alt={book.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-white/30 to-transparent" />
                        </div>
                    )}
                </div>

                <div className="mt-4 text-center">
                    <h3 className="text-gray-900 font-semibold text-sm truncate group-hover:text-[#F4A261] transition-colors">
                        {book.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1 truncate">
                        {book.author}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
};

export default function BookList({ data }) {
    console.log("books data in list", data);
    return (
        <div className="min-h-screen bg-white py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold text-gray-900 mb-8"
                >
                    Book List
                </motion.h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {data?.map((book, index) => (

                        <BookCard key={book._id} book={book} index={index} />

                    ))}

            </div>
        </div>
        </div >
    );
}