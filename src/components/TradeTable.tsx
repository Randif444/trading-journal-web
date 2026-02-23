"use client";

import { useState } from "react";
import { Trade } from "@/types";
import {
  ExternalLink,
  Image as ImageIcon,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default function TradeTable({ trades }: { trades: Trade[] }) {
  const ROWS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(trades.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const currentTrades = trades.slice(startIndex, startIndex + ROWS_PER_PAGE);

  // LOGIKA BARIS KONSISTEN: Menghitung berapa baris kosong yang harus ditambah
  const emptyRows = ROWS_PER_PAGE - currentTrades.length;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4">
      {/* Ubah class di div ini: pakai px (kiri-kanan) dan pt (atas), pb (bawah) dikecilin */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-2 sm:px-4 pt-3 sm:pt-5 pb-1 gap-4 sm:gap-0">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-white tracking-wide">
            Trade Journal
          </h3>
          <p className="text-xs text-slate-400">
            Halaman {currentPage} dari {totalPages}
          </p>
        </div>

        <span className="px-4 py-1.5 bg-slate-800/80 rounded-full text-xs font-bold text-slate-300 border border-slate-700 shadow-sm">
          Total {trades.length} Records
        </span>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg">
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-950 text-slate-400 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Pair</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Price (In/Out)</th>
                <th className="px-6 py-4 text-center">Lot</th>
                <th className="px-6 py-4 text-right">PnL</th>
                <th className="px-6 py-4 text-center">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {currentTrades.map((trade) => (
                <tr
                  key={trade.id}
                  className="hover:bg-slate-800/40 transition-colors h-[81px]"
                >
                  <td className="px-6 py-4 text-slate-400 font-medium whitespace-nowrap">
                    {trade.date}
                  </td>
                  <td className="px-6 py-4 text-slate-200 font-bold">
                    {trade.pair}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${
                        trade.type === "BUY"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                      }`}
                    >
                      {trade.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">
                    <div className="flex flex-col gap-1">
                      <span>
                        In:{" "}
                        <span className="text-slate-200 font-mono">
                          {trade.entryPrice}
                        </span>
                      </span>
                      <span>
                        Out:{" "}
                        <span className="text-slate-200 font-mono">
                          {trade.exitPrice}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-slate-300 font-medium">
                    {trade.lotSize}
                  </td>

                  {/* KOLOM PNL DENGAN STATUS */}
                  <td
                    className={`px-6 py-4 text-right font-bold ${
                      trade.status === "WIN" || trade.status === "TP"
                        ? "text-emerald-400"
                        : trade.status === "SL+"
                          ? "text-cyan-400"
                          : trade.status === "BE"
                            ? "text-blue-400"
                            : trade.status === "SL-"
                              ? "text-amber-400"
                              : "text-rose-400"
                    }`}
                  >
                    <div className="flex flex-col items-end">
                      <span>
                        {trade.pnl > 0 ? "+" : ""}
                        {formatCurrency(trade.pnl)}
                      </span>
                      {trade.status && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded uppercase mt-1 border ${
                            trade.status === "WIN" || trade.status === "TP"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : trade.status === "SL+"
                                ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                                : trade.status === "BE"
                                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                  : trade.status === "SL-"
                                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                    : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          }`}
                        >
                          {trade.status}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* KOLOM DATA (ICONS) DENGAN HOVER TOOLTIP */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-3">
                      {trade.screenshotBefore && (
                        <ImageIcon className="w-4 h-4 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" />
                      )}
                      {trade.screenshotAfter && (
                        <ExternalLink className="w-4 h-4 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" />
                      )}

                      {/* ICON NOTE DENGAN LOGIKA HOVER/TOOLTIP */}
                      {trade.note && (
                        <div className="relative group flex items-center justify-center">
                          <FileText className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors cursor-pointer" />

                          {/* KOTAK TOOLTIP GAIB (MUNCUL PAS DI-HOVER) */}
                          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 hidden group-hover:block w-48 bg-slate-800 border border-slate-700 text-slate-300 text-xs text-left p-3 rounded-lg shadow-xl z-50">
                            <p className="font-semibold text-white mb-1">
                              Catatan Transaksi:
                            </p>
                            <p className="leading-relaxed">{trade.note}</p>

                            {/* Buntut Panah Tooltip (Arah Kanan) */}
                            <div className="absolute top-1/2 -right-[6px] -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-slate-700"></div>
                            <div className="absolute top-1/2 -right-[5px] -translate-y-1/2 border-y-[5px] border-y-transparent border-l-[5px] border-l-slate-800"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {/* RENDER BARIS KOSONG AGAR TINGGI TETAP SAMA */}
              {emptyRows > 0 &&
                Array.from({ length: emptyRows }).map((_, index) => (
                  <tr
                    key={`empty-${index}`}
                    className="h-[81px] border-none opacity-0 pointer-events-none"
                  >
                    <td colSpan={7}>&nbsp;</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between gap-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 disabled:opacity-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 px-2 scroll-smooth">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => goToPage(number)}
                    className={`min-w-[32px] h-8 rounded-lg text-xs font-bold transition-all flex-shrink-0 ${
                      currentPage === number
                        ? "bg-amber-500 text-slate-950"
                        : "text-slate-400 bg-white/5 hover:bg-slate-800"
                    }`}
                  >
                    {number}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 disabled:opacity-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
