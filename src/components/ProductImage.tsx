'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  regularImage: string;
  zoomImage: string;
  alt: string;
}

export default function ProductImage({ regularImage, zoomImage, alt }: ProductImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Regular Image */}
      <Image
        src={`/images/products/${regularImage}`}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {/* Zoom Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/products/${zoomImage}`}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
