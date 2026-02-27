'use client';

import { motion } from 'framer-motion';
import Carousel from '@/_components/ui/Carousel/Carousel';
import { useLanguages } from '@/langueges/useLanguages';
import Image from 'next/image';
import book1 from '../images/book1.png';
import book2 from '../images/book2.png';
import book3 from '../images/book3.png';
import book4 from '../images/book4.png';
// import { Star } from 'lucide-react';
import { HiOutlineMicrophone } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";
import Link from 'next/link';


export default function Popular_Audio() {
    const { isRTL, t } = useLanguages();

    // const StarRating = ({ rating, size = 16 }) => (
    //     <div className="flex gap-0.5">
    //         {[...Array(5)].map((_, i) => (
    //             <Star
    //                 key={i}
    //                 size={size}
    //                 className={i < rating ? "fill-orange-400 text-orange-400" : "fill-gray-200 text-gray-200"}
    //             />
    //         ))}
    //     </div>
    // );

    const Mock = [
        { label: "English Since", writer: "John Smith", rate: 3, image: book4, id: 1 },
        { label: "English Since", writer: "Jane Doe", rate: 2, image: book3, id: 2 },
        { label: "English Since", writer: "Robert Johnson", rate: 4, image: book2, id: 3 },
        { label: "English Since", writer: "Emily Davis", rate: 4, image: book1, id: 4 },
        { label: "English Since", writer: "Michael Brown", rate: 5, image: book4, id: 5 },
        { label: "English Since", writer: "Sarah Wilson", rate: 3, image: book3, id: 6 },
        { label: "English Since", writer: "David Miller", rate: 4, image: book2, id: 7 },
        { label: "English Since", writer: "Lisa Anderson", rate: 2, image: book1, id: 8 },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
        >
            <div className='flex w-full justify-between items-center'>
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-2xl font-semibold mb-4"
                >
                    {t("common.Popular Audio")}
                </motion.h2>
                <Link href="/books" className={` flex items-center justify-center gap-1.5 text-black text-lg hover:text-gray-700 transition-colors`}>
                    {t('common.More')}
                    <FiArrowRight className={`${isRTL ? 'rotate-y-180' : ''} mb-1`} />
                </Link>
            </div>

            <Carousel
                itemsPerView={{ default: 1, xs: 2, sm: 3, md: 4, lg: 5, xl: 5, xxl: 6 }}
                // gap={{ default: 6, xs: 8, sm: 12, md: 16, lg: 20, xl: 30, xxl: 60 }}
            >
                {Mock.map((m) => (
                    <div key={m.id} className="flex flex-col gap-2 cursor-grab max-w-60 active:cursor-grabbing bg-[#F0F0F0] pt-2 pb-4 px-3 sm:px-6 rounded">
                        <Image
                            width={100}
                            height={100}
                            src={m.image}
                            alt={m.label}
                            draggable={false}
                            onDragStart={(e) => e.preventDefault()}
                            className="object-cover h-60 w-full rounded"
                        />
                        <div className="flex flex-col gap-0.5 justify-center w-full items-center text-center">
                            <div className='flex gap-2'>
                                <h5 className='w-full'>{m.label}</h5>
                                <span className="w-6.5 h-5 flex items-center justify-center text-gray-500 rounded-full border border-accent ">
                                    <HiOutlineMicrophone className=" text-accent" size={12} />
                                </span>
                            </div>

                            <p className="text-sm text-gray-600">{m.writer}</p>

                            {/* <StarRating rating={Math.round(m.rate)} size={12} /> */}
                        </div>
                    </div>
                ))}
            </Carousel>
        </motion.section>
    );
}