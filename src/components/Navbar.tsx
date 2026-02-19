"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Review Propfirm", path: "/review-propfirm" },
    { name: "Tools", path: "/tools" },
    { name: "Jurnal", path: "/journal" },
    { name: "About", path: "/about" },
    { name: "Free Knowledge", path: "/edukasi" },
  ];

  return (
    <nav className="fixed w-full z-[100] bg-[#020617]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          {/* LOGO */}
          <Link
            href="/"
            className="text-2xl font-extrabold text-white tracking-tight"
          >
            Kang<span className="text-amber-500">Trader</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm font-medium transition-colors ${pathname === link.path ? "text-amber-500" : "text-slate-300 hover:text-white"}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none p-2"
            >
              {isOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN (SOLID BACKGROUND) */}
      {isOpen && (
        <div className="md:hidden absolute w-full left-0 top-20 bg-[#020617] border-b border-slate-800 shadow-2xl">
          <div className="px-4 pt-4 pb-8 space-y-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)} // Tutup menu kalau diklik
                className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                  pathname === link.path
                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
