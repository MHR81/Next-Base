'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { DiscImage } from './useDiscImage';


const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function AudioPlayer({
    className = '',
    audioSrc,
    coverImage,
    title = 'Unknown Title',
    author = 'Unknown Author',
    onEnded,
    onNext,
    onPrevious,
    autoPlay = false
}) {
    const audioRef = useRef(null);
    const progressRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            if (!isDragging) {
                setCurrentTime(audio.currentTime);
            }
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            onEnded?.();
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audioSrc, isDragging, onEnded]);

    useEffect(() => {
        let animationId;

        const rotate = () => {
            if (isPlaying) {
                setRotation(prev => prev + 0.5); // سرعت چرخش
                animationId = requestAnimationFrame(rotate);
            }
        };

        if (isPlaying) {
            animationId = requestAnimationFrame(rotate);
        }

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [isPlaying]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressClick = (e) => {
        const progress = progressRef.current;
        const audio = audioRef.current;
        if (!progress || !audio) return;

        if (!duration || isNaN(duration) || !isFinite(duration) || duration <= 0) return;

        const rect = progress.getBoundingClientRect();
        const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
        let percent = (clientX - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        const newTime = percent * duration;

        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !progressRef.current || !duration) return;

        const rect = progressRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        setCurrentTime(percent * duration);
    };

    const handleMouseUp = () => {
        if (isDragging && audioRef.current) {
            const audio = audioRef.current;
            if (duration && !isNaN(duration) && isFinite(duration) && duration > 0) {
                const clamped = Math.max(0, Math.min(duration, currentTime));
                audio.currentTime = clamped;
                setCurrentTime(clamped);
            }
        }
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging]);

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div dir='ltr' className={`${className} w-full max-w-md mx-auto rounded-full`}>
            <audio ref={audioRef} src={audioSrc} preload="metadata" />

            <div className="flex items-center gap-5 bg-white rounded-full px-3 py-2 border border-gray-200 shadow-sm">

                <div
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transformOrigin: 'center center',
                        transition: isPlaying ? 'none' : 'transform 0.3s ease-out'
                    }}
                >
                    <DiscImage
                        src={coverImage}
                        size={90}
                        holeSize={22}
                        halo={true}
                        haloPadding={10}
                        shadow={false}
                        border={false}
                        boxed={false}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="mb-2">
                        <h3 className="text-gray-900 font-semibold text-base truncate">
                            {title}
                            <span className="text-gray-500 font-normal"> / {author}</span>
                        </h3>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-gray-600 text-sm font-medium w-10 text-right">
                            {formatTime(currentTime)}
                        </span>

                        <div
                            ref={progressRef}
                            onClick={handleProgressClick}
                            onMouseDown={handleMouseDown}
                            className="flex-1 h-1.5 bg-gray-200 rounded-full cursor-pointer relative group"
                        >
                            <div
                                className="absolute left-0 top-0 h-full bg-[#F4A261] rounded-full"
                                style={{ width: `${progressPercent}%` }}
                            />

                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#F4A261] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ left: `calc(${progressPercent}% - 8px)` }}
                            />
                        </div>

                        <span className="text-gray-600 text-sm font-medium w-10">
                            {formatTime(duration)}
                        </span>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onPrevious}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
                        >
                            <SkipBack size={18} />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={togglePlay}
                            className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-colors"
                        >
                            {isPlaying ? (
                                <Pause size={22} fill="currentColor" />
                            ) : (
                                <Play size={22} fill="currentColor" className="ml-0.5" />
                            )}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onNext}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
                        >
                            <SkipForward size={18} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}