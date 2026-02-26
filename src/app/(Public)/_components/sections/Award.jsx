'use client';

import { motion } from 'framer-motion';
import Carousel from '@/_components/ui/Carousel/Carousel';
import { useLanguages } from '@/langueges/useLanguages';
import Award from '@/app/(Public)/_components/images/Award.png';
import Image from 'next/image';

export default function AwardSection() {
    const { t } = useLanguages();

    const Mock = [
        { image: Award, label: "Award1", id: 1 },
        { image: Award, label: "Award2", id: 2 },
        { image: Award, label: "Award3", id: 3 },

    ];

    return (
        <motion.section
            className="flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
        >
            <motion.h2
                className="text-2xl text-start w-full font-semibold mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                {t("common.Awards")}
            </motion.h2>
            <motion.div
                className="w-full md:w-2/3 lg:w-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
            >
                <Carousel 
                itemsPerView={{ default: 1, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
                >
                    {Mock.map((m) => (
                        <div key={m.id} className="flex flex-col gap-2 w-full cursor-grab active:cursor-grabbing">
                            <Image
                                width={450}
                                height={200}
                                src={m.image}
                                alt={m.label}
                                draggable={false}
                                onDragStart={(e) => e.preventDefault()}
                                className="object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </Carousel>
            </motion.div>
        </motion.section>
    );
}