"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  ShieldCheck,
  TrendingUp,
  BookOpen,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { getLiveStats } from "@/app/actions";
import { TradeStats } from "@/types";
import PageTransition from "@/components/PageTransition";

// --- CONFIG ANIMASI ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
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

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring", bounce: 0.4 },
  },
};

export default function Home() {
  const [stats, setStats] = useState<TradeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getLiveStats();
        setStats(data);
      } catch (error) {
        console.error("Gagal load data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <main className="min-h-screen pt-28 pb-20 text-slate-200 relative overflow-hidden">
      <div className="absolute top-10 left-0 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <PageTransition>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* --- HERO SECTION --- */}
          <section className="text-center mb-24">
            {/* Badge Live (Kartu Kaca) */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-xs font-medium text-amber-500 mb-6 shadow-xl cursor-default hover:scale-105 transition-transform duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Live Documentation Journey
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 drop-shadow-sm">
                Real Journey Menuju
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-500 to-orange-600 drop-shadow-md">
                Funded Trader
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Dokumentasi nyata perjalanan trading — jurnal jujur, evaluasi
              kesalahan, dan proses membangun konsistensi. <br />
              <span className="text-slate-200 font-medium">
                Transparan. Terukur. Realistis.
              </span>
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/journal">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 rounded-xl flex items-center gap-2 shadow-[0_0_30px_rgba(251,191,36,0.3)] bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 text-slate-950 font-bold tracking-wide"
                >
                  <span className="relative">Lihat Jurnal Trading</span>
                  <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>

              <Link href="/review-propfirm">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 backdrop-blur-xl text-slate-200 font-medium rounded-xl border border-white/10 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all flex items-center gap-2"
                >
                  Rekomendasi Propfirm
                </motion.div>
              </Link>
            </div>
          </section>
          {/* --- LIVE STATS SECTION --- */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32"
          >
            <StatsCard
              icon={<ShieldCheck className="w-24 h-24 text-amber-500/80" />}
              title="Live Balance"
              value={
                loading ? "Loading..." : formatCurrency(stats?.balance || 0)
              }
              subValue="Verified System"
              subIcon={<ShieldCheck className="w-3 h-3" />}
              subColor="text-emerald-400"
            />

            <StatsCard
              icon={<BarChart2 className="w-24 h-24 text-blue-500/80" />}
              title="Win Rate"
              value={loading ? "..." : stats?.winRate?.toFixed(1) + "%"}
              subValue={
                loading ? "..." : `${stats?.totalTrades} Total Log Trade`
              }
              subColor="text-slate-300"
            />

            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all relative overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 drop-shadow">
                  Status Akun
                </p>
                <p className="text-4xl font-extrabold text-blue-400 mb-2 drop-shadow-md">
                  ON GOING
                </p>
              </div>
              <Link
                href="/journal"
                className="text-xs text-slate-300 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors mt-4 block relative z-10"
              >
                Lihat Detail Transaksi →
              </Link>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity className="w-24 h-24 text-blue-400" />
              </div>
            </motion.div>
          </motion.section>

          {/* --- WHY SECTION --- */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="border-t border-white/10 pt-16 relative"
          >
            <motion.div
              variants={fadeInUp}
              className="text-center mb-12 relative z-10"
            >
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                  Kenapa
                </span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-600">
                  Kang Trader?
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto rounded-full mb-4 opacity-80"></div>
              <p className="text-slate-400 max-w-xl mx-auto">
                Di dunia trading yang penuh fleksing profit, saya memilih jalur
                sunyi: Transparansi.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              <FeatureCard
                icon={<TrendingUp className="w-6 h-6" />}
                title="Real Process"
                desc="Bukan cuma profit. Saya bagikan proses jatuh bangun & kesalahan di baliknya secara jujur."
              />
              <FeatureCard
                icon={<BookOpen className="w-6 h-6" />}
                title="Full Transparency"
                desc="Semua trade dicatat. Semua emosi diakui. Tidak ada yang ditutup-tutupi."
              />
              <FeatureCard
                icon={<AlertTriangle className="w-6 h-6" />}
                title="Brutal Evaluation"
                desc="Kenapa WR 41% masih minus? Saya bedah dosa 'Re-entry Paksa' & 'Overtrade'."
              />
              <FeatureCard
                icon={<ShieldCheck className="w-6 h-6" />}
                title="Pro Mindset"
                desc="Bukan tempat cari sinyal. Ini tempat belajar berpikir dan bertindak seperti profesional."
              />
            </div>
          </motion.section>
        </div>
      </PageTransition>
    </main>
  );
}

// --- KOMPONEN KECIL (REUSABLE) ---

function StatsCard({ icon, title, value, subValue, subIcon, subColor }: any) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 drop-shadow">
        {title}
      </p>
      <p className="text-4xl font-extrabold text-white mb-2 drop-shadow-md">
        {value}
      </p>
      <div
        className={`flex items-center gap-2 ${subColor} text-xs font-medium w-fit px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/5`}
      >
        {subIcon}
        <span>{subValue}</span>
      </div>
    </motion.div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all group"
    >
      <div className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-amber-400 group-hover:border-amber-500/40 transition-all mb-4 shadow-inner">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
