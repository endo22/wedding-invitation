"use client";
import React from "react";
import ProfilePhoto from "./ProfilePhoto";

export default function ProfileCard() {  return (
    <div data-profile-card className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 backdrop-blur-sm border-b border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up-delay-4"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.9) 25%, rgba(255,255,255,0.9) 50%, rgba(235,235,235,0.9) 75%, rgba(255,255,255,0.9) 100%),
          radial-gradient(circle at 20% 80%, rgba(120,120,120,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(120,120,120,0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(200,200,200,0.1) 0%, transparent 50%)
        `,
        boxShadow: `
          inset 2px 2px 5px rgba(255,255,255,0.8),
          inset -2px -2px 5px rgba(0,0,0,0.1),
          0 4px 15px rgba(0,0,0,0.1)
        `
      }}>
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg,transparent,transparent 1px,rgba(0,0,0,0.03) 1px,rgba(0,0,0,0.03) 2px),
            repeating-linear-gradient(-45deg,transparent,transparent 1px,rgba(255,255,255,0.03) 1px,rgba(255,255,255,0.03) 2px)
          `
        }}></div>
      <div className="relative z-10 text-center p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3 font-serif drop-shadow-sm">Profil Pengantin Pria</h3>        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-3 shadow-sm"></div>
        {/* Foto Profil dengan Frame Monokrom Elegan */}
        <ProfilePhoto name="Endo" folderPath="/images/slideshow-pria" />
        {/* Nama Lengkap */}
        <h4 className="text-lg font-bold text-gray-800 mb-2 drop-shadow-sm">Endo Febranda Silalahi S.Kom</h4>
        <p className="text-sm text-gray-600 mb-3 font-medium">Putra dari</p>
        <p className="text-sm text-gray-700 mb-4">Bapak Wilson Martianus Silalahi & Ibu Henny Herawaty Br Siregar</p>
        <div className="bg-gradient-to-br from-gray-50 to-gray-150 rounded-lg p-3 border shadow-inner mx-2">
          <p className="text-xs text-gray-600 font-medium italic">
            "Kasih sejati adalah ketika dua hati bersatu dalam iman dan cinta kasih Tuhan"
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg"
            style={{
              boxShadow: `
                0 2px 8px rgba(0,0,0,0.2),
                inset 1px 1px 2px rgba(255,255,255,0.3),
                inset -1px -1px 2px rgba(0,0,0,0.3)
              `
            }}>
            <span className="text-white text-xs drop-shadow-sm">💍</span>
          </div>
        </div>
      </div>
    </div>
  );
}
