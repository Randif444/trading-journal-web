'use client';

import { useState } from 'react';
import { Trade } from '@/types';
import { ExternalLink, Image as ImageIcon, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

// Helper format uang
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export default function TradeTable({ trades }: { trades: Trade[] }) {
  // --- KONFIGURASI HALAMAN ---
  const ROWS_PER_PAGE = 10; // Tampilkan 10 baris per halaman (bisa diganti 5, 15, dll)
  const [currentPage, setCurrentPage] = useState(1);

  // Hitung total halaman
  const totalPages = Math.ceil(trades.length / ROWS_PER_PAGE);

  // Potong data sesuai halaman (Slice)
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const currentTrades = trades.slice(startIndex, startIndex + ROWS_PER_PAGE);

  // Fungsi Ganti Halaman
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* HEADER CARD */}
      <div className="flex justify-between items-center px-1">
        <div>
          <h3 className="text-lg font-bold text-white">Trade Journal</h3>
          <p className="text-xs text-slate-500">Halaman {currentPage} dari {totalPages}</p>
        </div>
        <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400 border border-slate-700">
          Total {trades.length} Records
        </span>
      </div>

      {/* CONTAINER TABEL */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
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
                <tr key={trade.id} className="hover:bg-slate-800/40 transition-colors group">
                  {/* DATE */}
                  <td className="px-6 py-4 text-slate-400 font-medium whitespace-nowrap">
                    {trade.date}
                  </td>

                  {/* PAIR */}
                  <td className="px-6 py-4 text-slate-200 font-bold">
                    {trade.pair}
                  </td>

                  {/* TYPE */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${
                      trade.type === 'BUY' 
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                        : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {trade.type}
                    </span>
                  </td>

                  {/* PRICE */}
                  <td className="px-6 py-4 text-slate-400 text-xs">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1">
                        <span className="text-slate-500 w-8">In:</span> 
                        <span className="text-slate-200 font-mono">{trade.entryPrice}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-slate-500 w-8">Out:</span> 
                        <span className="text-slate-200 font-mono">{trade.exitPrice}</span>
                      </span>
                    </div>
                  </td>

                  {/* LOT */}
                  <td className="px-6 py-4 text-center text-slate-300 font-medium">
                    {trade.lotSize}
                  </td>

                  {/* PNL */}
                  <td className={`px-6 py-4 text-right font-bold text-base ${
                    trade.status === 'WIN' ? 'text-emerald-400' : 
                    trade.status === 'SL+' ? 'text-cyan-400' :
                    trade.status === 'LOSS' ? 'text-rose-400' : 'text-slate-400'
                  }`}>
                    <div className="flex flex-col items-end">
                      <span>{trade.pnl > 0 ? '+' : ''}{formatCurrency(trade.pnl)}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase mt-1 ${
                        trade.status === 'WIN' ? 'bg-emerald-500/10 text-emerald-400' :
                        trade.status === 'SL+' ? 'bg-cyan-500/10 text-cyan-400' :
                        trade.status === 'LOSS' ? 'bg-rose-500/10 text-rose-400' :
                        'bg-slate-700 text-slate-300'
                      }`}>
                        {trade.status}
                      </span>
                    </div>
                  </td>

                  {/* DATA ICONS */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      {trade.screenshotBefore && (
                        <a href={trade.screenshotBefore} target="_blank" className="p-2 rounded-md bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                          <ImageIcon className="w-4 h-4" />
                        </a>
                      )}
                      {trade.screenshotAfter && (
                        <a href={trade.screenshotAfter} target="_blank" className="p-2 rounded-md bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {trade.note && (
                        <div className="group/note relative">
                          <div className="p-2 rounded-md bg-slate-800/50 hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 cursor-help transition-colors">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="absolute bottom-full right-0 mb-2 w-48 p-3 bg-slate-800 text-xs text-slate-200 rounded-lg border border-slate-700 shadow-xl opacity-0 invisible group-hover/note:opacity-100 group-hover/note:visible transition-all z-10 pointer-events-none">
                            <p className="font-semibold text-amber-500 mb-1">Note:</p>
                            {trade.note}
                          </div>
                        </div>
                      )}
                      {!trade.screenshotBefore && !trade.screenshotAfter && !trade.note && (
                        <span className="text-slate-700">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION CONTROLS (DI BAWAH TABEL) --- */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex justify-center items-center gap-2 select-none">
            
            <button 
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Nomor Halaman */}
            <div className="flex gap-1">
               {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => goToPage(number)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === number
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {number}
                  </button>
               ))}
            </div>

            <button 
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>
        )}
      </div>
    </div>
  );
}