'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { setIsPlaying, setCurrentTime, setDuration, clearAudio } from '@/redux/slices/audioSlice';
import { DiscImage } from '@/hooks/useDiscImage';

const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function GlobalAudioPlayer() {
    const dispatch = useAppDispatch();
    const audio = useAppSelector((state) => state.audio);
    
    const audioRef = useRef(null);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // لود شدن audio
    useEffect(() => {
        const audioElement = audioRef.current;
        if (!audioElement) return;

        const handleLoadedMetadata = () => {
            dispatch(setDuration(audioElement.duration));
        };

        const handleTimeUpdate = () => {
            if (!isDragging) {
                dispatch(setCurrentTime(audioElement.currentTime));
            }
        };

        const handleEnded = () => {
            dispatch(setIsPlaying(false));
            audio.onEnded?.();
        };

        audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
        audioElement.addEventListener('timeupdate', handleTimeUpdate);
        audioElement.addEventListener('ended', handleEnded);

        return () => {
            audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            audioElement.removeEventListener('ended', handleEnded);
        };
    }, [audio.audioSrc, isDragging, dispatch, audio]);

    // چرخش پیوسته
    useEffect(() => {
        let animationId;

        const rotate = () => {
            if (audio.isPlaying) {
                setRotation((prev) => prev + 0.5);
                animationId = requestAnimationFrame(rotate);
            }
        };

        if (audio.isPlaying) {
            animationId = requestAnimationFrame(rotate);
        }

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [audio.isPlaying]);

    // play/pause synchronize
    useEffect(() => {
        const audioElement = audioRef.current;
        if (!audioElement) return;

        if (audio.isPlaying) {
            audioElement.play().catch(() => {
                dispatch(setIsPlaying(false));
            });
        } else {
            audioElement.pause();
        }
    }, [audio.isPlaying, dispatch]);

    const togglePlay = () => {
        dispatch(setIsPlaying(!audio.isPlaying));
    };

    const handleProgressClick = (e) => {
        const audio_elem = audioRef.current;
        if (!audio_elem || !audio.duration || audio.duration <= 0) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newTime = percent * audio.duration;

        audio_elem.currentTime = newTime;
        dispatch(setCurrentTime(newTime));
    };

    const handleClose = () => {
        dispatch(clearAudio());
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
        }
    };

    const progressPercent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;

    if (!audio.isActive) return null;

    return (
        <AnimatePresence>
            {audio.isActive && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    dir="ltr"
                    className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] rounded-full shadow-2xl"
                >
                    {/* Audio Element */}
                    <audio ref={audioRef} src={audio.audioSrc} preload="metadata" />

                    {/* Player Container */}
                    <div className="flex items-center gap-4 bg-white/60 backdrop-blur-[2px] opacity-90 rounded-full px-3 py-2 border border-gray-200">

                        {/* Cover Image (Disc) */}
                        <div
                            style={{
                                transform: `rotate(${rotation}deg)`,
                                transformOrigin: 'center center',
                                transition: audio.isPlaying ? 'none' : 'transform 0.3s ease-out',
                            }}
                        >
                            <DiscImage
                                src={audio.coverImage}
                                size={70}
                                holeSize={18}
                                halo={true}
                                haloPadding={8}
                                shadow={false}
                                border={false}
                                boxed={false}
                            />
                        </div>

                        {/* Info & Controls */}
                        <div className="flex-1 min-w-0">
                            {/* Title & Author */}
                            <div className="mb-1">
                                <h3 className="text-gray-900 font-semibold text-sm truncate">
                                    {audio.title}
                                    <span className="text-gray-500 font-normal text-xs"> / {audio.author}</span>
                                </h3>
                            </div>

                            {/* Progress Bar */}
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-gray-600 text-xs font-medium w-8 text-right">
                                    {formatTime(audio.currentTime)}
                                </span>

                                <div
                                    onClick={handleProgressClick}
                                    className="flex-1 h-1 bg-gray-200 rounded-full cursor-pointer relative group"
                                >
                                    <div
                                        className="absolute left-0 top-0 h-full bg-orange-400 rounded-full"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>

                                <span className="text-gray-600 text-xs font-medium w-8">
                                    {formatTime(audio.duration)}
                                </span>
                            </div>

                            {/* Control Buttons */}
                            <div className="flex items-center justify-center gap-2">
                                <button
                                    onClick={audio.onPrevious}
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    <SkipBack size={16} />
                                </button>

                                <button
                                    onClick={togglePlay}
                                    className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center text-gray-800 hover:bg-gray-50"
                                >
                                    {audio.isPlaying ? (
                                        <Pause size={18} fill="currentColor" />
                                    ) : (
                                        <Play size={18} fill="currentColor" className="ml-0.5" />
                                    )}
                                </button>

                                <button
                                    onClick={audio.onNext}
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    <SkipForward size={16} />
                                </button>

                                {/* Close Button */}
                                <button
                                    onClick={handleClose}
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors ml-1"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
