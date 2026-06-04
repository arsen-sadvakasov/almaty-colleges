"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show preloader on first visit per session
    const hasVisited = sessionStorage.getItem("hasVisitedPreloader");
    if (hasVisited) {
      setLoading(false);
      return;
    }

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random progress increments for realistic feel
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 90); // Stop at 90% until fully loaded
      });
    }, 200);

    // Complete loading when document is ready
    const handleLoad = () => {
      clearInterval(interval);
      setProgress(100);
      
      // Keep it at 100% for a short moment before fading out
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasVisitedPreloader", "true");
      }, 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Fallback if load event doesn't fire (e.g. fast navigation)
    const fallbackTimeout = setTimeout(() => {
      handleLoad();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center w-full max-w-xs px-6">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <img src="/logo.png" alt="Logo" className="w-24 h-auto mx-auto mb-4" />
              <h2 className="text-xl font-serif font-bold text-primary-900 text-center">
                Almaty Colleges
              </h2>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden relative">
              {/* Animated Progress Bar */}
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>
            
            {/* Percentage text (optional, but requested progress animation) */}
            <div className="mt-2 text-xs text-neutral-400 font-medium tracking-widest uppercase">
              Загрузка {Math.round(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
