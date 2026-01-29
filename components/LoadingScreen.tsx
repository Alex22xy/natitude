"use client";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center flex-col"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-2xl font-black italic tracking-tighter"
      >
        NATITUDE<span className="text-[#FF00FF]">.</span>
      </motion.div>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        className="h-[1px] bg-[#FF00FF] mt-4"
      />
      <p className="text-[8px] uppercase tracking-[0.5em] text-zinc-500 mt-4 animate-pulse">
        Decrypting Registry...
      </p>
    </motion.div>
  );
}