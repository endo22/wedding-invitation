import React, { useState, useEffect } from "react";

interface ProfilePhotoProps {
  name: string;
  folderPath: string;
}

export default function ProfilePhoto({ name, folderPath }: ProfilePhotoProps) {
  const [slideshowImages, setSlideshowImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    // Fetch images from the folder dynamically
    const loadImages = async () => {
      try {
        // Since we can't directly read directories in browser, we'll try common patterns
        const potentialImages = [
          // Current known files
          'Graduation Photo.jpg',
          'Garden-and-Home.webp',
          'main.png', 
          'wedding monokrom.jpg',
          // Common naming patterns
          '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg',
          '1.png', '2.png', '3.png', '4.png', '5.png',
          '1.webp', '2.webp', '3.webp', '4.webp', '5.webp',
          'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg',
          'photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg',
          'portrait.jpg', 'portrait.png', 'portrait.webp',
          'formal.jpg', 'formal.png', 'formal.webp',
          'casual.jpg', 'casual.png', 'casual.webp',
          'wedding.jpg', 'wedding.png', 'wedding.webp',
          'profile.jpg', 'profile.png', 'profile.webp'
        ];

        const imageChecks = potentialImages.map(async (filename) => {
          try {
            const response = await fetch(`${folderPath}/${filename}`, { method: 'HEAD' });
            return response.ok ? filename : null;
          } catch {
            return null;
          }
        });

        const results = await Promise.all(imageChecks);
        const validImages = results.filter(img => img !== null) as string[];
        
        // Remove duplicates
        const uniqueImages = [...new Set(validImages)];
        
        console.log(`Found images in ${folderPath}:`, uniqueImages);
        
        if (uniqueImages.length > 0) {
          setSlideshowImages(uniqueImages);
        } else {
          // Fallback to default images if none found
          console.log(`No images found in ${folderPath}, using fallback`);
          setSlideshowImages(['main.png', 'wedding monokrom.jpg', 'Garden-and-Home.webp']);
        }
      } catch (error) {
        console.error('Error loading images:', error);
        // Fallback images
        setSlideshowImages(['main.png', 'wedding monokrom.jpg', 'Garden-and-Home.webp']);
      }
    };

    loadImages();
  }, [folderPath]);

  useEffect(() => {
    if (slideshowImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % slideshowImages.length
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  return (
    <div className="flex flex-col items-center mb-4">
      {/* Signature nama di atas foto */}
      <div style={{
        fontFamily: 'serif',
        fontSize: 28,
        color: '#4a4a4a',
        marginBottom: '-18px',
        marginLeft: '8px',
        zIndex: 2,
        position: 'relative',
        opacity: 0.85,
        textShadow: '0 2px 8px rgba(255,255,255,0.7)',
        fontStyle: 'italic'
      }}>{name}</div>
      <div style={{
        background: 'repeating-radial-gradient(circle, #fff 0px, #f5f5f5 2px, #f5f5f5 18px)',
        borderRadius: '50%',
        padding: 8,
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
        display: 'inline-block',
        position: 'relative',
        marginBottom: 8
      }}>
        <div style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: '6px solid #d1d5db',
          boxShadow: '0 0 0 8px #fff, 0 8px 32px 0 rgba(0,0,0,0.10)',
          overflow: 'hidden',
          background: '#fff',
          position: 'relative',
          zIndex: 1        }}>
          <img
            src={`${folderPath}/${slideshowImages[currentImageIndex]}`}
            alt={`${name} Profile ${currentImageIndex + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
              filter: 'grayscale(100%) contrast(1.1) brightness(1.05)',
              transition: 'opacity 0.5s ease-in-out'
            }}
          />
        </div>
        {/* Gray outer glow */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: '50%',
          boxShadow: '0 0 0 12px #e5e7eb',
          opacity: 0.25,
          zIndex: 0
        }}></div>
      </div>
    </div>
  );
}
