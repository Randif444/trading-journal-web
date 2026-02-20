"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Tag, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

// --- DATA ARTIKEL LENGKAP (BESERTA SEMUA GAMBAR) ---
// Perhatikan: Semua class Tailwind di dalam HTML ini sudah diubah ke versi Premium (Glassmorphism)
const articles: any = {
  "money-management": {
    title: "Money Management: 'Holy Grail' yang Sebenarnya",
    category: "Risk Management",
    date: "08 Des 2025",
    readTime: "5 Menit Baca",
    author: "Kang Trader",
    image: "/assets/MM rr.jpg",
    content: `
      <p class="text-xl text-white font-medium mb-8 border-l-4 border-emerald-500 pl-6 italic drop-shadow-sm">
        "Banyak trader pemula menghabiskan waktu berbulan-bulan mencari teknik entry sempurna. Padahal, rahasia profit konsisten ada di seberapa baik kamu menjaga modalmu."
      </p>

      <p>Kenyataannya? <strong>Tidak ada strategi dengan Win Rate 100%.</strong> Bahkan trader profesional di bank besar pun sering mengalami loss. Lalu apa yang membedakan mereka dengan trader yang sering Margin Call (MC)? Jawabannya adalah <strong>Money Management (MM)</strong>.</p>

      <h3 class="text-2xl font-bold text-white mt-12 mb-6 drop-shadow-sm">#1 Aturan 1%: Menjaga Nafas Akun</h3>
      <p>Aturan emas dalam propfirm maupun personal trading adalah: <span class="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md border border-blue-500/30 font-semibold inline-block my-1">Jangan pernah meresikokan lebih dari 1% modal dalam satu kali transaksi.</span></p>

      <div class="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 my-8 shadow-xl hover:border-white/20 transition-all">
        <h4 class="font-bold text-white mb-4 text-lg">Kenapa Harus 1%?</h4>
        <ul class="space-y-4">
          <li class="flex items-start gap-3"><span class="text-rose-500 font-bold bg-rose-500/10 p-1.5 rounded-lg border border-rose-500/20">❌</span><span class="mt-1">Jika resiko <strong>10%</strong>, kamu hanya butuh <strong>5x Loss</strong> beruntun untuk kehilangan separuh modal.</span></li>
          <li class="flex items-start gap-3"><span class="text-emerald-500 font-bold bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">✅</span><span class="mt-1">Jika resiko <strong>1%</strong>, kamu butuh <strong>100x Loss</strong> beruntun untuk menghabiskan akunmu (secara teori).</span></li>
        </ul>
      </div>

      <h3 class="text-2xl font-bold text-white mt-12 mb-6 drop-shadow-sm">#2 Kekuatan Risk Reward (RR)</h3>
      <p>Win Rate itu penting, tapi Risk Reward jauh lebih penting. Bayangkan kamu punya sistem dengan Win Rate hanya 40% (lebih sering kalah). Apakah bisa profit? <strong>Bisa, jika RR-mu minimal 1:2.</strong></p>

      <div class="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl my-8 shadow-2xl">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-black/40 backdrop-blur-md text-slate-300 uppercase font-bold text-xs tracking-wider border-b border-white/10">
            <tr><th class="px-6 py-4">Skenario (10 Trade)</th><th class="px-6 py-4 text-right">Hasil (%)</th></tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-slate-300">
            <tr class="hover:bg-white/5 transition-colors"><td class="px-6 py-4">6x Loss (Resiko 1%)</td><td class="px-6 py-4 text-right text-rose-400 font-bold">-6%</td></tr>
            <tr class="hover:bg-white/5 transition-colors"><td class="px-6 py-4">4x Win (Reward 2%)</td><td class="px-6 py-4 text-right text-emerald-400 font-bold">+8%</td></tr>
            <tr class="bg-white/10 font-bold text-white"><td class="px-6 py-4">Net Profit</td><td class="px-6 py-4 text-right text-amber-400 text-lg drop-shadow">+2% Profit</td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="text-2xl font-bold text-white mt-12 mb-6 drop-shadow-sm">#3 Cara Menghitung Lot</h3>
      <p>Kesalahan terbesar pemula adalah menggunakan lot yang sama untuk setiap pair. Ingat, 1 Lot di EURUSD nilainya berbeda dengan 1 Lot di GBPJPY atau XAUUSD.</p>
      
      <div class="mt-10 p-10 bg-white/5 backdrop-blur-xl border border-amber-500/30 hover:border-amber-500/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.2)] rounded-3xl text-center relative overflow-hidden group transition-all duration-500">
        <div class="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition duration-500 pointer-events-none"></div>
        <h3 class="text-3xl font-black text-white mb-3 relative z-10 drop-shadow-md">Bingung Hitung Lot?</h3>
        <p class="text-slate-400 mb-8 max-w-md mx-auto relative z-10 leading-relaxed">
          Gunakan kalkulator otomatis yang sudah saya sediakan. Masukkan Balance, Resiko, dan SL, biar sistem yang menghitung.
        </p>
        <a href="/tools" class="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-bold px-8 py-4 rounded-xl hover:from-amber-400 hover:to-yellow-300 transition shadow-lg shadow-amber-500/20 relative z-10 hover:scale-105">
          <span class="text-xl">🧮</span> Buka Kalkulator Lot
        </a>
      </div>
    `,
  },
  "snr-valid": {
    title: "Cara Menentukan Support & Resistance Valid",
    category: "Teknikal",
    date: "09 Des 2025",
    readTime: "7 Menit Baca",
    author: "Kang Trader",
    image: "/assets/snr A.jpg",
    content: `
      <p class="text-xl text-white font-medium mb-8 border-l-4 border-blue-500 pl-6 italic drop-shadow-sm">
        "Chart trader pemula sering terlihat seperti lukisan abstrak penuh garis warna-warni. Chart trader profesional justru bersih, hanya ada 2-3 garis penting."
      </p>

      <p>Masalah utama kebanyakan trader adalah <strong>Over-Plotting</strong>. Anda menarik garis di setiap lekukan harga, sampai akhirnya bingung sendiri mana yang harus diikuti. Di artikel ini, kita akan belajar cara menyaring area Support & Resistance (SnR) yang benar-benar diperhatikan oleh institusi besar (Big Player).</p>

      <h3 class="text-2xl font-bold text-white mt-12 mb-6 drop-shadow-sm">#1 Fokus pada "Major Swing"</h3>
      <p>Jangan tandai setiap candle kecil yang berbalik arah. Fokuslah pada <strong>V-Shape Rejection</strong> yang tajam dan jelas.</p>

      <figure class="my-10 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl p-3 shadow-2xl relative group">
         <div class="absolute inset-0 bg-blue-500/5 group-hover:bg-transparent transition-colors rounded-3xl pointer-events-none"></div>
         <img src="/assets/snr v.jpg" alt="Contoh Major Swing" class="w-full object-cover rounded-2xl" />
         <figcaption class="text-center text-xs text-slate-400 mt-4 mb-2 italic">Gambar 1: Perbedaan Minor Swing (banyak noise) vs Major Swing (rejection tajam).</figcaption>
      </figure>

      <div class="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 my-8 shadow-lg hover:border-white/20 transition-all">
        <ul class="space-y-4">
          <li class="flex items-start gap-3"><span class="text-emerald-400 bg-emerald-500/10 p-1 rounded-md border border-emerald-500/20">✅</span><span class="mt-0.5"><strong>Valid:</strong> Harga turun tajam, lalu mantul naik dengan cepat (meninggalkan ekor panjang). Ini tanda ada order beli besar di situ.</span></li>
          <li class="flex items-start gap-3"><span class="text-rose-400 bg-rose-500/10 p-1 rounded-md border border-rose-500/20">❌</span><span class="mt-0.5"><strong>Lemah:</strong> Harga bergerak sideways lama dengan candle-candle kecil. Ini bukan SnR kuat, melainkan area konsolidasi yang rawan ditembus.</span></li>
        </ul>
      </div>

      <h3 class="text-2xl font-bold text-white mt-12 mb-6 drop-shadow-sm">#2 Fresh vs Tested Level</h3>
      <p>Banyak buku lama mengajarkan: <em>"Semakin sering disentuh, semakin kuat support tersebut."</em> Di pasar modern (terutama XAUUSD), konsep ini sering kali <strong>salah</strong>.</p>
      
      <figure class="my-10 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl p-3 shadow-2xl relative group">
         <div class="absolute inset-0 bg-blue-500/5 group-hover:bg-transparent transition-colors rounded-3xl pointer-events-none"></div>
         <img src="/assets/snr fresh.jpg" alt="Fresh Level" class="w-full object-cover rounded-2xl" />
         <figcaption class="text-center text-xs text-slate-400 mt-4 mb-2 italic">Gambar 2: Level Fresh (kiri) memantulkan harga, Level Tested berkali-kali (kanan) akhirnya jebol.</figcaption>
      </figure>

      <ul class="list-disc pl-5 space-y-3 text-slate-300 ml-4">
        <li><strong class="text-white">Fresh Level (Belum Disentuh):</strong> Probabilitas pantulan paling tinggi. Big player sering menaruh pending order di sini.</li>
        <li><strong class="text-white">Tested 1-2x:</strong> Masih cukup aman untuk entry.</li>
        <li><strong class="text-rose-400">Tested >3x:</strong> Hati-hati, area ini sudah "jenuh" (support bolong) dan likuiditasnya sudah habis diambil. Bersiap untuk Breakout.</li>
      </ul>

      <h3 class="text-2xl font-bold text-white mt-12 mb-6 drop-shadow-sm">#3 Gunakan "Zona", Bukan Garis Tipis</h3>
      <p>Harga tidak pernah berhenti tepat di angka 1920.00. Mungkin dia berhenti di 1919.80 atau 1920.50. Karena itu, jangan menggambar satu garis tipis. Gambarlah <strong>Kotak (Zone)</strong>.</p>

      <figure class="my-10 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl p-3 shadow-2xl relative group">
         <div class="absolute inset-0 bg-blue-500/5 group-hover:bg-transparent transition-colors rounded-3xl pointer-events-none"></div>
         <img src="/assets/snr zone.jpg" alt="Marking Zone" class="w-full object-cover rounded-2xl" />
         <figcaption class="text-center text-xs text-slate-400 mt-4 mb-2 italic">Gambar 3: Marking zone meliputi ujung shadow hingga body candle.</figcaption>
      </figure>

      <p>Zona memberikan ruang napas untuk pergerakan harga dan spread broker, sehingga kamu tidak mudah terkena "Fakeout" atau Stop Loss prematur.</p>
    `,
  },
  "teknik-entry": {
    title: "Teknik Entry: Kapan Harus Pencet Buy/Sell?",
    category: "Strategi",
    date: "10 Des 2025",
    readTime: "6 Menit Baca",
    author: "Kang Trader",
    image: "/assets/entry.jpg",
    content: `
      <p class="text-xl text-white font-medium mb-8 border-l-4 border-amber-500 pl-6 italic drop-shadow-sm">
        "Analisa yang benar bisa jadi sia-sia jika cara entry-nya salah. Beda kondisi market, beda pula pelurunya."
      </p>

      <p>Banyak trader pemula hanya tahu satu tombol: <strong>Eksekusi Langsung (Market Execution)</strong>. Padahal, platform trading menyediakan 3 jenis senjata utama: Eksekusi Langsung, Limit Order, dan Stop Order. Kapan harus menggunakan masing-masing? Mari kita bedah.</p>

      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#1 Eksekusi Langsung (Instant Execution)</h3>
      <p>Ini adalah tipe entry paling populer, terutama bagi para <strong>Scalper</strong>. Kamu menekan tombol Buy/Sell saat harga sudah berada di zona atau markingan yang kamu tunggu.</p>
      <p>Biasanya, trader menunggu <strong>Konfirmasi Candlestick</strong> di Timeframe kecil (M5/M15) sebelum entry. <br/>Contoh: Menunggu <em>Bearish Engulfing</em> untuk Sell.</p>

      <figure class="my-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl p-3 shadow-2xl">
         <img src="/assets/entry instan.jpg" alt="Market Execution" class="w-full h-auto object-cover rounded-2xl" />
         <figcaption class="text-center text-xs text-slate-400 mt-4 mb-2 italic">Gambar 1: Entry setelah candle konfirmasi close (Engulfing).</figcaption>
      </figure>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-lg hover:border-emerald-500/30 transition-colors"><span class="text-emerald-400 font-bold flex items-center gap-2 mb-3"><span class="text-xl">👍</span> Kelebihan</span><p class="text-sm leading-relaxed">Sangat fleksibel. Kita bisa memastikan dulu candle sudah close (konfirmasi) sebelum masuk, meminimalisir jebakan harga.</p></div>
        <div class="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-lg hover:border-rose-500/30 transition-colors"><span class="text-rose-400 font-bold flex items-center gap-2 mb-3"><span class="text-xl">👎</span> Kekurangan</span><p class="text-sm leading-relaxed">Rentan bias psikologis. Jika belum mahir, tangan sering gatal entry sebelum konfirmasi selesai. Juga rawan <em>slippage</em> saat news.</p></div>
      </div>

      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#2 Limit Order (Harga Diskon)</h3>
      <p>Ini adalah teknik "Menunggu Harga Diskon". Kita memasang jaring di harga yang lebih murah (untuk Buy) atau lebih mahal (untuk Sell) dari harga sekarang.</p>
      <p><strong>Kapan dipakai?</strong> Saat <strong>Trending Normal</strong>. <br/>Biasanya market (seperti Gold/XAUUSD) akan melakukan <em>retracement</em> (koreksi) dulu ke area SnR (RBS/SBR) atau level Fibonacci 0.618 / 0.786 sebelum lanjut trend.</p>

      <figure class="my-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl p-3 shadow-2xl">
         <img src="/assets/limit order.jpg" alt="Limit Order" class="w-full h-auto object-cover rounded-2xl" />
         <figcaption class="text-center text-xs text-slate-400 mt-4 mb-2 italic">Gambar 2: Pasang Buy Limit di area support/fibonacci, menunggu harga turun menjemput.</figcaption>
      </figure>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-lg hover:border-emerald-500/30 transition-colors"><span class="text-emerald-400 font-bold flex items-center gap-2 mb-3"><span class="text-xl">👍</span> Kelebihan</span><p class="text-sm leading-relaxed"><strong class="text-white">Risk to Reward (RR) Terbaik.</strong> Karena kita masuk di pucuk koreksi, jarak Stop Loss jadi sangat tipis dan target profit lebar.</p></div>
        <div class="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-lg hover:border-rose-500/30 transition-colors"><span class="text-rose-400 font-bold flex items-center gap-2 mb-3"><span class="text-xl">👎</span> Kekurangan</span><p class="text-sm leading-relaxed">Sering ditinggal market. Kadang harga tidak menjemput order kita (kurang 1-2 pip) lalu langsung terbang ke target. Sakit tapi tidak berdarah.</p></div>
      </div>

      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#3 Stop Order (Mengejar Kereta)</h3>
      <p>Kebalikan dari Limit, ini adalah teknik "Mengejar Kereta". Kita memasang order di atas harga sekarang (Buy Stop) atau di bawah harga sekarang (Sell Stop).</p>
      <p><strong>Kapan dipakai?</strong> Saat <strong>Trending Kuat (Strong Momentum)</strong> atau Breakout. <br/>Dalam kasus Gold yang sedang trending parah, harga seringkali <strong>jarang retracement</strong>. Jika menunggu Limit, kita pasti ketinggalan. Stop order memastikan kita ikut terbawa arus.</p>

      <figure class="my-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl p-3 shadow-2xl">
         <img src="/assets/stop order.jpg" alt="Stop Order" class="w-full h-auto object-cover rounded-2xl" />
         <figcaption class="text-center text-xs text-slate-400 mt-4 mb-2 italic">Gambar 3: Pasang Buy Stop di atas resistance. Order aktif saat harga menembus (breakout).</figcaption>
      </figure>
    `,
  },
  "psikologi-trading": {
    title: "Mengatur Emosi: Trading Tanpa Jantung Berdebar",
    category: "Psikologi",
    date: "11 Des 2025",
    readTime: "8 Menit Baca",
    author: "Kang Trader",
    image: "/assets/psikologi.jpg",
    content: `
      <p class="text-xl text-white font-medium mb-8 border-l-4 border-purple-500 pl-6 italic drop-shadow-sm">
        "Trading itu 10% Buy, 10% Sell, dan 80% Menunggu. Jika kamu merasa trading itu seru dan memacu adrenalin seperti judi, berarti kamu sedang melakukan kesalahan."
      </p>

      <p>Pernahkah kamu mengalami tangan berkeringat dingin saat melihat floating minus? Atau buru-buru menutup posisi saat profit baru sedikit, tapi membiarkan loss melebar sampai Margin Call? Itu bukan masalah strategi, itu masalah <strong>Psikologi</strong>.</p>

      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#1 Kenapa Jantung Berdebar?</h3>
      <p>Jawabannya sederhana: <strong>Lot kamu terlalu besar.</strong></p>
      <p>Ketika kamu entry dengan resiko yang tidak siap kamu tanggung, alam bawah sadar akan mengirim sinyal bahaya (cemas). Coba turunkan lot menjadi 0.01 atau sesuaikan dengan aturan 1%. Jika kamu entry dan bisa tidur nyenyak, berarti lot-mu sudah pas.</p>

      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#2 FOMO (Fear of Missing Out)</h3>
      <p>Ini terjadi ketika kamu melihat candle besar panjang (Marubozu) bergerak cepat, lalu kamu panik: <em>"Wah, harga terbang! Aku harus ikut Buy sekarang atau ketinggalan!"</em></p>
      
      <figure class="my-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl p-3 shadow-2xl">
         <img src="/assets/psikologi - fomo.jpg" alt="FOMO Chart" class="w-full h-auto object-cover rounded-2xl" />
         <figcaption class="text-center text-xs text-slate-400 mt-4 mb-2 italic">Gambar: Mengejar harga yang sudah terbang biasanya berakhir nyangkut di pucuk.</figcaption>
      </figure>

      <div class="bg-rose-500/10 backdrop-blur-xl border border-rose-500/30 p-8 rounded-3xl my-6 shadow-[0_0_30px_rgba(225,29,72,0.1)]">
         <p class="text-rose-400 text-lg font-bold mb-3 flex items-center gap-2">🚫 Akibatnya:</p>
         <p class="text-base text-slate-300">Kamu entry di "pucuk". Begitu kamu klik Buy, harga langsung koreksi turun. Kamu panik, lalu Cut Loss.</p>
      </div>
      <p><strong>Solusi:</strong> Biarkan saja. Market akan selalu ada besok. Lebih baik ketinggalan momen daripada kehilangan uang.</p>

      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#3 Revenge Trading (Balas Dendam)</h3>
      <p>Setelah kena Stop Loss (SL), kamu merasa marah pada market. <em>"Sialan, harusnya naik! Aku akan Buy lagi dengan lot 2x lipat biar rugi tadi langsung balik modal!"</em></p>

      <figure class="my-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl p-3 shadow-2xl">
         <img src="/assets/revenge.jpg" alt="Revenge Trading" class="w-full h-auto object-cover rounded-2xl" />
         <figcaption class="text-center text-xs text-slate-400 mt-4 mb-2 italic">Gambar: Memperbesar lot karena emosi adalah jalan tercepat menuju Margin Call.</figcaption>
      </figure>

      <p>Ini adalah cara tercepat menghancurkan akun. Saat kamu marah, IQ trading kamu turun drastis. Kamu tidak lagi menganalisa, kamu sedang berjudi.</p>
      <p><strong>Solusi:</strong> Tutup laptop. Matikan MT4. Pergi keluar, ngopi, atau tidur. Jangan buka chart minimal 2 jam setelah loss besar. Terima loss sebagai biaya bisnis.</p>

      <div class="mt-12 p-10 bg-white/5 backdrop-blur-xl border border-white/10 border-l-4 border-l-purple-500 rounded-3xl shadow-2xl hover:bg-white/10 transition-colors">
        <h3 class="text-2xl font-bold text-white mb-4">Tips "Zen" ala KangTrader:</h3>
        <ul class="list-disc pl-5 mt-2 space-y-3 text-slate-300">
          <li><strong class="text-white">Trading itu Membosankan:</strong> Jika jantungmu berdebar kencang, berarti kamu sedang berjudi, bukan bisnis.</li>
          <li><strong class="text-white">Jurnal adalah Kunci:</strong> Mencatat emosi di jurnal membantumu mengenali pola perilaku burukmu sendiri.</li>
          <li><strong class="text-white">No Setup = No Trade:</strong> Jangan memaksakan entry jika market sedang tidak jelas (sideways/choppy). Uang tunai (No position) juga adalah posisi.</li>
        </ul>
      </div>
    `,
  },
  "kesalahan-pemula": {
    title: "7 Kesalahan Fatal Trader Pemula",
    category: "Pemula",
    date: "12 Des 2025",
    readTime: "8 Menit Baca",
    author: "Kang Trader",
    image: "/assets/mistake.jpg",
    content: `
      <p class="text-xl text-white font-medium mb-8 border-l-4 border-rose-500 pl-6 italic drop-shadow-sm">
        "Orang pintar belajar dari kesalahannya sendiri. Orang bijak belajar dari kesalahan orang lain. Jangan sampai akunmu habis hanya untuk membayar 'uang sekolah' di market."
      </p>

      <p>Lebih dari 90% trader pemula gagal dan kehilangan seluruh modalnya dalam 90 hari pertama. Angka ini mengerikan, tapi nyata. Setelah saya amati, ada 7 dosa besar yang paling sering dilakukan trader pemula di Indonesia. Berikut adalah masalahnya, dan <strong>Solusinya</strong>.</p>

      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#1 Salah Memilih Mentor (Fake Guru)</h3>
      <p>Dulu, fake guru identik dengan pamer mobil mewah (Flexing). Sekarang, muncul tren baru yang lebih berbahaya: <strong>Mentor yang menormalisasi Full Margin</strong> dan "Flip Akun" ($10 jadi $1000). Pemula mengira ini standar industri, padahal ini murni judi.</p>
      
      <div class="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 border-l-4 border-l-emerald-500 my-6 shadow-xl hover:bg-white/10 transition-colors">
         <p class="text-emerald-400 text-lg font-bold mb-2 flex items-center gap-2">✅ Cara Menghindarinya:</p>
         <p class="text-base text-slate-300 leading-relaxed">Cari mentor yang menekankan pada <strong>Proses & Resiko</strong>, bukan Hasil Instan. Jika mentor menyuruhmu entry tanpa Stop Loss atau pakai lot gajah, unfollow segera.</p>
      </div>

      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#2 Mental "Pengemis Signal"</h3>
      <p>Masuk ke grup Telegram VIP, lalu cuma copy-paste Buy/Sell dari admin tanpa tahu alasannya. Ini bukan trading, ini "joki". Selama kamu masih melirik sinyal orang lain untuk validasi, kamu tidak akan pernah berkembang.</p>
      
      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#3 Modal Kecil, Target Besar (Halu)</h3>
      <p><em>"Punya modal $100, target profit harian $10."</em> Banyak pemula meremehkan angka $10. Padahal, $10 dari $100 itu adalah <strong>10% per hari</strong>. Di dunia investasi profesional, target 10% sehari itu <strong>TIDAK WARAS</strong>.</p>
      
      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#4 Strategy Hopping (Gonta-ganti Teknik)</h3>
      <p>Minggu ini pakai SMC, loss 2 kali langsung ganti ke RSI. Loss lagi ganti ke Bollinger Bands. Ini disebut <strong>Cycle of Doom</strong>. Kamu jadi "Jack of all trades, master of none".</p>
      
      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#5 Full Margin / Over-Leverage</h3>
      <p>Memasang lot gajah (misal 0.10 lot di modal $100) dengan harapan cepat kaya. Harga bergerak lawan arah sedikit saja, akun langsung <em>Margin Call</em> (MC).</p>
      
      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#6 "Anti Cut-Loss" (Floating Abadi)</h3>
      <p>Takut merealisasikan kerugian, akhirnya menahan posisi floating minus berhari-hari. Berharap harga berbalik (Hope Trading).</p>
      
      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#7 Judi saat News (NFP/CPI)</h3>
      <p>Mencoba menebak arah candle saat berita besar rilis (NFP, FOMC) tanpa memperhitungkan <em>slippage</em> dan pelebaran <em>spread</em>.</p>
    `,
  },
  "lulus-propfirm": {
    title: "Strategi Lulus Challenge Propfirm (Tanpa FOMO)",
    category: "Propfirm",
    date: "13 Des 2025",
    readTime: "7 Menit Baca",
    author: "Kang Trader",
    image: "/assets/propfirm.jpg",
    content: `
      <p class="text-xl text-white font-medium mb-8 border-l-4 border-indigo-500 pl-6 italic drop-shadow-sm">
        "Propfirm tidak mencari trader yang bisa profit 100% dalam semalam. Mereka mencari Risk Manager yang bisa profit konsisten tanpa menghancurkan akun."
      </p>

      <p>Banyak trader gagal challenge bukan karena tidak bisa trading, tapi karena <strong>Buru-buru</strong>. Mereka ingin lulus fase evaluasi dalam 3 hari, akhirnya melakukan over-lot dan terkena pelanggaran batas kerugian harian (Daily Drawdown).</p>
      <p>Berita baiknya: Sebagian besar Propfirm modern sekarang <strong>Unlimited Trading Days</strong>. Jadi ubah mindsetmu: <em class="text-indigo-300">"Slow but Sure".</em></p>

      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#1 Musuh Utama: Daily Drawdown</h3>
      <p>Jangan tertipu dengan angka akun $10.000. Jika aturan Daily Drawdown adalah 5%, maka modal real kamu sebenarnya hanya <strong>$500</strong>. Jika kamu loss $500 dalam sehari, akunmu hangus. Jadi, jangan menghitung resiko berdasarkan $10.000, tapi hitunglah berdasarkan $500 tersebut.</p>
      
      <figure class="my-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl p-3 shadow-2xl">
         <img src="/assets/daily dd .jpg" alt="Daily Drawdown Logic" class="w-full h-auto object-cover rounded-2xl" />
         <figcaption class="text-center text-xs text-slate-400 mt-4 mb-2 italic">Gambar: Modal sebenarnya adalah jarak harga ke batas Daily Drawdown.</figcaption>
      </figure>

      <div class="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 border-l-4 border-l-blue-500 my-8 shadow-xl hover:bg-white/10 transition-colors">
         <p class="text-blue-400 text-lg font-bold mb-2 flex items-center gap-2">💡 Rumus Aman:</p>
         <p class="text-base text-slate-300 leading-relaxed">Gunakan resiko maksimal <strong>0.5% - 1% per trade</strong>. Dengan begitu, kamu butuh 5-10 kali loss beruntun di hari yang sama untuk gagal. Sangat kecil kemungkinannya jika kamu disiplin.</p>
      </div>

      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#2 Bangun "Buffer" Terlebih Dahulu</h3>
      <p>Jangan langsung mengejar target 8% atau 10%. Fokuslah dulu untuk mendapatkan profit <strong>+2% sampai +3%</strong> di awal. Kenapa? Karena +2% ini adalah "bantalan" (Buffer). Jika setelah itu kamu mengalami losing streak, kamu hanya akan kembali ke titik impas (Break Even), bukan minus.</p>

      <h3 class="text-2xl font-bold text-white mt-12 mb-4 drop-shadow-sm">#3 Baca Aturan Main (Rulebook)</h3>
      <p>Setiap propfirm punya aturan unik. Ada yang melarang trading saat News (2 menit sebelum/sesudah), melarang Martingale, atau mewajibkan Stop Loss. Sakit rasanya sudah profit target tercapai, tapi dianulir karena melanggar aturan sepele.</p>

      <div class="mt-12 p-12 bg-white/5 backdrop-blur-xl border border-amber-500/30 hover:border-amber-500/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.2)] rounded-3xl text-center relative overflow-hidden group transition-all duration-500 shadow-2xl">
        <div class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
        <h3 class="text-3xl font-black text-white mb-3 relative z-10">Bingung Pilih Propfirm?</h3>
        <p class="text-slate-400 mb-8 max-w-lg mx-auto relative z-10 leading-relaxed">Saya sudah merangkum dan mereview propfirm terbaik yang aman dan aturan tradingnya bersahabat bagi trader Indonesia.</p>
        <a href="/review-propfirm" class="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-bold px-8 py-4 rounded-xl hover:from-amber-400 hover:to-yellow-300 transition shadow-lg shadow-amber-500/20 relative z-10 hover:scale-105">
          <span class="text-xl">🏆</span> Lihat Rekomendasi Propfirm
        </a>
      </div>
    `,
  },
  default: {
    title: "Materi Sedang Disiapkan",
    category: "Coming Soon",
    date: "-",
    author: "Admin",
    image: null,
    content:
      "<div class='p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl text-center shadow-xl'><p class='text-lg text-slate-300'>Mohon maaf, materi lengkap untuk topik ini sedang dalam proses penulisan. Silakan cek kembali nanti!</p></div>",
  },
};

export default function EdukasiPost() {
  const params = useParams();
  const slug = params.slug as string;
  const data = articles[slug] || articles["default"];

  return (
    <main className="min-h-screen pt-32 pb-20 text-slate-200 relative overflow-hidden">
      {/* --- LAMPU SOROT RAHASIA (UNTUK EFEK KACA) --- */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[700px] h-[700px] bg-purple-600/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 backdrop-blur-md z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <PageTransition>
        <article className="max-w-3xl mx-auto px-6 relative z-10">
          {/* Back Button (Glass Pill) */}
          <Link
            href="/edukasi"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-slate-300 hover:text-amber-400 hover:border-amber-500/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all shadow-lg group mb-10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Kembali ke Edukasi</span>
          </Link>

          {/* Header Artikel */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 border-b border-white/10 pb-10"
          >
            <div className="flex gap-2 mb-6">
              <span className="px-4 py-1.5 bg-amber-500/10 backdrop-blur-md text-amber-500 text-xs font-bold rounded-full border border-amber-500/20 uppercase tracking-widest shadow-inner">
                {data.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight drop-shadow-sm tracking-tight">
              {data.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm text-slate-400 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-fit shadow-inner">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-500" />
                <span className="font-medium text-slate-300">
                  {data.author}
                </span>
              </div>
              <div className="hidden md:block w-px h-4 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>{data.date}</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{data.readTime || "5 min read"}</span>
              </div>
            </div>
          </motion.header>

          {/* --- GAMBAR UTAMA (HERO IMAGE) --- */}
          {data.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl overflow-hidden mb-14 border border-white/10 bg-white/5 backdrop-blur-xl p-3 shadow-2xl relative group"
            >
              <div className="absolute inset-0 bg-amber-500/10 group-hover:bg-transparent transition duration-700 pointer-events-none rounded-3xl"></div>
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </motion.div>
          )}

          {/* --- ISI KONTEN (TERMASUK GAMBAR INLINE YG SUDAH DI-GLASSMORPHISM) --- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed 
                      prose-headings:text-white prose-a:text-amber-500 hover:prose-a:text-amber-400 prose-strong:text-white prose-p:mb-6"
          >
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </motion.div>

          {/* Footer Artikel */}
          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
              <Tag className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-slate-400 font-medium tracking-wide">
                Tags:{" "}
                <span className="text-slate-300">
                  Trading, Edukasi, {data.category}
                </span>
              </span>
            </div>

            <button className="flex items-center justify-center w-full md:w-auto gap-2 px-8 py-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-slate-300 font-bold hover:text-white hover:border-blue-500/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all shadow-lg group">
              <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Bagikan Artikel</span>
            </button>
          </div>
        </article>
      </PageTransition>
    </main>
  );
}
