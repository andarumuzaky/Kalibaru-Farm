import Link from "next/link";

export default function ContactFooterSection() {
  return (
    <footer id="contact" className="bg-primary text-secondary pt-24 pb-8 px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 mb-24">
        {/* Left Side: Newsletter & Info */}
        <div className="w-full lg:w-1/2 space-y-12">
          <div>
            <h2 className="text-3xl font-serif mb-4">Mari Terhubung dengan Alam</h2>
            <p className="text-secondary/80 max-w-md">
              Dapatkan info produk terbaru dan diskon eksklusif mingguan langsung di inbox Anda.
            </p>
          </div>
          
          {/* Newsletter Form */}
          <form className="flex gap-4 max-w-md">
            <input 
              type="email" 
              placeholder="Email Anda" 
              className="w-full bg-secondary/10 border border-secondary/20 rounded-xl px-4 py-3 text-secondary placeholder:text-secondary/50 focus:outline-none focus:border-tertiary"
            />
            <button 
              type="submit" 
              className="bg-[#2A1810] text-secondary px-6 py-3 rounded-xl font-medium hover:bg-tertiary transition-colors whitespace-nowrap"
            >
              Berlangganan
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex gap-16 pt-4">
            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase text-secondary/50 mb-2">Alamat</h4>
              <p className="text-sm text-secondary/90 leading-relaxed">
                Jl. Pertanian No. 88, Kalibaru<br />
                Jawa Timur, Indonesia
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase text-secondary/50 mb-2">Kontak</h4>
              <p className="text-sm text-secondary/90 leading-relaxed">
                +62 812-3456-7890<br />
                halo@kalibarufarm.com
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="w-full lg:w-1/2">
          <div className="bg-secondary rounded-2xl p-8 max-w-lg lg:ml-auto text-primary">
            <h3 className="font-bold mb-6">Kirim Pesan</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  className="w-full bg-neutral/5 border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">Pesan</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-neutral/5 border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary text-secondary py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors mt-2"
              >
                Kirim Sekarang
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer Links */}
      <div className="max-w-7xl mx-auto border-t border-secondary/20 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="max-w-xs">
          <h4 className="font-serif font-bold text-xl mb-4">Kalibaru Farm</h4>
          <p className="text-xs text-secondary/60 leading-relaxed">
            Membangun ekosistem pangan yang berkelanjutan dan sehat untuk masyarakat Indonesia.
          </p>
        </div>
        
        <div className="flex gap-16 text-sm">
          <div>
            <h5 className="font-bold text-secondary/50 uppercase tracking-wider text-xs mb-4">Perusahaan</h5>
            <ul className="space-y-3">
              <li><Link href="#about" className="hover:text-tertiary">Tentang Kami</Link></li>
              <li><Link href="#" className="hover:text-tertiary">Keberlanjutan</Link></li>
              <li><Link href="#" className="hover:text-tertiary">Karir</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-secondary/50 uppercase tracking-wider text-xs mb-4">Layanan</h5>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-tertiary">Pengiriman</Link></li>
              <li><Link href="#" className="hover:text-tertiary">Grosir</Link></li>
              <li><Link href="#" className="hover:text-tertiary">Wisata Edukasi</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-secondary/50 uppercase tracking-wider text-xs mb-4">Legal</h5>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-tertiary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-tertiary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto mt-16 flex flex-col md:flex-row justify-between items-center text-xs text-secondary/40">
        <p>© 2026 Kalibaru Farm. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="w-6 h-6 rounded-full border border-secondary/20 flex items-center justify-center">f</div>
          <div className="w-6 h-6 rounded-full border border-secondary/20 flex items-center justify-center">in</div>
          <div className="w-6 h-6 rounded-full border border-secondary/20 flex items-center justify-center">ig</div>
        </div>
      </div>
    </footer>
  );
}
