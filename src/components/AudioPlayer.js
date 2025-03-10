import React, { useEffect, useState, useRef } from 'react';

import { formatTime } from "@/utils/helpers";

const AudioPlayer = ({ audioUrl, audioDuration }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const audio = audioRef.current;
        const seekPosition = e.target.value;
        audio.currentTime = seekPosition;
        setCurrentTime(seekPosition);
    };

    return (
        <div className="p-4 ">
            <audio ref={audioRef} src={audioUrl} className="hidden" />
            <div className="flex items-center mb-2">
                <button
                    onClick={togglePlayPause}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <rect x="6" y="5" width="3" height="10" rx="1" />
                            <rect x="11" y="5" width="3" height="10" rx="1" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>

                <div className="ml-4 flex-grow">
                    <input
                        type="range"
                        min="0"
                        max={audioDuration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(audioDuration)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;