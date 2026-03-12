"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, BarChart2, ShieldCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { getLiveStats } from "@/app/actions";
import { TradeStats } from "@/types";

// Dynamic Import untuk section bawah agar menghemat bundle size di awal
const WhySection = dynamic(() => import("@/components/WhySection"), {
  ssr: false,
  loading: () => <div className="h-20" />,
});

// --- CONFIG ANIMASI ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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
      {/* Background Glows */}
      <div className="absolute top-10 left-0 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* --- HERO SECTION --- */}
        <section className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-xs font-medium text-amber-500 mb-6 shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Live Documentation Journey
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 drop-shadow-sm">
              Real Journey Menuju
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-500 to-orange-600 drop-shadow-md">
              Funded Trader
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Dokumentasi nyata perjalanan trading — jurnal jujur, evaluasi
            kesalahan, dan proses membangun konsistensi. <br />
            <span className="text-slate-200 font-medium">
              Transparan. Terukur. Realistis.
            </span>
          </p>

          {/* Buttons with Hover Effects */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/journal">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-xl flex items-center gap-2 
                 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 
                 text-slate-950 font-bold tracking-wide transition-all duration-300
                 shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_35px_rgba(251,191,36,0.6)]"
              >
                <span className="relative z-10">Lihat Jurnal Trading</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>

            <Link href="/review-propfirm">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-xl text-slate-200 font-medium rounded-xl 
                 border border-white/10 hover:bg-white/10 hover:border-white/20 
                 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 flex items-center gap-2"
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
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32"
        >
          <StatsCard
            icon={<ShieldCheck className="w-24 h-24 text-amber-500/80" />}
            title="Live Balance"
            value={loading ? "..." : formatCurrency(stats?.balance || 0)}
            subValue="Verified System"
            subIcon={<ShieldCheck className="w-3 h-3" />}
            subColor="text-emerald-400"
            hoverColor="hover:border-amber-500/50"
            glowColor="hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          />

          <StatsCard
            icon={<BarChart2 className="w-24 h-24 text-blue-500/80" />}
            title="Win Rate"
            value={loading ? "..." : stats?.winRate?.toFixed(1) + "%"}
            subValue={loading ? "..." : `${stats?.totalTrades} Total Log Trade`}
            subColor="text-slate-300"
            hoverColor="hover:border-blue-500/50"
            glowColor="hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
          />

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 
                       hover:bg-white/10 hover:border-blue-500/50 
                       hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative z-10">
              <p className="text-slate-400 text-xs font-bold uppercase mb-2">
                Status Akun
              </p>
              <p className="text-4xl font-extrabold text-blue-400">ON GOING</p>
            </div>
            <Link
              href="/journal"
              className="text-xs text-slate-300 hover:text-white underline underline-offset-4 mt-4 block relative z-10"
            >
              Lihat Detail Transaksi →
            </Link>
          </motion.div>
        </motion.section>

        {/* --- WHY SECTION --- */}
        <WhySection />
      </div>
    </main>
  );
}

function StatsCard({
  icon,
  title,
  value,
  subValue,
  subIcon,
  subColor,
  hoverColor,
  glowColor,
}: any) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      className={`p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 
                 hover:bg-white/10 ${hoverColor} ${glowColor} transition-all group relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      <div className="relative z-10">
        <p className="text-slate-400 text-xs font-bold uppercase mb-2">
          {title}
        </p>
        <p className="text-4xl font-extrabold text-white mb-2">{value}</p>
        <div
          className={`flex items-center gap-2 ${subColor} text-xs font-medium w-fit px-3 py-1.5 rounded-full bg-black/30`}
        >
          {subIcon}
          <span>{subValue}</span>
        </div>
      </div>
    </motion.div>
  );
}
