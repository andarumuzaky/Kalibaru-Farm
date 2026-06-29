import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import ContactFooterSection from "@/components/sections/ContactFooterSection";
import { fetchAPI, getStrapiMedia } from "@/lib/api";
import Image from "next/image";

export default async function ProductsListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : '';

  const filters: any = {};
  if (category) {
    filters.category = {
      $eq: category
    };
  }

  const productsResponse = await fetchAPI('/products', {
    populate: '*',
    filters
  });

  const products = productsResponse?.data || [];

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar variant="light" />

      {/* Header */}
      <div className="w-full pt-32 pb-16 relative overflow-hidden bg-white border-b border-neutral/5">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 z-0"></div>
        <div className="max-w-7xl mx-auto w-full px-6 md:px-8 relative z-10 flex flex-col items-center text-center">
          <span className="text-xs font-bold tracking-[0.3em] text-tertiary uppercase mb-4">Katalog Kami</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-6">Semua Produk</h1>
          <p className="text-neutral/80 text-lg max-w-2xl leading-relaxed">
            Dari padang rumput hijau Kalibaru langsung ke meja makan Anda. Nikmati kemurnian hasil bumi organik dan produk peternakan yang diproses secara etis.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="w-full border-b border-neutral/10 bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold tracking-widest text-neutral/40 uppercase mr-4 hidden md:block">FILTER:</span>
          <Link href="/products" className={`${!category ? 'bg-primary text-secondary shadow-md' : 'bg-neutral/5 text-neutral hover:bg-neutral/10'} px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase flex-shrink-0 transition-colors`}>Semua</Link>
          <Link href={`/products?category=${encodeURIComponent('Susu & Olahan')}`} className={`${category === 'Susu & Olahan' ? 'bg-primary text-secondary shadow-md' : 'bg-neutral/5 text-neutral hover:bg-neutral/10'} px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase flex-shrink-0 transition-colors`}>Susu & Olahan</Link>
          <Link href={`/products?category=${encodeURIComponent('Sayuran Organik')}`} className={`${category === 'Sayuran Organik' ? 'bg-primary text-secondary shadow-md' : 'bg-neutral/5 text-neutral hover:bg-neutral/10'} px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase flex-shrink-0 transition-colors`}>Sayuran Organik</Link>
          <Link href={`/products?category=${encodeURIComponent('Telur & Protein')}`} className={`${category === 'Telur & Protein' ? 'bg-primary text-secondary shadow-md' : 'bg-neutral/5 text-neutral hover:bg-neutral/10'} px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase flex-shrink-0 transition-colors`}>Telur & Protein</Link>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 py-16 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((item: any) => {
            const imageUrl = getStrapiMedia(item.thumbnail?.url);
            return (
              <Link href={`/products/${item.slug}`} key={item.id || item.documentId} className="bg-white rounded-[1.5rem] p-5 flex flex-col shadow-sm border border-neutral/5 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group hover:-translate-y-2 cursor-pointer">
                <div className="relative w-full aspect-[4/3] bg-neutral/5 rounded-[1rem] mb-5 overflow-hidden">
                  {item.isOrganic && (
                    <span className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-secondary text-[9px] font-bold px-3 py-1.5 rounded-full shadow-sm z-10 tracking-widest">
                      ORGANIC
                    </span>
                  )}
                  {imageUrl ? (
                    <Image src={imageUrl} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral/5 to-neutral/10 flex flex-col items-center justify-center text-neutral/30 transition-transform duration-700 group-hover:scale-105">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 opacity-50">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-grow">
                  <span className="text-[10px] font-bold text-tertiary mb-2 uppercase tracking-[0.2em]">{item.category}</span>
                  <h4 className="font-serif text-xl font-bold text-primary mb-2 leading-snug group-hover:text-tertiary transition-colors">{item.title}</h4>
                  <p className="text-lg font-medium text-primary/80 mb-6 flex-grow">Rp {item.price}</p>
                  
                  <div className="w-full bg-[#FDFBF7] text-primary py-3 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-secondary transition-all duration-300">
                    Detail Produk
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {products.length === 0 && (
          <div className="w-full text-center py-32 bg-white rounded-[2rem] border border-neutral/10 border-dashed">
            <span className="text-neutral/40 font-medium text-lg">Belum ada produk di database.</span>
          </div>
        )}
      </div>

      <ContactFooterSection />
    </main>
  );
}
