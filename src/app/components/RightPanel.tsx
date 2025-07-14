"use client";
import React, { useState } from "react";
import Image from "next/image";
import OverlayOpening from "./OverlayOpening";
import ProfileCards from "./ProfileCards";
import EventDetails from "./EventDetails";
import PhotoAlbum from "./PhotoAlbum";
import WeddingGift from "./WeddingGift";
import WishesAndPrayers from "./WishesAndPrayers";

export default function RightPanel() {
  const [overlayVisible, setOverlayVisible] = useState(true);
  const handleOverlayClick = () => setOverlayVisible(false);
  return (
    <div className="w-full h-screen overflow-y-auto overflow-x-hidden bg-black/10 backdrop-blur-sm sm:border-l-0 lg:border-l border-gray-300">
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
        <div className="px-3 sm:px-4 lg:px-6">
          <ProfileCards />
        </div>
        
        {/* Event Details Section - tanpa padding agar background bisa menutupi area lebih luas */}
        <div className="overflow-hidden -mt-2">
          <EventDetails />
        </div>
        
        {/* Wedding Gift Section - tanpa padding agar background bisa menutupi area lebih luas */}
        <div className="overflow-hidden -mt-2">
          <WeddingGift />
        </div>
        
        {/* Photo Album Section - tanpa padding agar background bisa menutupi area lebih luas */}
        <div className="overflow-hidden -mt-2">
          <PhotoAlbum />
        </div>
        
        {/* Wishes and Prayers Section - tanpa padding agar background bisa menutupi area lebih luas */}
        <div className="overflow-hidden -mt-2">
          <WishesAndPrayers />
        </div>
        
        {/* <div className="px-3 sm:px-4 lg:px-6">
          <PreweddingGallery />
        </div> */}
          {/* Footer */}
        <footer className="-mt-3 text-white p-4 sm:p-6 border-t border-gray-300 relative overflow-hidden"
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
            <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-3 sm:mb-4 opacity-60"></div>
            
            {/* Wedding couple names */}
            <h3 className="text-base sm:text-lg font-serif font-bold mb-1 sm:mb-2 opacity-90">Endo & Han So Hee</h3>
            
            {/* Wedding date */}
            <p className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-3 font-medium">
              Sabtu, 22 Februari 2029
            </p>
            
            {/* Thank you message */}
            <p className="text-xs text-gray-400 italic mb-3 sm:mb-4 max-w-xs mx-auto leading-relaxed px-2 sm:px-0">
              &quot;Terima kasih telah menjadi bagian dari hari bahagia kami. Doa dan restu dari Anda sangat berarti bagi kami.&quot;
            </p>
            
            {/* Made with love */}
            <div className="text-center border-t border-gray-700 pt-3 sm:pt-4">
              <p className="text-xs text-gray-500 mb-1">Made by</p>
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
            <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-700">
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
