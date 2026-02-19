"use client";

import {
  Check,
  X,
  Trophy,
  ShieldAlert,
  Zap,
  Globe,
  TrendingUp,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import PageTransition from "@/components/PageTransition";

// --- ANIMASI CONFIG ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ReviewPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 text-slate-200 relative overflow-hidden">
      {/* --- LAMPU SOROT RAHASIA (UNTUK EFEK KACA) --- */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* --- BUNGKUS KONTEN DENGAN ANIMASI SLOW --- */}
      <PageTransition>
        {/* Konten Utama (Diberi relative z-10 agar berada di atas lampu sorot) */}
        <div className="max-w-6xl mx-auto px-6 space-y-24 relative z-10">
          {/* HEADER */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                Review
              </span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-600">
                Propfirm
              </span>
            </h1>
            <p className="text-lg text-slate-400">
              Review jujur berdasarkan pengalaman pribadi. Tidak ada yang
              sempurna, tapi ini adalah{" "}
              <span className="text-slate-200 font-bold">Top 3 Pilihan</span>{" "}
              yang paling masuk akal untuk trader Indonesia.
            </p>
          </motion.div>

          {/* --- TOP 3 CARDS (THE5ERS, FTMO, FUNDING PIPS) --- */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* 1. THE5ERS */}
            <PropCard
              logo="/assets/the5ers.webp"
              title="The5ers"
              rating="4.9"
              badge="BEST OVERALL"
              badgeColor="bg-amber-500 text-slate-900"
              desc="Pilihan utama saya untuk High Stakes Challenge. Gaji bulanan & Growth Plan yang jelas."
              pros={[
                "Instant Funding Available",
                "Gaji Bulanan (High Stakes)",
                "Rule Paling Jelas",
              ]}
              cons={["Biaya sedikit lebih tinggi"]}
              link="https://the5ers.com?ref=kangtrader"
              color="amber"
            />

            {/* 2. FTMO */}
            <PropCard
              logo="/assets/ftmo.webp"
              title="FTMO"
              rating="4.8"
              badge="LEGENDARY"
              badgeColor="bg-purple-500 text-white"
              desc="Raja propfirm dengan reputasi terbaik. Pilihan paling aman jika budget bukan masalah."
              pros={[
                "Reputasi Terbaik (No Scam)",
                "Swing Account Ada",
                "Dashboard Canggih",
              ]}
              cons={["Biaya Termahal (€540)", "Target Profit Tinggi (10%)"]}
              link="https://ftmo.com/en/"
              color="purple"
            />

            {/* 3. FUNDING PIPS */}
            <PropCard
              logo="/assets/fundingpips.webp"
              title="Funding Pips"
              rating="4.7"
              badge="BUDGET KING"
              badgeColor="bg-emerald-500 text-slate-900"
              desc="Solusi untuk trader dengan modal terbatas. Tantangan murah dengan leverage tinggi."
              pros={[
                "Biaya Termurah ($399)",
                "Leverage Tinggi",
                "Waktu Trading Unlimited",
              ]}
              cons={["Reputasi Belum Se-senior FTMO", "Sering Maintenance"]}
              link="https://app.fundingpips.com/register?ref=1d36d65a"
              color="emerald"
            />
          </motion.section>

          {/* --- COMPARISON TABLE --- */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3 mb-8 justify-center">
              <TrendingUp className="w-8 h-8 text-amber-500" />
              <h2 className="text-3xl font-bold text-white">
                Head-to-Head Comparison
              </h2>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-black/40 backdrop-blur-md text-slate-200 uppercase font-bold text-xs tracking-wider border-b border-white/10">
                  <tr>
                    <th className="px-6 py-5">Fitur (Akun 100k)</th>
                    <th className="px-6 py-5 text-amber-500 text-base drop-shadow-sm">
                      The5ers
                    </th>
                    <th className="px-6 py-5 text-purple-400 text-base drop-shadow-sm">
                      FTMO
                    </th>
                    <th className="px-6 py-5 text-emerald-400 text-base drop-shadow-sm">
                      Funding Pips
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <TableRow
                    feature="Biaya Challenge"
                    t5="$495"
                    ftmo="€540 (~$580)"
                    fp="$399"
                    highlight="fp"
                  />
                  <TableRow
                    feature="Profit Target (P1 / P2)"
                    t5="8% / 5%"
                    ftmo="10% / 5%"
                    fp="8% / 5%"
                    highlight="t5"
                  />
                  <TableRow
                    feature="Max Drawdown"
                    t5="10% (Static)"
                    ftmo="10% (Static)"
                    fp="10% (Trailing)"
                    highlight="t5"
                  />
                  <TableRow
                    feature="Daily Drawdown"
                    t5="5% (Equity Based)"
                    ftmo="5% (Balance Based)"
                    fp="5%"
                    highlight="ftmo"
                  />
                  <TableRow
                    feature="Payout"
                    t5="On Demand"
                    ftmo="Bi-Weekly"
                    fp="Weekly"
                    highlight="t5"
                  />
                  <TableRow
                    feature="Gaji Bulanan?"
                    t5="YA (High Stakes)"
                    ftmo="TIDAK"
                    fp="TIDAK"
                    highlight="t5"
                  />
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* --- TIPS LULUS --- */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <TipCard
              icon={<Zap className="w-8 h-8 text-amber-500" />}
              title="Strategi Lulus (Tanpa FOMO)"
              desc="Jangan kejar target 8% dalam seminggu. Propfirm modern memberikan waktu Unlimited. Gunakan lot kecil (0.5% risk) dan biarkan compound interest bekerja. Pelan asal selamat."
            />
            <TipCard
              icon={<ShieldAlert className="w-8 h-8 text-rose-500" />}
              title="Jebakan Daily Drawdown"
              desc="Banyak trader gagal bukan karena total loss, tapi karena melanggar batas harian 5%. Hitung ulang Equity setiap pagi. Jika equity $99,000, maka batas loss hari itu bukan dari $100,000!"
            />
          </motion.section>

          {/* --- DISCLAIMER --- */}
          <div className="bg-white/5 backdrop-blur-md border border-rose-500/20 p-6 rounded-2xl text-center shadow-lg">
            <p className="text-sm text-rose-200/70 leading-relaxed">
              <strong>Disclaimer:</strong> Trading Forex & Propfirm berisiko
              tinggi. Data di atas bisa berubah sewaktu-waktu sesuai kebijakan
              perusahaan. Pastikan Anda membaca T&C terbaru di website
              masing-masing sebelum mendaftar. Saya hanya menyajikan review
              edukasi, bukan saran investasi.
            </p>
          </div>
        </div>
      </PageTransition>
    </main>
  );
}

// --- KOMPONEN KECIL ---

function PropCard({
  logo,
  title,
  rating,
  badge,
  badgeColor,
  desc,
  pros,
  cons,
  link,
  color,
}: any) {
  // Tambahan Hover Glow yang disesuaikan warnanya
  const borderColors: any = {
    amber:
      "hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
    purple:
      "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    emerald:
      "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
  };

  const btnColors: any = {
    amber:
      "bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-900 shadow-amber-500/20",
    purple:
      "bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white shadow-purple-500/20",
    emerald:
      "bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-900 shadow-emerald-500/20",
  };

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      // Ubah bg-slate-900 ke bg-white/5 untuk efek kaca premium
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden transition-all duration-300 shadow-lg group ${borderColors[color]}`}
    >
      {/* Badge */}
      <div
        className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-[10px] font-bold tracking-wider shadow-sm ${badgeColor}`}
      >
        {badge}
      </div>

      <div className="flex justify-between items-start mb-4 mt-2">
        {/* LOGO CONTAINER */}
        <div className="w-16 h-16 flex items-center justify-start rounded-xl overflow-hidden bg-white/5 border border-white/5 p-2 backdrop-blur-sm">
          <img
            src={logo}
            alt={title}
            className="w-full h-full object-contain object-center drop-shadow-md"
            onError={(e: any) => (e.target.style.display = "none")}
          />
        </div>

        <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/10 backdrop-blur-sm h-fit">
          <span className="text-amber-500 text-sm">★</span>
          <span className="text-xs font-bold text-slate-200">{rating}</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-sm text-slate-400 mb-6 min-h-[60px] leading-relaxed">
        {desc}
      </p>

      {/* Pros */}
      <div className="space-y-3 mb-8 flex-grow">
        {pros.map((item: string, i: number) => (
          <div
            key={i}
            className="flex gap-2 items-start text-xs text-slate-300"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{item}</span>
          </div>
        ))}
        {/* Cons */}
        {cons.map((item: string, i: number) => (
          <div
            key={i}
            className="flex gap-2 items-start text-xs text-slate-400/80"
          >
            <X className="w-4 h-4 text-rose-500/80 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{item}</span>
          </div>
        ))}
      </div>

      <a
        href={link}
        target="_blank"
        className={`w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] ${btnColors[color]}`}
      >
        Daftar Sekarang
      </a>
    </motion.div>
  );
}

function TableRow({ feature, t5, ftmo, fp, highlight }: any) {
  // Ganti background abu-abu dengan putih transparan
  const getStyle = (key: string) =>
    key === highlight
      ? "font-bold text-white bg-white/10 rounded-lg backdrop-blur-sm shadow-inner"
      : "text-slate-400";

  return (
    <tr className="hover:bg-white/5 transition-colors group">
      <td className="px-6 py-4 font-medium text-slate-300 group-hover:text-white transition-colors">
        {feature}
      </td>
      <td className={`px-6 py-4 ${getStyle("t5")}`}>{t5}</td>
      <td className={`px-6 py-4 ${getStyle("ftmo")}`}>{ftmo}</td>
      <td className={`px-6 py-4 ${getStyle("fp")}`}>{fp}</td>
    </tr>
  );
}

function TipCard({ icon, title, desc }: any) {
  return (
    <motion.div
      variants={fadeInUp}
      // Efek kaca untuk TipCard + Hover Glow Amber
      className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex gap-5 items-start hover:border-amber-500/40 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all group"
    >
      <div className="shrink-0 p-3 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 group-hover:scale-110 group-hover:border-amber-500/50 transition-all shadow-inner">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-white text-lg mb-2 group-hover:text-amber-400 transition-colors">
          {title}
        </h4>
        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}
