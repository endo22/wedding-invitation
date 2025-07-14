"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface PaymentOption {
  id: string;
  name: string;
  logo: string;
  accountNumber: string;
  accountName: string;
  type: "bank" | "ewallet";
}

const WeddingGift: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleScrollForVisibility = () => {
      const weddingGiftElement = document.getElementById(
        "wedding-gift-section"
      );
      if (weddingGiftElement) {
        const rect = weddingGiftElement.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollForVisibility);

    // Initial check
    handleScrollForVisibility();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollForVisibility);
    };
  }, []);

  // Calculate zoom scale based on scroll position and visibility
  const getZoomScale = () => {
    if (!isVisible) return 1;

    const weddingGiftElement = document.getElementById("wedding-gift-section");
    if (!weddingGiftElement) return 1;

    const rect = weddingGiftElement.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;

    // Calculate distance from center of viewport
    const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
    const maxDistance = window.innerHeight / 2;

    // Zoom scale: closer to center = more zoom (1.1x), farther = less zoom (0.95x)
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
    const zoomScale = 1.1 - normalizedDistance * 0.15; // Range from 0.95 to 1.1

    return Math.max(0.95, Math.min(1.1, zoomScale));
  };

  const paymentOptions: PaymentOption[] = [
    {
      id: "bca",
      name: "BCA",
      logo: "/images/bank/bca.png",
      accountNumber: "1234567890",
      accountName: "ENDO FEBRANDA SILALAHI",
      type: "bank",
    },
    {
      id: "bri",
      name: "Bank BRI",
      logo: "/images/bank/mandiri.png",
      accountNumber: "9876543210",
      accountName: "ENDO FEBRANDA SILALAHI",
      type: "bank",
    },
  ];

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <div
      id="wedding-gift-section"
      className="relative px-4 sm:px-6 lg:px-8 py-8 min-h-[100vh]"
      style={{
        transform: `scale(${getZoomScale()})`,
        transition: "transform 0.1s ease-out",
        transformOrigin: "center",
      }}
    >
      {" "}
      {/* Background image diluar card - menutupi area lebih luas */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          backgroundImage: "url(/images/gift.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.7) blur(0.3px)",
          zIndex: 0,
          transform: `scale(${1 + scrollY * 0.0002})`, // Zoom in saat scroll down
          transformOrigin: "center",
        }}
      ></div>
      {/* Overlay untuk meningkatkan kontras */}
      <div className="absolute inset-0 bg-black/30 z-[1]"></div>
      {/* Wedding Gift Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2 sm:mb-3 drop-shadow-lg animate-zoom-in-delay-1">
            Wedding Gift
          </h3>
          <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-3 sm:mb-4 animate-slide-up-delay-2"></div>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed px-2 sm:px-0 drop-shadow-md animate-slide-up-delay-3">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
            <br />
            Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat
            memberi kado secara cashless.
          </p>
        </div>{" "}
        {/* Payment Options */}
        <div className="space-y-4 sm:space-y-6">
          {paymentOptions.map((option, index) => (
            <div
              key={option.id}
              className={`relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}-delay-${index + 1} animate-wiggle`}
              style={{
                aspectRatio: "1.6/1",
                minHeight: isMobile ? "150px" : "200px",
              }}
            >
              {/* Card Background with Gradient Theme */}
              <div
                className={`
                relative p-4 sm:p-6 text-white h-full flex flex-col justify-between
                bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500
              `}
              >
                {/* Silver Card Pattern/Texture Overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-white/30"></div>
                  <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-white/15"></div>
                  <div className="absolute top-1/3 right-1/4 w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-white/10"></div>
                  <div className="absolute bottom-1/3 right-1/2 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-white/5"></div>
                </div>

                {/* Card Header */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 sm:w-10 h-5 sm:h-7 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg border border-yellow-600 shadow-md flex items-center justify-center absolute top-8 sm:top-12">
                      <div className="w-4 sm:w-6 h-3 sm:h-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="w-10 sm:w-12 h-6 sm:h-8 flex items-center justify-center bg-white/20 rounded-md absolute top-3 sm:top-4 right-3 sm:right-4">
                    <Image
                      src={option.logo}
                      alt={option.name + " logo"}
                      width={48}
                      height={32}
                      className="h-full w-auto object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                  </div>
                </div>

                {/* Account Number and Name - Aligned Vertically */}
                <div className="relative z-10 mt-6 sm:mt-8 mb-3 sm:mb-4">
                  <p className="text-xs text-white/80 uppercase tracking-wider mb-1 sm:mb-2 font-medium">
                    {option.type === "bank" ? "Card Number" : "Phone Number"}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-lg sm:text-2xl font-bold tracking-widest drop-shadow-sm">
                      {option.accountNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
                    </p>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          option.accountNumber,
                          `${option.id}-number`
                        )
                      }
                      className="ml-2 sm:ml-4 px-2 sm:px-4 py-1 sm:py-2 bg-white/25 backdrop-blur-sm text-white text-xs sm:text-sm rounded-xl hover:bg-white/35 transition-all duration-200 border border-white/40 font-medium shadow-lg"
                    >
                      {copiedId === `${option.id}-number`
                        ? "✓ Copied!"
                        : "Copy"}
                    </button>
                  </div>
                  <p className="text-xs text-white/80 uppercase tracking-wider mb-1 font-medium">
                    Cardholder Name
                  </p>
                  <p className="font-bold text-base sm:text-lg tracking-wide drop-shadow-sm">
                    {option.accountName}
                  </p>
                </div>

                {/* Card Brand/Logo (Bottom Right) */}
                {/* <div className="absolute bottom-6 right-6 text-white/40 text-sm font-bold tracking-wider drop-shadow-sm">
                  {option.name.replace('Bank ', '').toUpperCase()}
                </div> */}

                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full hover:translate-x-[-100%] transition-transform duration-1000 ease-out"></div>
              </div>
            </div>
          ))}
        </div>
        {/* Footer Note */}
        <div className="text-center mt-8 pt-6 border-t border-white/30">
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            <div className="w-2 h-2 bg-white/80 rounded-full"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingGift;
