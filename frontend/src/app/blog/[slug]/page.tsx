import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import ContactFooterSection from "@/components/sections/ContactFooterSection";
import { fetchAPI, getStrapiMedia } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const articlesResponse = await fetchAPI('/articles', {
    filters: {
      slug: {
        $eq: resolvedParams.slug
      }
    },
    populate: '*'
  });

  const article = articlesResponse?.data?.[0];

  if (!article) {
    notFound();
  }

  // Fetch Popular/Latest Articles for Sidebar
  const popularResponse = await fetchAPI('/articles', {
    filters: {
      slug: {
        $ne: resolvedParams.slug
      }
    },
    sort: ['publishDate:desc'],
    pagination: {
      limit: 3
    },
    populate: '*'
  });
  const popularArticles = popularResponse?.data || [];

  const imageUrl = getStrapiMedia(article.coverImage?.url);

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar variant="light" />

      {/* Article Header */}
      <div className="max-w-6xl mx-auto w-full px-6 md:px-8 pt-32 pb-10 text-left flex flex-col items-start">
        <span className="bg-[#E8F3E8] text-primary text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
          {article.category}
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-serif text-primary leading-[1.2] mb-6">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-neutral/60 font-medium">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
            <span>{new Date(article.publishDate || article.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral/30"></span>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span>Oleh: {article.author || "Tim Redaksi"}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 mb-20">
        <div className="relative w-full aspect-video md:aspect-[21/9] bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/5 border border-neutral/5">
          {imageUrl ? (
            <Image src={imageUrl} alt={article.title} fill sizes="100vw" className="object-cover" />
          ) : (
             <div className="absolute inset-0 bg-gradient-to-br from-neutral/5 to-neutral/10 flex flex-col items-center justify-center text-neutral/30">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 opacity-50 mb-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
               </svg>
             </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-6xl mx-auto w-full px-6 md:px-8 pb-24">
        <article className="prose prose-lg md:prose-xl prose-headings:font-serif prose-headings:text-primary prose-headings:font-normal prose-p:text-neutral/80 prose-p:leading-loose prose-a:text-tertiary hover:prose-a:text-primary w-full max-w-4xl">
          <div className="mt-8 text-lg md:text-xl font-light leading-loose text-neutral">
            {typeof article.content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <p className="bg-white p-8 rounded-2xl border border-neutral/10 text-center text-sm">Teks konten tersedia, namun membutuhkan <em>renderer</em> Strapi Blocks. (Jika Anda melihat pesan ini, silakan isi data dari panel admin berupa <em>Rich Text</em> dan tambahkan <em>Blocks Renderer</em> di frontend).</p>
            )}
          </div>
        </article>

        {/* Share & Tags */}
        <div className="mt-24 pt-10 border-t border-neutral/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-3">
            <span className="bg-white border border-neutral/10 px-5 py-2.5 rounded-full text-[10px] font-bold text-primary uppercase tracking-[0.2em] shadow-sm">{article.category}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-neutral/50 uppercase tracking-[0.2em]">Bagikan:</span>
            <button className="w-12 h-12 rounded-full border border-neutral/10 bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg>
            </button>
            <button className="w-12 h-12 rounded-full border border-neutral/10 bg-white flex items-center justify-center text-primary hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mungkin Anda Suka (Related Articles) */}
      <div className="w-full bg-neutral/5 py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl font-serif font-bold text-primary text-center mb-12">Mungkin Anda Suka</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularArticles.length > 0 ? (
              popularArticles.map((popArticle: any) => {
                const popImgUrl = getStrapiMedia(popArticle.coverImage?.url);
                return (
                  <Link key={popArticle.id} href={`/blog/${popArticle.slug}`} className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-neutral/5 flex flex-col">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-neutral/5">
                      {popImgUrl ? (
                        <Image src={popImgUrl} alt={popArticle.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-neutral/20 text-sm">No Image</div>
                      )}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary mb-3">{popArticle.category || 'Artikel'}</span>
                    <h3 className="font-serif font-bold text-primary text-xl leading-snug mb-6 line-clamp-2">{popArticle.title}</h3>
                    <div className="mt-auto pt-4 border-t border-neutral/5 text-primary text-sm font-bold flex items-center gap-2 group-hover:text-tertiary transition-colors">
                      Baca Selengkapnya
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full text-center text-neutral/50">Belum ada artikel terkait.</div>
            )}
          </div>
        </div>
      </div>

      <ContactFooterSection />
    </main>
  );
}
