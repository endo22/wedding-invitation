"use client";

import { useState, Suspense } from "react";
import MainContent from "./components/MainContent";
import RightPanel from "./components/RightPanel";
import OpeningPage from "./components/OpeningPage";
import BackgroundMusic from "./components/BackgroundMusic";

export default function Home() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handleOpenInvitation = () => {
    setShowInvitation(true);
    // Auto-start music when invitation opens - shorter delay for mobile
    setTimeout(() => {
      setIsMusicPlaying(true);
    }, 500); // Reduced delay untuk mobile
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  if (!showInvitation) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>}>
        <OpeningPage onOpenInvitation={handleOpenInvitation} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Responsive layout */}
      <div className="flex flex-col lg:flex-row h-screen">
        {/* MainContent - tersembunyi pada mobile dan tablet, tampil di desktop dengan width penuh */}
        <div className="hidden lg:flex lg:w-3/5 h-screen">
          <MainContent />
        </div>
        
        {/* RightPanel - selalu tampil, full width pada mobile/tablet, width terbatas di desktop */}
        <div className="w-full lg:w-2/5 h-screen">
          <RightPanel />
        </div>
      </div>

      {/* Background Music Control - Show on all devices */}
      <BackgroundMusic 
        isPlaying={isMusicPlaying}
        onToggle={toggleMusic}
      />
    </div>
  );
}