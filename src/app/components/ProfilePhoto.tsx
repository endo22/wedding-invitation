<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProfilePhotoProps {
  name: string;
}

export default function ProfilePhoto({ name }: ProfilePhotoProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col items-center mb-3 sm:mb-4">
      {/* Oval frame container */}
      <div style={{
        background: 'linear-gradient(145deg, #e8e4d9, #d1c7b3)',
        borderRadius: '50% / 60%',
        padding: isMobile ? 2 : 3,
        boxShadow: `
          inset 0 4px 8px rgba(0,0,0,0.15),
          inset 0 -4px 8px rgba(255,255,255,0.8),
          0 8px 24px rgba(0,0,0,0.2)
        `,
        display: 'inline-block',
        position: 'relative',
        marginBottom: isMobile ? 6 : 8,
        border: '0.5px solid #b8a682'
      }}>
        {/* Inner oval frame */}
        <div style={{
          background: 'linear-gradient(145deg, #f5f1e8, #e0d5c7)',
          borderRadius: '50% / 60%',
          padding: isMobile ? 1 : 2,
          boxShadow: `
            inset 0 2px 4px rgba(0,0,0,0.1),
            inset 0 -2px 4px rgba(255,255,255,0.9)
          `,
          border: '0.25px solid #c9b991'
        }}>
          {/* Photo container */}
          <div style={{
            width: isMobile ? 220 : 290,
            height: isMobile ? 270 : 360,
            borderRadius: '50% / 60%',
            overflow: 'hidden',
            background: '#fff',
            position: 'relative',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <Image
              src={
                name === "Pria" ? "/images/slideshow-pria/Endo.jpg" : 
                name === "Wanita" ? "/images/slideshow-wanita/sohe.jpg" : 
                "/images/main.png"
              }
              alt={`${name} Profile`}
              width={isMobile ? 220 : 290}
              height={isMobile ? 270 : 360}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'sepia(20%) contrast(1.1) brightness(1.05)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
=======
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProfilePhotoProps {
  name: string;
}

export default function ProfilePhoto({ name }: ProfilePhotoProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col items-center mb-3 sm:mb-4">
      {/* Oval frame container */}
      <div style={{
        background: 'linear-gradient(145deg, #e8e4d9, #d1c7b3)',
        borderRadius: '50% / 60%',
        padding: isMobile ? 2 : 3,
        boxShadow: `
          inset 0 4px 8px rgba(0,0,0,0.15),
          inset 0 -4px 8px rgba(255,255,255,0.8),
          0 8px 24px rgba(0,0,0,0.2)
        `,
        display: 'inline-block',
        position: 'relative',
        marginBottom: isMobile ? 6 : 8,
        border: '0.5px solid #b8a682'
      }}>
        {/* Inner oval frame */}
        <div style={{
          background: 'linear-gradient(145deg, #f5f1e8, #e0d5c7)',
          borderRadius: '50% / 60%',
          padding: isMobile ? 1 : 2,
          boxShadow: `
            inset 0 2px 4px rgba(0,0,0,0.1),
            inset 0 -2px 4px rgba(255,255,255,0.9)
          `,
          border: '0.25px solid #c9b991'
        }}>
          {/* Photo container */}
          <div style={{
            width: isMobile ? 220 : 290,
            height: isMobile ? 270 : 360,
            borderRadius: '50% / 60%',
            overflow: 'hidden',
            background: '#fff',
            position: 'relative',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <Image
              src={
                name === "Pria" ? "/images/slideshow-pria/Endo.jpg" : 
                name === "Wanita" ? "/images/slideshow-wanita/sohe.jpg" : 
                "/images/main.png"
              }
              alt={`${name} Profile`}
              width={isMobile ? 220 : 290}
              height={isMobile ? 270 : 360}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'sepia(20%) contrast(1.1) brightness(1.05)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 5630643a154bf98ee068e0cf240e019e1d05a226
