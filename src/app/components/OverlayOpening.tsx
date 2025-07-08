"use client";
import React from "react";

interface OverlayOpeningProps {
  visible: boolean;
  onClose: () => void;
}

export default function OverlayOpening({ visible, onClose }: OverlayOpeningProps) {
  const handleClick = () => {
    onClose();
    // Scroll ke ProfileCard setelah overlay ditutup
    setTimeout(() => {
      const profileCardElement = document.querySelector('[data-profile-card]');
      if (profileCardElement) {
        profileCardElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  if (!visible) return null;
  return (
    <div className="overlay-entrance" onClick={handleClick}>
      {/* Elemen dekoratif bergerak */}
      <div style={{
        position: 'absolute', top: '10%', left: '10%', width: '8px', height: '8px', background: 'rgba(255,255,255,0.6)', borderRadius: '50%', animation: 'sparkle 2s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute', top: '20%', right: '15%', width: '6px', height: '6px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%', animation: 'sparkle 3s ease-in-out infinite 0.5s'
      }}></div>
      <div style={{
        position: 'absolute', bottom: '25%', left: '20%', width: '4px', height: '4px', background: 'rgba(255,255,255,0.5)', borderRadius: '50%', animation: 'sparkle 2.5s ease-in-out infinite 1s'
      }}></div>
      <div style={{
        position: 'absolute', bottom: '15%', right: '10%', width: '5px', height: '5px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%', animation: 'sparkle 3.5s ease-in-out infinite 1.5s'
      }}></div>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18
      }}>
        <div style={{
          color: 'white', fontSize: 16, fontWeight: 400, letterSpacing: 1, textShadow: '0 2px 8px rgba(0,0,0,0.25)', opacity: 0.85
        }}>THE WEDDING OF</div>
        <div style={{
          color: 'white', fontSize: 28, fontWeight: 700, fontFamily: 'serif', margin: '2px 0 4px 0', textShadow: '0 2px 12px rgba(0,0,0,0.35)', opacity: 0.95
        }}>Endo & Han So Hee</div>
        <div style={{
          color: 'white', fontSize: 13, fontWeight: 400, marginBottom: 2, textShadow: '0 1px 6px rgba(0,0,0,0.18)', opacity: 0.85
        }}>Yth. Bapak/Ibu/Saudara/i</div>
        <div style={{
          color: 'white', fontSize: 18, fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.25)', opacity: 0.95
        }}>Endo Febranda Silalahi</div>
        <div style={{
          color: 'white', fontSize: 12, fontWeight: 400, marginTop: 2, textShadow: '0 1px 6px rgba(0,0,0,0.18)', opacity: 0.7,
          textAlign: 'center',
          display: 'block',
          width: '100%'
        }}>Tanpa mengurangi rasa hormat,<br/>kami mengundang anda untuk menghadiri acara pernikahan kami.</div>
      </div>
      <div className="overlay-text" style={{
        opacity: 0.3,
        background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.3) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
        textShadow: 'none',
        marginBottom: '12px'
      }}>
        Klik/Geser Untuk<br />Membuka Undangan
      </div>
      <div className="triangle-icon" style={{
        opacity: 0.3,
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.10))',
        transition: 'opacity 0.3s',
        background: 'none'
      }}></div>
      <div style={{
        position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', animation: 'floatGently 3s ease-in-out infinite'
      }}></div>
    </div>
  );
}
