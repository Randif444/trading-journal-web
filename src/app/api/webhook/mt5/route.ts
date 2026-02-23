import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwl_54kJHDpQTI1OFObvmdgl-dFS1AkJViOrSX3eiTniSXufnPeYb3huab0EbU7qIal/exec";

    console.log("🚀 Meneruskan data ke Google Sheets...");

    // Kirim data ke Google Sheets
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("✅ Data sukses masuk ke Spreadsheet!");
      return NextResponse.json({ status: "success" });
    } else {
      throw new Error("Gagal kirim ke Google");
    }
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
