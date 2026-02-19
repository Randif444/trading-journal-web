import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- WAJIB ADA: Ini pintu masuk semua style & warna!
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kang Trader - Journey to Funded Trader",
  description: "Dokumentasi nyata perjalanan trading menuju funded trader.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="overflow-x-hidden">
      {/* Kita kunci warna background langsung di body agar anti-putih */}
      <body
        className={`${inter.className} bg-[#020617] text-slate-200 min-h-screen selection:bg-amber-500/30`}
      >
        <Navbar />

        <div className="pt-20">{children}</div>

        {/* Footer disesuaikan bordernya dengan tema Glassmorphism */}
        <footer className="border-t border-white/10 mt-20 py-8 bg-[#020617] text-center text-slate-500 text-sm relative z-10">
          <p>© 2026 KangTrader. Stay Humble, Stay Consistent.</p>
        </footer>

        {/* --- SCRIPT KEAMANAN MAKSIMAL (ANTI COPAS & INSPECT) --- */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 1. Matikan Klik Kanan (Anti Save Image & Copy Text)
              document.addEventListener('contextmenu', function(e) { 
                e.preventDefault(); 
              });
              
              // 2. Matikan Inspect Element (F12, Ctrl+Shift+I, dll)
              document.addEventListener('keydown', function(e) {
                if (
                  e.key === 'F12' || 
                  (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || 
                  (e.ctrlKey && e.key === 'U')
                ) {
                  e.preventDefault();
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
