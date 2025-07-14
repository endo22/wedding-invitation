import React from "react";
import Image from "next/image";

const preweddingImages = [
  "Garden-and-Home.webp",
  "main.png",
  "wedding monokrom.jpg"
];

export default function PreweddingGallery() {
  return (
    <div className="space-y-3 mt-4">
      {preweddingImages.map((img, idx) => (
        <div key={img} className="bg-white/60 backdrop-blur-sm rounded-lg p-2 border border-gray-200 scroll-reveal hover:scale-105 transition-transform duration-300">
          <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-1 border overflow-hidden">
            <Image
              src={`/images/preweeding/${img}`}
              alt={`Foto Prewedding ${idx + 1}`}
              className="object-cover w-full h-full"
              width={400}
              height={160}
              loading="lazy"
            />
          </div>
          <p className="text-xs text-gray-800 text-center font-medium">Foto Prewedding {idx + 1}</p>
        </div>
      ))}
    </div>
  );
}
