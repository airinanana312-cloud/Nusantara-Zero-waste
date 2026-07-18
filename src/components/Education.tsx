import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Check, Sparkles, Filter, Info, 
  ChevronRight, ShoppingBag, Flame, Coffee, HelpCircle,
  ShieldAlert, RefreshCcw, Landmark, Droplets
} from 'lucide-react';
import { FIVE_R_PRINCIPLES, ECO_SWAPS } from '../data';
import { AlternativeItem } from '../types';

export default function Education() {
  const [active5R, setActive5R] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchSwap, setSearchSwap] = useState<string>('');

  // Categories for eco swaps
  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'belanja', label: 'Belanja' },
    { id: 'dapur', label: 'Dapur' },
    { id: 'kamar_mandi', label: 'Kamar Mandi' },
    { id: 'bepergian', label: 'Bepergian' }
  ];

  const filteredSwaps = ECO_SWAPS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.original.toLowerCase().includes(searchSwap.toLowerCase()) || 
                          item.alternative.toLowerCase().includes(searchSwap.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="education" className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Edukasi Keberlanjutan
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Pilar Hidup Minim Sampah: Sistem 5R
          </h2>
          <p className="text-slate-600 font-sans text-base sm:text-lg">
            Zero waste bukan tentang mencapai kesempurnaan instan, melainkan proses mengadopsi 5 pilar utama untuk mereduksi kontribusi limbah harian kita ke bumi.
          </p>
        </div>

        {/* 5R Interactive Segment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-24">
          
          {/* R Selector Buttons */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
            {FIVE_R_PRINCIPLES.map((principle, index) => {
              const isActive = active5R === index;
              return (
                <button
                  key={index}
                  onClick={() => setActive5R(index)}
                  className={`flex-shrink-0 lg:w-full text-left px-5 py-4 rounded-xl transition duration-300 flex items-center justify-between cursor-pointer ${
                    isActive 
                      ? 'bg-white shadow-md border-l-4 border-emerald-500 text-slate-900' 
                      : 'bg-transparent border border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-display font-bold text-sm ${
                      isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-display font-bold text-sm sm:text-base">
                      {principle.title.split(' ')[0]}
                    </span>
                  </div>
                  <ChevronRight className={`h-4 w-4 hidden lg:block transition ${isActive ? 'translate-x-1 text-emerald-500' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>

          {/* R Interactive Details Window */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm h-full flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active5R}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: -15, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-bold text-slate-900">
                      {FIVE_R_PRINCIPLES[active5R].title}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                      Pilar Ke-{active5R + 1}
                    </span>
                  </div>

                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                    {FIVE_R_PRINCIPLES[active5R].description}
                  </p>

                  <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100/60">
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-bounce" />
                      Aksi Sederhana di Rumah:
                    </span>
                    <p className="text-sm text-slate-700 italic font-medium leading-relaxed">
                      &ldquo;{FIVE_R_PRINCIPLES[active5R].example}&rdquo;
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Piramida pengelolaan sampah berkelanjutan.</span>
                <span>Selalu utamakan menolak & mengurangi sebelum mendaur ulang!</span>
              </div>
            </div>
          </div>

        </div>

        {/* Linear vs Circular Economy */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-extrabold text-slate-900">
                Pola Pikir: Ekonomi Linier vs. Ekonomi Sirkular
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Sebagian besar masalah lingkungan berakar pada pola konsumsi <strong>Linier: Ambil &rarr; Buat &rarr; Pakai &rarr; Buang</strong>. Kami mengonsumsi bahan mentah bumi, memprosesnya dengan emisi karbon tinggi, menggunakannya sebentar, lalu menimbunnya di TPA selamanya.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Zero Waste memperkenalkan <strong>Ekonomi Sirkular</strong>, di mana barang dirancang dari awal untuk digunakan berulang kali, diperbaiki, dikomposkan, atau didaur ulang secara murni tanpa limbah terbuang sia-sia.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-left">
                  <span className="font-display font-bold text-red-800 text-sm flex items-center gap-1">
                    <ShieldAlert className="h-4 w-4" /> Linier
                  </span>
                  <p className="text-xs text-red-600 mt-1">Menguras alam, mencemari air & tanah, serta memicu bencana iklim.</p>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-left">
                  <span className="font-display font-bold text-emerald-800 text-sm flex items-center gap-1">
                    <RefreshCcw className="h-4 w-4 animate-spin-slow" /> Sirkular
                  </span>
                  <p className="text-xs text-emerald-600 mt-1">Mengembalikan nutrisi ke tanah, meminimalkan karbon, dan hemat biaya.</p>
                </div>
              </div>
            </div>

            {/* Visualizer flow chart in pure HTML/CSS */}
            <div className="space-y-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-400 block text-center uppercase tracking-wider">Visualisasi Siklus Sirkular</span>
              <div className="flex flex-col gap-3 relative">
                
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-emerald-100 shadow-xs relative">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">Menolak & Mengurangi</h5>
                    <p className="text-[10px] text-slate-500">Membatasi barang masuk yang berpotensi menjadi sampah harian.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-emerald-100 shadow-xs relative">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">Gunakan Berulang (Reuse)</h5>
                    <p className="text-[10px] text-slate-500">Memanfaatkan wadah, membetulkan barang rusak, merawat yang ada.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-emerald-100 shadow-xs relative">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">Kompos Sisa Organik (Rot)</h5>
                    <p className="text-[10px] text-slate-500">Mengembalikan sisa makanan/organik langsung kembali menutrisi tanah.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-emerald-100 shadow-xs relative">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">Daur Ulang Sisa Plastik/Kertas</h5>
                    <p className="text-[10px] text-slate-500">Mengirim sisa anorganik bersih ke bank sampah tepercaya.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Eco Swaps Directory */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
            Katalog Swapping: Tukar ke Ramah Lingkungan
          </h2>
          <p className="text-slate-600 font-sans text-sm sm:text-base">
            Langkah praktis terkecil adalah mengganti benda plastik sekali pakai di rumah Anda dengan alternatif yang ramah bumi dan tahan lama. Cari dan saring alternatif di bawah ini!
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  selectedCategory === cat.id 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari alternatif barang..."
              value={searchSwap}
              onChange={(e) => setSearchSwap(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Swaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSwaps.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition duration-300"
              >
                <div className="space-y-4">
                  {/* Swap flow visual card */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs text-red-500 font-bold bg-red-50 px-2.5 py-1 rounded-lg w-max">
                      <X className="h-3.5 w-3.5" />
                      <span>Sebelumnya: {item.original}</span>
                    </div>
                    <div className="h-4 w-4 text-emerald-500 pl-4">
                      &darr;
                    </div>
                    <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg w-max">
                      <Check className="h-3.5 w-3.5" />
                      <span>Ganti ke: {item.alternative}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    <strong>Mengapa beralih?</strong> {item.why}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100/60 flex items-center justify-between text-[11px] text-emerald-700 font-semibold bg-emerald-50/40 p-2.5 rounded-lg">
                  <span>Dampak Nyata:</span>
                  <span>{item.impact}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredSwaps.length === 0 && (
            <div className="col-span-full bg-white border border-dashed border-slate-200 rounded-2xl py-12 text-center text-slate-400">
              <Info className="h-8 w-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">Tidak ada alternatif ramah lingkungan yang cocok.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
