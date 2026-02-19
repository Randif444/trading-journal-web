"use client";

import { useState, useEffect } from "react";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Percent,
  Video,
  CalendarDays,
  Clock,
  Globe,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<"lot" | "compound">("lot");

  return (
    <main className="min-h-screen pt-28 pb-20 text-slate-200 relative overflow-hidden">
      {/* --- LAMPU SOROT RAHASIA (UNTUK EFEK KACA) --- */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* --- BUNGKUS KONTEN DENGAN ANIMASI SLOW --- */}
      <PageTransition>
        <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-12 relative z-10">
          {/* HEADER */}
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                Trader
              </span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-600 drop-shadow-md">
                Tools
              </span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Gudang senjata untuk manajemen risiko, pemantauan berita ekonomi,
              dan simulasi strategi.
            </p>
          </div>

          {/* --- 1. MARKET SESSION (Live Status) --- */}
          <MarketStatus />

          {/* --- 2. CALCULATOR SECTION (Tab System) --- */}
          <section className="animate-fade-in-up delay-100">
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveTab("lot")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  activeTab === "lot"
                    ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-105"
                    : "bg-white/5 backdrop-blur-md text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Calculator className="w-4 h-4" /> Position Size
              </button>
              <button
                onClick={() => setActiveTab("compound")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  activeTab === "compound"
                    ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-105"
                    : "bg-white/5 backdrop-blur-md text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                <TrendingUp className="w-4 h-4" /> Compounding
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
              {/* Dekorasi Dalam Kartu */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

              {activeTab === "lot" ? <LotCalculator /> : <CompoundCalculator />}
            </div>
          </section>

          {/* --- 3. FX REPLAY SIMULATOR --- */}
          <section className="animate-fade-in-up delay-200">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden relative group hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 text-amber-500 shadow-inner group-hover:scale-110 group-hover:border-amber-500/50 transition-all">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      FXReplay Simulator
                    </h3>
                    <p className="text-sm text-slate-400">
                      Software backtesting terbaik untuk melatih "Muscle
                      Memory".
                    </p>
                  </div>
                </div>
                <a
                  href="https://fxreplay.com/?via=kate"
                  target="_blank"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-900 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-105 active:scale-95"
                >
                  🚀 Coba Gratis Sekarang
                </a>
              </div>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                >
                  <source src="/assets/demo-fxreplay.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] group-hover:backdrop-blur-none group-hover:bg-transparent transition-all duration-500">
                  <span className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white border border-white/20 mb-2 shadow-lg">
                    PREVIEW MODE
                  </span>
                  <h4 className="text-2xl md:text-4xl font-black text-white tracking-tight drop-shadow-2xl opacity-90 group-hover:opacity-0 transition-opacity transform translate-y-0 group-hover:translate-y-4">
                    Uji Strategi 1 Tahun <br />{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-500">
                      Dalam 1 Hari
                    </span>
                  </h4>
                </div>
              </div>
            </div>
          </section>

          {/* --- 4. ECONOMIC CALENDAR --- */}
          <section className="animate-fade-in-up delay-300">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col items-center hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 group">
              {/* WIDGET AREA (DIJEPIT MAKSIMAL 800PX DAN DITENGAHKAN) */}
              <div className="w-full max-w-[800px]">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <div className="p-3 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 text-blue-400 shadow-inner group-hover:scale-110 group-hover:border-blue-500/50 transition-all">
                    <CalendarDays className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      Economic Calendar
                    </h3>
                    <p className="text-xs text-slate-400">
                      Sumber: Investing.com (Waktu Jakarta/WIB)
                    </p>
                  </div>
                </div>

                <div className="w-full bg-[#020617]/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 shadow-inner">
                  <EconomicCalendarWidget />
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageTransition>
    </main>
  );
}

// =========================================================
// KOMPONEN-KOMPONEN KECIL
// =========================================================

function MarketStatus() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return null;

  const hour = time.getHours();

  const sessions = [
    { name: "Sydney", open: 4, close: 13 },
    { name: "Tokyo", open: 6, close: 15 },
    { name: "London", open: 14, close: 23 },
    { name: "New York", open: 19, close: 4 },
  ];

  const checkStatus = (open: number, close: number) => {
    if (open < close) {
      return hour >= open && hour < close;
    } else {
      return hour >= open || hour < close;
    }
  };

  const formatTime = (h: number) => h.toString().padStart(2, "0") + ":00";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
      {sessions.map((s) => {
        const isOpen = checkStatus(s.open, s.close);
        return (
          <div
            key={s.name}
            className={`p-5 rounded-2xl border backdrop-blur-xl transition-all shadow-lg ${
              isOpen
                ? "bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/15 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            } text-center group`}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe
                className={`w-4 h-4 ${isOpen ? "text-emerald-400" : "text-slate-500"}`}
              />
              <span
                className={`text-sm font-bold tracking-wide ${isOpen ? "text-emerald-400" : "text-slate-400"}`}
              >
                {s.name}
              </span>
            </div>
            <p
              className={`text-2xl font-black drop-shadow-sm ${isOpen ? "text-white" : "text-slate-600"}`}
            >
              {isOpen ? "OPEN" : "CLOSED"}
            </p>
            <p
              className={`text-[10px] mt-1 flex items-center justify-center gap-1 ${isOpen ? "text-emerald-400/70" : "text-slate-500"}`}
            >
              <Clock className="w-3 h-3" />
              {formatTime(s.open)} - {formatTime(s.close)}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function EconomicCalendarWidget() {
  return (
    <div className="w-full h-full min-h-[600px] bg-transparent">
      <iframe
        src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone,timeselector,filters&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=week&timeZone=17&lang=1"
        width="100%"
        height="100%"
        frameBorder="0"
        className="w-full h-full border-0"
        style={{
          minHeight: "600px",
          filter:
            "invert(0.92) hue-rotate(180deg) brightness(1.05) contrast(1.1)",
          WebkitFilter:
            "invert(0.92) hue-rotate(180deg) brightness(1.05) contrast(1.1)",
        }}
      ></iframe>
    </div>
  );
}

function LotCalculator() {
  const [balance, setBalance] = useState<number>(5000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [stopLoss, setStopLoss] = useState<number>(30);
  const [pair, setPair] = useState<string>("XAUUSD");
  const [lotSize, setLotSize] = useState<number>(0);
  const [riskAmount, setRiskAmount] = useState<number>(0);

  useEffect(() => {
    const riskMoney = balance * (riskPercent / 100);
    setRiskAmount(riskMoney);
    let calculatedLot = 0;
    if (stopLoss > 0) {
      calculatedLot = riskMoney / (stopLoss * 10);
    }
    setLotSize(calculatedLot);
  }, [balance, riskPercent, stopLoss, pair]);

  const inputClass =
    "w-full bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner";
  const inputClassNoIcon =
    "w-full bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in-up">
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
            Account Balance ($)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
            Risk Percentage (%)
          </label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="number"
              value={riskPercent}
              onChange={(e) => setRiskPercent(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
              Stop Loss (Pips)
            </label>
            <input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(Number(e.target.value))}
              className={inputClassNoIcon}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
              Pair
            </label>
            <select
              value={pair}
              onChange={(e) => setPair(e.target.value)}
              className={`${inputClassNoIcon} appearance-none`}
            >
              <option value="XAUUSD" className="bg-slate-900">
                XAUUSD (Gold)
              </option>
              <option value="EURUSD" className="bg-slate-900">
                EURUSD
              </option>
              <option value="GBPUSD" className="bg-slate-900">
                GBPUSD
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-center relative overflow-hidden group hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-300 opacity-80 group-hover:opacity-100 transition-opacity"></div>
        <p className="text-slate-400 text-sm font-bold tracking-wider uppercase mb-2 drop-shadow">
          Recommended Lot Size
        </p>
        <h2 className="text-6xl font-black text-white mb-2 group-hover:scale-105 transition-transform drop-shadow-md">
          {lotSize.toFixed(2)}{" "}
          <span className="text-xl text-slate-500 font-bold">Lot</span>
        </h2>
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-sm">
          <span className="text-slate-400 font-medium">Risk Amount:</span>
          <span className="text-rose-400 font-bold bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            -${riskAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

function CompoundCalculator() {
  const [startBalance, setStartBalance] = useState(5000);
  const [monthlyGain, setMonthlyGain] = useState(5);
  const [months, setMonths] = useState(12);
  const [results, setResults] = useState<
    { month: number; balance: number; profit: number }[]
  >([]);

  useEffect(() => {
    let currentBal = startBalance;
    const data = [];
    for (let i = 1; i <= months; i++) {
      const profit = currentBal * (monthlyGain / 100);
      currentBal += profit;
      data.push({ month: i, balance: currentBal, profit: profit });
    }
    setResults(data);
  }, [startBalance, monthlyGain, months]);

  const inputClass =
    "w-full bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner";

  return (
    <div className="animate-fade-in-up space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
            Start Balance
          </label>
          <input
            type="number"
            value={startBalance}
            onChange={(e) => setStartBalance(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
            Monthly Gain (%)
          </label>
          <input
            type="number"
            value={monthlyGain}
            onChange={(e) => setMonthlyGain(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
            Duration (Months)
          </label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className={inputClass}
          />
        </div>
      </div>

      <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl shadow-inner">
        <div className="bg-black/40 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-white/10">
          <h3 className="font-bold text-white tracking-wide">
            Projection Result
          </h3>
          <span className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            Final:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(results[results.length - 1]?.balance || 0)}
          </span>
        </div>
        <div className="max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500">
          <table className="w-full text-sm text-left">
            <thead className="bg-black/60 backdrop-blur-md text-slate-300 text-xs uppercase sticky top-0 border-b border-white/10 shadow-sm z-10">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Month</th>
                <th className="px-6 py-4 font-bold tracking-wider">Profit</th>
                <th className="px-6 py-4 text-right font-bold tracking-wider">
                  New Balance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {results.map((r) => (
                <tr
                  key={r.month}
                  className="hover:bg-white/10 transition-colors"
                >
                  <td className="px-6 py-4 text-slate-400 font-medium">
                    Month {r.month}
                  </td>
                  <td className="px-6 py-4 text-emerald-400">
                    +{r.profit.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right text-white font-mono font-bold tracking-wide">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(r.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
