import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, Zap, Utensils, Trash2, ArrowLeft, ArrowRight, 
  RotateCcw, Info, CheckCircle, TrendingUp, Sparkles, HelpCircle,
  Award, Plane, RefreshCw
} from 'lucide-react';
import { EMISSION_FACTORS, CARBON_STATS } from '../data';
import { CarbonInput, EmissionBreakdown } from '../types';

export default function CarbonCalculator() {
  const [step, setStep] = useState<number>(1);
  const [input, setInput] = useState<CarbonInput>({
    carDistance: 50,
    carType: 'petrol',
    motorbikeDistance: 60,
    publicTransportDistance: 20,
    flightsShort: 1,
    flightsLong: 0,
    electricityBill: 150, // kWh per bulan
    lpgCylinders: 2, // tabung 3kg
    waterUsage: 10,
    meatFrequency: 'daily',
    foodWaste: 'medium',
    localFoodRatio: 50,
    plasticBottles: 8,
    plasticBags: 10,
    wasteSorting: 'none'
  });

  const [electricityUnit, setElectricityUnit] = useState<'kwh' | 'rupiah'>('kwh');
  const [electricityRupiah, setElectricityRupiah] = useState<number>(250000); // Rp per bulan

  // Convert Rp to kWh (approx Rp 1,500 per kWh)
  const getElectricityKwh = () => {
    if (electricityUnit === 'kwh') return input.electricityBill;
    return Math.round(electricityRupiah / 1500);
  };

  const handleInputChange = (field: keyof CarbonInput, value: any) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  const calculateEmissions = (): EmissionBreakdown => {
    // 1. Transportasi (per tahun)
    const carEmission = input.carDistance * 52 * EMISSION_FACTORS.car[input.carType];
    const motorbikeEmission = input.motorbikeDistance * 52 * EMISSION_FACTORS.motorbike;
    const publicTransportEmission = input.publicTransportDistance * 52 * EMISSION_FACTORS.publicTransport;
    const flightEmission = (input.flightsShort * EMISSION_FACTORS.flightShort) + (input.flightsLong * EMISSION_FACTORS.flightLong);
    const transportTotal = carEmission + motorbikeEmission + publicTransportEmission + flightEmission;

    // 2. Energi (per tahun)
    const kwhPerYear = getElectricityKwh() * 12;
    const electricityEmission = kwhPerYear * EMISSION_FACTORS.electricity;
    const lpgEmission = input.lpgCylinders * 12 * EMISSION_FACTORS.lpg3kg;
    const energyTotal = electricityEmission + lpgEmission;

    // 3. Makanan (per tahun)
    const baseFoodDiet = EMISSION_FACTORS.foodDiet[input.meatFrequency];
    let foodWasteMultiplier = 1.0;
    if (input.foodWaste === 'high') foodWasteMultiplier = 1.25;
    else if (input.foodWaste === 'low') foodWasteMultiplier = 0.85;
    else if (input.foodWaste === 'zero') foodWasteMultiplier = 0.70;

    // Diskon pangan lokal (mengurangi food miles hingga 15%)
    const localDiscount = (input.localFoodRatio / 100) * 0.15;
    const foodTotal = baseFoodDiet * foodWasteMultiplier * (1 - localDiscount);

    // 4. Sampah & Gaya Hidup (per tahun)
    const plasticBottlesEmission = input.plasticBottles * 52 * EMISSION_FACTORS.plasticBottle;
    const plasticBagsEmission = input.plasticBags * 52 * EMISSION_FACTORS.plasticBag;
    const baseWaste = plasticBottlesEmission + plasticBagsEmission;
    const sortingMultiplier = EMISSION_FACTORS.wasteSortingMultiplier[input.wasteSorting];
    const wasteTotal = baseWaste * sortingMultiplier;

    // Total emisi
    const total = transportTotal + energyTotal + foodTotal + wasteTotal;

    return {
      transport: Math.round(transportTotal),
      energy: Math.round(energyTotal),
      food: Math.round(foodTotal),
      waste: Math.round(wasteTotal),
      total: Math.round(total)
    };
  };

  const results = calculateEmissions();

  // Generate Personalized Recommendations
  const getRecommendations = () => {
    const recs = [];

    // Transport Recommendations
    if (input.carType === 'petrol' || input.carType === 'diesel') {
      if (input.carDistance > 80) {
        recs.push({
          category: 'transport',
          title: 'Kurangi Emisi Kendaraan Fosil Pribadi',
          text: 'Kendaraan bensin Anda menghasilkan emisi tinggi. Coba beralih ke KRL, MRT, atau TransJakarta setidaknya 2 hari seminggu untuk menghemat ratusan kg CO2e per tahun.'
        });
      }
    }
    if (input.flightsShort + input.flightsLong > 2) {
      recs.push({
        category: 'transport',
        title: 'Kurangi Perjalanan Udara Singkat',
        text: 'Penerbangan memiliki dampak karbon instan yang luar biasa tinggi. Untuk destinasi jarak dekat (seperti Jawa-Bali), pertimbangkan moda darat kereta api eksekutif yang ramah lingkungan.'
      });
    }

    // Energy Recommendations
    const electricKwh = getElectricityKwh();
    if (electricKwh > 200) {
      recs.push({
        category: 'energy',
        title: 'Optimalkan Listrik Rumah Tangga',
        text: 'Penggunaan AC adalah penyerap listrik terbesar di rumah. Setel suhu AC stabil di 24-25°C, gunakan timer otomatis, dan cabut steker perangkat elektronik saat tidur.'
      });
    }
    if (input.lpgCylinders > 3) {
      recs.push({
        category: 'energy',
        title: 'Tingkatkan Efisiensi Memasak',
        text: 'Penggunaan tabung gas LPG yang boros bisa dikurangi dengan menggunakan penutup panci saat mendidihkan air, merawat kompor secara teratur, atau menggunakan panci presto.'
      });
    }

    // Food Recommendations
    if (input.meatFrequency === 'every_meal' || input.meatFrequency === 'daily') {
      recs.push({
        category: 'food',
        title: 'Terapkan Gerakan "Meatless Days"',
        text: 'Produksi daging merah (terutama sapi) menghasilkan emisi 10x lipat dibanding protein nabati. Menolak makan daging sehari saja dalam seminggu memangkas jejak karbon Anda secara masif.'
      });
    }
    if (input.foodWaste === 'high' || input.foodWaste === 'medium') {
      recs.push({
        category: 'food',
        title: 'Kurangi Sisa Makanan (Zero Food Waste)',
        text: 'Makanan yang terbuang sia-sia menghasilkan gas metana berbahaya di TPA. Atur porsi makan dengan bijak, simpan sisa makanan dengan benar, dan buat rencana belanja mingguan.'
      });
    }
    if (input.localFoodRatio < 40) {
      recs.push({
        category: 'food',
        title: 'Utamakan Bahan Pangan Lokal',
        text: 'Bahan makanan impor menempuh ribuan kilometer perjalanan laut/udara (food miles). Dukung petani lokal dan beli buah/sayur musiman Indonesia.'
      });
    }

    // Waste Recommendations
    if (input.plasticBottles > 4) {
      recs.push({
        category: 'waste',
        title: 'Ganti Botol Kemasan dengan Tumbler',
        text: 'Dengan berinvestasi pada satu tumbler berkualitas, Anda langsung menghentikan ratusan botol plastik sekali pakai per tahun dari pencemaran laut.'
      });
    }
    if (input.plasticBags > 5) {
      recs.push({
        category: 'waste',
        title: 'Sedia Kantong Kain Lipat',
        text: 'Biasakan menyimpan tas belanja kain ukuran lipat kecil di tas kerja atau bagasi motor Anda, sehingga siap sedia menolak kantong plastik sekali pakai.'
      });
    }
    if (input.wasteSorting === 'none') {
      recs.push({
        category: 'waste',
        title: 'Mulai Pilah Sampah Mandiri',
        text: 'Pisahkan sampah kering (anorganik) seperti botol, kertas, kaleng untuk disalurkan ke Bank Sampah atau aplikasi penjemput sampah daur ulang terdekat.'
      });
    } else if (input.wasteSorting === 'partial' || input.wasteSorting === 'none') {
      recs.push({
        category: 'waste',
        title: 'Kompos Sampah Dapur (Organik)',
        text: 'Lebih dari 50% sampah rumah tangga adalah organik. Mengomposkan sisa sayur dan buah menghindarkannya dari TPA, serta memberi Anda pupuk alami gratis.'
      });
    }

    // Default recommendation if pristine
    if (recs.length === 0) {
      recs.push({
        category: 'eco',
        title: 'Luar Biasa! Pertahankan Konsistensimu',
        text: 'Gaya hidup Anda sudah sangat sadar iklim dan mendekati target aman bumi. Sebarkan kebiasaan baik ini ke keluarga dan teman-teman terdekat Anda!'
      });
    }

    return recs.slice(0, 4); // Limit to top 4 recommendations
  };

  const currentRecommendations = getRecommendations();

  // Carbon Grade / Verdict
  const getVerdict = (total: number) => {
    if (total <= CARBON_STATS.safeTarget) {
      return {
        label: 'Sangat Rendah (Ramah Iklim 🌿)',
        color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        textColor: 'text-emerald-800',
        bg: 'bg-emerald-500',
        desc: 'Hebat! Gaya hidup Anda berada di bawah batas emisi tahunan aman pemanasan global 1.5°C.'
      };
    } else if (total <= CARBON_STATS.indonesiaAverage) {
      return {
        label: 'Sedang (Rata-rata Nasional 🇮🇩)',
        color: 'text-teal-600 bg-teal-50 border-teal-200',
        textColor: 'text-teal-800',
        bg: 'bg-teal-500',
        desc: 'Cukup baik! Jejak karbon Anda di bawah rata-rata emisi penduduk Indonesia, namun masih ada ruang peningkatan.'
      };
    } else if (total <= CARBON_STATS.globalAverage) {
      return {
        label: 'Tinggi (Rata-rata Global ⚠️)',
        color: 'text-amber-600 bg-amber-50 border-amber-200',
        textColor: 'text-amber-800',
        bg: 'bg-amber-500',
        desc: 'Waspada! Jejak karbon Anda melampaui rata-rata nasional dan mendekati batas boros iklim global.'
      };
    } else {
      return {
        label: 'Sangat Tinggi (Kritis Iklim 🛑)',
        color: 'text-red-600 bg-red-50 border-red-200',
        textColor: 'text-red-800',
        bg: 'bg-red-500',
        desc: 'Kritis! Konsumsi harian Anda menghasilkan karbon jauh di atas kapasitas aman bumi. Diperlukan aksi pengurangan segera.'
      };
    }
  };

  const verdict = getVerdict(results.total);

  const resetCalculator = () => {
    setInput({
      carDistance: 50,
      carType: 'petrol',
      motorbikeDistance: 60,
      publicTransportDistance: 20,
      flightsShort: 1,
      flightsLong: 0,
      electricityBill: 150,
      lpgCylinders: 2,
      waterUsage: 10,
      meatFrequency: 'daily',
      foodWaste: 'medium',
      localFoodRatio: 50,
      plasticBottles: 8,
      plasticBags: 10,
      wasteSorting: 'none'
    });
    setElectricityUnit('kwh');
    setElectricityRupiah(250000);
    setStep(1);
  };

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Fitur Interaktif
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Kalkulator Jejak Karbon Pribadi
          </h2>
          <p className="text-slate-600 font-sans text-sm sm:text-base">
            Ukur perkiraan emisi gas rumah kaca tahunan dari kebiasaan transportasi, penggunaan listrik rumah, makanan, dan sampah rumah tangga Anda.
          </p>
        </div>

        {/* Calculator Card Box */}
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          {/* Progress bar */}
          {step <= 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>LANGKAH {step} DARI 4</span>
                <span className="text-emerald-600 uppercase font-bold">
                  {step === 1 && 'Transportasi Harian'}
                  {step === 2 && 'Energi & Utilitas'}
                  {step === 3 && 'Diet & Konsumsi'}
                  {step === 4 && 'Sampah & Daur Ulang'}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: TRANSPORTASI */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -15, x: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="p-2 bg-emerald-500 text-white rounded-lg">
                    <Car className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">Transportasi Harian</h3>
                    <p className="text-xs text-slate-500">Kebiasaan mobilitas pribadi dan umum per minggu.</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Car distance */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <label className="font-semibold text-slate-700">Jarak Tempuh Mobil Pribadi</label>
                      <span className="font-mono text-emerald-600 font-bold bg-white px-2.5 py-1 rounded-md border border-slate-100">
                        {input.carDistance} km / minggu
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="350"
                      step="10"
                      value={input.carDistance}
                      onChange={(e) => handleInputChange('carDistance', parseInt(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-400">Setel ke 0 jika Anda tidak mengendarai mobil pribadi.</p>
                  </div>

                  {/* Car type Selection */}
                  {input.carDistance > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2 pt-2"
                    >
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Bahan Bakar Mobil</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(['petrol', 'diesel', 'hybrid', 'electric'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => handleInputChange('carType', type)}
                            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition cursor-pointer ${
                              input.carType === type 
                                ? 'bg-emerald-600 border-emerald-600 text-white' 
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {type === 'petrol' && 'Bensin'}
                            {type === 'diesel' && 'Solar'}
                            {type === 'hybrid' && 'Hybrid'}
                            {type === 'electric' && 'Listrik'}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Motorbike distance */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <label className="font-semibold text-slate-700">Jarak Tempuh Sepeda Motor</label>
                      <span className="font-mono text-emerald-600 font-bold bg-white px-2.5 py-1 rounded-md border border-slate-100">
                        {input.motorbikeDistance} km / minggu
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="300"
                      step="10"
                      value={input.motorbikeDistance}
                      onChange={(e) => handleInputChange('motorbikeDistance', parseInt(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Public transport */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <label className="font-semibold text-slate-700">Naik Kendaraan Umum (KRL, MRT, Busway)</label>
                      <span className="font-mono text-emerald-600 font-bold bg-white px-2.5 py-1 rounded-md border border-slate-100">
                        {input.publicTransportDistance} km / minggu
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="250"
                      step="10"
                      value={input.publicTransportDistance}
                      onChange={(e) => handleInputChange('publicTransportDistance', parseInt(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Flights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                        <Plane className="h-3.5 w-3.5 text-slate-400" />
                        Penerbangan Domestik / Pendek PP
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleInputChange('flightsShort', Math.max(0, input.flightsShort - 1))}
                          className="h-9 w-9 bg-white border border-slate-200 rounded-lg font-bold hover:bg-slate-100 cursor-pointer text-slate-600"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-mono font-bold text-slate-800 bg-white border border-slate-200 py-1.5 rounded-lg text-sm">
                          {input.flightsShort} kali / tahun
                        </span>
                        <button
                          type="button"
                          onClick={() => handleInputChange('flightsShort', input.flightsShort + 1)}
                          className="h-9 w-9 bg-white border border-slate-200 rounded-lg font-bold hover:bg-slate-100 cursor-pointer text-slate-600"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                        <Plane className="h-3.5 w-3.5 text-slate-400 rotate-45" />
                        Penerbangan Internasional PP
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleInputChange('flightsLong', Math.max(0, input.flightsLong - 1))}
                          className="h-9 w-9 bg-white border border-slate-200 rounded-lg font-bold hover:bg-slate-100 cursor-pointer text-slate-600"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-mono font-bold text-slate-800 bg-white border border-slate-200 py-1.5 rounded-lg text-sm">
                          {input.flightsLong} kali / tahun
                        </span>
                        <button
                          type="button"
                          onClick={() => handleInputChange('flightsLong', input.flightsLong + 1)}
                          className="h-9 w-9 bg-white border border-slate-200 rounded-lg font-bold hover:bg-slate-100 cursor-pointer text-slate-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: ENERGI & UTILITAS */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -15, x: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="p-2 bg-emerald-500 text-white rounded-lg">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">Energi & Utilitas</h3>
                    <p className="text-xs text-slate-500">Konsumsi listrik PLN dan bahan bakar gas rumah tangga.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Electricity Unit Toggle */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-semibold text-slate-700 text-sm">Konsumsi Listrik Bulanan</label>
                      <div className="inline-flex rounded-lg bg-slate-200/60 p-0.5">
                        <button
                          type="button"
                          onClick={() => setElectricityUnit('kwh')}
                          className={`rounded-md px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                            electricityUnit === 'kwh' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          KWh Listrik
                        </button>
                        <button
                          type="button"
                          onClick={() => setElectricityUnit('rupiah')}
                          className={`rounded-md px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                            electricityUnit === 'rupiah' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          Tagihan (Rp)
                        </button>
                      </div>
                    </div>

                    {electricityUnit === 'kwh' ? (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-500">Masukkan total kWh di meteran/struk listrik</span>
                          <span className="font-mono text-emerald-600 font-bold bg-white px-2.5 py-1 rounded-md border border-slate-100 text-sm">
                            {input.electricityBill} kWh / bulan
                          </span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="800"
                          step="10"
                          value={input.electricityBill}
                          onChange={(e) => handleInputChange('electricityBill', parseInt(e.target.value))}
                          className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-500">Masukkan perkiraan nominal tagihan/token pulsa</span>
                          <span className="font-mono text-emerald-600 font-bold bg-white px-2.5 py-1 rounded-md border border-slate-100 text-sm">
                            Rp {electricityRupiah.toLocaleString('id-ID')} / bulan
                          </span>
                        </div>
                        <input
                          type="range"
                          min="50000"
                          max="1500000"
                          step="50000"
                          value={electricityRupiah}
                          onChange={(e) => setElectricityRupiah(parseInt(e.target.value))}
                          className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                        />
                        <p className="text-[10px] text-slate-400">Dikonversi otomatis ke kWh berdasarkan tarif rata-rata nonsubsidi.</p>
                      </div>
                    )}
                  </div>

                  {/* LPG Cylinders */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <label className="font-semibold text-slate-700">Penggunaan Gas LPG Melon (3kg) Rumah Tangga</label>
                      <span className="font-mono text-emerald-600 font-bold bg-white px-2.5 py-1 rounded-md border border-slate-100">
                        {input.lpgCylinders} Tabung / bulan
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={input.lpgCylinders}
                      onChange={(e) => handleInputChange('lpgCylinders', parseInt(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Catatan:</span>
                      <span>Jika memakai tabung biru besar 12kg, hitung sebagai 4 tabung melon (3kg).</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: DIET & KONSUMSI MAKANAN */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -15, x: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="p-2 bg-emerald-500 text-white rounded-lg">
                    <Utensils className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">Pola Makan & Konsumsi</h3>
                    <p className="text-xs text-slate-500">Pengaruh jenis diet, sisa makanan, dan asal bahan pangan.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Meat frequency */}
                  <div className="space-y-2.5">
                    <label className="block text-sm font-semibold text-slate-700">Seberapa sering Anda mengonsumsi daging (Sapi/Kambing/Ayam)?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { id: 'every_meal', label: 'Setiap Kali Makan', desc: 'Sangat menyukai daging, minim sayuran.' },
                        { id: 'daily', label: 'Sekali Sehari', desc: 'Lauk pauk harian selalu berprotein hewani.' },
                        { id: 'few_times', label: 'Beberapa Kali Seminggu', desc: 'Fleksitarian, dominan tahu/tempe/sayur.' },
                        { id: 'rarely', label: 'Vegetarian (Tanpa Daging)', desc: 'Hanya produk olahan susu/telur.' },
                        { id: 'vegan', label: 'Vegan Murni', desc: '100% sayur, buah, protein nabati.' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleInputChange('meatFrequency', item.id)}
                          className={`px-4 py-3 text-left rounded-xl border transition cursor-pointer flex flex-col justify-center ${
                            input.meatFrequency === item.id 
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs' 
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="font-bold text-xs sm:text-sm">{item.label}</span>
                          <span className={`text-[10px] mt-0.5 ${input.meatFrequency === item.id ? 'text-emerald-100' : 'text-slate-400'}`}>
                            {item.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Food Waste Habit */}
                  <div className="space-y-2.5">
                    <label className="block text-sm font-semibold text-slate-700">Seberapa sering Anda menghasilkan sisa makanan (Food Waste)?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'high', label: 'Sering', desc: 'Banyak sisa' },
                        { id: 'medium', label: 'Sedang', desc: 'Porsi normal' },
                        { id: 'low', label: 'Jarang', desc: 'Piring bersih' },
                        { id: 'zero', label: 'Tidak Pernah', desc: 'Habis / Kompos' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleInputChange('foodWaste', item.id)}
                          className={`px-3 py-2 text-center rounded-xl border transition cursor-pointer ${
                            input.foodWaste === item.id 
                              ? 'bg-emerald-600 border-emerald-600 text-white' 
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="block font-bold text-xs">{item.label}</span>
                          <span className={`text-[9px] block mt-0.5 ${input.foodWaste === item.id ? 'text-emerald-100' : 'text-slate-400'}`}>
                            {item.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Local food ratio */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <label className="font-semibold text-slate-700">Proporsi Bahan Makanan Lokal (Diproduksi di RI)</label>
                      <span className="font-mono text-emerald-600 font-bold bg-white px-2.5 py-1 rounded-md border border-slate-100">
                        {input.localFoodRatio}% Lokal
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="10"
                      value={input.localFoodRatio}
                      onChange={(e) => handleInputChange('localFoodRatio', parseInt(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-400">Membeli produk lokal memangkas rantai distribusi pengiriman udara/laut luar negeri.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: WASTE & LIFESTYLE */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -15, x: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="p-2 bg-emerald-500 text-white rounded-lg">
                    <Trash2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">Sampah & Kebiasaan</h3>
                    <p className="text-xs text-slate-500">Volume timbulan sampah plastik sekali pakai harian.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Plastic bottles */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <label className="font-semibold text-slate-700">Botol Air Plastik / Cup Minuman dibuang</label>
                      <span className="font-mono text-emerald-600 font-bold bg-white px-2.5 py-1 rounded-md border border-slate-100">
                        {input.plasticBottles} botol / minggu
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="1"
                      value={input.plasticBottles}
                      onChange={(e) => handleInputChange('plasticBottles', parseInt(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Plastic bags */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <label className="font-semibold text-slate-700">Kantong Belanja Kresek Sekali Pakai dipakai</label>
                      <span className="font-mono text-emerald-600 font-bold bg-white px-2.5 py-1 rounded-md border border-slate-100">
                        {input.plasticBags} kresek / minggu
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      step="1"
                      value={input.plasticBags}
                      onChange={(e) => handleInputChange('plasticBags', parseInt(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Waste sorting */}
                  <div className="space-y-2.5">
                    <label className="block text-sm font-semibold text-slate-700">Bagaimana pengelolaan sampah Anda di rumah?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'none', label: 'Tercampur Rata', desc: 'Semua jenis sampah dibuang jadi satu langsung ke truk.' },
                        { id: 'partial', label: 'Pilah Sebagian', desc: 'Pisahkan plastik PET/kertas bersih untuk dijual/daur ulang.' },
                        { id: 'full', label: 'Pilah & Kompos Penuh', desc: 'Organik dikompos, anorganik didaur ulang penuh.' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleInputChange('wasteSorting', item.id)}
                          className={`px-4 py-3 text-left rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                            input.wasteSorting === item.id 
                              ? 'bg-emerald-600 border-emerald-600 text-white' 
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="font-bold text-xs sm:text-sm block">{item.label}</span>
                          <span className={`text-[10px] block mt-1.5 ${input.wasteSorting === item.id ? 'text-emerald-100' : 'text-slate-400'}`}>
                            {item.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* RESULTS VIEW */}
            {step === 5 && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                {/* Header Scorecard */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 text-left">
                    <span className="text-xs font-bold uppercase text-slate-400">Skor Jejak Karbon Tahunan Anda</span>
                    <h4 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
                      {(results.total / 1000).toFixed(2)} <span className="text-lg font-bold text-slate-500">Ton CO₂e/Tahun</span>
                    </h4>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mt-2 ${verdict.color}`}>
                      {verdict.label}
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {verdict.desc}
                    </p>
                  </div>

                  {/* Radial progress visualizer */}
                  <div className="flex-shrink-0 flex items-center justify-center relative">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="52"
                        className="stroke-slate-100"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="52"
                        className="stroke-emerald-500 transition-all duration-1000"
                        strokeWidth="10"
                        strokeDasharray={2 * Math.PI * 52}
                        strokeDashoffset={Math.max(0, (2 * Math.PI * 52) * (1 - Math.min(1, results.total / 8000)))}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display font-black text-xl text-slate-800">
                        {Math.round(Math.min(100, (results.total / CARBON_STATS.indonesiaAverage) * 100))}%
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">Beban Rata-rata RI</span>
                    </div>
                  </div>
                </div>

                {/* Categorized stacked bar visualization */}
                <div className="space-y-2 text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Rincian Kontribusi Jejak Karbon</h4>
                  <div className="h-6 w-full rounded-xl overflow-hidden flex font-mono text-[9px] text-white font-bold">
                    {/* Transport */}
                    {results.transport > 0 && (
                      <div 
                        className="bg-emerald-500 flex items-center justify-center transition-all"
                        style={{ width: `${(results.transport / results.total) * 100}%` }}
                        title={`Transportasi: ${results.transport} kg`}
                      >
                        {((results.transport / results.total) * 100) > 10 && 'Transport'}
                      </div>
                    )}
                    {/* Energy */}
                    {results.energy > 0 && (
                      <div 
                        className="bg-teal-500 flex items-center justify-center transition-all"
                        style={{ width: `${(results.energy / results.total) * 100}%` }}
                        title={`Energi: ${results.energy} kg`}
                      >
                        {((results.energy / results.total) * 100) > 10 && 'Energi'}
                      </div>
                    )}
                    {/* Food */}
                    {results.food > 0 && (
                      <div 
                        className="bg-amber-500 flex items-center justify-center transition-all"
                        style={{ width: `${(results.food / results.total) * 100}%` }}
                        title={`Makanan: ${results.food} kg`}
                      >
                        {((results.food / results.total) * 100) > 10 && 'Pangan'}
                      </div>
                    )}
                    {/* Waste */}
                    {results.waste > 0 && (
                      <div 
                        className="bg-blue-500 flex items-center justify-center transition-all"
                        style={{ width: `${(results.waste / results.total) * 100}%` }}
                        title={`Sampah: ${results.waste} kg`}
                      >
                        {((results.waste / results.total) * 100) > 10 && 'Sampah'}
                      </div>
                    )}
                  </div>
                  
                  {/* Legend / Key */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <div className="h-2.5 w-2.5 bg-emerald-500 rounded-sm" />
                      <span>Transport: {results.transport.toLocaleString('id-ID')} kg</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <div className="h-2.5 w-2.5 bg-teal-500 rounded-sm" />
                      <span>Energi: {results.energy.toLocaleString('id-ID')} kg</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <div className="h-2.5 w-2.5 bg-amber-500 rounded-sm" />
                      <span>Pangan: {results.food.toLocaleString('id-ID')} kg</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <div className="h-2.5 w-2.5 bg-blue-500 rounded-sm" />
                      <span>Sampah: {results.waste.toLocaleString('id-ID')} kg</span>
                    </div>
                  </div>
                </div>

                {/* Benchmark Comparison SVG Bar Chart */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs text-left">
                  <h4 className="font-display font-bold text-sm text-slate-800 mb-4 flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    Bandingkan Jejak Karbon Anda (Ton/Tahun)
                  </h4>
                  <div className="space-y-3.5">
                    {/* Self */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-emerald-700">Jejak Karbon Anda</span>
                        <span className="font-mono text-emerald-700">{(results.total / 1000).toFixed(2)} Ton</span>
                      </div>
                      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${Math.min(100, (results.total / 6000) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Indonesia Average */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>Rata-rata Penduduk Indonesia</span>
                        <span className="font-mono">{(CARBON_STATS.indonesiaAverage / 1000).toFixed(2)} Ton</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-teal-400 rounded-full"
                          style={{ width: `${(CARBON_STATS.indonesiaAverage / 6000) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Safe limit target */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>Batas Aman Bumi (Target 1.5°C)</span>
                        <span className="font-mono text-emerald-600 font-bold">{(CARBON_STATS.safeTarget / 1000).toFixed(2)} Ton</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-600 rounded-full border-r border-dashed border-white"
                          style={{ width: `${(CARBON_STATS.safeTarget / 6000) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Global Average */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>Rata-rata Penduduk Dunia</span>
                        <span className="font-mono">{(CARBON_STATS.globalAverage / 1000).toFixed(2)} Ton</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-slate-400 rounded-full"
                          style={{ width: `${(CARBON_STATS.globalAverage / 6000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="text-left space-y-4">
                  <h4 className="font-display font-bold text-base text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-emerald-600 animate-bounce" />
                    Rekomendasi Aksi Pengurangan Terarah Untuk Anda
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentRecommendations.map((rec, index) => (
                      <div 
                        key={index}
                        className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs hover:border-emerald-100 transition flex gap-3"
                      >
                        <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {rec.category === 'transport' && <Car className="h-4.5 w-4.5" />}
                          {rec.category === 'energy' && <Zap className="h-4.5 w-4.5" />}
                          {rec.category === 'food' && <Utensils className="h-4.5 w-4.5" />}
                          {rec.category === 'waste' && <Trash2 className="h-4.5 w-4.5" />}
                        </div>
                        <div className="space-y-1 text-left">
                          <h5 className="font-display font-bold text-xs sm:text-sm text-slate-800">{rec.title}</h5>
                          <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">{rec.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Call to Action Pledging */}
                <div className="bg-emerald-600 text-white p-5 rounded-2xl text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-display font-bold text-sm">Ambil Komitmen Hijau Anda Sekarang!</span>
                    <p className="text-xs text-emerald-100 max-w-xl">
                      Pilih aksi nyata di komitmen board di bawah untuk memangkas emisi tahunan Anda secara digital dan mendaftarkan komitmen peduli iklim Anda.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('pledge-board');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-white text-emerald-800 px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-50 transition shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    Buka Commitment Board
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100/60 flex items-center justify-between">
            {step > 1 && step <= 4 && (
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Sebelumnya
              </button>
            )}

            {step === 5 && (
              <button
                type="button"
                onClick={resetCalculator}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                Hitung Ulang
              </button>
            )}

            <div className="ml-auto">
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(prev => prev + 1)}
                  className="inline-flex items-center gap-1 text-xs font-bold bg-slate-900 text-white px-5 py-2.5 rounded-xl cursor-pointer hover:bg-slate-800 shadow-sm"
                >
                  Selanjutnya
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : step === 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-600 text-white px-5 py-2.5 rounded-xl cursor-pointer hover:bg-emerald-700 shadow-md shadow-emerald-600/10"
                >
                  <CheckCircle className="h-4 w-4" />
                  Kalkulasi Jejak Karbon
                </button>
              ) : null}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
