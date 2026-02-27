import { motion } from 'framer-motion';
import { CiSearch } from 'react-icons/ci';
import { useLanguages } from '@/langueges/useLanguages';

export default function AnimatedSearchBox({ scrollY, variant = 'banner' }) {
    const { t, isRTL } = useLanguages();

    const bannerOpacity = scrollY < 80 ? 1 : 0;
    const headerOpacity = scrollY >= 80 ? 1 : 0;

    const bannerScale = scrollY < 80 ? 1 : 0.95;
    const headerScale = scrollY >= 80 ? 1 : 0.95;

    const progress = Math.min(Math.max(scrollY - 0, 0) / 80, 1); // 0 to 1

    if (variant === 'banner') {
        return (
            <motion.div
                className="mt-5 flex-1 hidden sm:block ms-5 sm:ms-0 sm:w-xs md:w-sm md:max-w-lg"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: bannerOpacity, scale: bannerScale }}
                transition={{
                    opacity: { duration: 0.4, ease: 'easeInOut' },
                    scale: { duration: 0.4, ease: 'easeInOut' },
                }}
                style={{
                    pointerEvents: bannerOpacity < 0.1 ? 'none' : 'auto',
                }}
            >
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t('common.search')}
                        className="w-full ps-10 pe-4 py-2 placeholder:text-start rounded-lg bg-gray-100
                         focus:outline-none focus:ring-2 
                         focus:ring-accent transition-all"
                    />
                    <CiSearch className="absolute start-3 top-1/2 -translate-y-1/2 
                              w-5 h-5 text-gray-400" />
                </div>
            </motion.div>
        );
    }

    if (variant === 'always') {
        return (
            <div className="w-full sm:w-auto">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t('common.search')}
                        className="w-full sm:w-72 ps-10 pe-4 py-2 placeholder:text-start rounded-lg bg-gray-100
                         focus:outline-none focus:ring-2 
                         focus:ring-accent transition-all"
                    />
                    <CiSearch className="absolute start-3 top-1/2 -translate-y-1/2 
                              w-5 h-5 text-gray-400" />
                </div>
            </div>
        );
    }

    if (variant === 'header') {
        return (
            <>
                <motion.div
                    className={`hidden sm:block absolute ${isRTL ? 'translate-x-1/2 right-1/2' : '-translate-x-1/2 left-1/2'
                        } flex-1 ms-10 sm:ms-0 sm:w-xs md:w-sm md:max-w-lg`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: headerOpacity, scale: headerScale }}
                    transition={{
                        opacity: { duration: 0.4, ease: 'easeInOut' },
                        scale: { duration: 0.4, ease: 'easeInOut' },
                    }}
                    style={{
                        pointerEvents: headerOpacity < 0.1 ? 'none' : 'auto',
                    }}
                >
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={t('common.search')}
                            className="w-full ps-10 pe-4 py-2 placeholder:text-start rounded-lg bg-gray-100
                         focus:outline-none focus:ring-2 
                         focus:ring-accent transition-all"
                        />
                        <CiSearch className="absolute start-3 top-1/2 -translate-y-1/2 
                              w-5 h-5 text-gray-400" />
                    </div>
                </motion.div>

                <div className="sm:hidden w-full px-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={t('common.search')}
                            className="w-full ps-10 pe-4 py-2 placeholder:text-start rounded-lg bg-gray-100
                         focus:outline-none focus:ring-2 
                         focus:ring-accent transition-all"
                        />
                        <CiSearch className="absolute start-3 top-1/2 -translate-y-1/2 
                              w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </>
        );
    }
}
