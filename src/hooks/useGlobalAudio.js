import { useAppDispatch } from '@/redux/store';
import { setAudio } from '@/redux/slices/audioSlice';

export const useGlobalAudio = () => {
    const dispatch = useAppDispatch();

    const playAudio = (config) => {
        const {
            audioSrc,
            coverImage,
            title = 'Unknown Title',
            author = 'Unknown Author',
            onEnded = null,
            onNext = null,
            onPrevious = null,
        } = config;

        dispatch(setAudio({
            audioSrc,
            coverImage,
            title,
            author,
            onEnded,
            onNext,
            onPrevious,
        }));
    };

    return { playAudio };
};
