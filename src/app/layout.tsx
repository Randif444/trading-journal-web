import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { GoogleAnalytics } from "@next/third-parties/google";

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
      <body
        className={`${inter.className} bg-[#020617] text-slate-200 min-h-screen selection:bg-amber-500/30`}
      >
        <GoogleAnalytics gaId="G-N09YN4WKHD" />
        <Navbar />

        <div className="pt-20">{children}</div>

        <footer className="border-t border-white/10 mt-20 py-8 bg-[#020617] text-center text-slate-400 text-sm relative z-10">
          <p>© 2026 KangTrader. Stay Humble, Stay Consistent.</p>
        </footer>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              
              document.addEventListener('contextmenu', function(e) { 
                e.preventDefault(); 
              });
              
              
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
