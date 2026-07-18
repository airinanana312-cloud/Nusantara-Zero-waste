import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, Info, ChevronRight, Menu, X, ArrowUp, Globe, Heart, Shield 
} from 'lucide-react';
import Hero from './components/Hero';
import Education from './components/Education';
import CarbonCalculator from './components/CarbonCalculator';
import PledgeBoard from './components/PledgeBoard';
import EcoQuiz from './components/EcoQuiz';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Monitor scroll behavior for styling changes on header and floating button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems = [
    { id: 'hero', label: 'Beranda' },
    { id: 'education', label: 'Edukasi 5R' },
    { id: 'calculator', label: 'Kalkulator Karbon' },
    { id: 'pledge-board', label: 'Papan Ikrar' },
    { id: 'eco-quiz', label: 'Kuis Eco' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-950">
      
      {/* Dynamic Header Navbar */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs py-3.5' 
          : 'bg-transparent py-5'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Brand */}
            <button 
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2 cursor-pointer text-left focus:outline-hidden group"
            >
              <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-600/10 transition duration-300 group-hover:scale-105">
                <Leaf className="h-5.5 w-5.5 animate-float" />
              </div>
              <div>
                <span className="font-display text-sm sm:text-base font-extrabold text-slate-900 tracking-tight block">
                  Nusantara Zero Waste
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider block uppercase">
                  Kampanye Gaya Hidup Lestari
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Header CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollToSection('calculator')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer shadow-sm shadow-emerald-600/10 hover:shadow-md hover:shadow-emerald-600/10"
              >
                Ukur Karbonmu
              </button>
            </div>

            {/* Mobile Hamburger menu */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="p-2 text-slate-600 hover:text-slate-900 focus:outline-hidden cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100 bg-white"
            >
              <div className="px-4 py-3 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-3 py-2.5 text-sm font-bold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('calculator')}
                  className="block w-full text-center bg-emerald-600 text-white font-bold text-xs px-4 py-3 rounded-xl transition mt-3 cursor-pointer"
                >
                  Mulai Hitung Jejak Karbon
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Campaign Landing Content */}
      <main>
        {/* HERO SECTION */}
        <Hero 
          onStartCalculator={() => scrollToSection('calculator')} 
          onExploreEducation={() => scrollToSection('education')} 
        />

        {/* EDUCATION SECTION (5R & Swaps) */}
        <Education />

        {/* PERSONAL CARBON FOOTPRINT CALCULATOR */}
        <CarbonCalculator />

        {/* COMMITMENT & PLEDGE BOARD */}
        <PledgeBoard />

        {/* KNOWLEDGE CHECK ECO-QUIZ */}
        <EcoQuiz />
      </main>

      {/* Footer Segment */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-slate-900 pb-12 mb-12 items-start">
            
            {/* Brand column */}
            <div className="md:col-span-5 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-xs">
                  <Leaf className="h-4.5 w-4.5" />
                </div>
                <span className="font-display text-base font-extrabold text-white tracking-tight">
                  Nusantara Zero Waste
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans max-w-sm">
                Gerakan kesadaran lingkungan independen untuk menginspirasi masyarakat Indonesia mengadopsi gaya hidup minim sampah (Zero Waste) dan mengendalikan pemanasan global demi masa depan Nusantara yang asri.
              </p>

              <div className="flex items-center gap-3 text-xs text-emerald-400">
                <Globe className="h-4 w-4" />
                <span>Berjalan secara lokal, berdampak secara global.</span>
              </div>
            </div>

            {/* Navigation links column */}
            <div className="md:col-span-3 space-y-4 text-left">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Menu Utama</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => scrollToSection(item.id)}
                      className="hover:text-emerald-400 transition cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Campaign info columns */}
            <div className="md:col-span-4 space-y-4 text-left">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">Dukungan Gerakan</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Anda dapat berkontribusi menyebarluaskan kampanye ini ke keluarga, tetangga, atau jaringan sosial Anda dengan membagikan skor jejak karbon pribadi Anda ke khalayak ramai!
              </p>
              
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
                <Shield className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <div className="text-[10px] text-slate-500 leading-snug">
                  Data yang Anda masukkan ke dalam kalkulator diolah secara client-side dan tidak disimpan di database manapun demi privasi penuh pengunjung.
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar credits */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 gap-4">
            <div>
              <span>© 2026 Nusantara Zero Waste Campaign. Terbuka untuk umum.</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Dibuat dengan peduli lingkungan untuk Indonesia lestari</span>
              <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Action Buttons */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col gap-2"
          >
            <button
              onClick={() => scrollToSection('hero')}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-100 h-11 w-11 rounded-full flex items-center justify-center shadow-lg transition duration-200 cursor-pointer hover:text-slate-900"
              title="Kembali ke atas"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
