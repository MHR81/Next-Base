'use client';

import { motion } from 'framer-motion';
import { useLanguages } from '@/langueges/useLanguages';
import Image from 'next/image';
import SVG1 from '@/app/(Public)/_components/SVGs/Academic&Educational.svg';
import SVG2 from '@/app/(Public)/_components/SVGs/Educational.svg';
import SVG3 from '@/app/(Public)/_components/SVGs/Art.svg';
import SVG4 from '@/app/(Public)/_components/SVGs/Biography.svg';
import SVG5 from '@/app/(Public)/_components/SVGs/Poetry&creative.svg';
import SVG6 from '@/app/(Public)/_components/SVGs/Science&technology.svg';
import SVG7 from '@/app/(Public)/_components/SVGs/Romantic.svg';
import SVG8 from '@/app/(Public)/_components/SVGs/Magazine&Articles.svg';
import SVG9 from '@/app/(Public)/_components/SVGs/Child&Adolescent.svg';
import SVG10 from '@/app/(Public)/_components/SVGs/Historical.svg';

export default function Category() {
    const { t } = useLanguages();
    
    const Mock = [
        { label: t("home.academic&educational"), icon: SVG1, id: 1 },
        { label: t("home.educational"), icon: SVG2, id: 2 },
        { label: t("home.art"), icon: SVG3, id: 3 },
        { label: t("home.biography"), icon: SVG4, id: 4 },
        { label: t("home.poetry&creative"), icon: SVG5, id: 5 },
        { label: t("home.science&technology"), icon: SVG6, id: 6 },
        { label: t("home.romantic"), icon: SVG7, id: 7 },
        { label: t("home.magazine&articles"), icon: SVG8, id: 8 },
        { label: t("home.child&adolescent"), icon: SVG9, id: 9 },
        { label: t("home.historical"), icon: SVG10, id: 10 },
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
                className="text-2xl font-semibold text-start w-full mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                {t("common.category")}
            </motion.h2>
            <div className="flex flex-wrap justify-center gap-y-5 max-w-4xl">
                {Mock.map((m, index) => (
                    <motion.div 
                        key={m.id} 
                        className="flex flex-col items-center gap-2 cursor-pointer w-40 group"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <motion.div 
                            className="w-24 h-24 flex p-7 justify-center items-center rounded-full border border-[#F9784F]"
                            whileHover={{ boxShadow: "0 0 20px rgba(249, 120, 79, 0.3)" }}
                        >
                            <Image width={100} height={100} src={m.icon} alt={m.label} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 " />
                        </motion.div>
                        <h3 className="text-center  w-30">{m.label}</h3>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}