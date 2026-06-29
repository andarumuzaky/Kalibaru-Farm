import { fetchAPI, getStrapiMedia } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export default async function BlogSection() {
  const articlesResponse = await fetchAPI('/articles', {
    sort: ['publishDate:desc'],
    populate: '*',
    pagination: {
      limit: 3
    }
  });

  const articles = articlesResponse?.data || [];

  return (
    <section className="py-32 px-6 md:px-8 bg-white border-t border-neutral/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-tertiary mb-4 block">Jurnal & Inspirasi</span>
            <h2 className="text-4xl lg:text-5xl font-serif text-primary mb-4">Artikel Kalibaru Farm</h2>
            <p className="text-neutral/80 leading-relaxed">
              Kumpulan cerita, edukasi nutrisi, dan tips langsung dari para ahli dan peternak kami.
            </p>
          </div>
          <Link href="/blog" className="hidden md:inline-flex mt-4 text-tertiary font-bold hover:text-primary transition-colors items-center gap-2 uppercase tracking-widest text-sm pb-1 border-b-2 border-transparent hover:border-primary group">
            Baca Semua Artikel
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article: any) => {
            const imageUrl = getStrapiMedia(article.coverImage?.url);
            const date = new Date(article.publishDate || article.createdAt).toLocaleDateString('id-ID', {
              year: 'numeric', month: 'short', day: 'numeric'
            });

            return (
              <Link href={`/blog/${article.slug}`} key={article.id || article.documentId} className="group flex flex-col h-full cursor-pointer">
                <div className="relative w-full aspect-[4/3] bg-neutral/5 rounded-[2rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                  {imageUrl ? (
                    <Image src={imageUrl} alt={article.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-neutral/5 to-neutral/10 flex flex-col items-center justify-center text-neutral/30 transition-transform duration-700 group-hover:scale-105">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 mb-2 opacity-50">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                
                <div className="flex flex-col flex-grow px-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">{article.category}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral/30"></span>
                    <span className="text-[11px] text-neutral/50 font-medium">{date}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary leading-snug mb-3 group-hover:text-tertiary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-neutral/70 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            );
          })}
          
          {articles.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-20 bg-secondary rounded-[2rem] border border-neutral/10 border-dashed shadow-sm">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-neutral/5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-neutral/30">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <span className="text-neutral/50 font-medium text-lg">Belum ada artikel di database.</span>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/blog" className="inline-flex items-center gap-2 border-b-2 border-tertiary text-primary font-bold pb-1 hover:text-tertiary transition-colors uppercase tracking-widest text-sm group">
            Baca Semua Artikel
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
