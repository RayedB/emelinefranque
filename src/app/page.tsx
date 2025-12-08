'use client';

import Image from 'next/image';
import Navbar from '../components/Navbar';
import content from '../data/content.json';
import Link from 'next/link';
import ImageSlider from '../components/ImageSlider';
import ProductImage from '../components/ProductImage';
import ImageModal from '../components/ImageModal';
import { useState } from 'react';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  
  // Helper function to append current query params to a URL
  const appendQueryParams = (baseUrl: string) => {

    return baseUrl;
  };

  const handleImageClick = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4C4B0] to-[#C8B99C] relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content - Badge, Title, Description and Button */}
          <div className="text-left space-y-8 pt-5 lg:pt-0 z-10 order-1 lg:order-1">
            <span className="bg-white text-gray-800 px-4 py-1 rounded-full text-sm font-medium tracking-wide font-[family-name:var(--font-inter)]">
              {content.hero.badge_text}
            </span>
            <h1 className="text-5xl md:text-7xl font-light text-gray-800 leading-tight font-[family-name:var(--font-playfair)]">
              {content.hero.title}
            </h1>
            <div className="flex flex-col gap-4">
              <p className="text-gray-700 text-2xl md:text-md font-light leading-relaxed font-[family-name:var(--font-playfair)]">
                {content.hero.subtitle_text}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href={content.hero.buttons.primary_url}>
                <button className="px-8 py-3 text-sm font-medium tracking-wide transition-colors font-[family-name:var(--font-inter)] bg-gray-800 text-white hover:bg-gray-900">
                  {content.hero.buttons.primary}
                </button>
              </Link>
            </div>
          </div>
          
          {/* Right Content - Carousel */}
          <div className="relative flex justify-center lg:justify-end w-full h-full z-10 order-2 lg:order-2">
            {/* Circular background element */}
            <div className="absolute inset-0 w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-br from-[#E5D5C3] to-[#D4C4B0] opacity-60 -translate-y-12 translate-x-12 pointer-events-none"></div>
            {/* Image Slider */}
            <div className="relative z-10 w-72 h-80 sm:w-96 sm:h-96 lg:w-96 lg:h-[500px] flex items-center justify-center">
              <ImageSlider onImageClick={handleImageClick} />
            </div>
          </div>
        </div>
      </div>

      {/* Individual Products Section */}
      <div id="products" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center text-4xl md:text-5xl font-light text-gray-800 mb-16 font-[family-name:var(--font-playfair)]">
            {content.products.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {content.products.items.map((product) => (
              <div key={product.id} className="text-center">
                <div className="mb-6">
                  <ProductImage
                    regularImage={product.image}
                    zoomImage={product.imageZoom}
                    alt={product.name}
                  />
                </div>
                <h3 className="text-2xl font-medium text-gray-800 mb-3 font-[family-name:var(--font-playfair)]">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 px-4 font-[family-name:var(--font-inter)]">
                  {product.description}
                </p>
                <div className="text-xl font-semibold text-amber-700 mb-1 font-[family-name:var(--font-inter)]">
                  {product.price}
                </div>
                <div className="text-sm text-gray-500 italic mb-2 font-[family-name:var(--font-inter)]">
                  {product.shipping}
                </div>
                {'soldOut' in product && product.soldOut ? (
                  <button disabled className="px-8 py-3 bg-gray-400 text-white rounded-full cursor-not-allowed font-medium tracking-wide uppercase text-sm font-[family-name:var(--font-inter)] mb-4">
                    Épuisé
                  </button>
                ) : (
                  <Link href={appendQueryParams(product.url)}>
                    <button className="px-8 py-3 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-colors font-medium tracking-wide uppercase text-sm font-[family-name:var(--font-inter)] mb-4">
                      Commander
                    </button>
                  </Link>
                )}
                <div className="text-sm text-gray-500 italic font-[family-name:var(--font-inter)] flex items-center justify-center gap-2 mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  {'soldOut' in product && product.soldOut ? 'Épuisé' : 'En stock'}
                </div>
                <div className="text-sm text-gray-500 italic font-[family-name:var(--font-inter)] flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  {product.delivery}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bundle Section */}
      <div className="bg-gradient-to-br from-[#f8f6f3] to-[#e8e1d5] py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Bundle Image */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={`/images/products/${content.bundle.image}`}
                alt="Pack Complet"
                fill
                className="object-cover"
              />
            </div>

            {/* Bundle Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-light text-gray-800 font-[family-name:var(--font-playfair)]">
                {content.bundle.title}
              </h2>
              <div className="text-4xl font-bold text-amber-700 font-[family-name:var(--font-inter)]">
                {content.bundle.price}
              </div>
              <div className="text-lg text-gray-600 font-[family-name:var(--font-inter)]">
                {content.bundle.savings}
              </div>
              
              <ul className="space-y-3">
                {content.bundle.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-700 font-[family-name:var(--font-inter)]">
                    <span className="text-amber-700 font-bold text-xl mr-3">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                {content.bundle.soldOut ? (
                  <button disabled className="px-12 py-4 bg-gray-400 text-white rounded-full cursor-not-allowed font-medium tracking-wide uppercase text-base font-[family-name:var(--font-inter)]">
                    Épuisé
                  </button>
                ) : (
                  <Link href={appendQueryParams(content.bundle.url)}>
                    <button className="px-12 py-4 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-colors font-medium tracking-wide uppercase text-base font-[family-name:var(--font-inter)]">
                      {content.bundle.button}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal 
        isOpen={modalOpen}
        initialIndex={modalIndex}
        onClose={handleModalClose}
      />
    </div>
  );
}