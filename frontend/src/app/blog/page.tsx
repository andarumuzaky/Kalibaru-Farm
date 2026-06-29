import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import ContactFooterSection from "@/components/sections/ContactFooterSection";
import { fetchAPI, getStrapiMedia } from "@/lib/api";
import Image from "next/image";

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : '';

  const filters: any = {};
  if (q) {
    filters.title = {
      $containsi: q
    };
  }
  if (category) {
    filters.category = {
      $eq: category
    };
  }

  const articlesResponse = await fetchAPI('/articles', {
    sort: ['publishDate:desc'],
    populate: '*',
    filters
  });

  const articles = articlesResponse?.data || [];
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const listArticles = articles.length > 1 ? articles.slice(1) : [];

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      {/* Header with Search */}
      <div className="bg-white w-full pt-28 pb-16 relative overflow-hidden border-b border-neutral/5">
        <Navbar variant="light" />
        <div className="max-w-7xl mx-auto w-full px-6 md:px-8 mt-10 relative z-10 flex flex-col items-center text-center">
          <span className="text-xs font-bold tracking-[0.3em] text-tertiary uppercase mb-4">Blog & Edukasi</span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-primary mb-6">Jurnal & Inspirasi</h1>
          <p className="text-neutral/80 text-lg max-w-2xl leading-relaxed mb-12">
            Eksplorasi wawasan seputar gaya hidup organik, nutrisi murni, dan cerita di balik layar dari Kalibaru Pastoral.
          </p>
          
          <form action="/blog" method="GET" className="w-full max-w-2xl relative shadow-xl shadow-primary/5 rounded-full group">
            {category && <input type="hidden" name="category" value={category} />}
            <input 
              type="text" 
              name="q"
              defaultValue={q}
              placeholder="Cari topik yang ingin Anda baca..." 
              className="w-full py-5 pl-8 pr-16 rounded-full border border-neutral/10 focus:outline-none focus:border-tertiary focus:ring-2 focus:ring-tertiary/20 bg-white text-primary transition-all text-lg font-medium"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-tertiary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Categories / Chips */}
      <div className="w-full bg-white border-b border-neutral/5 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
          <Link href={`/blog${q ? `?q=${q}` : ''}`} className={`${!category ? 'bg-primary text-secondary shadow-md' : 'bg-neutral/5 text-neutral hover:bg-neutral/10'} px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase flex-shrink-0 transition-colors`}>Semua</Link>
          <Link href={`/blog?category=Kesehatan${q ? `&q=${q}` : ''}`} className={`${category === 'Kesehatan' ? 'bg-primary text-secondary shadow-md' : 'bg-neutral/5 text-neutral hover:bg-neutral/10'} px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-colors flex-shrink-0`}>Kesehatan</Link>
          <Link href={`/blog?category=Tips Bertani${q ? `&q=${q}` : ''}`} className={`${category === 'Tips Bertani' ? 'bg-primary text-secondary shadow-md' : 'bg-neutral/5 text-neutral hover:bg-neutral/10'} px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-colors flex-shrink-0`}>Tips Bertani</Link>
          <Link href={`/blog?category=Gaya Hidup${q ? `&q=${q}` : ''}`} className={`${category === 'Gaya Hidup' ? 'bg-primary text-secondary shadow-md' : 'bg-neutral/5 text-neutral hover:bg-neutral/10'} px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-colors flex-shrink-0`}>Gaya Hidup</Link>
          <Link href={`/blog?category=Cerita Farm${q ? `&q=${q}` : ''}`} className={`${category === 'Cerita Farm' ? 'bg-primary text-secondary shadow-md' : 'bg-neutral/5 text-neutral hover:bg-neutral/10'} px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-colors flex-shrink-0`}>Cerita Farm</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 py-16">
        
        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-24 cursor-pointer block">
            <span className="text-xs font-bold tracking-[0.2em] text-tertiary uppercase mb-6 block">Artikel Unggulan</span>
            <Link href={`/blog/${featuredArticle.slug}`}>
              <div className="flex flex-col lg:flex-row bg-white rounded-[2.5rem] overflow-hidden shadow-md border border-neutral/5 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group hover:-translate-y-2">
                <div className="w-full lg:w-3/5 aspect-[4/3] lg:aspect-auto relative bg-neutral/5 overflow-hidden">
                  {getStrapiMedia(featuredArticle.coverImage?.url) ? (
                    <Image src={getStrapiMedia(featuredArticle.coverImage?.url)!} alt={featuredArticle.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral/5 to-neutral/10 flex flex-col items-center justify-center text-neutral/30 transition-transform duration-1000 group-hover:scale-105">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 opacity-50 mb-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                  )}
                  <span className="absolute top-8 left-8 bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold px-4 py-2 rounded-full shadow-sm z-10 tracking-[0.2em] uppercase">
                    Terbaru
                  </span>
                </div>
                <div className="w-full lg:w-2/5 p-10 md:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[11px] font-bold text-tertiary uppercase tracking-[0.2em]">{featuredArticle.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral/20"></span>
                    <span className="text-xs text-neutral/50 font-medium">{new Date(featuredArticle.publishDate || featuredArticle.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-serif text-primary mb-6 leading-[1.2] group-hover:text-tertiary transition-colors">{featuredArticle.title}</h2>
                  <p className="text-neutral/70 text-lg leading-relaxed mb-10 line-clamp-4">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-3 text-tertiary font-bold text-sm tracking-widest uppercase">
                    BACA ARTIKEL INI <span aria-hidden="true" className="group-hover:translate-x-3 transition-transform duration-300">&rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Article Grid */}
        <span className="text-xs font-bold tracking-[0.2em] text-tertiary uppercase mb-8 block">Jelajahi Arsip</span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 mb-16">
          {listArticles.map((article: any) => {
            const imageUrl = getStrapiMedia(article.coverImage?.url);
            return (
              <Link href={`/blog/${article.slug}`} key={article.id || article.documentId} className="group flex flex-col h-full cursor-pointer">
                <div className="relative w-full aspect-[4/3] bg-neutral/5 rounded-[2rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/5 transition-all duration-500 group-hover:-translate-y-2">
                  {imageUrl ? (
                    <Image src={imageUrl} alt={article.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-neutral/5 to-neutral/10 flex flex-col items-center justify-center text-neutral/30 transition-transform duration-700 group-hover:scale-105">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 opacity-50 mb-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                  )}
                  <span className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md text-primary text-[9px] font-bold px-4 py-1.5 rounded-full shadow-sm z-10 uppercase tracking-[0.2em]">
                    {article.category}
                  </span>
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                
                <div className="flex flex-col flex-grow px-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] text-neutral/50 font-medium">{new Date(article.publishDate || article.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary leading-[1.3] mb-4 group-hover:text-tertiary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-neutral/70 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        
        {articles.length === 0 && (
          <div className="w-full text-center py-32 bg-white rounded-[2rem] border border-neutral/10 border-dashed">
            <span className="text-neutral/40 font-medium text-lg">
              {q ? `Tidak ada artikel yang cocok dengan pencarian "${q}".` : 'Belum ada artikel di database.'}
            </span>
            {q && (
              <div className="mt-6">
                <Link href="/blog" className="text-tertiary font-bold hover:text-primary transition-colors uppercase tracking-widest text-xs border-b border-tertiary">Reset Pencarian</Link>
              </div>
            )}
          </div>
        )}

      </div>

      <ContactFooterSection />
    </main>
  );
}
