<<<<<<< HEAD
import React from "react";
import Image from "next/image";

export default function MainContent() {
  return (
    <div className="w-full relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
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
      <div className="relative z-10 text-center animate-fade-in px-3 sm:px-4 lg:px-0">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-800 mb-2 sm:mb-4 font-serif tracking-wider animate-zoom-in-delay-1 drop-shadow-lg">
          Laki-laki & Perempuan
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 lg:mb-8 font-light animate-slide-up-delay-2 drop-shadow-md animate-pulse-gentle">Sabtu, 22 Februari 2029</p>
      </div>
    </div>
  );
}
=======
import React from "react";
import Image from "next/image";

export default function MainContent() {
  return (
    <div className="w-full relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
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
      <div className="relative z-10 text-center animate-fade-in px-3 sm:px-4 lg:px-0">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-800 mb-2 sm:mb-4 font-serif tracking-wider animate-zoom-in-delay-1 drop-shadow-lg">
          Laki - Laki & Perempuan
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 lg:mb-8 font-light animate-slide-up-delay-2 drop-shadow-md animate-pulse-gentle">Sabtu, 22 Februari 2029</p>
      </div>
    </div>
  );
}
>>>>>>> 5630643a154bf98ee068e0cf240e019e1d05a226
