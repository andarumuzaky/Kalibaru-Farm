import { fetchAPI, getStrapiMedia } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export default async function ProductsSection() {
  const productsResponse = await fetchAPI('/products', {
    filters: {
      isFeatured: {
        $eq: true
      }
    },
    populate: '*',
    pagination: {
      limit: 3
    }
  });

  const products = productsResponse?.data || [];

  return (
    <section id="products" className="py-32 px-6 md:px-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-tertiary mb-4 block">Pilihan Terbaik</span>
          <h2 className="text-4xl lg:text-5xl font-serif text-primary mb-6">Produk Unggulan Kami</h2>
          <p className="text-neutral/60 max-w-2xl mx-auto leading-relaxed">
            Hasil bumi terbaik yang diproses setiap hari untuk mengirim kesegaran maksimal sampai ke tangan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product: any) => {
            const imageUrl = getStrapiMedia(product.thumbnail?.url);
            return (
              <Link href={`/products/${product.slug}`} key={product.id || product.documentId} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full border border-neutral/5 group hover:-translate-y-2 cursor-pointer">
                <div className="relative w-full aspect-[4/3] bg-neutral/5 overflow-hidden">
                  {product.isOrganic && (
                    <span className="absolute top-5 right-5 bg-primary/90 backdrop-blur-sm text-secondary text-[10px] font-bold px-4 py-1.5 rounded-full shadow-sm z-10 tracking-widest">
                      ORGANIC
                    </span>
                  )}
                  {imageUrl ? (
                    <Image src={imageUrl} alt={product.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral/5 to-neutral/10 flex flex-col items-center justify-center text-neutral/40 transition-transform duration-700 group-hover:scale-105">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 mb-2 opacity-50">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow text-center relative bg-white z-20">
                  <span className="text-[10px] font-bold text-tertiary mb-3 uppercase tracking-[0.2em]">{product.category}</span>
                  <h3 className="text-2xl font-serif text-primary mb-3 group-hover:text-tertiary transition-colors">{product.title}</h3>
                  <p className="text-xl font-medium text-primary/80 mb-6 mt-auto">Rp {product.price}</p>
                  
                  <div className="w-full py-3.5 px-4 bg-secondary text-primary rounded-xl font-bold tracking-wide group-hover:bg-primary group-hover:text-secondary transition-all duration-300 text-sm uppercase flex items-center justify-center gap-2">
                    Lihat Detail
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
          
          {products.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-neutral/10 border-dashed shadow-sm">
              <div className="w-16 h-16 rounded-full bg-neutral/5 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-neutral/30">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <span className="text-neutral/50 font-medium text-lg">Belum ada produk unggulan di database.</span>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <Link href="/products" className="inline-flex items-center gap-2 border-b-2 border-tertiary text-primary font-bold pb-1 hover:text-tertiary transition-colors uppercase tracking-widest text-sm group">
            Lihat Semua Produk 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
