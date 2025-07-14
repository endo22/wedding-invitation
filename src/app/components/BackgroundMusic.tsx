"use client";

import React, { useState, useEffect, useRef } from "react";

interface BackgroundMusicProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ isPlaying, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume
    audio.volume = 0.6;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    const handleEnded = () => {
      // Loop the music
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, isLoaded]);

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        preload="auto"
      >
        <source src="/audio/Kina Grannis - Can t Help Falling In Love (From Crazy Rich Asians).mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Control Button - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
          {/* Toggle Button */}
          <button
            onClick={onToggle}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-700/80 hover:bg-gray-600/80 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default BackgroundMusic;
