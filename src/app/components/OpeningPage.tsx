<<<<<<< HEAD
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface OpeningPageProps {
  onOpenInvitation: () => void;
}

const OpeningPage: React.FC<OpeningPageProps> = ({ onOpenInvitation }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [guestName, setGuestName] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    // Ambil nama dari URL parameter
    const nameFromUrl = searchParams.get('name') || searchParams.get('to') || searchParams.get('guest');
    if (nameFromUrl) {
      // Decode URL encoding dan replace + dengan spasi
      const decodedName = decodeURIComponent(nameFromUrl.replace(/\+/g, ' '));
      setGuestName(decodedName);
    }
  }, [searchParams]);

  const handleOpenInvitation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onOpenInvitation();
    }, 800); // Delay untuk animasi
  };

  return (
    <div 
      className={`fixed inset-0 z-50 transition-all duration-800 ${
        isAnimating ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/wedding monokrom.jpg"
          alt="Wedding Background"
          fill
          className="object-cover grayscale"
          priority
        />
        {/* Dark Overlay dengan nuansa monokrom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-900/60 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        {/* Header Text */}
        <div className="mb-8 space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-100 leading-relaxed animate-slide-up-delay-1 drop-shadow-lg">
            Kepada Yth.
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-light text-gray-300 leading-relaxed animate-slide-up-delay-2 drop-shadow-md">
            Bapak/Ibu/Saudara/i
          </h2>
        </div>

        {/* Main Message */}
        <div className="mb-12 max-w-md mx-auto">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight animate-zoom-in-delay-3 drop-shadow-xl">
            {guestName}
          </h3>
          
          {/* Decorative Line - monokrom */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-6 animate-slide-up-delay-4 shadow-sm"></div>
          
          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 font-light leading-relaxed animate-slide-up-delay-5 drop-shadow-md">
            Mengundang Anda untuk hadir dalam momen bahagia kami
          </p>
        </div>

        {/* Open Invitation Button */}
        <button
          onClick={handleOpenInvitation}
          disabled={isAnimating}
          className={`
            group relative px-8 py-4 sm:px-10 sm:py-5 
            bg-gray-800/20 backdrop-blur-sm 
            border-2 border-gray-400/40 
            rounded-full 
            text-gray-100 font-semibold text-base sm:text-lg
            transition-all duration-300
            hover:bg-gray-700/30 hover:border-gray-300/60 hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-gray-400/50
            disabled:opacity-50 disabled:cursor-not-allowed
            animate-zoom-in-delay-6 animate-pulse-gentle
            drop-shadow-lg
            ${isAnimating ? 'animate-pulse' : ''}
          `}
        >
          <span className="relative z-10 tracking-wide">
            BUKA UNDANGAN
          </span>
          
          {/* Button Glow Effect - monokrom */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-600/10 to-gray-400/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Button Border Animation - monokrom */}
          <div className="absolute inset-0 rounded-full border-2 border-gray-500/30 animate-pulse"></div>
        </button>

        {/* Footer */}
        <div className="mt-16 text-center animate-fade-in-slow">
          <p className="text-xs sm:text-sm text-gray-400 mb-2 drop-shadow-sm">
            22 Februari 2029
          </p>
          <div className="flex justify-center space-x-1">
            <div className="w-1 h-1 bg-gray-500 rounded-full shadow-sm"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full shadow-sm"></div>
            <div className="w-1 h-1 bg-gray-500 rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* Floating Hearts Animation - monokrom style */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              left: `${20 + index * 15}%`,
              animationDelay: `${index * 2}s`,
              animationDuration: `${8 + index}s`,
            }}
          >
            <span className="text-gray-400/30 text-lg drop-shadow-sm">🤍</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OpeningPage;
=======
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface OpeningPageProps {
  onOpenInvitation: () => void;
}

const OpeningPage: React.FC<OpeningPageProps> = ({ onOpenInvitation }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [guestName, setGuestName] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    // Ambil nama dari URL parameter
    const nameFromUrl = searchParams.get('name') || searchParams.get('to') || searchParams.get('guest');
    if (nameFromUrl) {
      // Decode URL encoding dan replace + dengan spasi
      const decodedName = decodeURIComponent(nameFromUrl.replace(/\+/g, ' '));
      setGuestName(decodedName);
    }
  }, [searchParams]);

  const handleOpenInvitation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onOpenInvitation();
    }, 800); // Delay untuk animasi
  };

  return (
    <div 
      className={`fixed inset-0 z-50 transition-all duration-800 ${
        isAnimating ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/wedding monokrom.jpg"
          alt="Wedding Background"
          fill
          className="object-cover grayscale"
          priority
        />
        {/* Dark Overlay dengan nuansa monokrom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-900/60 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        {/* Header Text */}
        <div className="mb-8 space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-100 leading-relaxed animate-slide-up-delay-1 drop-shadow-lg">
            Kepada Yth.
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-light text-gray-300 leading-relaxed animate-slide-up-delay-2 drop-shadow-md">
            Bapak/Ibu/Saudara/i
          </h2>
        </div>

        {/* Main Message */}
        <div className="mb-12 max-w-md mx-auto">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight animate-zoom-in-delay-3 drop-shadow-xl">
            {guestName}
          </h3>
          
          {/* Decorative Line - monokrom */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-6 animate-slide-up-delay-4 shadow-sm"></div>
          
          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 font-light leading-relaxed animate-slide-up-delay-5 drop-shadow-md">
            Mengundang Anda untuk hadir dalam momen bahagia kami
          </p>
        </div>

        {/* Open Invitation Button */}
        <button
          onClick={handleOpenInvitation}
          disabled={isAnimating}
          className={`
            group relative px-8 py-4 sm:px-10 sm:py-5 
            bg-gray-800/20 backdrop-blur-sm 
            border-2 border-gray-400/40 
            rounded-full 
            text-gray-100 font-semibold text-base sm:text-lg
            transition-all duration-300
            hover:bg-gray-700/30 hover:border-gray-300/60 hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-gray-400/50
            disabled:opacity-50 disabled:cursor-not-allowed
            animate-zoom-in-delay-6 animate-pulse-gentle
            drop-shadow-lg
            ${isAnimating ? 'animate-pulse' : ''}
          `}
        >
          <span className="relative z-10 tracking-wide">
            BUKA UNDANGAN
          </span>
          
          {/* Button Glow Effect - monokrom */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-600/10 to-gray-400/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Button Border Animation - monokrom */}
          <div className="absolute inset-0 rounded-full border-2 border-gray-500/30 animate-pulse"></div>
        </button>

        {/* Footer */}
        <div className="mt-16 text-center animate-fade-in-slow">
          <p className="text-xs sm:text-sm text-gray-400 mb-2 drop-shadow-sm">
            22 Februari 2029
          </p>
          <div className="flex justify-center space-x-1">
            <div className="w-1 h-1 bg-gray-500 rounded-full shadow-sm"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full shadow-sm"></div>
            <div className="w-1 h-1 bg-gray-500 rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* Floating Hearts Animation - monokrom style */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              left: `${20 + index * 15}%`,
              animationDelay: `${index * 2}s`,
              animationDuration: `${8 + index}s`,
            }}
          >
            <span className="text-gray-400/30 text-lg drop-shadow-sm">🤍</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OpeningPage;
>>>>>>> 5630643a154bf98ee068e0cf240e019e1d05a226
