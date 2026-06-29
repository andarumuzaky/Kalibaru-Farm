"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  mainImageUrl: string | null;
  galleryUrls: string[];
  productTitle: string;
  isOrganic?: boolean;
}

export default function ProductGallery({ mainImageUrl, galleryUrls, productTitle, isOrganic }: ProductGalleryProps) {
  // Combine main image with gallery images for the full list
  const allImages = mainImageUrl ? [mainImageUrl, ...galleryUrls] : galleryUrls;
  
  // State to track which image is currently displayed in the main view
  const [activeImage, setActiveImage] = useState<string | null>(allImages.length > 0 ? allImages[0] : null);

  return (
    <div className="w-full lg:w-[45%] flex flex-col gap-4">
      {/* Main Image Display */}
      <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden shadow-sm border border-neutral/10">
        {isOrganic && (
          <span className="absolute top-4 right-4 bg-[#E8F3E8] text-primary text-[10px] font-bold px-4 py-1.5 rounded-full z-10 tracking-[0.1em] border border-primary/10">
            ORGANIC CERTIFIED
          </span>
        )}
        {activeImage ? (
          <Image src={activeImage} alt={productTitle} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-opacity duration-300" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral/30 bg-neutral/5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 opacity-50 mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Gallery Thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {allImages.slice(0, 4).map((imgUrl, i) => {
            const isActive = activeImage === imgUrl;
            return (
              <div 
                key={i} 
                onClick={() => setActiveImage(imgUrl)}
                className={`relative aspect-square bg-white rounded-xl overflow-hidden cursor-pointer transition-all ${
                  isActive ? 'border-2 border-primary opacity-100 shadow-md' : 'border border-neutral/10 hover:border-primary/30 opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={imgUrl} alt={`Thumbnail ${i + 1}`} fill sizes="25vw" className="object-cover" />
              </div>
            );
          })}
          
          {/* Fill empty slots if less than 4 total images */}
          {allImages.length < 4 && Array.from({ length: 4 - allImages.length }).map((_, i) => (
            <div key={`empty-${i}`} className="relative aspect-square bg-neutral/5 rounded-xl border border-neutral/10"></div>
          ))}
        </div>
      )}
    </div>
  );
}
