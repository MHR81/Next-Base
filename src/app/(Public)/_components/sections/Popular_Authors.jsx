'use client';

import { motion } from 'framer-motion';
import Carousel from '@/_components/ui/Carousel/Carousel';
import { useLanguages } from '@/langueges/useLanguages';
import Image from 'next/image';
import Fyodor_Dostoevsky from '../images/Fyodor_Dostoevsky.png';
import Albert_Camus from '../images/Albert_Camus.png';
import Victor_Marie_Hugo from '../images/Victor_Marie_Hugo.png';
import BookReader from "@/_components/BookReader";
import { useState } from 'react';
import Link from 'next/link';
import { FiArrowRight } from "react-icons/fi";

export default function Popular_Authors() {
    const { isRTL, t } = useLanguages();
    const [progress, setProgress] = useState(null);

    const Mock = [
        { label: "Fyodor Dostoevsky", image: Fyodor_Dostoevsky, id: 1 },
        { label: "Albert Camus", image: Albert_Camus, id: 2 },
        { label: "Victor Marie Hugo", image: Victor_Marie_Hugo, id: 3 },
        { label: "Fyodor Dostoevsky", image: Fyodor_Dostoevsky, id: 4 },
        { label: "Albert Camus", image: Albert_Camus, id: 5 },
        { label: "Victor Marie Hugo", image: Victor_Marie_Hugo, id: 6 },
    ];

    return (
        <motion.section
            className=" flex flex-col justify-center items-center"
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
                    {t("common.Popular Authors")}
                </motion.h2>
                <Link href="/authors" className={` flex items-center justify-center gap-1.5 text-black text-lg hover:text-gray-700 transition-colors`}>
                    {t('common.More')}
                    <FiArrowRight className={`${isRTL ? 'rotate-y-180' : ''} mb-1`} />
                </Link>
            </div>
            <motion.div
                className="w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
            >
                <Carousel
                    itemsPerView={{ default: 1, xs: 2, sm: 3, md: 3, lg: 5, xl: 5, xxl: 5 }}
                // gap={{ default: 10, xs: 16, sm: 20, md: 28, lg: 30, xl: 40, xxl: 70 }}
                >
                    {Mock.map((m) => (
                        <div key={m.id} className="flex flex-col justify-center items-center rounded-lg gap-2 cursor-grab w-full active:cursor-grabbing ">
                            <Image
                                width={200}
                                height={100}
                                src={m.image}
                                alt={m.label}
                                draggable={false}
                                onDragStart={(e) => e.preventDefault()}
                                className="object-cover max-w-44 rounded"
                            />
                            <h5 className="w-full text-center">{m.label}</h5>
                        </div>
                    ))}
                </Carousel>
            </motion.div> 
            <div className='w-[calc(100%-40px)]' >
                
            <BookReader
                pdfUrl={"/bishoori.pdf"}
                // pdfFile={bishoori}
                title={"بیشعوری"}
                initialPage={1}
                onPageChange={(currentPage, total) => console.log(`صفحه ${currentPage} از ${total}`)}
                // onLoadComplete={({ numPages }) => console.log(`${numPages} صفحه لود شد`)}
                showControls={true}
                onProgress={(progress) => {
                    setProgress(progress?.percent);
                    console.log("Reading progress:", progress);
                }}
                setProgress={{ readPages: [1,2,4,5,8,9,55,105], lastReadPage: 105 }}
                readingTime={5000} // 10 ثانیه برای هر صفحه
            /> 


            <span className="text-sm text-gray-500 mt-2">پیشرفت خواندن: {progress !== null ? `${progress}%` : "0%"}</span>
        </div>
        </motion.section >
    );
}