"use client";

import Link from "next/link";
import {
  User,
  Briefcase,
  Code,
  TrendingUp,
  Dumbbell,
  Target,
  Instagram,
  Github,
  Linkedin,
  Brain,
  AlertTriangle,
  Coffee,
  ArrowDown,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import PageTransition from "@/components/PageTransition";

// --- CONFIG ANIMASI (LEBIH "NENDANG" & MEMBAL) ---
const cardVariants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
    scale: 0.9,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const lineVariants: Variants = {
  hidden: { height: 0 },
  visible: {
    height: "100%",
    transition: { duration: 2, ease: "easeInOut" },
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 text-slate-200 relative overflow-hidden">
      {/* --- LAMPU SOROT RAHASIA (UNTUK EFEK KACA) --- */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* --- BUNGKUS KONTEN DENGAN ANIMASI SLOW --- */}
      <PageTransition>
        <div className="max-w-5xl mx-auto px-6 space-y-32 relative z-10">
          {/* --- HERO SECTION --- */}
          <motion.section
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}
            className="text-center relative"
          >
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_50px_rgba(245,158,11,0.3)] mb-8 relative group bg-black/40 backdrop-blur-md">
              <img
                src="/assets/kang.jpg"
                alt="Kang Trader"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 drop-shadow-sm">
                Tentang
              </span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-600 drop-shadow-md">
                KangTrader
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Bukan guru, bukan mentor. Hanya seorang{" "}
              <span className="text-slate-200 font-semibold border-b border-white/20 pb-0.5">
                Ex-Operator Pabrik
              </span>{" "}
              yang banting setir ke dunia{" "}
              <span className="text-blue-400 font-semibold drop-shadow">
                Tech
              </span>{" "}
              &{" "}
              <span className="text-emerald-400 font-semibold drop-shadow">
                Propfirm Trading
              </span>
              .
            </p>

            <div className="flex justify-center gap-6 mt-10">
              <SocialBtn
                href="https://instagram.com/m.randief"
                icon={<Instagram className="w-6 h-6" />}
                label="Instagram"
              />
              <SocialBtn
                href="#"
                icon={<Github className="w-6 h-6" />}
                label="Github"
              />
              <SocialBtn
                href="#"
                icon={<Linkedin className="w-6 h-6" />}
                label="LinkedIn"
              />
            </div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-16 text-slate-500 flex flex-col items-center gap-2 drop-shadow-sm"
            >
              <span className="text-xs uppercase tracking-widest font-bold">
                Scroll Story
              </span>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.section>

          {/* --- TRADING PHILOSOPHY --- */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div variants={cardVariants} className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                  Trading
                </span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-600">
                  Mindset
                </span>
              </h2>
              <p className="text-slate-400">
                Prinsip yang menyelamatkan psikologi saya.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PhilosophyCard
                icon={<Brain className="w-8 h-8 text-blue-400" />}
                title="Probabilitas > Prediksi"
                desc="Saya tidak tahu ke mana harga bergerak, dan saya tidak perlu tahu untuk bisa profit."
              />
              <PhilosophyCard
                icon={<AlertTriangle className="w-8 h-8 text-rose-400" />}
                title="Risk First"
                desc='Sebelum entry, saya tanya "Siap rugi berapa?", bukan "Bisa untung berapa?".'
              />
              <PhilosophyCard
                icon={<Coffee className="w-8 h-8 text-amber-500" />}
                title="Bosan itu Bagus"
                desc="Trading yang baik itu membosankan. Kalau jantung berdebar, berarti lot terlalu besar."
              />
            </div>
          </motion.section>

          {/* --- MY JOURNEY (TIMELINE MAJU) --- */}
          <section className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 border-b border-white/10 pb-6"
            >
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Target className="w-8 h-8 text-amber-500 drop-shadow-md" /> The
                Journey
              </h2>
              <p className="text-slate-400 mt-2">
                Dari pabrik, ke binary, hingga funded trader.
              </p>
            </motion.div>

            <div className="relative ml-4 md:ml-6 pb-20">
              {/* GARIS TIMELINE UTAMA */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={lineVariants}
                className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-white/10 via-amber-500/50 to-emerald-500/50 origin-top"
              ></motion.div>

              <div className="space-y-16">
                <TimelineItem
                  year="2021"
                  title="Awal Pahit: Binary Option"
                  role="Newbie Victim"
                  desc="Awal mengenal 'trading' lewat iklan Binary Option. Deposit $100 ludes dalam 2 hari. Fase 'Unconscious Incompetence' yang menjadi pelajaran mahal."
                  icon={<AlertTriangle className="w-5 h-5" />}
                  color="text-rose-400"
                />

                <TimelineItem
                  year="2021 - 2024"
                  title="Mental Baja di Pabrik"
                  role="Operator Produksi"
                  desc="4 Tahun ditempa disiplin shift malam di industri manufaktur elektronik. Di sini saya belajar bahwa uang tidak datang instan, tapi lewat konsistensi dan keringat."
                  icon={<Briefcase className="w-5 h-5" />}
                />

                <TimelineItem
                  year="2022"
                  title="Belajar Teknikal & Fundamental"
                  role="Learner"
                  desc="Mulai belajar trading yang benar (Forex/Saham). Fase pusing belajar SMC, SnR, dan Indikator. Masih sering rugi waktu dan uang, tapi mulai paham struktur pasar."
                  icon={<Brain className="w-5 h-5" />}
                />

                <TimelineItem
                  year="2023"
                  title="Menemukan 'Edge' Pertama"
                  role="Retail Trader"
                  desc="Berhenti mencari Holy Grail. Fokus di satu instrumen (Gold) dengan Risk 1%. Akun sempat tumbuh dari $216 ke $1000+, sebuah bukti bahwa sistem itu ada."
                  icon={<TrendingUp className="w-5 h-5" />}
                />

                <TimelineItem
                  year="2024"
                  title="Fase Pendewasaan"
                  role="Evaluator"
                  desc="Menyadari musuh terbesar bukan Market, tapi Diri Sendiri. Fokus memperbaiki psikologi: Stop Overtrade, Stop Revenge Trade."
                  icon={<Coffee className="w-5 h-5" />}
                />

                <TimelineItem
                  year="2025"
                  title="Lahirnya 'Kang Trader'"
                  role="Content Creator"
                  desc="Memutuskan untuk transparan. Mendokumentasikan perjalanan di TikTok & Web. Tidak malu share loss, tidak sombong saat profit."
                  icon={<Code className="w-5 h-5" />}
                />

                <TimelineItem
                  year="2026 - Now"
                  title="Propfirm Journey & Tech"
                  role="Trader & Developer"
                  desc="Fokus penuh menaklukkan challenge The5ers ($5k High Stakes). Menggabungkan skill Coding (Next.js) untuk menciptakan alat bantu trading sendiri."
                  icon={<Target className="w-5 h-5" />}
                  active={true}
                  color="text-emerald-400"
                />
              </div>
            </div>
          </section>

          {/* --- SKILLS & INTERESTS --- */}
          <motion.section
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Tech Stack (Glow Biru) */}
            <motion.div
              variants={cardVariants}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-blue-500/40 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl text-blue-400 group-hover:scale-110 group-hover:border-blue-500/50 transition-all shadow-inner">
                  <Code className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  Tech Stack
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <SkillBadge name="Next.js / React" color="blue" />
                <SkillBadge name="TypeScript" color="blue" />
                <SkillBadge name="Tailwind CSS" color="blue" />
                <SkillBadge name="Flutter / Dart" color="blue" />
              </div>
            </motion.div>

            {/* Life & Interests (Glow Hijau) */}
            <motion.div
              variants={cardVariants}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-emerald-500/40 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl text-emerald-400 group-hover:scale-110 group-hover:border-emerald-500/50 transition-all shadow-inner">
                  <Dumbbell className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Life & Interests
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <SkillBadge name="XAUUSD Specialist" color="emerald" />
                <SkillBadge name="Price Action" color="emerald" />
                <SkillBadge name="Gym / Bodybuilding" color="emerald" />
                <SkillBadge name="Stoic Mindset" color="emerald" />
              </div>
            </motion.div>
          </motion.section>

          {/* --- CONTACT CTA --- */}
          <motion.section
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-center pt-10 border-t border-white/10"
          >
            <p className="text-slate-400 mb-8 text-lg">
              Ada pertanyaan seputar perjalanan trading? atau Ngopi santai?
            </p>
            <motion.a
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(245, 158, 11, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              href="https://ig.me/m/m.randief"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-slate-900 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 rounded-2xl transition-all shadow-lg"
            >
              DM via Instagram
            </motion.a>
          </motion.section>
        </div>
      </PageTransition>
    </main>
  );
}

// --- KOMPONEN KECIL (REUSABLE) ---

function PhilosophyCard({ icon, title, desc }: any) {
  return (
    <motion.div
      variants={{
        offscreen: { y: 50, opacity: 0 },
        onscreen: {
          y: 0,
          opacity: 1,
          transition: { type: "spring", bounce: 0.4, duration: 1 },
        },
      }}
      whileHover={{ y: -10 }}
      className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl transition-all h-full flex flex-col items-center text-center group hover:bg-white/10 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] shadow-lg"
    >
      <div className="mb-6 bg-black/40 backdrop-blur-md w-16 h-16 flex items-center justify-center rounded-2xl border border-white/10 shadow-inner group-hover:scale-110 group-hover:border-amber-500/50 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function TimelineItem({
  year,
  title,
  role,
  desc,
  icon,
  active = false,
  color = "text-slate-500",
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, type: "spring" }}
      className="relative pl-10 md:pl-12 group"
    >
      {/* Dot di garis dengan animasi Glow */}
      <div
        className={`absolute -left-[9px] top-1 w-[18px] h-[18px] rounded-full border-4 ${active ? "bg-amber-500 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.8)] animate-pulse" : "bg-black/60 border-white/20 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]"} transition-all z-10 backdrop-blur-md`}
      ></div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
        <span
          className={`text-sm font-mono font-bold px-3 py-1 rounded-full border bg-black/40 backdrop-blur-sm w-fit shadow-inner ${active ? "text-amber-500 border-amber-500/30" : "text-slate-400 border-white/10"}`}
        >
          {year}
        </span>
        <h3
          className={`text-xl font-bold ${active ? "text-white" : "text-slate-300"} group-hover:text-amber-400 transition-colors`}
        >
          {title}
        </h3>
      </div>

      <div
        className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${color}`}
      >
        {icon} {role}
      </div>

      {/* Kotak Deskripsi Cerita (Glassmorphism) */}
      <p className="text-sm text-slate-400 leading-relaxed max-w-2xl bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/5 group-hover:border-white/20 group-hover:bg-white/10 transition-all shadow-lg">
        {desc}
      </p>
    </motion.div>
  );
}

function SkillBadge({ name, color }: { name: string; color: string }) {
  const colors: any = {
    blue: "hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50",
    emerald:
      "hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/50",
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl text-sm font-medium text-slate-300 cursor-default transition-all shadow-inner ${colors[color]}`}
    >
      {name}
    </motion.span>
  );
}

function SocialBtn({ href, icon, label }: any) {
  return (
    <motion.a
      whileHover={{
        y: -5,
        scale: 1.1,
      }}
      whileTap={{ scale: 0.9 }}
      href={href}
      target="_blank"
      className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-slate-400 hover:text-amber-400 hover:bg-white/10 hover:border-amber-500/40 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}
