'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

const images = [
  '/images/banners/look-bracelet-hiver-emeline-franque.jpg',
  '/images/banners/bracelet-perles-vintage-collection-emeline-franque.jpg',
  '/images/products/bracelet-perle-automne-emeline-franque.jpg',
  '/images/banners/bracelet-perles-automne-emeline-franque.jpg',
  '/images/banners/bracelet-perles-lifestyle-emeline-franque.jpg',
  '/images/banners/bracelet-perles-hiver-emeline-franque.jpg',
];

interface ImageModalProps {
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
}

export default function ImageModal({ isOpen, initialIndex, onClose }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  const showPrev = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleClose = () => {
    onClose();
  };

  // Touch swipe handlers for modal
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) showPrev(e); // swipe right
    if (deltaX < -50) showNext(e); // swipe left
    touchStartX.current = null;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      onClick={handleClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
        {/* Left arrow */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full w-12 h-12 flex items-center justify-center text-gray-800 text-2xl shadow-lg hover:bg-white transition-colors z-10"
          onClick={showPrev}
          aria-label="Previous image"
        >
          ←
        </button>
        {/* Right arrow */}
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full w-12 h-12 flex items-center justify-center text-gray-800 text-2xl shadow-lg hover:bg-white transition-colors z-10"
          onClick={showNext}
          aria-label="Next image"
        >
          →
        </button>
        {/* Close (X) icon */}
        <button
          className="absolute top-4 right-4 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center text-gray-800 text-xl shadow-lg hover:bg-white transition-colors z-10"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="w-full h-full relative flex items-center justify-center p-4">
          <Image
            src={images[currentIndex]}
            alt="Large product preview"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
