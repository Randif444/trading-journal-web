// src/components/EquityChart.tsx
"use client";

import { Trade } from "@/types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EquityChart({ trades }: { trades: Trade[] }) {
  // 1. Balik data agar urut dari Terlama -> Terbaru
  // 2. Hitung saldo kumulatif start dari $5000
  let currentBalance = 5000;

  // Kita copy array trades (.slice) lalu reverse agar tidak merusak urutan tabel asli
  // Kita filter dulu trade yang valid (punya tanggal & pair)
  const sortedTrades = trades
    .filter((t) => t.date && t.date !== "-")
    .slice()
    .reverse();

  const chartData = sortedTrades.map((trade) => {
    currentBalance += trade.pnl; // Tambah/Kurang PnL ke saldo
    return {
      date: trade.date, // Tanggal trade
      balance: currentBalance, // Saldo setelah trade ini
      pnl: trade.pnl,
    };
  });

  // Tambahkan titik awal $5000 agar grafik start rapi dari kiri
  const initialPoint = { date: "Start", balance: 5000, pnl: 0 };
  const finalData = [initialPoint, ...chartData];

  // Cek saldo terakhir untuk menentukan warna grafik (Hijau/Merah)
  const isProfit = currentBalance >= 5000;

  return (
    <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="mb-6 flex flex-col gap-1">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            Equity Growth
          </h2>
          <p className="text-xs md:text-sm text-gray-400">
            Capital Performance Analysis
          </p>
        </div>
        {/* Indikator Trend */}
        <div
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            isProfit
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
          }`}
        >
          {isProfit ? "↗ Growth" : "↘ Drawdown"}
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={finalData}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isProfit ? "#10b981" : "#f43f5e"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={isProfit ? "#10b981" : "#f43f5e"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#1e293b",
                color: "#f1f5f9",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ color: "#fff" }}
              // PERBAIKAN DI SINI: Menggunakan 'any' untuk menghindari error TypeScript
              formatter={(value: any) => [
                <span
                  key="val"
                  className={
                    Number(value) >= 5000
                      ? "text-emerald-400 font-bold"
                      : "text-rose-400 font-bold"
                  }
                >
                  $
                  {Number(value).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>,
                "Balance",
              ]}
              labelStyle={{ color: "#94a3b8", marginBottom: "0.5rem" }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke={isProfit ? "#10b981" : "#f43f5e"}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorBalance)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
