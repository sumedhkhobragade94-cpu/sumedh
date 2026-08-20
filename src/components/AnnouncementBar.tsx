import React from 'react';
import { Truck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Announcements" className="bg-black text-white text-[9px] uppercase tracking-[0.45em] font-bold py-2.5 px-4 overflow-hidden border-b border-neutral-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-neutral-400 text-[8px] tracking-[0.4em]">
          <span>PH-BALANCED</span>
          <span>•</span>
          <span>ZERO FRAGRANCE</span>
        </div>

        <div className="w-full md:w-auto text-center flex items-center justify-center gap-4 sm:gap-6">
          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8A9A5B]"></span>
            30 ML • TARGETED FORMULAS • MINIMAL ROUTINES • SKIN SCIENCE
          </span>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <span className="hidden sm:flex items-center gap-1.5 text-neutral-300">
            <Truck className="w-3 h-3 text-[#8A9A5B]" />
            FREE SHIPPING ON ORDERS OVER ₹799
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-neutral-400 text-[8px] tracking-[0.4em]">
          <span>CLINICAL ACTIVES</span>
        </div>
      </div>
    </aside>
  );
};

