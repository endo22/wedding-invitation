'use client';

import React, { useState, useEffect } from 'react';

interface PaymentOption {
  id: string;
  name: string;
  logo: string;
  accountNumber: string;
  accountName: string;
  type: 'bank' | 'ewallet';
}

const WeddingGift: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleScrollForVisibility = () => {
      const weddingGiftElement = document.getElementById('wedding-gift-section');
      if (weddingGiftElement) {
        const rect = weddingGiftElement.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollForVisibility);
    
    // Initial check
    handleScrollForVisibility();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollForVisibility);
    };
  }, []);

  // Calculate zoom scale based on scroll position and visibility
  const getZoomScale = () => {
    if (!isVisible) return 1;
    
    const weddingGiftElement = document.getElementById('wedding-gift-section');
    if (!weddingGiftElement) return 1;
    
    const rect = weddingGiftElement.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    
    // Calculate distance from center of viewport
    const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
    const maxDistance = window.innerHeight / 2;
    
    // Zoom scale: closer to center = more zoom (1.1x), farther = less zoom (0.95x)
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
    const zoomScale = 1.1 - (normalizedDistance * 0.15); // Range from 0.95 to 1.1
    
    return Math.max(0.95, Math.min(1.1, zoomScale));
  };

  const paymentOptions: PaymentOption[] = [
    {
      id: 'bca',
      name: 'BCA',
      logo: '/images/bank/bca.png',
      accountNumber: '1234567890',
      accountName: 'ENDO FEBRANDA SILALAHI',
      type: 'bank'
    },
    {
      id: 'bri',
      name: 'Bank BRI',
      logo: '/images/bank/mandiri.png',
      accountNumber: '9876543210',
      accountName: 'ENDO FEBRANDA SILALAHI',
      type: 'bank'
    }
  ];

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };  return (
    <div 
      id="wedding-gift-section"
      className="relative -mx-8 -my-8 px-8 py-16 min-h-[100vh]"
      style={{
        transform: `scale(${getZoomScale()})`,
        transition: 'transform 0.1s ease-out',
        transformOrigin: 'center'
      }}
    >      {/* Background image diluar card - menutupi area lebih luas */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          backgroundImage: 'url(/images/gift.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.7) blur(0.3px)',
          zIndex: 0,
          transform: `scale(${1 + (scrollY * 0.0002)})`, // Zoom in saat scroll down
          transformOrigin: 'center'
        }}
      ></div>
      
      {/* Overlay untuk meningkatkan kontras */}
      <div className="absolute inset-0 bg-black/30 z-[1]"></div>
      
      {/* Wedding Gift Card */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200 max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-serif text-gray-800 mb-3">Wedding Gift</h3>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-4"></div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami.<br/>
            Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
          </p>
        </div>        {/* Payment Options */}
        <div className="space-y-6">
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              className="relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl"
              style={{
                aspectRatio: '1.6/1',
                minHeight: '200px'
              }}
            >
              {/* Card Background with Gradient Theme */}
              <div className={`
                relative p-6 text-white h-full flex flex-col justify-between
                bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500
              `}>
                {/* Silver Card Pattern/Texture Overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-white/30"></div>
                  <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-white/15"></div>
                  <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-white/10"></div>
                  <div className="absolute bottom-1/3 right-1/2 w-8 h-8 rounded-full bg-white/5"></div>
                </div>

                {/* Card Header */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-7 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg border border-yellow-600 shadow-md flex items-center justify-center absolute top-12">
                      <div className="w-6 h-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="w-12 h-8 flex items-center justify-center bg-white/20 rounded-md absolute top-4 right-4">
                    <img
                      src={option.logo}
                      alt={option.name + ' logo'}
                      className="h-full w-auto object-contain"
                      onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                </div>

                {/* Account Number and Name - Aligned Vertically */}
                <div className="relative z-10 mt-8 mb-4">
                  <p className="text-xs text-white/80 uppercase tracking-wider mb-2 font-medium">
                    {option.type === 'bank' ? 'Card Number' : 'Phone Number'}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-2xl font-bold tracking-widest drop-shadow-sm">
                      {option.accountNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
                    </p>
                    <button
                      onClick={() => copyToClipboard(option.accountNumber, `${option.id}-number`)}
                      className="ml-4 px-4 py-2 bg-white/25 backdrop-blur-sm text-white text-sm rounded-xl hover:bg-white/35 transition-all duration-200 border border-white/40 font-medium shadow-lg"
                    >
                      {copiedId === `${option.id}-number` ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-xs text-white/80 uppercase tracking-wider mb-1 font-medium">Cardholder Name</p>
                  <p className="font-bold text-lg tracking-wide drop-shadow-sm">
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
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 leading-relaxed">
            Terima kasih atas perhatian dan kehadiran Anda di hari bahagia kami ❤️
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Music Player */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-4">
          <button
            onClick={() => {
              const audio = document.getElementById('wedding-music') as HTMLAudioElement;
              if (audio.paused) {
                audio.play();
              } else {
                audio.pause();
              }
            }}
            className="px-4 py-2 bg-white/25 backdrop-blur-sm text-white text-sm rounded-xl hover:bg-white/35 transition-all duration-200 border border-white/40 font-medium shadow-lg"
          >
            Play/Pause Music
          </button>
          <audio id="wedding-music" src="/audio/wedding-music.mp3" loop></audio>
        </div>
      </div>
    </div>
  );
};

export default WeddingGift;
