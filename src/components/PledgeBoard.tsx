import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Users, Check, Flame, Leaf, 
  Trash, Plus, Send, Zap, Train, Shirt, Lightbulb, GlassWater, Flower2
} from 'lucide-react';
import { ZERO_WASTE_PLEDGES } from '../data';
import { Pledge } from '../types';

interface SignedPledge {
  name: string;
  city: string;
  pledgesCount: number;
  customMsg: string;
  timestamp: string;
}

export default function PledgeBoard() {
  const [selectedPledgeIds, setSelectedPledgeIds] = useState<string[]>(['pledge-1', 'pledge-3']);
  const [userName, setUserName] = useState<string>('');
  const [userCity, setUserCity] = useState<string>('');
  const [userMsg, setUserMsg] = useState<string>('');
  const [signatures, setSignatures] = useState<SignedPledge[]>([
    { name: 'Siti Aminah', city: 'Yogyakarta', pledgesCount: 3, customMsg: 'Mulai memilah sampah sisa dapur untuk diolah jadi eco-enzyme!', timestamp: 'Baru saja' },
    { name: 'Rian Hermawan', city: 'Bandung', pledgesCount: 2, customMsg: 'Sudah 2 minggu bawa botol minum sendiri saat kerja kantoran.', timestamp: '10 menit yang lalu' },
    { name: 'Dewi Lestari', city: 'Denpasar', pledgesCount: 4, customMsg: 'Melarang kresek plastik masuk ke rumah kami sekeluarga.', timestamp: '1 jam yang lalu' },
    { name: 'Budi Santoso', city: 'Jakarta Selatan', pledgesCount: 2, customMsg: 'Kerja naik MRT daripada mobil, hemat pengeluaran & emisi!', timestamp: '3 jam yang lalu' }
  ]);
  const [hasSigned, setHasSigned] = useState<boolean>(false);

  const togglePledge = (id: string) => {
    if (selectedPledgeIds.includes(id)) {
      setSelectedPledgeIds(prev => prev.filter(pId => pId !== id));
    } else {
      setSelectedPledgeIds(prev => [...prev, id]);
    }
  };

  const getPledgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'GlassWater': return <GlassWater className="h-5 w-5" />;
      case 'Flower2': return <Flower2 className="h-5 w-5" />;
      case 'Leaf': return <Leaf className="h-5 w-5" />;
      case 'Train': return <Train className="h-5 w-5" />;
      case 'Zap': return <Zap className="h-5 w-5" />;
      case 'Shirt': return <Shirt className="h-5 w-5" />;
      case 'Lightbulb': return <Lightbulb className="h-5 w-5" />;
      default: return <Leaf className="h-5 w-5" />;
    }
  };

  // Calculate cumulative CO2 reduction from selected pledges
  const totalReduction = ZERO_WASTE_PLEDGES
    .filter(p => selectedPledgeIds.includes(p.id))
    .reduce((sum, p) => sum + p.co2Reduction, 0);

  const handleSubmitPledge = (e: FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userCity.trim()) return;

    const newSignature: SignedPledge = {
      name: userName,
      city: userCity,
      pledgesCount: selectedPledgeIds.length,
      customMsg: userMsg.trim() || 'Ayo sayangi bumi kita dengan hidup minim sampah!',
      timestamp: 'Baru saja'
    };

    setSignatures(prev => [newSignature, ...prev]);
    setHasSigned(true);
    setUserName('');
    setUserCity('');
    setUserMsg('');
  };

  return (
    <section id="pledge-board" className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Aksi & Komitmen
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Papan Komitmen Hijau Nusantara
          </h2>
          <p className="text-slate-600 font-sans text-sm sm:text-base">
            Edukasi saja tidak cukup tanpa aksi nyata. Pilih komitmen gaya hidup zero waste yang sanggup Anda lakukan di bawah ini, dan saksikan dampak pengurangan emisi kolektif Anda!
          </p>
        </div>

        {/* Pledges Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Pledge Cards Selector (Left 7 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-800 text-left mb-4 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-emerald-600 animate-spin-slow" />
              Pilih Komitmen Zero Waste Anda:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ZERO_WASTE_PLEDGES.map((pledge) => {
                const isSelected = selectedPledgeIds.includes(pledge.id);
                return (
                  <button
                    key={pledge.id}
                    onClick={() => togglePledge(pledge.id)}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-full transition duration-300 cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-50/70 border-emerald-500 shadow-xs' 
                        : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {getPledgeIcon(pledge.iconName)}
                        </div>
                        {isSelected ? (
                          <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                        ) : (
                          <div className="h-6 w-6 rounded-full border border-slate-200 text-slate-300 flex items-center justify-center text-xs font-bold">
                            +
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-display font-bold text-sm sm:text-base text-slate-900">{pledge.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{pledge.description}</p>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100/60 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Penghematan CO₂:</span>
                      <span className="font-mono font-extrabold text-emerald-600 bg-emerald-100/60 px-2.5 py-0.5 rounded-full">
                        -{pledge.co2Reduction} kg / tahun
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Impact Gauge & Guest Signer Form (Right 4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Impact Box */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-emerald-500/10 blur-xl" />
              
              <div className="space-y-4 relative">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block text-left">Dampak Estimasi Komitmenmu</span>
                <div className="space-y-1 text-left">
                  <span className="block font-display text-4xl sm:text-5xl font-black text-emerald-400">
                    {totalReduction} <span className="text-lg font-bold text-white">Kg</span>
                  </span>
                  <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Laju Karbon Terpangkas / Tahun</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed text-left pt-2 border-t border-slate-800">
                  Dengan memilih <strong>{selectedPledgeIds.length} komitmen</strong>, Anda berkontribusi memotong emisi harian secara nyata sebanding dengan menanam <strong>{Math.round(totalReduction / 20)} pohon bakau hias</strong> yang berumur 10 tahun!
                </p>
              </div>
            </div>

            {/* Signature Guestbook Form */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base mb-4 text-left flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500 animate-pulse" />
                Tandatangani Ikrar Hijau Anda:
              </h4>

              {hasSigned ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl text-center space-y-3"
                >
                  <div className="h-10 w-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="h-5 w-5" />
                  </div>
                  <h5 className="font-bold text-emerald-800 text-sm">Terima Kasih Atas Ikrarmu!</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Nama dan komitmen kepedulian lingkungan Anda telah didaftarkan ke dalam Board Nusantara. Terus kobarkan aksi minim sampah setiap hari!
                  </p>
                  <button
                    onClick={() => setHasSigned(false)}
                    className="text-[10px] text-emerald-700 underline font-semibold hover:text-emerald-900 cursor-pointer"
                  >
                    Kirim Ikrar Lainnya
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitPledge} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Andi Wijaya"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Asal Kota / Kabupaten</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Sleman, Yogyakarta"
                      value={userCity}
                      onChange={(e) => setUserCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pesan Inspiratif (Opsional)</label>
                    <textarea
                      placeholder="Tuliskan semangat zero waste Anda..."
                      rows={2}
                      value={userMsg}
                      onChange={(e) => setUserMsg(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Kirim Ikrar & Gabung Board
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Recent Board Signers Carousel/Feed */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm text-left">
          <h3 className="font-display font-bold text-base text-slate-800 mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-600" />
            Aktivitas Ikrar Nusantara Terbaru ({signatures.length + 231} Relawan)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {signatures.map((sig, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * idx }}
                className="bg-slate-50/60 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{sig.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{sig.timestamp}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100/60 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                    {sig.pledgesCount} Komitmen Hijau
                  </span>
                  <p className="text-xs text-slate-600 italic leading-relaxed pt-1">
                    &ldquo;{sig.customMsg}&rdquo;
                  </p>
                </div>
                
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center text-[10px] text-slate-400 font-semibold uppercase">
                  <span>Asal: {sig.city}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
