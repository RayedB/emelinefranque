import Image from 'next/image';
import Navbar from '../components/Navbar';
import content from '../data/content.json';
import Link from 'next/link';
import ImageSlider from '../components/ImageSlider';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  
  // Sold out state
  const isSoldOut = false;
  
  // Helper function to append current query params to a URL
  const appendQueryParams = (baseUrl: string) => {
    // Convert searchParams to a clean Record<string, string>
    const cleanParams: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(resolvedSearchParams)) {
      if (value !== undefined) {
        // Handle array values by taking the first element
        cleanParams[key] = Array.isArray(value) ? value[0] : String(value);
      }
    }
    
    const queryString = new URLSearchParams(cleanParams).toString();
    if (queryString) {
      const separator = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${separator}${queryString}`;
    }
    return baseUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4C4B0] to-[#C8B99C] relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content */}
          <div className="text-left space-y-8 pt-20 lg:pt-0 z-10">
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
              <Link href={isSoldOut ? "#" : appendQueryParams(content.hero.buttons.primary_url)} className={isSoldOut ? "pointer-events-none" : ""}>
                <button className={`px-8 py-3 text-sm font-medium tracking-wide transition-colors font-[family-name:var(--font-inter)] ${
                  isSoldOut 
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
                    : "bg-gray-800 text-white hover:bg-gray-900"
                }`}>
                  {content.hero.buttons.primary}
                </button>
              </Link>
            </div>
          </div>
          
          {/* Right Content - Model Image/Slider */}
          <div className="relative flex justify-center lg:justify-end w-full h-full z-10">
            {/* Circular background element */}
            <div className="absolute inset-0 w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-br from-[#E5D5C3] to-[#D4C4B0] opacity-60 -translate-y-12 translate-x-12 pointer-events-none"></div>
            {/* Image Slider */}
            <div className="relative z-10 w-72 h-80 sm:w-96 sm:h-96 lg:w-96 lg:h-[500px] flex items-center justify-center">
              <ImageSlider />
            </div>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Product Image */}
            <div className="flex justify-center w-full">
              <div className="w-96 h-96 rounded-lg flex items-center justify-center">
                <div className="w-80 h-80 flex items-center justify-center text-white shadow-2xl">
                  <Image src="/images/gallery/EMELINEFRANQUE_BAG_23.jpg" alt="Hero" width={685} height={913} className="rounded-lg px-auto" />
                </div>
              </div>
            </div>
            
            
            {/* Product Details */}
            <div className="space-y-6 w-full">
              <h2 className="text-4xl md:text-5xl font-light text-amber-700 font-[family-name:var(--font-playfair)]">
                {content.product.title}
              </h2>
              
              <div className="text-3xl font-semibold text-gray-800 font-[family-name:var(--font-inter)]">
                {content.product.price}
              </div>
              
              <p className="text-gray-600 leading-relaxed text-base font-[family-name:var(--font-inter)]">
                {content.product.description}
              </p>
              <p className="text-gray-600 leading-relaxed text-base font-[family-name:var(--font-inter)]">
                {content.product.sizing}
              </p>
  
              <p className="text-gray-600 font-bold leading-relaxed text-base font-[family-name:var(--font-inter)]">
                {content.product.delivery}
              </p>
              <p className="text-gray-600 leading-relaxed text-base font-[family-name:var(--font-inter)]">
                {content.product.lead_time}
              </p>
              
              {/* Shipping Images */}
              <div className="flex gap-4 items-center">
                <Image 
                  src="/images/gallery/frais-de-transport-chronopost-point-relais-erreur-livraison-retrait-depot.jpg"
                  alt="Chronopost Shipping"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
                <Image 
                  src="/images/gallery/mondialrelay-shippingbo.png"
                  alt="Mondial Relay Shipping"
                  width={150}
                  height={150}
                  className="rounded-lg"
                />
              </div>
              
              <div className="pt-6">
                <Link href={isSoldOut ? "#" : appendQueryParams(content.product.url)} className={isSoldOut ? "pointer-events-none" : ""}>
                  <button className={`px-12 py-4 text-base font-medium tracking-wide transition-colors rounded-full font-[family-name:var(--font-inter)] ${
                    isSoldOut 
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
                      : "bg-amber-700 text-white hover:bg-amber-800"
                  }`}>
                    {content.product.button}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}
