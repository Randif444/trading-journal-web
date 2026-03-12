"use client";

import { motion, Variants } from "framer-motion";
import { TrendingUp, BookOpen, AlertTriangle, ShieldCheck } from "lucide-react";

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

export default function WhySection() {
  return (
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
          Di dunia trading yang penuh fleksing profit, saya memilih jalur sunyi:
          Transparansi.
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
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-amber-500/50 transition-all group"
    >
      <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-amber-400 transition-all mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
