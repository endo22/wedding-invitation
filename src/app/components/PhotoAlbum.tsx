"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Photo {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category: "prewedding" | "ceremony" | "couple" | "family";
}

const PhotoAlbum: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleScrollForVisibility = () => {
      const photoAlbumElement = document.getElementById("photo-album-section");
      if (photoAlbumElement) {
        const rect = photoAlbumElement.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollForVisibility);

    handleScrollForVisibility();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollForVisibility);
    };
  }, []);

  // Load photos dynamically from API
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/photos');
        const data = await response.json();
        
        if (data.photos && Array.isArray(data.photos)) {
          setPhotos(data.photos);
        } else {
          // Fallback to hardcoded list if API fails
          const fallbackPhotos: Photo[] = [
            {
              id: "1",
              src: "/images/preweeding/main.png",
              alt: "Prewedding Photo",
              title: "Our Love Story",
              category: "prewedding",
            },
            {
              id: "2",
              src: "/images/preweeding/Garden-and-Home.webp",
              alt: "Prewedding Photo",
              title: "Garden Moments",
              category: "prewedding",
            },
            {
              id: "3",
              src: "/images/preweeding/wedding monokrom.jpg",
              alt: "Prewedding Photo",
              title: "Monochrome Love",
              category: "prewedding",
            },
          ];
          setPhotos(fallbackPhotos);
        }
      } catch (error) {
        console.error('Error loading photos:', error);
        // Set fallback photos on error
        const fallbackPhotos: Photo[] = [
          {
            id: "1",
            src: "/images/preweeding/main.png",
            alt: "Prewedding Photo",
            title: "Our Love Story",
            category: "prewedding",
          },
        ];
        setPhotos(fallbackPhotos);
      } finally {
        setIsLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const getZoomScale = () => {
    if (!isVisible) return 1;

    const photoAlbumElement = document.getElementById("photo-album-section");
    if (!photoAlbumElement) return 1;

    const rect = photoAlbumElement.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;

    const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
    const maxDistance = window.innerHeight / 2;

    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
    const zoomScale = 1.05 - normalizedDistance * 0.1;

    return Math.max(0.95, Math.min(1.05, zoomScale));
  };

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div
        id="photo-album-section"
        className="relative px-4 sm:px-6 lg:px-8 py-8 pb-4 min-h-[100vh]"
        style={{
          transform: `scale(${getZoomScale()})`,
          transition: "transform 0.1s ease-out",
          transformOrigin: "center",
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ zIndex: 0 }}>
          <Image
            src="/images/Section Album.jpg"
            alt="Background"
            fill
            className="object-cover"
            style={{
              filter: "brightness(0.6) blur(0.5px)",
              transform: `scale(${1 + scrollY * 0.0002})`,
              transformOrigin: "center",
            }}
            onError={(e) => {
              console.error('Background image failed to load:', e);
              // Fallback to CSS background
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.style.backgroundImage = "url('/images/roses.jpg')";
                parent.style.backgroundSize = "cover";
                parent.style.backgroundPosition = "center";
                parent.style.backgroundRepeat = "no-repeat";
                parent.style.filter = "brightness(0.6) blur(0.5px)";
              }
            }}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 sm:p-8 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-4 drop-shadow-lg">
                Prewedding Gallery
              </h2>
              <div className="w-20 sm:w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4"></div>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed drop-shadow-md">
                Momen indah sebelum hari bahagia kami
              </p>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
                    <div className="aspect-square relative bg-white/5 animate-pulse">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-white/30 border-t-white/60 rounded-full animate-spin"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="group cursor-pointer"
                  onClick={() => openModal(photo)}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    <div className="aspect-square relative">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Photo Title */}
                      {photo.title && (
                        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-lg font-semibold drop-shadow-lg">
                            {photo.title}
                          </h3>
                        </div>
                      )}

                      {/* Zoom Icon */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg">🔍</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Decorative Elements */}
          <div className="text-center mt-6 pt-4 pb-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-4 max-w-md mx-auto">
              <div className="flex justify-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              </div>
              <p className="text-white/70 text-sm">
                ✦ ✦ ✦
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for enlarged photo */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl hover:bg-white/30 transition-colors duration-200 z-10"
            >
              ✕
            </button>
            
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-cover"
                  sizes="90vw"
                />
              </div>
              
              {selectedPhoto.title && (
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-serif text-white mb-2">
                    {selectedPhoto.title}
                  </h3>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default PhotoAlbum;
