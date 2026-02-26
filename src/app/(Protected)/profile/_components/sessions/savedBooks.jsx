import { Search, User, Bookmark, Upload, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FiArrowRightCircle } from "react-icons/fi";
import cosmos from '@/_assets/images/book1.png';
import theFall from '@/_assets/images/book2.png';
import stranger from '@/_assets/images/book3.png';
import success from '@/_assets/images/book4.png';
import { useLanguages } from '@/langueges/useLanguages';


const books = {
    cosmos: cosmos,
    theFall: theFall,
    stranger: stranger,
    success: success
};

const Book = ({ src, delay = 0, readPercentage = 0, showProgress = false }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="flex flex-col gap-1.5 flex-shrink-0"
    >
        <div
            className="relative w-24 h-36 rounded-lg overflow-hidden shadow-[2px_2px_4px_rgba(0,0,0,0.3)] cursor-pointer"
        >
            <img src={src} alt="book" className="w-full h-full object-cover" />
        </div>
        {showProgress && (
            <div className="self-center w-18 h-1.5 bg-gray-300 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#FA8763] transition-all duration-300"
                    style={{ width: `${readPercentage}%` }}
                />
            </div>
        )}
    </motion.div>
);

const Bookshelf = ({ children, delay = 0, showProgress = false }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.6 }}
        className="relative rounded-2xl p-5 pb-8"
    >
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {children}
        </div>
        <div className="absolute bottom-3 left-4 right-4 h-3 z-20 bg-[#FCC4B2] shadow-[0_6px_4px_rgba(0,0,0,0.2)]" />
    </motion.div>
);

const Section = ({ title, books, showMore = true, delay = 0, showMoreLabel, showProgress = false, isRTL }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.1 }}
        className="mb-8"
    >
        <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-gray-800 font-medium text-lg">{title}</h3>

            {showMore && (
                <button className="flex items-center gap-1 text-black text-sm hover:text-gray-700 transition-colors">
                    {showMoreLabel}
                    <FiArrowRightCircle className={`${isRTL ? 'rotate-180' : ''} mb-1`} />
                </button>
            )}
        </div>
        <Bookshelf delay={delay + 0.1} showProgress={showProgress}>
            {books.map((book, i) => (
                <Book
                    key={i}
                    src={typeof book === 'string' ? book : book.src}
                    readPercentage={typeof book === 'string' ? 0 : (book.readPercentage || 0)}
                    delay={delay + 0.1 + i * 0.1}
                    showProgress={showProgress}
                />
            ))}
        </Bookshelf>
    </motion.div>
);

export default function SavedBooks() {
    const { t, isRTL } = useLanguages();
    return (
        <div className='px-2'>
            {/* <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-10 flex justify-end"
            >
                <div className="bg-gray-100 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-3 w-96">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder={t('common.search')}
                        className="bg-transparent outline-none text-gray-600 placeholder-gray-400 text-[15px] w-full"
                    />
                </div>
            </motion.div> */}
            {/* 
        <Section 
          title={t('profile.read')} 
          books={[
            { src: books.cosmos, readPercentage: 60 },
            { src: books.theFall, readPercentage: 35 },
            { src: books.stranger, readPercentage: 80 }
          ]} 
          delay={0.4}
          showMoreLabel={t('common.More')}
          showProgress={true}
          isRTL={isRTL}
        /> */}

            <Section
                title={t('profile.my_book')}
                books={[books.cosmos, books.success, books.theFall, books.theFall, books.stranger]}
                showMore
                showMoreLabel={t('common.More')}
                delay={0.5}
                isRTL={isRTL}
            />

            <Section
                title={t('profile.finished')}
                books={[books.cosmos, books.success, books.theFall, books.theFall, books.stranger]}
                showMore
                showMoreLabel={t('common.More')}
                delay={0.6}
                isRTL={isRTL}
            />
        </div>
    );
}