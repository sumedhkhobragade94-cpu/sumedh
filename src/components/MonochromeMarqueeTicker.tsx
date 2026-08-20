import React from 'react';
import { motion } from 'motion/react';

interface MonochromeMarqueeTickerProps {
  variant?: 'light' | 'dark';
}

export const MonochromeMarqueeTicker: React.FC<MonochromeMarqueeTickerProps> = ({ variant = 'dark' }) => {
  const items = [
    'NOVELIS LAB SPECIFICATION',
    'SALICYLIC ACID 2.0% BHA',
    'NIACINAMIDE 10.0% + ZINC PCA',
    'ZERO SYNTHETIC FRAGRANCE',
    'PH 3.8 BIO-EQUILIBRIUM',
    'DERMATOLOGICALLY VERIFIED',
    '100% NON-COMEDOGENIC',
    'COLD-COMPOUNDED PURITY',
    '15-DAY CLINICAL CLEARANCE'
  ];

  const isDark = variant === 'dark';

  return (
    <div
      className={`w-full overflow-hidden py-3 border-y select-none relative ${
        isDark
          ? 'bg-black text-white border-neutral-800'
          : 'bg-white text-black border-gray-200'
      }`}
    >
      {/* Subtle side fade overlays */}
      <div className={`absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r ${isDark ? 'from-black to-transparent' : 'from-white to-transparent'}`} />
      <div className={`absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l ${isDark ? 'from-black to-transparent' : 'from-white to-transparent'}`} />

      <motion.div
        className="flex whitespace-nowrap items-center gap-8 cursor-default"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 24,
        }}
      >
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8 group">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase font-medium flex items-center gap-3">
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white' : 'bg-black'} group-hover:scale-150 transition-transform`} />
              {text}
            </span>
            <span className={`font-mono text-[9px] ${isDark ? 'text-neutral-600' : 'text-gray-400'}`}>//</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
