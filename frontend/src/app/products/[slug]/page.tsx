import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import ContactFooterSection from "@/components/sections/ContactFooterSection";
import ProductGallery from "@/components/ui/ProductGallery";
import { fetchAPI, getStrapiMedia } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Fetch Main Product
  const productsResponse = await fetchAPI('/products', {
    filters: {
      slug: {
        $eq: resolvedParams.slug
      }
    },
    populate: '*'
  });

  const product = productsResponse?.data?.[0];

  if (!product) {
    notFound();
  }

  // Fetch Related Products (same category, exclude current)
  const relatedResponse = await fetchAPI('/products', {
    filters: {
      category: {
        $eq: product.category
      },
      slug: {
        $ne: product.slug
      }
    },
    populate: '*',
    pagination: {
      limit: 4
    }
  });
  const relatedProducts = relatedResponse?.data || [];

  const mainImageUrl = getStrapiMedia(product.thumbnail?.url);

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar variant="light" />

      {/* Breadcrumb */}
      <div className="w-full pt-24 pb-6">
        <div className="max-w-5xl mx-auto px-6 md:px-8 flex items-center text-[10px] font-bold tracking-[0.1em] text-neutral/60 uppercase">
          <Link href="/" className="hover:text-primary transition-colors">BERANDA</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-primary transition-colors">SHOP</Link>
          <span className="mx-2">/</span>
          <span className="text-primary">{product.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto w-full px-6 md:px-8 pb-16 flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left Column: Interactive Image Gallery */}
        <ProductGallery 
          mainImageUrl={mainImageUrl} 
          galleryUrls={product.gallery ? product.gallery.map((img: any) => getStrapiMedia(img.url)).filter(Boolean) : []} 
          productTitle={product.title}
          isOrganic={product.isOrganic}
        />

        {/* Right Column: Info */}
        <div className="w-full lg:w-[55%] flex flex-col pt-2">
          <h1 className="text-3xl md:text-4xl font-serif text-primary mb-3 leading-tight font-medium">{product.title}</h1>
          <p className="text-xl text-tertiary mb-6 font-medium">
            Rp {product.price?.toLocaleString('id-ID')} <span className="text-neutral/60 text-lg font-normal">/ {product.unit || "Pack"}</span>
          </p>
          
          <hr className="border-neutral/10 mb-8" />
          
          <h2 className="text-[10px] font-bold text-neutral/70 uppercase tracking-[0.1em] mb-4">DESKRIPSI PRODUK</h2>
          
          <div className="text-neutral/80 text-sm leading-relaxed mb-10 prose prose-sm prose-p:mb-4">
            {product.description ? (
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            ) : (
              <>
                <p>Nikmati kemurnian alami dari Kalibaru Farm. Susu kambing kami diperah setiap pagi dari kambing Saanen pilihan yang dipelihara dengan metode organik penuh kasih sayang. Tanpa bahan pengawet, tanpa pemanis buatan, hanya kebaikan alam yang murni.</p>
                <p>Proses pasteurisasi suhu rendah kami memastikan nutrisi penting tetap terjaga sementara keamanan konsumsi tetap terjamin. Cocok untuk kesehatan pencernaan dan penguatan sistem imun.</p>
              </>
            )}
          </div>

          <div className="bg-[#F4F4F4] p-4 rounded-xl mb-6">
            <button className="w-full bg-[#0E2014] text-white px-6 py-4 rounded-lg font-bold hover:bg-[#1a3824] transition-colors flex items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
              </svg>
              Pesan via WhatsApp
            </button>
          </div>

          <div className="flex gap-4 w-full">
             <div className="flex-1 bg-[#F0F6F2] rounded-lg py-3 px-4 flex items-center justify-center gap-2 text-[#2A4B36] font-medium text-xs">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
               </svg>
               {product.featureBadge1 || "100% Organik"}
             </div>
             <div className="flex-1 bg-[#F0F6F2] rounded-lg py-3 px-4 flex items-center justify-center gap-2 text-[#2A4B36] font-medium text-xs">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
               </svg>
               {product.featureBadge2 || "Pengiriman Dingin"}
             </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 py-16">
         <div className="flex justify-between items-end mb-8 border-b border-neutral/10 pb-4">
            <div>
               <h2 className="text-2xl font-serif text-primary mb-1">Produk Terkait</h2>
               <p className="text-neutral/60 text-xs font-medium">Pilihan sehat lainnya dari peternakan kami</p>
            </div>
            <Link href="/products" className="text-[10px] font-bold tracking-widest text-primary uppercase hover:text-tertiary transition-colors flex items-center gap-1">
               LIHAT SEMUA
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
               </svg>
            </Link>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((relProduct: any) => {
                const relImgUrl = getStrapiMedia(relProduct.thumbnail?.url);
                return (
                  <div key={relProduct.id} className="group bg-white rounded-xl overflow-hidden border border-neutral/5 shadow-sm hover:shadow-md transition-all flex flex-col pb-5">
                    <div className="relative aspect-square bg-[#F9F9F9] w-full overflow-hidden">
                      {relProduct.isNew && (
                        <span className="absolute top-3 right-3 bg-primary text-white text-[9px] font-bold px-3 py-1 rounded-full z-10 tracking-widest uppercase">
                          NEW
                        </span>
                      )}
                      {relImgUrl ? (
                         <Image src={relImgUrl} alt={relProduct.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                         <div className="absolute inset-0 flex items-center justify-center text-neutral/20 bg-neutral/5">No Image</div>
                      )}
                    </div>
                    <div className="flex flex-col items-center pt-5 px-4 flex-grow text-center">
                       <h3 className="font-serif text-primary text-lg mb-1 leading-tight">{relProduct.title}</h3>
                       <p className="text-tertiary text-sm font-medium mb-4">Rp {relProduct.price?.toLocaleString('id-ID')}</p>
                       <Link href={`/products/${relProduct.slug}`} className="mt-auto w-full py-2.5 rounded-md border border-neutral/20 text-[10px] font-bold text-neutral/70 tracking-[0.1em] uppercase hover:bg-primary hover:border-primary hover:text-white transition-all">
                         LIHAT DETAIL
                       </Link>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-span-full py-10 text-center text-neutral/40 text-sm">
                Belum ada produk terkait.
              </div>
            )}
         </div>
      </div>

      <ContactFooterSection />
    </main>
  );
}
