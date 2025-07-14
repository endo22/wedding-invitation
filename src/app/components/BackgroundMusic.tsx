"use client";

import React, { useState, useEffect, useRef } from "react";

interface BackgroundMusicProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ isPlaying, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);

  // Check autoplay support
  useEffect(() => {
    const checkAutoplay = async () => {
      if (typeof window !== 'undefined' && audioRef.current) {
        try {
          const audio = audioRef.current;
          audio.volume = 0.01;
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            await playPromise;
            audio.pause();
            audio.volume = 0.6;
            setCanAutoplay(true);
          }
        } catch {
          console.log('Autoplay not supported - mobile device');
          setCanAutoplay(false);
        }
      }
    };
    checkAutoplay();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.6;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    const handleEnded = () => {
      audio.currentTime = 0;
      if (isPlaying) {
        audio.play().catch(console.error);
      }
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    if (isPlaying) {
      const playAudio = async () => {
        try {
          audio.muted = false;
          audio.volume = 0.6;
          
          // Resume AudioContext for iOS Safari
          if (typeof window !== 'undefined' && 'webkitAudioContext' in window) {
            try {
              const AudioContext = window.AudioContext || (window as typeof window.AudioContext).webkitAudioContext;
              if (AudioContext) {
                const audioContext = new AudioContext();
                if (audioContext.state === 'suspended') {
                  await audioContext.resume();
                }
              }
            } catch (err) {
              console.log('AudioContext resume failed:', err);
            }
          }
          
          await audio.play();
          console.log('Music started successfully');
        } catch (error) {
          console.error('Error playing music:', error);
        }
      };

      if (hasUserInteracted || canAutoplay) {
        playAudio();
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, isLoaded, hasUserInteracted, canAutoplay]);

  // Global user interaction handler for mobile
  useEffect(() => {
    if (!hasUserInteracted && !canAutoplay) {
      const handleFirstInteraction = async () => {
        console.log('First user interaction detected');
        setHasUserInteracted(true);
        
        if (audioRef.current && isLoaded && isPlaying) {
          try {
            audioRef.current.muted = false;
            audioRef.current.volume = 0.6;
            await audioRef.current.play();
            console.log('Music started after user interaction');
          } catch (error) {
            console.error('Failed to start music:', error);
          }
        }
      };

      const events = ['click', 'touchstart', 'touchend', 'keydown'];
      events.forEach(event => {
        document.addEventListener(event, handleFirstInteraction, { once: true, capture: true });
      });

      return () => {
        events.forEach(event => {
          document.removeEventListener(event, handleFirstInteraction, { capture: true });
        });
      };
    }
  }, [hasUserInteracted, canAutoplay, isLoaded, isPlaying]);

  const handleToggle = async () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
    
    // Force enable audio for mobile
    if (audioRef.current && isLoaded) {
      try {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.6;
        
        if (!isPlaying) {
          await audioRef.current.play();
        }
      } catch (error) {
        console.log('Manual play failed:', error);
      }
    }
    
    onToggle();
  };

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
        crossOrigin="anonymous"
      >
        <source src="/audio/Kina Grannis - Can t Help Falling In Love (From Crazy Rich Asians).mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Control Button - Mobile Optimized */}
      <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
        <div className="bg-black/40 backdrop-blur-md rounded-full border-2 border-white/40 shadow-2xl">
          <button
            onClick={handleToggle}
            onTouchStart={(e) => { e.preventDefault(); handleToggle(); }}
            className="flex items-center justify-center w-16 h-16 sm:w-14 sm:h-14 rounded-full bg-gray-800/90 hover:bg-gray-700/90 active:bg-gray-600/90 text-white transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            title={isPlaying ? "Pause Music" : "Play Music"}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isPlaying ? (
              <svg className="w-8 h-8 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-8 h-8 sm:w-6 sm:h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Instructions */}
      {!hasUserInteracted && !canAutoplay && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm border border-white/30 animate-bounce">
          <div className="flex items-center space-x-2">
            <span>🎵</span>
            <span>Tap tombol musik untuk memutar</span>
          </div>
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;
