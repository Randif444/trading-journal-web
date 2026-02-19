import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // LEVEL 6: Sembunyikan Source Map (Anti Inspect Element Tingkat Lanjut)
  productionBrowserSourceMaps: false,

  // LEVEL 5: Keamanan Headers (HSTS, Anti-Clickjacking, Anti-Sniffing)
  async headers() {
    return [
      {
        // Berlaku untuk semua rute website
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload", // Memaksa pengunjung pakai HTTPS (Gembok Hijau)
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // Mencegah website Akang ditempel di web penipu (Anti-Clickjacking)
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Mencegah hacker menebak jenis file
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // Menjaga privasi pengunjung
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()", // Mematikan akses fitur sensitif HP/Laptop
          },
        ],
      },
    ];
  },
};

export default nextConfig;
