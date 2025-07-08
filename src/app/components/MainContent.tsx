import React from "react";
import Image from "next/image";

export default function MainContent() {
  return (
    <div className="w-3/4 relative flex items-center justify-center p-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/main.png"
          alt="Wedding Main Photo"
          fill
          className="object-cover grayscale-[100%] opacity-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-gray-200/80 backdrop-blur-[1px]"></div>
      </div>
      {/* Content overlay */}
      <div className="relative z-10 text-center animate-fade-in">
        <h1 className="text-6xl font-bold text-gray-800 mb-4 font-serif tracking-wider animate-slide-up-delay-1 drop-shadow-lg">
          Endo & Han So Hee
        </h1>
        <p className="text-xl text-gray-600 mb-8 font-light animate-slide-up-delay-2 drop-shadow-md">Sabtu, 21 Juni 2025</p>
        <p className="text-lg text-gray-700 mt-8 leading-relaxed animate-slide-up-delay-3 drop-shadow-md bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-gray-300/50">
          Yth. Bapak/Ibu/Saudara/i Endo Febranda Silalahi,
          <br />
          Tanpa mengurangi rasa hormat, kami mengundang Anda untuk menghadiri acara pernikahan kami.
        </p>
      </div>
    </div>
  );
}
