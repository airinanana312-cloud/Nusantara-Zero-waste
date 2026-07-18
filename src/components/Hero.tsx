import { motion } from 'motion/react';
import { Leaf, Globe, Trash2, ArrowRight, Activity, Award } from 'lucide-react';
import { ECO_FACTS } from '../data';

interface HeroProps {
  onStartCalculator: () => void;
  onExploreEducation: () => void;
}

export default function Hero({ onStartCalculator, onExploreEducation }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-white pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" />
      <div className="absolute top-20 right-10 -z-10 h-80 w-80 rounded-full bg-teal-100/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Main Copy (Left) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-100/60 px-4 py-1.5 text-xs sm:text-sm font-medium text-emerald-800"
            >
              <Leaf className="h-4 w-4 text-emerald-600 animate-pulse" />
              <span>Kampanye Nusantara Minim Sampah</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
            >
              Ubah Kebiasaan,<br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Kurangi Jejak Sampahmu
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-600 sm:text-xl max-w-2xl leading-relaxed font-sans"
            >
              Bumi kita sedang tenggelam dalam limbah harian. Mari ambil aksi nyata melalui gaya hidup 
              <strong> Zero Waste</strong> (minim sampah). Mulai perjalanan berkelanjutanmu dengan mengukur dampak karbon pribadimu hari ini.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                id="btn-hero-calc"
                onClick={onStartCalculator}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Kalkulator Jejak Karbon
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button
                id="btn-hero-edu"
                onClick={onExploreEducation}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition duration-300 cursor-pointer"
              >
                Pelajari Gaya Hidup 5R
              </button>
            </motion.div>

            {/* Quick trust badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap items-center gap-6 pt-6 text-slate-500 border-t border-slate-100"
            >
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-medium">Berdampak Global</span>
              </div>
              <div className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-medium">Lokal Minim Sampah</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-medium">Edukasi Terbuka</span>
              </div>
            </motion.div>
          </div>

          {/* Stats Display Grid (Right) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Soft decorative ring behind */}
            <div className="absolute inset-0 bg-emerald-100/40 rounded-3xl -rotate-2 transform scale-105 -z-10" />
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl relative">
              <h3 className="font-display text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-600 animate-pulse" />
                Krisis Lingkungan Indonesia Dalam Angka
              </h3>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {ECO_FACTS.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 flex flex-col justify-between hover:bg-slate-50 hover:shadow-sm transition"
                  >
                    <div>
                      <span className="block font-display text-2xl sm:text-3xl font-extrabold text-emerald-600">
                        {fact.value}
                      </span>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
                        {fact.unit}
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-slate-600 leading-snug">
                        {fact.description}
                      </p>
                      <span className="block text-[9px] font-mono text-slate-400 mt-1.5 italic">
                        Sumber: {fact.source}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Decorative stamp element */}
              <div className="mt-6 flex items-center gap-3 bg-emerald-50 rounded-xl p-3 border border-emerald-100/60 text-emerald-800 text-xs font-medium">
                <div className="bg-emerald-500 text-white rounded-lg p-1.5 flex-shrink-0">
                  <Leaf className="h-4 w-4" />
                </div>
                <span>Setiap aksi kecil Anda sangat berarti untuk memulihkan bumi kita tercinta.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
