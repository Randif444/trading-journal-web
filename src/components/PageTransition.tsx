"use client";

import { motion } from "framer-motion";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // Mulai dari bawah (30px) dan transparan
      animate={{ opacity: 1, y: 0 }} // Naik ke posisi asli dan perlahan jelas
      transition={{
        duration: 0.8, // Durasi 0.8 detik (biar kerasa smooth dan gak kecepetan)
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
