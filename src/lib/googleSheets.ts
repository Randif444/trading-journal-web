import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { Trade, DashboardStats } from "@/types";

// Konfigurasi Auth
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const fetchSheetData = async (): Promise<Trade[]> => {
  if (!process.env.GOOGLE_SHEET_ID) return [];

  try {
    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID,
      serviceAccountAuth,
    );
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0]; // Tab pertama
    const rows = await sheet.getRows();

    // --- HELPER: Membersihkan Angka (FIXED VERSION) ---
    const parseNumber = (value: any) => {
      if (typeof value === "number") return value;
      if (!value) return 0;

      let str = value.toString();

      // LOGIKA BARU: Tangani Format Indonesia (Koma sebagai desimal)
      // Jika ada koma, ganti jadi titik agar bisa dibaca komputer
      if (str.includes(",")) {
        // Cek jika ini format ribuan (1.000,00) atau desimal biasa (30,50)
        // Kita ganti koma terakhir menjadi titik
        str = str.replace(/,/g, ".");
      }

      // Hapus karakter aneh (Rp, $, spasi) kecuali angka, titik, dan minus
      const cleanStr = str.replace(/[^0-9.-]+/g, "");

      // Cegah error NaN
      const result = parseFloat(cleanStr);
      return isNaN(result) ? 0 : result;
    };

    // --- MAPPING DATA ---
    const trades: Trade[] = rows
      .filter((row) => row.get("Date") && row.get("Pair")) // Hapus baris kosong
      .map((row, index) => {
        const pnl = parseNumber(row.get("PnL"));
        const note = (row.get("Note") || "").toString();

        // Logika Status
        let status: "WIN" | "LOSS" | "BE" | "SL+" = "BE";
        if (note.toUpperCase().includes("SL+")) {
          status = "SL+";
        } else if (pnl > 0) {
          status = "WIN";
        } else if (pnl < 0) {
          status = "LOSS";
        }

        return {
          id: `trade-${index}`,
          date: row.get("Date") || "-",
          pair: row.get("Pair") || "UNKNOWN",
          type: (row.get("Type") as "BUY" | "SELL") || "BUY",

          entryPrice: parseNumber(row.get("Entry")),
          exitPrice: parseNumber(row.get("Exit")),
          lotSize: parseNumber(row.get("Lot")),

          pnl: pnl,
          status: status,

          screenshotBefore: row.get("Before") || "",
          screenshotAfter: row.get("After") || "",
          note: note,
        };
      });

    // Urutkan dari terbaru ke terlama
    return trades.reverse();
  } catch (error) {
    console.error("Gagal mengambil data Sheet:", error);
    return [];
  }
};

export const calculateStats = (trades: Trade[]): DashboardStats => {
  const totalTrades = trades.length;
  // SL+ dihitung sebagai WIN
  const wins = trades.filter(
    (t) => t.status === "WIN" || t.status === "SL+",
  ).length;

  const totalPnl = trades.reduce((acc, t) => acc + t.pnl, 0);
  const grossProfit = trades
    .filter((t) => t.pnl > 0)
    .reduce((acc, t) => acc + t.pnl, 0);
  const grossLoss = Math.abs(
    trades.filter((t) => t.pnl < 0).reduce((acc, t) => acc + t.pnl, 0),
  );

  return {
    totalTrades,
    winRate: totalTrades > 0 ? (wins / totalTrades) * 100 : 0,
    profitFactor:
      grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? 100 : 0,
    totalPnl,
    // Saldo Awal $5000 + Hasil Trading
    balance: 5000 + totalPnl,
  };
};
