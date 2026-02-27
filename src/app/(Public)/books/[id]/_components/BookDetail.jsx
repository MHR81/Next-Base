'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, BookOpen, ThumbsUp, ThumbsDown, MessageSquare, MoreHorizontal } from 'lucide-react';
import { BsMic } from "react-icons/bs";
import { BsBook } from "react-icons/bs";
import Carousel from '@/_components/ui/Carousel/Carousel';
import Image from 'next/image';
import { DiscImage } from '@/hooks/useDiscImage';
import book1 from '@/_assets/images/book2.png';
import awardMan from '@/_assets/images/awardMan.png';
import AudioPlayerButton from '@/_components/AudioPlayerButton';
import { useRouter, useParams } from 'next/navigation';
import { useLanguages } from '@/langueges/useLanguages';
import { clientBookService } from '@/lib/services/client/book';

// import notificationSound from '@/_assets/audios/notification.mp3';


const bookData = {
    title: "Animal Farm",
    author: "George Orwell",
    publisher: "shima",
    type: "podcast", // book / audio
    rating: 5,
    cover: book1,
    description: `Animal Farm tells the story of farm animals who rebel against their human owner to create an equal society.
At first, the farm is run on principles of fairness and shared power.
Gradually, the pigs—led by Napoleon—take control and begin to abuse their authority.
In the end, the animals realize their new leaders are just as oppressive as the humans they replaced.`
};

const commentsData = [
    {
        id: 1,
        name: "Ali",
        avatar: awardMan,
        rating: 3,
        date: "2025/10/10",
        text: "English is the language of the science world, and a good understanding of the language, especially in the context in which it is used for science and research purposes, is crucial for those seeking to achieve highly in the field.",
        likes: 14,
        dislikes: 2
    },
    {
        id: 2,
        name: "Ali",
        avatar: awardMan,
        rating: 2,
        date: "2025/10/10",
        text: "English is the language of the science world, and a good understanding of the language, especially in the context in which it is used for science and research purposes, is crucial for those seeking to achieve highly in the field.",
        likes: 14,
        dislikes: 2
    },
    {
        id: 3,
        name: "Ali",
        avatar: awardMan,
        rating: 1,
        date: "2025/10/10",
        text: "English is the language of the science world, and a good understanding of the language, especially in the context in which it is used for science and research purposes, is crucial for those seeking to achieve highly in the field.",
        likes: 14,
        dislikes: 2
    },
    {
        id: 4,
        name: "Ali",
        avatar: awardMan,
        rating: 5,
        date: "2025/10/10",
        text: "English is the language of the science world, and a good understanding of the language, especially in the context in which it is used for science and research purposes, is crucial for those seeking to achieve highly in the field.",
        likes: 14,
        dislikes: 2
    }
];

const StarRating = ({ rating, size = 16 }) => (
    <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                size={size}
                className={i < rating ? "fill-orange-400 text-orange-400" : "fill-gray-200 text-gray-200"}
            />
        ))}
    </div>
);


export default function BookDetail({ data }) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const router = useRouter();
    const { isRTL } = useLanguages();
    const [bookData, setBookData] = useState(data || {});



    return (
        <div className="min-h-screen bg-white py-8  md:p-12">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row gap-10 mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="md:shrink-0 flex items-center md:items-start justify-center"
                    >

                        {bookData?.type === "book" ? (
                            <div className="w-56 h-80 rounded-xl overflow-hidden shadow-xl">
                                <Image
                                    width={100}
                                    height={100}
                                    src={bookData?.image?.path || book1}
                                    alt={bookData?.title || "Book Cover"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                                <DiscImage size={220} holeSize={30} src={bookData?.image?.path || book1} alt={bookData?.title || "Podcast Cover"} />
                        )}

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex-1 pt-2"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <StarRating rating={bookData.rating} size={20} />
                        </div>

                        <div className='flex gap-2 justify-start items-center'>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">{bookData?.title}</h1>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-gray-600 font-medium">{bookData?.author}</span>
                                <span className="text-gray-400 text-sm">{bookData?.publisher}</span>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center gap-3 mb-6 w-full">
                            <div className='flex flex-col gap-2 self-start mt-3'>
                                <span className='text-sm text-muted'>
                                    Book - Political - Satire
                                </span>
                                <div className='flex gap-5'>
                                    <button className="flex items-center max-w-22 gap-2 px-4 py-2 rounded-lg bg-orange-400 text-white hover:bg-orange-500 transition-colors">
                                        {bookData.type === "podcast" ? <BsMic size={18} /> : <BsBook size={18} />}

                                        <span className="text-sm font-medium">{bookData.type === "podcast" ? "Audio" : "Book"}</span>
                                    </button>
                                    {bookData.type !== "book" && (
                                        <AudioPlayerButton
                                            // className={`lg:ms-5 ${isRTL ? 'lg:me-5' : ''}`}
                                            audioSrc={"/testVoice.mp3"}
                                            coverImage={bookData?.image?.path || book1}
                                            title={bookData?.title}
                                            author={bookData?.author}
                                            onEnded={() => console.log('Finished!')}
                                            onNext={() => console.log('Next track')}
                                            onPrevious={() => console.log('Previous track')}
                                        />
                                    )}
                                </div>

                                <span>
                                    Added by : {bookData?.author}
                                </span>
                            </div>

                        </div>

                        <p className="text-gray-500 text-sm leading-6 whitespace-pre-line max-w-2xl">
                            {bookData?.description}
                        </p>

                        <motion.button
                            onClick={() => router.back()}
                            whileHover={{ x: -4 }}
                            className="mt-6 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Comments</h2>
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                            More
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="m12 16 4-4-4-4M8 12h8" />
                            </svg>
                        </button>
                    </div>

                    <div className="w-full mb-6">
                        <Carousel
                            itemsPerView={{ default: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4 }}
                            gap={{ default: 10, xs: 16, sm: 24, md: 30, lg: 34, xl: 40, xxl: 50 }}
                        // gap={20}
                        // onScroll={checkScroll}
                        >
                            {commentsData.map((comment, index) => (
                                <div
                                    key={comment.id}
                                    className="flex flex-col gap-2 cursor-grab active:cursor-grabbing rounded-lg p-5 border border-accent shadow-sm"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                width={100}
                                                height={100}
                                                src={comment.avatar}
                                                alt={comment.name}
                                                draggable={false}
                                                onDragStart={(e) => e.preventDefault()}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-900 text-sm">{comment.name}</h4>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <StarRating rating={comment.rating} size={12} />
                                                    <span className="text-xs text-gray-400">{comment.rating}.5</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400">{comment.date}</span>
                                    </div>

                                    <p className="text-gray-500 text-xs leading-5 mb-4 line-clamp-4">
                                        {comment.text}
                                        <button className="text-orange-400 hover:text-orange-500 ml-1 font-medium">
                                            See More
                                        </button>
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setLiked(!liked)}
                                            className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? 'text-orange-400' : 'text-gray-400 hover:text-gray-600'}`}
                                        >
                                            <ThumbsUp size={14} className={liked ? "fill-current" : ""} />
                                            <span>({comment.likes})</span>
                                        </button>
                                        <button
                                            onClick={() => setDisliked(!disliked)}
                                            className={`flex items-center gap-1.5 text-xs transition-colors ${disliked ? 'text-red-400' : 'text-gray-400 hover:text-gray-600'}`}
                                        >
                                            <ThumbsDown size={14} className={disliked ? "fill-current" : ""} />
                                            <span>({comment.dislikes})</span>
                                        </button>
                                        <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors ml-auto">
                                            <MessageSquare size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}