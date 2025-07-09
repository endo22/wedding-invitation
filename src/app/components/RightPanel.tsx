"use client";
import React, { useState } from "react";
import Image from "next/image";
import OverlayOpening from "./OverlayOpening";
import ProfileCard from "./ProfileCard";
import ProfileCardWanita from "./ProfileCardWanita";
import PreweddingGallery from "./PreweddingGallery";
import WeddingGift from "./WeddingGift";

export default function RightPanel() {
  const [overlayVisible, setOverlayVisible] = useState(true);
  const handleOverlayClick = () => setOverlayVisible(false);
  return (
    <div className="w-2/4 h-screen overflow-y-auto overflow-x-hidden bg-black/10 backdrop-blur-sm border-l border-gray-300">
      <div className="min-h-screen overflow-x-hidden">
        <div className="relative w-full h-screen">
          <OverlayOpening visible={overlayVisible} onClose={handleOverlayClick} />
          <Image
            src="/images/wedding monokrom.jpg"
            alt="Wedding Photo"
            width={400}
            height={700}
            className="w-full h-screen object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out animate-fade-in-slow"
            priority
          />
        </div>
        <ProfileCard />
        {/* Pembatas antara profil pria dan wanita */}
        <div className="relative py-4 px-6">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400 to-gray-400"></div>
            <div className="mx-4 bg-white rounded-full p-3 shadow-lg border-2 border-gray-200">
              <span className="text-2xl">💕</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-400 to-gray-400"></div>
          </div>
          <div className="text-center mt-2">
            <span className="text-xs text-gray-500 font-medium italic">~ Together Forever ~</span>
          </div>        </div>
        <ProfileCardWanita />
          {/* Wedding Gift Section - tanpa padding agar background bisa menutupi area lebih luas */}
        <div className="overflow-hidden">
          <WeddingGift />
        </div>        
        <PreweddingGallery />
          {/* Footer */}
        <footer className="mt-8 text-white p-6 border-t border-gray-300 relative overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), 
              url('/images/wedding monokrom.jpg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
          <div className="text-center">
            {/* Decorative line */}
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4 opacity-60"></div>
            
            {/* Wedding couple names */}
            <h3 className="text-lg font-serif font-bold mb-2 opacity-90">Endo & Han So Hee</h3>
            
            {/* Wedding date */}
            <p className="text-sm text-gray-300 mb-3 font-medium">
              Sabtu, 15 Februari 2025
            </p>
            
            {/* Thank you message */}
            <p className="text-xs text-gray-400 italic mb-4 max-w-xs mx-auto leading-relaxed">
              &quot;Terima kasih telah menjadi bagian dari hari bahagia kami. Doa dan restu dari Anda sangat berarti bagi kami.&quot;
            </p>
            
            {/* Decorative hearts */}
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-pink-400 text-xs">💕</span>
              <span className="text-white text-xs opacity-60">•</span>
              <span className="text-pink-400 text-xs">💕</span>
            </div>
            
            {/* Made with love */}
            <div className="text-center border-t border-gray-700 pt-4">
              <p className="text-xs text-gray-500 mb-1">Made with ❤️ by</p>
              <p className="text-xs text-gray-400 font-medium">Endo Febranda Silalahi</p>
              <a 
                href="https://codecrafterch.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors duration-300 inline-flex items-center gap-1 mt-1"
              >
                🌐 codecrafterch.com
              </a>
            </div>
            
            {/* Copyright */}
            <div className="mt-4 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-600">
                © 2025 Wedding Invitation. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
        {/* ...existing code for gallery, detail acara, dsb, bisa dipisah ke komponen lain jika diinginkan... */}
      </div>
    </div>
  );
}
