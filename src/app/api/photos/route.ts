import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const photosDirectory = path.join(process.cwd(), 'public', 'images', 'preweeding');
    
    // Check if directory exists
    if (!fs.existsSync(photosDirectory)) {
      return NextResponse.json({ photos: [] });
    }

    // Read directory contents
    const files = fs.readdirSync(photosDirectory);
    
    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const imageFiles = files.filter(file => 
      imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
    );

    // Create photo objects
    const photos = imageFiles.map((filename, index) => {
      // Generate a nice title from filename
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
      const title = nameWithoutExt
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      return {
        id: (index + 1).toString(),
        src: `/images/preweeding/${filename}`,
        alt: "Prewedding Photo",
        title: title || "Beautiful Moment",
        category: "prewedding",
        filename
      };
    });

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error reading photos directory:', error);
    return NextResponse.json({ photos: [] });
  }
}
