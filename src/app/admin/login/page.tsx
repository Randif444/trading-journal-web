"use client";

export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
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

// Kita bungkus Form-nya saja
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
        <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3 text-sm text-rose-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}
      <div className="space-y-2 text-left">
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
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all shadow-inner"
            placeholder="nama@email.com"
          />
        </div>
      </div>
      <div className="space-y-2 text-left">
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
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all shadow-inner"
            placeholder="••••••••"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-bold py-4 rounded-xl transition-all disabled:opacity-50"
      >
        {loading ? (
          <div className="w-6 h-6 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
        ) : (
          <>
            Sign in <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 text-slate-200 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] -z-10" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-black/40 border border-white/10 rounded-2xl mx-auto flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8 text-amber-500" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Admin Access
            </h1>
          </div>
          <Suspense fallback={<div>Loading Form...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </motion.div>
    </main>
  );
}
