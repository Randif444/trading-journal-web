"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; // KABEL KE SUPABASE
import { Search, BookOpen, Clock, ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import PageTransition from "@/components/PageTransition";

// --- ANIMASI ---
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.4 },
  },
};

export default function EdukasiPage() {
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- MANTRA PENARIK DATA DARI SUPABASE ---
  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal menarik data:", error);
      }

      if (data) {
        const colors = ["emerald", "blue", "amber", "purple", "rose", "indigo"];

        const formattedData = data.map((art: any, index: number) => {
          // Bikin URL ramah SEO dari judul jika slug tidak ada di database
          const generateSlug = art.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-");

          // Membersihkan tag HTML dari content untuk cuplikan (excerpt) di kartu depan
          const stripHtml = (html: string) => {
            const doc = new DOMParser().parseFromString(html, "text/html");
            return doc.body.textContent || "";
          };
          const cleanExcerpt =
            stripHtml(art.content || "").substring(0, 130) + "...";

          return {
            id: art.id,
            title: art.title,
            excerpt: cleanExcerpt,
            category: art.category || "Edukasi", // Narik Kategori Asli
            readTime: art.read_time || "5 Menit Baca", // Narik Read Time Asli
            date: new Date(art.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            icon: <BookOpen className="w-6 h-6" />,
            color: colors[index % colors.length],
            slug: art.slug || generateSlug, // Narik Slug Asli
          };
        });
        setArticles(formattedData);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  // Filter artikel berdasarkan search
  const filteredArticles = articles.filter(
    (art) =>
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen pt-32 pb-20 text-slate-200 relative overflow-hidden">
      {/* --- LAMPU SOROT RAHASIA (UNTUK EFEK KACA) --- */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* --- BUNGKUS KONTEN DENGAN ANIMASI SLOW --- */}
      <PageTransition>
        <div className="max-w-6xl mx-auto px-6 space-y-16 relative z-10">
          {/* --- HEADER --- */}
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
              <BookOpen className="w-8 h-8 text-white drop-shadow-md" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold mb-4"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                Pusat Edukasi
              </span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-600 drop-shadow-sm">
                Trading
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg"
            >
              Kumpulan materi teknikal, fundamental, dan psikologi. Gratis,
              tanpa kelas berbayar.
            </motion.p>

            {/* Search Bar (Kaca Hitam) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-md mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari materi (misal: psikologi)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-full py-4 pl-12 pr-6 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-500 shadow-inner"
              />
            </motion.div>
          </div>

          {/* --- ARTICLES GRID --- */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <ArticleCard key={article.id} data={article} />
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-slate-500 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 border-dashed">
                  <p>Belum ada artikel atau materi tidak ditemukan.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </PageTransition>
    </main>
  );
}

// --- KOMPONEN KARTU ARTIKEL (GLASSMORPHISM) ---
function ArticleCard({ data }: any) {
  // Konfigurasi dinamis untuk warna hover & shadow
  const colorStyles: any = {
    emerald: {
      text: "text-emerald-400",
      glow: "hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      iconHover:
        "group-hover:border-emerald-500/50 group-hover:text-emerald-300",
    },
    blue: {
      text: "text-blue-400",
      glow: "hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      iconHover: "group-hover:border-blue-500/50 group-hover:text-blue-300",
    },
    amber: {
      text: "text-amber-400",
      glow: "hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
      iconHover: "group-hover:border-amber-500/50 group-hover:text-amber-300",
    },
    purple: {
      text: "text-purple-400",
      glow: "hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      iconHover: "group-hover:border-purple-500/50 group-hover:text-purple-300",
    },
    rose: {
      text: "text-rose-400",
      glow: "hover:border-rose-500/40 hover:shadow-[0_0_30px_rgba(225,29,72,0.15)]",
      iconHover: "group-hover:border-rose-500/50 group-hover:text-rose-300",
    },
    indigo: {
      text: "text-indigo-400",
      glow: "hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
      iconHover: "group-hover:border-indigo-500/50 group-hover:text-indigo-300",
    },
  };

  const style = colorStyles[data.color] || colorStyles.emerald;

  return (
    <motion.article
      variants={item}
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300 group flex flex-col h-full hover:-translate-y-2 relative overflow-hidden ${style.glow}`}
    >
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        {data.icon}
      </div>

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div
          className={`p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-inner transition-all group-hover:scale-110 ${style.text} ${style.iconHover}`}
        >
          {data.icon}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
          {data.category}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-3 transition-colors line-clamp-2 group-hover:text-amber-400 relative z-10">
        <Link href={`/edukasi/${data.slug}`}>{data.title}</Link>
      </h3>

      <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 flex-grow relative z-10">
        {data.excerpt}
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto relative z-10">
        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded-md border border-white/5">
            <Clock className="w-3 h-3 text-slate-500" /> {data.readTime}
          </span>
          <span className="text-slate-500">{data.date}</span>
        </div>

        <Link
          href={`/edukasi/${data.slug}`}
          className="p-2.5 bg-black/40 border border-white/10 rounded-xl text-slate-400 hover:text-amber-400 hover:border-amber-500/40 hover:bg-white/10 transition-all shadow-inner group-hover:scale-110"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
}
