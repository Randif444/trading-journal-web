"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  LogOut,
  PenTool,
  LayoutDashboard,
  PlusCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

export default function AdminDashboard() {
  const router = useRouter();
  const [loadingUser, setLoadingUser] = useState(true);

  // State untuk form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Edukasi");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  // State untuk notifikasi
  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    msg: string;
  }>({ type: "", msg: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // MANTRA CEK SECURITY: Pastikan yang masuk beneran udah login!
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        // Kalau ketahuan belum login, tendang balik ke halaman login!
        router.push("/admin/login");
      } else {
        setLoadingUser(false);
      }
    };
    checkUser();
  }, [router]);

  // Fungsi buat Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // Fungsi nyimpan artikel ke Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", msg: "" });

    // Bikin slug (URL) otomatis dari judul. Contoh: "Cara Profit" -> "cara-profit"
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const { error } = await supabase.from("articles").insert([
      {
        title,
        slug,
        category,
        image_url: imageUrl || null,
        content,
        author: "Kang Trader", // Default Author
        read_time: "5 Menit Baca", // Default Read Time
      },
    ]);

    if (error) {
      setStatus({ type: "error", msg: `Gagal publish: ${error.message}` });
    } else {
      setStatus({
        type: "success",
        msg: "Artikel berhasil di-publish ke dunia!",
      });
      // Bersihkan form setelah sukses
      setTitle("");
      setCategory("Edukasi");
      setImageUrl("");
      setContent("");
    }
    setIsSubmitting(false);
  };

  // Kalau masih loading ngecek gembok, tampilkan muter-muter
  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20 text-slate-200 relative overflow-hidden">
      {/* Efek Lampu Belakang */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <PageTransition>
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
          {/* HEADER ADMIN */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                <LayoutDashboard className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Ruang Kerja Admin
                </h1>
                <p className="text-xs text-amber-500 font-mono">
                  KangTrader Secure Network
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-inner text-sm font-bold"
            >
              <LogOut className="w-4 h-4" /> Keluar
            </button>
          </div>

          {/* FORM TULIS ARTIKEL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl relative"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
              <PenTool className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">
                Tulis Artikel Baru
              </h2>
            </div>

            {/* Notifikasi */}
            {status.msg && (
              <div
                className={`p-4 rounded-xl mb-6 flex items-start gap-3 border ${status.type === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"}`}
              >
                {status.type === "success" ? (
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                )}
                <p className="text-sm font-medium">{status.msg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Judul */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Judul Artikel
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-600"
                    placeholder="Contoh: Rahasia Profit Konsisten..."
                  />
                </div>

                {/* Kategori */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all appearance-none"
                  >
                    <option value="Edukasi">Edukasi</option>
                    <option value="Strategi">Strategi</option>
                    <option value="Psikologi">Psikologi</option>
                    <option value="Propfirm">Propfirm</option>
                    <option value="Pemula">Pemula</option>
                  </select>
                </div>
              </div>

              {/* Link Gambar */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Link Gambar Sampul (Opsional)
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-600 font-mono text-sm"
                  placeholder="/assets/gambar.jpg atau https://..."
                />
              </div>

              {/* Isi Konten (Mendukung HTML) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                  <span>Isi Artikel (Mendukung Tag HTML)</span>
                  <span className="text-[10px] text-amber-500">
                    Gunakan tag &lt;p&gt;, &lt;strong&gt;, &lt;h3&gt; dll
                  </span>
                </label>
                <textarea
                  required
                  rows={12}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-600 font-mono text-sm leading-relaxed"
                  placeholder="<p>Mulai menulis artikel di sini...</p>"
                ></textarea>
              </div>

              {/* Tombol Publish */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-8"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                ) : (
                  <>
                    <PlusCircle className="w-5 h-5" />
                    Publish Artikel ke Web
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </PageTransition>
    </main>
  );
}
