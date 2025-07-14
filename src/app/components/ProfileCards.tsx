"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProfilePhoto from "./ProfilePhoto";

interface ProfileData {
  title: string;
  name: string;
  fullName: string;
  parents: string;
  quote: string;
  iconColor: string;
}

interface ProfileCardProps {
  profile: ProfileData;
}

function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="relative p-2 sm:p-3 animate-fade-in">
      <div className="text-center">
        {/* <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 font-serif drop-shadow-sm">{profile.title}</h3> */}
        <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-2 sm:mb-3 shadow-sm animate-slide-up-delay-1"></div>
        {/* Foto Profil dengan Frame Monokrom Elegan */}
        <div className="animate-zoom-in-delay-2">
          <ProfilePhoto name={profile.name} />
        </div>
        {/* Nama Lengkap */}
        <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 drop-shadow-sm animate-slide-up-delay-3">
          {profile.fullName}
        </h4>
        <p className="text-xs sm:text-sm text-white/90 mb-1 sm:mb-2 font-medium animate-slide-up-delay-4">
          {profile.title.includes("Pria") ? "Putra dari" : "Putri dari"}
        </p>
        <p className="text-xs sm:text-sm text-white/80 px-2 sm:px-0 animate-slide-up-delay-5">
          {profile.parents}
        </p>
      </div>
    </div>
  );
}

export default function ProfileCards() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const groomProfile: ProfileData = {
    title: "Profil Pengantin Pria",
    name: "Pria",
    fullName: "Endo Febranda Silalahi S.Kom",
    parents: "Bapak Wilson Martianus Silalahi & Ibu Henny Herawaty Br Siregar",
    quote:
      "Kasih sejati adalah ketika dua hati bersatu dalam iman dan cinta kasih Tuhan",
    iconColor: "bg-gradient-to-br from-blue-500 to-blue-700",
  };

  const brideProfile: ProfileData = {
    title: "Profil Pengantin Wanita",
    name: "Wanita",
    fullName: "Han So Hee S.Sn",
    parents: "Bapak Kim Jung-ho & Ibu Park Mi-young",
    quote:
      "Cinta sejati adalah kebahagiaan yang dibagi berdua dalam setiap langkah kehidupan",
    iconColor: "bg-gradient-to-br from-pink-400 to-pink-600",
  };

  return (
    <div className="relative py-16 pb-0 min-h-[100vh] -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Background image diluar card - menutupi area lebih luas */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/Section%20Profile.jpg"
          alt="Profile Section Background"
          fill
          className="object-cover opacity-70"
          style={{
            filter: "brightness(0.7) blur(0.3px)",
            transform: `scale(${1 + scrollY * 0.0002})`,
            transformOrigin: "center",
            transition: "transform 0.3s ease-out"
          }}
          onError={(e) => {
            console.log("Image failed to load:", e);
            // Fallback ke background CSS jika img tag gagal
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.style.backgroundImage = 'url("/images/Section%20Profile.jpg")';
              parent.style.backgroundSize = 'cover';
              parent.style.backgroundPosition = 'center';
              parent.style.backgroundRepeat = 'no-repeat';
            }
          }}
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Profile Cards Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Wedding message */}
          <div className="text-center px-2 py-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 font-serif tracking-wider drop-shadow-lg">
              With Love
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed font-light drop-shadow-md">
              Tuhan menjadikan segala sesuatu indah pada waktu-Nya. Indah saat
              Ia mempertemukan, indah saat Ia menumbuhkan kasih, dan indah saat
              Ia menyatukan dalam Ikatan Pernikahan Kudus. Besar harapan kami
              kiranya Bapak/Ibu/Saudara/i turut bersukacita & mendoakan
              pernikahan kami:
            </p>
          </div>
          <div data-profile-card>
            <ProfileCard profile={groomProfile} />
          </div>
          {/* & symbol between profiles */}
          <div className="flex justify-center -my-1">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white drop-shadow-lg">
              &
            </div>
          </div>{" "}
          <ProfileCard profile={brideProfile} />
        </div>
      </div>
    </div>
  );
}
