'use client';

import { useCallback, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

const images = [
  '/images/banners/look-bracelet-hiver-emeline-franque.jpg',
  '/images/banners/bracelet-perles-vintage-collection-emeline-franque.jpg',
  '/images/products/bracelet-perle-automne-emeline-franque.jpg',
  '/images/banners/bracelet-perles-automne-emeline-franque.jpg',
  '/images/banners/bracelet-perles-lifestyle-emeline-franque.jpg',
  '/images/banners/bracelet-perles-hiver-emeline-franque.jpg',
];

export default function ImageSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const openModal = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalIndex(null);
  };

  const showPrev = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    setModalIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + images.length) % images.length;
    });
  };

  const showNext = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    setModalIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % images.length;
    });
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

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div className="relative w-80 h-96 lg:w-96 lg:h-[500px] cursor-pointer" onClick={() => openModal(index)}>
                <Image
                  src={src}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-colors"
          />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-800 transition-colors"
      >
        ←
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-800 transition-colors"
      >
        →
      </button>

      {/* Modal for large image */}
      {modalOpen && modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeModal}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative max-w-3xl w-full p-4 flex items-center justify-center" onClick={e => e.stopPropagation()}>
            {/* Left arrow */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-800 text-2xl shadow hover:bg-gray-200 transition-colors z-10"
              onClick={showPrev}
              aria-label="Previous image"
            >
              ←
            </button>
            {/* Right arrow */}
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-800 text-2xl shadow hover:bg-gray-200 transition-colors z-10"
              onClick={showNext}
              aria-label="Next image"
            >
              →
            </button>
            {/* Close (X) icon */}
            <button
              className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-gray-800 text-xl shadow hover:bg-gray-200 transition-colors z-10"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <div className="w-full h-[90vh] sm:h-[60vw] sm:max-h-[80vh] relative flex items-center justify-center">
              <Image
                src={images[modalIndex]}
                alt="Large product preview"
                fill
                className="object-contain rounded-lg bg-white"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 