"use server";

import { fetchSheetData, calculateStats } from "@/lib/googleSheets";

export async function getLiveStats() {
  // Kode ini berjalan 100% di Server
  const trades = await fetchSheetData();
  const stats = calculateStats(trades);

  // Kita kirim hasil matang ke Client (Browser)
  return stats;
}
