'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Carousel from '@/_components/ui/Carousel/Carousel';
import Image from 'next/image';
import awardMan from '@/_assets/images/awardMan.png';
import { clientAuthorsService } from '@/lib/services/client/authors';
import { useParams } from 'next/navigation';
import { DiscImage } from '@/hooks/useDiscImage';
import book1 from '@/_assets/images/book1.png';
import book2 from '@/_assets/images/book2.png';
import book3 from '@/_assets/images/book3.png';
import book4 from '@/_assets/images/book4.png';
import { useEffect } from 'react';

const authorData = {
    name: "Albert Camus",
    bio: `He was born on February 26, 1802, in France, and died on May 22, 1885, at the age of 83. Victor Hugo lived during a time of great political and social change, and these events deeply shaped his writing and beliefs.

Hugo is considered one of the most important figures of French Romanticism. He believed that literature should defend human dignity and give a voice to the poor, the oppressed, and the forgotten. Because of his strong opposition to the dictatorship of Napoleon III, he spent nearly 20 years in exile, mainly on the islands of Jersey and Guernsey.

His most famous books include:
Les Misérables (1862) – a novel about justice, poverty, redemption, and moral struggle.
The Hunchback of Notre-Dame (1831) – a story about social prejudice, beauty, and cruelty.
The Man Who Laughs (1869) – an exploration of class, cruelty, and human resilience.`
};

const booksData = [
    { id: 1, title: "English Since", cover: book1 },
    { id: 2, title: "Star", cover: book2 },
    { id: 3, title: "The Stranger", cover: book3 },
    { id: 4, title: "The Fall", cover: book4 },
    { id: 5, title: "The Fall", cover: book1 },
    { id: 6, title: "The Stranger", cover: book2 },
    { id: 7, title: "Cosmos", cover: book3 },
    { id: 8, title: "English Since", cover: book4 },
];

const BookCard = ({ book, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="shrink-0 w-32 flex flex-col items-center"
    >
        <motion.div
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="relative w-28 h-40 rounded-lg overflow-hidden shadow-md mb-3 cursor-pointer"
        >
            <Image
                width={100}
                height={100}
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-r from-white/30 to-transparent" />
        </motion.div>
        <p className="text-gray-700 text-sm font-medium text-center">{book.title}</p>
    </motion.div>
);

export default function AuthorDetails() {
    const params = useParams();
    const AuthorId = params?.id;
    const [authorData, setAuthorData] = useState({});
    const [booksData, setBooksData] = useState([]);



    useEffect(() => {
        const getAuthorDetails = async () => {
            try {
                const response = await clientAuthorsService.getAuthorDetails(AuthorId);
                console.log("Author details:", response?.data?.data);
                setAuthorData(response?.data?.data?.author);
                setBooksData(response?.data?.data?.findBooks);
            } catch (error) {
                console.error("Error fetching Author details:", error);
            }
        }
        if (AuthorId) {
            getAuthorDetails();
        }
    }, [AuthorId])

    // useEffect(() => {
    //     const getAuthorBooks = async () => {
    //         try {
    //             const response = await clientAuthorsService.getAuthorBooks(authorData?._id);
    //             console.log("Author details:", response?.data?.data);
    //             setBooksData(response?.data?.books);
    //         } catch (error) {
    //             console.error("Error fetching Author details:", error);
    //         }
    //     }
    //     if (AuthorId) {
    //         getAuthorDetails();
    //     }
    // }, [authorData?._id])


    return (
        <div className=" p-8 md:p-16">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row gap-10 mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex-shrink-0"
                    >
                        <div className="w-72 h-80 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                width={100}
                                height={100}
                                src={authorData?.image?.path || awardMan}
                                alt={authorData?.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex-1 pt-2"
                    >
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">{authorData?.name}</h1>
                        <div className="text-gray-500 text-sm leading-7 whitespace-pre-line">
                            {authorData?.description}
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className='flex flex-col items-center w-full justify-center'
                >
                    <h2 className="text-xl text-start w-full font-bold text-gray-900 mb-8">Famous Books</h2>
                    <div className="w-full mb-6">
                        <Carousel>
                            {booksData.map((book) => (
                                <div
                                    key={book?._id}
                                    className="shrink-0 max-w-40 mx-auto h-full flex flex-col items-center justify-center"
                                >

                                    {book?.type === "book" ? (
                                        <div
                                            className="relative w-36 h-48 rounded-lg overflow-hidden shadow-md mb-3 cursor-pointer"
                                        >
                                            <Image
                                                width={100}
                                                height={100}
                                                src={book?.image?.path || book1}
                                                alt={book?.title}
                                                draggable={false}
                                                onDragStart={(e) => e.preventDefault()}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className='flex justify-center items-center w-36 h-48 rounded-lg overflow-hidden shadow-md mb-3 cursor-pointer'>
                                            <DiscImage
                                                boxed={false}
                                                haloPadding={12}
                                                src={book?.image?.path}
                                                alt={book?.title}
                                            />
                                        </div>
                                    )}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-r from-white/30 to-transparent" />

                                    <p className="text-gray-700 text-sm font-medium text-center">{book?.title}</p>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}