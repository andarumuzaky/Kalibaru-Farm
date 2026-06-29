import Navbar from "@/components/layout/Navbar";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactFooterSection from "@/components/sections/ContactFooterSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative bg-secondary">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[100svh] flex items-center justify-center pt-20 overflow-hidden bg-primary">
        {/* Background gradient & shapes for premium organic feel */}
        <div className="absolute inset-0 bg-[#112117] z-0"></div>
        {/* Ambient Glow */}
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#D67D52]/20 to-transparent blur-[120px] opacity-60 z-0"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#1B3022] to-transparent blur-[120px] opacity-80 z-0"></div>
        
        {/* Optional Image Background Overlay */}
        <div className="absolute inset-0 bg-[url('/hero-bg-placeholder.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay z-0"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center text-center">
          <div className="flex flex-col items-center transition-all duration-1000 translate-y-0 opacity-100">
            <span className="text-tertiary text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-6 md:mb-8 border-b border-tertiary/40 pb-2 inline-block">
              100% Alami & Organik
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-serif text-secondary leading-[1.1] mb-6 max-w-4xl drop-shadow-2xl">
              Kesegaran Alami <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-[#FDFBF7] to-tertiary">dari Kalibaru</span>
            </h1>
            
            <p className="text-secondary/70 md:text-xl max-w-2xl font-light leading-relaxed mb-12 drop-shadow-md">
              Membawa nutrisi murni langsung ke meja Anda melalui praktik pertanian etis yang selaras dengan ritme alam.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
              <a href="#products" className="bg-tertiary text-white px-10 py-4 rounded-full font-bold tracking-wide hover:bg-[#c46d45] transition-all duration-300 shadow-[0_0_30px_rgba(214,125,82,0.3)] hover:shadow-[0_0_50px_rgba(214,125,82,0.5)] hover:-translate-y-1 text-sm uppercase">
                Jelajahi Produk
              </a>
              <a href="#about" className="bg-white/5 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold tracking-wide hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 text-sm uppercase">
                Cerita Kami
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-secondary/50 animate-bounce">
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase mb-2">Scroll</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      <div id="about">
        <AboutSection />
      </div>
      <ProductsSection />
      <BlogSection />
      <ContactFooterSection />
    </main>
  );
}
