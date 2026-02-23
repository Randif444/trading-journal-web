"use client";

import { useState, Suspense } from "react"; // Tambahkan Suspense
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Lock,
  Mail,
  KeyRound,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

// Pisahkan Form ke komponen tersendiri untuk keamanan Build
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email atau Password salah, Kang! Coba cek lagi.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 relative z-10">
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <p className="text-sm text-rose-400">{error}</p>
        </motion.div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
          Email VIP
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-600 shadow-inner"
            placeholder="nama@email.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
          Kata Sandi
        </label>
        <div className="relative">
          <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-600 shadow-inner"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 mt-4"
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            Sign in
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </button>
    </form>
  );
}

// Komponen Utama
export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 text-slate-200 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <PageTransition>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="text-center mb-10 relative z-10">
              <div className="w-20 h-20 bg-black/40 border border-white/10 rounded-2xl mx-auto flex items-center justify-center shadow-inner mb-6 group">
                <ShieldCheck className="w-10 h-10 text-amber-500 group-hover:scale-110 transition-transform" />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                Admin Access
              </h1>
            </div>

            {/* WAJIB: Dibungkus Suspense agar Netlify tidak error saat build */}
            <Suspense
              fallback={
                <div className="text-center text-slate-500">
                  Loading Form...
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </div>
        </motion.div>
      </PageTransition>
    </main>
  );
}
