import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
      {/* Left Image Area */}
      <div className="relative w-full lg:w-1/2 flex justify-center">
        {/* Main Image */}
        <div className="relative w-[400px] h-[500px] rounded-xl overflow-hidden border-[12px] border-primary">
          <Image 
            src="/petani.jpg"
            alt="Gambar Petani"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Floating Card */}
        <div className="absolute -bottom-8 -right-4 lg:right-12 bg-secondary p-6 rounded-2xl shadow-xl max-w-[200px] border border-primary/10">
          <p className="text-xs font-bold text-neutral">100%</p>
          <p className="text-xs text-neutral mt-1">Organik & Bebas Pestisida Sejak 1990</p>
          <div className="flex text-tertiary mt-2">
            ★★★★★
          </div>
        </div>
      </div>

      {/* Right Text Area */}
      <div className="w-full lg:w-1/2 space-y-8">
        <div>
          <h2 className="text-3xl lg:text-4xl font-serif text-primary mb-4">Tentang Kalibaru Farm</h2>
          <p className="text-neutral leading-relaxed">
            Berawal dari kecintaan keluarga terhadap alam, Kalibaru Farm tumbuh menjadi pusat pertanian modern yang tetap menjaga nilai-nilai tradisional. Kami percaya bahwa kesehatan bermula dari apa yang kita tanam dan bagaimana kita merawatnya.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary text-secondary rounded-xl flex items-center justify-center flex-shrink-0">
              {/* Icon Placeholder */}
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <h3 className="font-bold text-primary mb-1">Pertanian Regeneratif</h3>
              <p className="text-sm text-neutral">Kami tidak hanya memanen, tapi juga memulihkan ekosistem tanah untuk masa depan.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary text-secondary rounded-xl flex items-center justify-center flex-shrink-0">
              {/* Icon Placeholder */}
              <span className="text-xl">🐄</span>
            </div>
            <div>
              <h3 className="font-bold text-primary mb-1">Kesejahteraan Hewan</h3>
              <p className="text-sm text-neutral">Kambing perah kami hidup bebas di padang rumput alami dengan perawatan medis organik.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
