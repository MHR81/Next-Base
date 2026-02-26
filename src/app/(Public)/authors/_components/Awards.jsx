'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import awardMan from '@/_assets/images/awardMan.png';
import Link from 'next/link';

const awardsData = [
    {
        id: 1,
        name: "Albert Camus",
        image: awardMan,
        description: "This award is given to people in the field of writing who have the ability to solve very complex problems in mathematics.",
        likes: "1k"
    },
    {
        id: 2,
        name: "Albert Camus",
        image: awardMan,
        description: "This award is given to people in the field of writing who have the ability to solve very complex problems in mathematics.",
        likes: "1k"
    },
    {
        id: 3,
        name: "Albert Camus",
        image: awardMan,
        description: "This award is given to people in the field of writing who have the ability to solve very complex problems in mathematics.",
        likes: "1k"
    },
    {
        id: 4,
        name: "Albert Camus",
        image: awardMan,
        description: "This award is given to people in the field of writing who have the ability to solve very complex problems in mathematics.",
        likes: "1k"
    }
];

const AwardCard = ({ data, index }) => {
    const [liked, setLiked] = useState(false);

    return (
        <Link href={`/Authors/${data?._id}`}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white max-w-md rounded-2xl p-3 shadow-sm border border-gray-100"
            >
                <div className="relative rounded-xl overflow-hidden mb-3">
                    <Image
                        width={100}
                        height={100}
                        src={data?.image?.path || awardMan}
                        alt={data?.name}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 right-2">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            className="drop-shadow-md"
                        >
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill="rgba(255,255,255,0.3)" />
                        </svg>
                    </div>
                </div>

                <div className="px-1">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-gray-900 font-semibold text-base">{data?.name}</h3>

                        <button
                            onClick={() => setLiked(!liked)}
                            className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                        >
                            <motion.div
                                whileTap={{ scale: 0.8 }}
                            >
                                <Heart
                                    size={18}
                                    className={`transition-all duration-300 ${liked ? 'fill-red-500 text-red-500' : ''}`}
                                />
                            </motion.div>
                            <span className="text-sm font-medium">{data?.likeCount || 0}</span>
                        </button>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {data?.description}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
};

export default function Author({ data }) {
    const authorsData = data || [];
    console.log("Authors data:", data);
    return (
        <div className=" px-8 md:px-12 py-5">
            <div className="max-w-5xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold text-gray-900 mb-8"
                >
                    Authors
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 place-items-center">
                    {authorsData.map((author, index) => (
                        <AwardCard key={author?._id} data={author} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}