import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isActive: false,
    audioSrc: null,
    coverImage: null,
    title: 'Unknown Title',
    author: 'Unknown Author',
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    onEnded: null,
    onNext: null,
    onPrevious: null,
};

const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setAudio: (state, action) => {
            const { audioSrc, coverImage, title, author, onEnded, onNext, onPrevious } = action.payload;
            state.isActive = true;
            state.audioSrc = audioSrc;
            state.coverImage = coverImage;
            state.title = title;
            state.author = author;
            state.onEnded = onEnded;
            state.onNext = onNext;
            state.onPrevious = onPrevious;
            state.isPlaying = true;
            state.currentTime = 0;
        },

        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },

        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },

        setDuration: (state, action) => {
            state.duration = action.payload;
        },

        clearAudio: (state) => {
            state.isActive = false;
            state.isPlaying = false;
            state.audioSrc = null;
            state.coverImage = null;
            state.title = 'Unknown Title';
            state.author = 'Unknown Author';
            state.currentTime = 0;
            state.duration = 0;
        },
    },
});

export const { setAudio, setIsPlaying, setCurrentTime, setDuration, clearAudio } = audioSlice.actions;
export default audioSlice.reducer;
