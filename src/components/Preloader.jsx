import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 6;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-50 dark:bg-[#080c10] transition-colors duration-300 select-none"
    >
      {/* Centered Glowing Logo */}
      <div className="relative flex flex-col items-center justify-center animate-pulse">
        <img
          src="assets/Hlogo/Hlogo.png"
          alt="Hlogo.png"
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-[0_0_20px_rgba(0,230,118,0.4)]"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'assets/logo/logo.png';
          }}
        />
      </div>

      {/* Bottom Initializing System Telemetry */}
      <div className="absolute bottom-10 flex flex-col items-center space-y-2">
        <span className="text-xs font-mono tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase">
          Initializing System
        </span>

        {/* Cyber-Green Loading Bar */}
        <div className="w-32 sm:w-40 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700/50">
          <div
            className="h-full bg-cybergreen rounded-full shadow-[0_0_12px_#00E676] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[10px] font-mono text-cybergreen font-bold">
          {progress}%
        </span>
      </div>
    </motion.div>
  );
}
