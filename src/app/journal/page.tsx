import { fetchSheetData, calculateStats } from "@/lib/googleSheets";
import TradeTable from "@/components/TradeTable";
import EquityChart from "@/components/EquityChart";
import {
  Wallet,
  TrendingUp,
  Activity,
  BarChart3,
  ArrowLeft,
  FileSpreadsheet,
  Download,
} from "lucide-react";
import Link from "next/link";

// Refresh data otomatis setiap 60 detik (Incremental Static Regeneration)
export const revalidate = 60;

export default async function JournalPage() {
  const trades = await fetchSheetData();
  const stats = calculateStats(trades);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <main className="min-h-screen pt-28 pb-20 text-slate-200 relative overflow-hidden">
      {/* --- LAMPU SOROT RAHASIA (UNTUK EFEK KACA) --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* --- CONTAINER UTAMA --- */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-10 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                Trading
              </span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-600 drop-shadow-md">
                Jurnal
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              Rekap transaksi real-time (Sync via Google Sheets)
            </p>
          </div>

          <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-400 drop-shadow-sm tracking-wide">
              System Online
            </span>
          </div>
        </div>

        {/* --- STATS GRID (4 Kolom) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Balance (Glow Emas) */}
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg relative overflow-hidden group hover:bg-white/10 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wallet className="w-16 h-16 text-amber-500" />
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider drop-shadow-sm mb-1">
              Total Balance
            </p>
            <h3 className="text-2xl font-black text-white mt-1 drop-shadow-md">
              {formatCurrency(stats.balance)}
            </h3>
          </div>

          {/* Card 2: Net PnL (Glow Hijau/Merah Dinamis) */}
          <div
            className={`p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg relative overflow-hidden group hover:bg-white/10 transition-all duration-300 ${stats.totalPnl >= 0 ? "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]" : "hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(225,29,72,0.2)]"}`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp
                className={`w-16 h-16 ${stats.totalPnl >= 0 ? "text-emerald-500" : "text-rose-500"}`}
              />
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider drop-shadow-sm mb-1">
              Net Profit/Loss
            </p>
            <h3
              className={`text-2xl font-black mt-1 drop-shadow-md ${stats.totalPnl >= 0 ? "text-emerald-400" : "text-rose-400"}`}
            >
              {stats.totalPnl > 0 ? "+" : ""}
              {formatCurrency(stats.totalPnl)}
            </h3>
          </div>

          {/* Card 3: Win Rate (Glow Biru) */}
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg relative overflow-hidden group hover:bg-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity className="w-16 h-16 text-blue-500" />
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider drop-shadow-sm mb-1">
              Win Rate
            </p>
            <h3 className="text-2xl font-black text-blue-400 mt-1 drop-shadow-md">
              {stats.winRate.toFixed(1)}%
            </h3>
          </div>

          {/* Card 4: Profit Factor (Glow Ungu) */}
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg relative overflow-hidden group hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BarChart3 className="w-16 h-16 text-purple-500" />
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider drop-shadow-sm mb-1">
              Profit Factor
            </p>
            <h3 className="text-2xl font-black text-purple-400 mt-1 drop-shadow-md">
              {stats.profitFactor.toFixed(2)}
            </h3>
          </div>
        </div>

        {/* --- FREE TEMPLATE CTA (BANNER KACA) --- */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-600/5 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-[0_0_30px_rgba(245,158,11,0.1)] relative overflow-hidden group hover:border-amber-500/50 transition-all duration-500">
          {/* Decorative Background Blur */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-all pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left">
              <div className="p-4 bg-amber-500/20 backdrop-blur-md rounded-2xl border border-amber-500/30 text-amber-400 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-inner shrink-0">
                <FileSpreadsheet className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  Gratis: Template Jurnal Trading
                </h3>
                <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                  Masih mencatat di buku tulis? Kurangi kesalahan manual dan
                  mulai pantau Win Rate serta Drawdown-mu secara otomatis.
                  Download template Google Sheets yang saya gunakan.
                </p>
              </div>
            </div>

            {/* Ganti "#" dengan link Google Sheets Akang */}
            <a
              href="https://docs.google.com/spreadsheets/d/1UKhx5Z1S8HoTJyJAslXU8W2YytaCTWsSOQmcq9H7o5k/copy"
              target="_blank"
              className="shrink-0 flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-900 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-105 active:scale-95"
            >
              <Download className="w-5 h-5" />
              Download Template
            </a>
          </div>
        </div>

        {/* --- EQUITY CHART --- */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:border-white/20 transition-all">
          <EquityChart trades={trades} />
        </div>

        {/* --- TRADE TABLE (Pagination) --- */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-white/20 transition-all">
          <TradeTable trades={trades} />
        </div>
      </div>
    </main>
  );
}
