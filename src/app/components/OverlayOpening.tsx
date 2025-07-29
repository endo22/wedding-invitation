<<<<<<< HEAD
"use client";
import React, { useState, useEffect } from "react";

interface OverlayOpeningProps {
  visible: boolean;
  onClose: () => void;
}

export default function OverlayOpening({ visible, onClose }: OverlayOpeningProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [preweddingImages, setPreweddingImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load photos dynamically from API
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/photos');
        const data = await response.json();
        
        if (data.photos && Array.isArray(data.photos)) {
          // Extract only the src URLs for slideshow
          const imageUrls = data.photos.map((photo: { src: string }) => photo.src);
          setPreweddingImages(imageUrls);
        } else {
          // Fallback to hardcoded list if API fails
          const fallbackImages = [
            '/images/preweeding/main.png',
            '/images/preweeding/wedding monokrom.jpg',
            '/images/preweeding/Garden-and-Home.webp',
            '/images/preweeding/Endo.jpg',
            '/images/preweeding/sohe.jpg',
            '/images/preweeding/Church.jpg',
            '/images/preweeding/Section Profile.jpg'
          ];
          setPreweddingImages(fallbackImages);
        }
      } catch (error) {
        console.error('Error loading photos for slideshow:', error);
        // Set fallback photos on error
        const fallbackImages = [
          '/images/preweeding/main.png',
          '/images/preweeding/wedding monokrom.jpg',
          '/images/preweeding/Garden-and-Home.webp'
        ];
        setPreweddingImages(fallbackImages);
      } finally {
        setIsLoading(false);
      }
    };

    loadPhotos();
  }, []);

  // Slideshow effect - only start when photos are loaded
  useEffect(() => {
    if (preweddingImages.length === 0 || isLoading) return;

    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % preweddingImages.length
      );
    }, 4000); // Ganti gambar setiap 4 detik

    return () => clearInterval(slideInterval);
  }, [preweddingImages.length, isLoading]);

  useEffect(() => {
    const targetDate = new Date('2029-02-22T00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      {/* Background Slideshow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden'
      }}>
        {!isLoading && preweddingImages.length > 0 ? (
          preweddingImages.map((image, index) => (
            <div
              key={image}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: index === currentImageIndex ? 1 : 0,
                transition: 'opacity 1.5s ease-in-out',
                filter: 'brightness(0.4) blur(0.5px)'
              }}
            />
          ))
        ) : (
          // Loading state or fallback background
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/preweeding/main.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.4) blur(0.5px)'
          }} />
        )}
        {/* Dark overlay for better text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1
        }} />
      </div>

      {/* Elemen dekoratif bergerak */}
      <div style={{
        position: 'absolute', top: '10%', left: '10%', width: '8px', height: '8px', background: 'rgba(255,255,255,0.6)', borderRadius: '50%', animation: 'sparkle 2s ease-in-out infinite', zIndex: 2
      }}></div>
      <div style={{
        position: 'absolute', top: '20%', right: '15%', width: '6px', height: '6px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%', animation: 'sparkle 3s ease-in-out infinite 0.5s', zIndex: 2
      }}></div>
      <div style={{
        position: 'absolute', top: '25%', left: '20%', width: '4px', height: '4px', background: 'rgba(255,255,255,0.5)', borderRadius: '50%', animation: 'sparkle 2.5s ease-in-out infinite 1s', zIndex: 2
      }}></div>
      <div style={{
        position: 'absolute', top: '30%', right: '10%', width: '5px', height: '5px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%', animation: 'sparkle 3.5s ease-in-out infinite 1.5s', zIndex: 2
      }}></div>
      <div style={{
        position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px', width: '100%', zIndex: 2
      }}>
        <div style={{
          color: 'white', fontSize: isMobile ? 16 : 20, fontWeight: 400, letterSpacing: 2, textShadow: '0 2px 8px rgba(0,0,0,0.25)', opacity: 0.9, fontStyle: 'italic', marginBottom: 8
        }}>The Wedding of</div>
        <div style={{
          color: 'white', fontSize: isMobile ? 28 : 36, fontWeight: 700, fontFamily: 'serif', margin: '4px 0 8px 0', textShadow: '0 2px 12px rgba(0,0,0,0.35)', opacity: 0.95, textAlign: 'center'
        }}>Laki-laki & Perempuan</div>
        
        {/* Countdown Timer */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: isMobile ? '12px' : '20px', margin: '16px 0', flexWrap: 'wrap'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'white', fontSize: isMobile ? 24 : 32, fontWeight: 'bold', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div style={{ color: 'white', fontSize: isMobile ? 10 : 12, opacity: 0.8, marginTop: 2 }}>Hari</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'white', fontSize: isMobile ? 24 : 32, fontWeight: 'bold', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div style={{ color: 'white', fontSize: isMobile ? 10 : 12, opacity: 0.8, marginTop: 2 }}>Jam</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'white', fontSize: isMobile ? 24 : 32, fontWeight: 'bold', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div style={{ color: 'white', fontSize: isMobile ? 10 : 12, opacity: 0.8, marginTop: 2 }}>Menit</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'white', fontSize: isMobile ? 24 : 32, fontWeight: 'bold', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div style={{ color: 'white', fontSize: isMobile ? 10 : 12, opacity: 0.8, marginTop: 2 }}>Detik</div>
          </div>
        </div>

        <div style={{
          color: 'white', fontSize: isMobile ? 18 : 22, fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.25)', opacity: 0.95, textAlign: 'center', marginTop: 8
        }}>22 FEBRUARI 2029</div>
      </div>
      <div style={{
        position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', animation: 'floatGently 3s ease-in-out infinite', zIndex: 2
      }}></div>
    </div>
  );
}
=======
"use client";
import React, { useState, useEffect } from "react";

interface OverlayOpeningProps {
  visible: boolean;
  onClose: () => void;
}

export default function OverlayOpening({ visible, onClose }: OverlayOpeningProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [preweddingImages, setPreweddingImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load photos dynamically from API
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/photos');
        const data = await response.json();
        
        if (data.photos && Array.isArray(data.photos)) {
          // Extract only the src URLs for slideshow
          const imageUrls = data.photos.map((photo: { src: string }) => photo.src);
          setPreweddingImages(imageUrls);
        } else {
          // Fallback to hardcoded list if API fails
          const fallbackImages = [
            '/images/preweeding/main.png',
            '/images/preweeding/wedding monokrom.jpg',
            '/images/preweeding/Garden-and-Home.webp',
            '/images/preweeding/Endo.jpg',
            '/images/preweeding/sohe.jpg',
            '/images/preweeding/Church.jpg',
            '/images/preweeding/Section Profile.jpg'
          ];
          setPreweddingImages(fallbackImages);
        }
      } catch (error) {
        console.error('Error loading photos for slideshow:', error);
        // Set fallback photos on error
        const fallbackImages = [
          '/images/preweeding/main.png',
          '/images/preweeding/wedding monokrom.jpg',
          '/images/preweeding/Garden-and-Home.webp'
        ];
        setPreweddingImages(fallbackImages);
      } finally {
        setIsLoading(false);
      }
    };

    loadPhotos();
  }, []);

  // Slideshow effect - only start when photos are loaded
  useEffect(() => {
    if (preweddingImages.length === 0 || isLoading) return;

    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % preweddingImages.length
      );
    }, 4000); // Ganti gambar setiap 4 detik

    return () => clearInterval(slideInterval);
  }, [preweddingImages.length, isLoading]);

  useEffect(() => {
    const targetDate = new Date('2029-02-22T00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      {/* Background Slideshow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden'
      }}>
        {!isLoading && preweddingImages.length > 0 ? (
          preweddingImages.map((image, index) => (
            <div
              key={image}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: index === currentImageIndex ? 1 : 0,
                transition: 'opacity 1.5s ease-in-out',
                filter: 'brightness(0.4) blur(0.5px)'
              }}
            />
          ))
        ) : (
          // Loading state or fallback background
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/preweeding/main.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.4) blur(0.5px)'
          }} />
        )}
        {/* Dark overlay for better text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1
        }} />
      </div>

      {/* Elemen dekoratif bergerak */}
      <div style={{
        position: 'absolute', top: '10%', left: '10%', width: '8px', height: '8px', background: 'rgba(255,255,255,0.6)', borderRadius: '50%', animation: 'sparkle 2s ease-in-out infinite', zIndex: 2
      }}></div>
      <div style={{
        position: 'absolute', top: '20%', right: '15%', width: '6px', height: '6px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%', animation: 'sparkle 3s ease-in-out infinite 0.5s', zIndex: 2
      }}></div>
      <div style={{
        position: 'absolute', top: '25%', left: '20%', width: '4px', height: '4px', background: 'rgba(255,255,255,0.5)', borderRadius: '50%', animation: 'sparkle 2.5s ease-in-out infinite 1s', zIndex: 2
      }}></div>
      <div style={{
        position: 'absolute', top: '30%', right: '10%', width: '5px', height: '5px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%', animation: 'sparkle 3.5s ease-in-out infinite 1.5s', zIndex: 2
      }}></div>
      <div style={{
        position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px', width: '100%', zIndex: 2
      }}>
        <div style={{
          color: 'white', fontSize: isMobile ? 16 : 20, fontWeight: 400, letterSpacing: 2, textShadow: '0 2px 8px rgba(0,0,0,0.25)', opacity: 0.9, fontStyle: 'italic', marginBottom: 8
        }}>The Wedding of</div>
        <div style={{
          color: 'white', fontSize: isMobile ? 28 : 36, fontWeight: 700, fontFamily: 'serif', margin: '4px 0 8px 0', textShadow: '0 2px 12px rgba(0,0,0,0.35)', opacity: 0.95, textAlign: 'center'
        }}>Laki-laki & Perempuan</div>
        
        {/* Countdown Timer */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: isMobile ? '12px' : '20px', margin: '16px 0', flexWrap: 'wrap'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'white', fontSize: isMobile ? 24 : 32, fontWeight: 'bold', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div style={{ color: 'white', fontSize: isMobile ? 10 : 12, opacity: 0.8, marginTop: 2 }}>Hari</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'white', fontSize: isMobile ? 24 : 32, fontWeight: 'bold', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div style={{ color: 'white', fontSize: isMobile ? 10 : 12, opacity: 0.8, marginTop: 2 }}>Jam</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'white', fontSize: isMobile ? 24 : 32, fontWeight: 'bold', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div style={{ color: 'white', fontSize: isMobile ? 10 : 12, opacity: 0.8, marginTop: 2 }}>Menit</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'white', fontSize: isMobile ? 24 : 32, fontWeight: 'bold', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div style={{ color: 'white', fontSize: isMobile ? 10 : 12, opacity: 0.8, marginTop: 2 }}>Detik</div>
          </div>
        </div>

        <div style={{
          color: 'white', fontSize: isMobile ? 18 : 22, fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.25)', opacity: 0.95, textAlign: 'center', marginTop: 8
        }}>22 FEBRUARI 2029</div>
      </div>
      <div style={{
        position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', animation: 'floatGently 3s ease-in-out infinite', zIndex: 2
      }}></div>
    </div>
  );
}
>>>>>>> 5630643a154bf98ee068e0cf240e019e1d05a226
