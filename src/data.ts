import { QuizQuestion, Pledge, AlternativeItem } from './types';

// Faktor Emisi (kg CO2e)
export const EMISSION_FACTORS = {
  // Transportasi (per km)
  car: {
    petrol: 0.18,
    diesel: 0.17,
    hybrid: 0.11,
    electric: 0.06 // Berdasarkan bauran energi PLN Indonesia
  },
  motorbike: 0.08, // per km
  publicTransport: 0.035, // per km per orang
  flightShort: 150, // per rute PP domestik/singkat (<3 jam)
  flightLong: 650, // per rute PP internasional/panjang (>3 jam)

  // Energi (per kWh atau per tabung gas)
  electricity: 0.87, // kg CO2e per kWh (Rata-rata PLN grid Jawa-Bali-Sumatera)
  lpg3kg: 9.0, // kg CO2e per tabung gas 3kg
  lpg12kg: 36.0, // kg CO2e per tabung gas 12kg

  // Makanan (per tahun)
  foodDiet: {
    every_meal: 2300,  // Pemakan daging berat
    daily: 1700,       // Pemakan daging biasa
    few_times: 1100,   // Fleksitarian (jarang daging)
    rarely: 750,       // Vegetarian (tanpa daging)
    vegan: 450         // Vegan murni
  },
  
  // Waste (per unit per tahun)
  plasticBottle: 0.15, // kg CO2e per botol plastik PET
  plasticBag: 0.08,    // kg CO2e per kantong kresek
  
  // Multiplier berdasarkan kebiasaan pilah sampah
  wasteSortingMultiplier: {
    none: 1.15,    // Tidak memilah, semua masuk TPA (menghasilkan metana)
    partial: 0.95, // Memilah sebagian (botol/kertas saja)
    full: 0.70     // Memilah organik untuk kompos & daur ulang penuh
  }
};

// Data Statistik Pembanding
export const CARBON_STATS = {
  indonesiaAverage: 2300, // kg CO2e per tahun per kapita
  globalAverage: 4700,    // kg CO2e per tahun per kapita
  safeTarget: 2000,       // Batas maksimal aman untuk menahan pemanasan global di 1.5°C
};

// Edukasi 5R
export const FIVE_R_PRINCIPLES = [
  {
    title: "Refuse (Menolak)",
    description: "Menolak barang-barang sekali pakai seperti sedotan plastik, kantong kresek, dan brosur yang tidak diperlukan. Ini adalah langkah pertahanan pertama yang paling efektif.",
    example: "Membawa tas belanja kain sendiri dan dengan sopan menolak kresek plastik dari kasir.",
    color: "emerald"
  },
  {
    title: "Reduce (Mengurangi)",
    description: "Mengurangi konsumsi barang-barang secara umum, mengurangi pembelian barang baru, menghindari fast-fashion, dan membeli produk dalam jumlah besar (bulk) untuk mengurangi kemasan.",
    example: "Membeli sabun isi ulang ukuran besar daripada botol kecil berulang kali.",
    color: "teal"
  },
  {
    title: "Reuse (Menggunakan Kembali)",
    description: "Memaksimalkan masa pakai barang dengan memperbaiki yang rusak, mendonasikan barang layak pakai, atau mengalihfungsikan wadah bekas.",
    example: "Menggunakan stoples kaca bekas selai untuk wadah bumbu dapur atau botol minum reusable.",
    color: "cyan"
  },
  {
    title: "Recycle (Mendaur Ulang)",
    description: "Mendaur ulang barang yang tidak bisa ditolak, dikurangi, atau digunakan kembali. Memisahkan kertas, plastik, kaca, dan logam agar bisa diolah kembali oleh bank sampah.",
    example: "Mengirimkan botol plastik PET bersih ke bank sampah atau stasiun daur ulang terdekat.",
    color: "blue"
  },
  {
    title: "Rot (Membusukkan / Kompos)",
    description: "Mengolah sampah organik seperti sisa makanan dan dedaunan menjadi kompos yang kaya nutrisi untuk tanaman, mencegahnya membusuk secara anaerobik di TPA yang menghasilkan gas metana berbahaya.",
    example: "Membuat wadah komposter sederhana di rumah untuk sisa sayur dan kulit buah.",
    color: "amber"
  }
];

// Alternatif Ramah Lingkungan
export const ECO_SWAPS: AlternativeItem[] = [
  {
    id: "swap-1",
    original: "Botol Air Mineral Sekali Pakai",
    alternative: "Botol Minum Reusable (Tumbler Stainless)",
    why: "Botol plastik membutuhkan waktu hingga 450 tahun untuk terurai dan sering berakhir mencemari lautan kita.",
    impact: "Menghemat rata-rata 150-300 botol plastik per tahun per orang.",
    category: "belanja"
  },
  {
    id: "swap-2",
    original: "Spons Cuci Piring Plastik (Sintetis)",
    alternative: "Loofah (Spons Gambas Alami) atau Serabut Kelapa",
    why: "Spons plastik melepaskan mikroplastik ke aliran air setiap kali mencuci piring dan tidak bisa dikomposkan.",
    impact: "100% biodegradable, dapat dikomposkan setelah aus, dan tidak mencemari laut.",
    category: "dapur"
  },
  {
    id: "swap-3",
    original: "Sikat Gigi Plastik",
    alternative: "Sikat Gigi Bambu",
    why: "Miliaran sikat gigi plastik dibuang setiap tahun dan tidak dapat didaur ulang.",
    impact: "Gagang bambu dapat dikomposkan secara alami dalam waktu kurang dari setahun.",
    category: "kamar_mandi"
  },
  {
    id: "swap-4",
    original: "Kantong Belanja Kresek",
    alternative: "Reusable Totebag (Kain Blacu/Kanvas)",
    why: "Kresek plastik tipis sangat jarang didaur ulang dan menyumbat saluran air, memicu banjir lokal.",
    impact: "Mencegah penggunaan hingga 500 kantong plastik sekali pakai per tahun.",
    category: "belanja"
  },
  {
    id: "swap-5",
    original: "Sedotan Plastik",
    alternative: "Sedotan Stainless Steel atau Bambu",
    why: "Sedotan plastik termasuk dalam 10 besar sampah laut terbanyak yang melukai biota laut seperti penyu.",
    impact: "Menghindari ratusan sedotan plastik yang terbuang sia-sia.",
    category: "bepergian"
  },
  {
    id: "swap-6",
    original: "Cling Wrap (Plastik Pembungkus Makanan)",
    alternative: "Beeswax Wrap (Kain Berlapis Lilin Lebah)",
    why: "Cling wrap tidak bisa didaur ulang dan sering mengkontaminasi makanan dengan senyawa kimia.",
    impact: "Dapat dicuci dan digunakan kembali hingga 1 tahun, serta bersifat antibakteri alami.",
    category: "dapur"
  },
  {
    id: "swap-7",
    original: "Sabun/Sampo Botol Plastik",
    alternative: "Sabun & Sampo Batang (Bar Soap / Shampoo Bar)",
    why: "Mengurangi kemasan plastik cair yang berat untuk dikirim (memakan emisi transportasi) dan menghasilkan sampah wadah.",
    impact: "Nol kemasan plastik, lebih hemat air, dan formula biasanya lebih ramah lingkungan.",
    category: "kamar_mandi"
  }
];

// Pilihan Komitmen (Pledges)
export const ZERO_WASTE_PLEDGES: Pledge[] = [
  {
    id: "pledge-1",
    title: "Membawa Tumbler & Wadah Sendiri",
    description: "Berkomitmen selalu membawa botol minum dan wadah makanan sendiri saat bepergian atau jajan.",
    category: "waste",
    co2Reduction: 22,
    iconName: "GlassWater"
  },
  {
    id: "pledge-2",
    title: "Kompos Sampah Organik Rumah",
    description: "Mengolah semua sisa dapur (sayur, buah, sisa makanan) menjadi kompos mandiri, mengalihkan dari TPA.",
    category: "waste",
    co2Reduction: 120,
    iconName: "Flower2"
  },
  {
    id: "pledge-3",
    title: "Satu Hari Tanpa Daging (Meatless Monday)",
    description: "Mengganti menu daging dengan protein nabati (tahu, tempe, kacang-kacangan) sekali seminggu.",
    category: "food",
    co2Reduction: 180,
    iconName: "Leaf"
  },
  {
    id: "pledge-4",
    title: "Beralih ke Transportasi Umum / Sepeda",
    description: "Mengganti penggunaan kendaraan pribadi dengan busway, MRT, kereta, atau sepeda untuk perjalanan dekat.",
    category: "transport",
    co2Reduction: 350,
    iconName: "Train"
  },
  {
    id: "pledge-5",
    title: "Cabut Colokan Siaga (Vampire Power)",
    description: "Mencabut pengisi daya HP, TV, microwave, dan elektronik lainnya dari stopkontak saat tidak digunakan.",
    category: "energy",
    co2Reduction: 45,
    iconName: "Zap"
  },
  {
    id: "pledge-6",
    title: "Mengurangi Pembelian Fast Fashion",
    description: "Hanya membeli pakaian berkualitas tinggi saat sangat dibutuhkan, atau membeli pakaian bekas (thrift).",
    category: "waste",
    co2Reduction: 90,
    iconName: "Shirt"
  },
  {
    id: "pledge-7",
    title: "Beralih ke Lampu LED & Hemat AC",
    description: "Mengganti semua bohlam pijar dengan LED hemat energi dan menaikkan suhu AC ke 24-25 derajat Celcius.",
    category: "energy",
    co2Reduction: 110,
    iconName: "Lightbulb"
  }
];

// Pertanyaan Kuis Edukasi
export const ECO_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Manakah dari 5R (Zero Waste) berikut yang memiliki dampak pengurangan sampah paling krusial dan harus didahulukan?",
    options: [
      "Recycle (Mendaur ulang seluruh sampah)",
      "Refuse (Menolak penggunaan barang sekali pakai)",
      "Rot (Membuat kompos dari sisa makanan)",
      "Reuse (Menggunakan kembali wadah kaca)"
    ],
    correctAnswerIndex: 1,
    explanation: "Refuse (Menolak) berada di puncak piramida Zero Waste. Mencegah sampah masuk ke rumah kita jauh lebih efektif dibanding mencoba mendaur ulang (Recycle) sampah yang sudah terlanjur diproduksi."
  },
  {
    id: 2,
    question: "Mengapa sampah makanan (food waste) yang membusuk di Tempat Pembuangan Akhir (TPA) sangat berbahaya bagi iklim?",
    options: [
      "Menyebabkan bau menyengat bagi warga sekitar",
      "Membusuk secara anaerobik dan menghasilkan gas metana, yang 25x lebih kuat menahan panas dibanding CO2",
      "Mengurangi nilai estetika daerah wisata",
      "Membuat lalat berkembang biak lebih cepat"
    ],
    correctAnswerIndex: 1,
    explanation: "Di TPA, sampah organik tertimbun tanpa oksigen (anaerobik). Proses ini melepaskan gas metana (CH4), gas rumah kaca yang berkontribusi sangat signifikan terhadap pemanasan global."
  },
  {
    id: 3,
    question: "Berapa lama rata-rata kantong kresek plastik sekali pakai yang Anda pakai selama 15 menit terurai di lingkungan?",
    options: [
      "10 sampai 20 tahun",
      "50 sampai 100 tahun",
      "100 sampai 500 tahun",
      "Tidak pernah benar-benar hancur, hanya terfragmentasi menjadi mikroplastik"
    ],
    correctAnswerIndex: 3,
    explanation: "Plastik tidak mengalami degradasi biologis sejati. Kantong plastik hanya hancur menjadi partikel mikroplastik yang sangat kecil, bertahan selamanya dan mencemari rantai makanan hewan hingga manusia."
  },
  {
    id: 4,
    question: "Kegiatan rumah tangga manakah yang umumnya menyumbang jejak karbon terbesar bagi masyarakat perkotaan di Indonesia?",
    options: [
      "Penggunaan listrik (khususnya AC yang menyala terus menerus)",
      "Penggunaan air bersih berlebih",
      "Membuang kertas bekas di tempat sampah",
      "Menyalakan kompor gas untuk memasak"
    ],
    correctAnswerIndex: 0,
    explanation: "Listrik di Indonesia sebagian besar masih dipasok oleh Pembangkit Listrik Tenaga Uap (PLTU) batu bara. Oleh karena itu, konsumsi listrik yang boros (seperti AC berdaya besar) memiliki intensitas karbon yang sangat tinggi."
  },
  {
    id: 5,
    question: "Dari perspektif emisi transportasi, manakah pilihan perjalanan dengan jejak karbon paling minim per kilometer per orang?",
    options: [
      "Mobil listrik pribadi dengan satu penumpang",
      "Mobil hybrid pribadi dengan dua penumpang",
      "Kendaraan umum massal seperti busway listrik atau KRL commuter",
      "Sepeda motor bensin"
    ],
    correctAnswerIndex: 2,
    explanation: "Kendaraan umum massal (seperti KRL atau busway) mengangkut ratusan penumpang sekaligus, membagi total emisi kendaraan ke banyak orang sehingga menghasilkan jejak karbon per kapita terkecil."
  }
];

// Fakta-fakta cepat kampanye sampah Indonesia
export const ECO_FACTS = [
  {
    value: "175.000",
    unit: "Ton",
    description: "Sampah yang dihasilkan di Indonesia setiap harinya.",
    source: "Kementerian LHK RI"
  },
  {
    value: "69%",
    unit: "TPA",
    description: "Sampah berakhir langsung di TPA tanpa pengelolaan atau pemilahan.",
    source: "Sistem Informasi Pengelolaan Sampah Nasional"
  },
  {
    value: "No. 2",
    unit: "Dunia",
    description: "Indonesia sebagai penyumbang sampah plastik ke lautan terbesar kedua di dunia.",
    source: "Studi Jenna Jambeck"
  },
  {
    value: "150 Kg",
    unit: "Per Orang",
    description: "Rata-rata sampah makanan yang dibuang oleh setiap penduduk Indonesia per tahun.",
    source: "Bappenas RI"
  }
];
