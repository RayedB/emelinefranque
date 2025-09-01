'use client';

import { useCallback } from 'react';
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

interface ImageSliderProps {
  onImageClick?: (index: number) => void;
}

export default function ImageSlider({ onImageClick }: ImageSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleImageClick = (index: number) => {
    if (onImageClick) {
      onImageClick(index);
    }
  };



  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div className="relative w-80 h-96 lg:w-96 lg:h-[500px] cursor-pointer" onClick={() => handleImageClick(index)}>
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
    </div>
  );
} 