import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlaskConical, Droplets, Zap, Shield, Sparkles, CheckCircle2, RotateCcw, Activity } from 'lucide-react';

interface MonochromeBottleLabProps {
  onExploreProduct?: (slug: string) => void;
}

export const MonochromeBottleLab: React.FC<MonochromeBottleLabProps> = ({ onExploreProduct }) => {
  const [activeFormula, setActiveFormula] = useState<'clarify' | 'renew'>('clarify');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);
  const [dropletCount, setDropletCount] = useState<number>(0);
  const [isDispensing, setIsDispensing] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameId = useRef<number | null>(null);

  const hotspots = [
    {
      id: 0,
      title: 'Aero-Tight Medical Bulb',
      subtitle: 'Nitrogen-purged elastomeric polymer prevents active ingredient oxidation upon unsealing.',
      spec: '99.9% Oxygen Exclusion',
      x: 50,
      y: 16
    },
    {
      id: 1,
      title: 'Type-1 Borosilicate Pipette',
      subtitle: 'Non-reactive lab glass calibrated for uniform 0.05ml micro-droplet surface tension release.',
      spec: 'Calibrated ±0.002ml',
      x: 50,
      y: 40
    },
    {
      id: 2,
      title: 'UV-Photoprotective Amber Glass',
      subtitle: 'Filters 98.4% of blue-UV spectrum to safeguard salicylic acid & niacinamide bond integrity.',
      spec: 'Amber ISO 4796 Filter',
      x: 50,
      y: 68
    },
    {
      id: 3,
      title: 'Bio-Identical Aqueous Matrix',
      subtitle: 'Cold-compounded solution with zero alcohol, zero silicones, and zero masking fragrances.',
      spec: 'Viscosity 1.18 cP (Water-light)',
      x: 50,
      y: 84
    }
  ];

  // Droplet Physics Simulation on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = 300);
    let height = (canvas.height = 360);

    const ripples: Array<{ x: number; y: number; r: number; opacity: number }> = [];
    const activeDrops: Array<{ y: number; vy: number; radius: number; color: string }> = [];

    let dropTimer: NodeJS.Timeout | null = null;

    if (isDispensing) {
      activeDrops.push({
        y: 120,
        vy: 2,
        radius: 5,
        color: activeFormula === 'clarify' ? '#8A9A5B' : '#ffffff'
      });
      setDropletCount((prev) => prev + 1);
      dropTimer = setTimeout(() => setIsDispensing(false), 800);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background grid
      ctx.strokeStyle = '#1a1a1c';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Glass Pipette Tip
      const tipX = width / 2;
      const tipY = 90;

      ctx.fillStyle = '#222226';
      ctx.beginPath();
      ctx.moveTo(tipX - 12, 0);
      ctx.lineTo(tipX - 6, tipY);
      ctx.lineTo(tipX + 6, tipY);
      ctx.lineTo(tipX + 12, 0);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#44444a';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Fluid Column Inside Pipette
      ctx.fillStyle = activeFormula === 'clarify' ? 'rgba(138, 154, 91, 0.7)' : 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.moveTo(tipX - 8, 0);
      ctx.lineTo(tipX - 4, tipY - 4);
      ctx.lineTo(tipX + 4, tipY - 4);
      ctx.lineTo(tipX + 8, 0);
      ctx.closePath();
      ctx.fill();

      // Update & Draw Droplets
      for (let i = activeDrops.length - 1; i >= 0; i--) {
        const drop = activeDrops[i];
        drop.y += drop.vy;
        drop.vy += 0.45; // gravity

        // Draw tear shape
        ctx.fillStyle = drop.color;
        ctx.beginPath();
        ctx.arc(tipX, drop.y, drop.radius, 0, Math.PI);
        ctx.lineTo(tipX, drop.y - drop.radius * 1.8);
        ctx.closePath();
        ctx.fill();

        // Droplet glow
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();

        // Check if reaches bottom dish
        if (drop.y >= height - 40) {
          ripples.push({ x: tipX, y: height - 40, r: 2, opacity: 1 });
          ripples.push({ x: tipX, y: height - 40, r: 1, opacity: 0.8 });
          activeDrops.splice(i, 1);
        }
      }

      // Draw Petri / Skin Dish at Bottom
      const dishY = height - 40;
      ctx.fillStyle = '#141416';
      ctx.beginPath();
      ctx.ellipse(tipX, dishY, 70, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#333338';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw Fluid Pool in Dish
      ctx.fillStyle = activeFormula === 'clarify' ? 'rgba(138, 154, 91, 0.25)' : 'rgba(255, 255, 255, 0.25)';
      ctx.beginPath();
      ctx.ellipse(tipX, dishY, 55, 11, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += 1.2;
        r.opacity -= 0.02;

        if (r.opacity <= 0 || r.r > 60) {
          ripples.splice(i, 1);
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.r, r.r * 0.3, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (dropTimer) clearTimeout(dropTimer);
    };
  }, [isDispensing, activeFormula]);

  const triggerDispense = () => {
    if (!isDispensing) {
      setIsDispensing(true);
    }
  };

  const selectedData = hotspots[activeHotspot ?? 0];

  return (
    <div className="w-full bg-[#0a0a0c] text-white border border-neutral-800 shadow-xl overflow-hidden">
      
      {/* Top Header */}
      <div className="px-6 py-5 border-b border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#8A9A5B] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8A9A5B]">
              Engineering Specifications
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-light tracking-tight text-white">
            Monochrome Bottle Anatomy &amp; Fluid Mechanics
          </h3>
        </div>

        {/* Formula Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFormula('clarify')}
            className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest border transition-all ${
              activeFormula === 'clarify'
                ? 'bg-white text-black border-white font-bold'
                : 'bg-transparent text-gray-400 border-neutral-700 hover:text-white'
            }`}
          >
            NOVELIS Clarify (BHA 2%)
          </button>
          <button
            onClick={() => setActiveFormula('renew')}
            className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest border transition-all ${
              activeFormula === 'renew'
                ? 'bg-white text-black border-white font-bold'
                : 'bg-transparent text-gray-400 border-neutral-700 hover:text-white'
            }`}
          >
            NOVELIS Renew (Niacinamide 10%)
          </button>
        </div>
      </div>

      {/* Main 3-Column Technical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        
        {/* Column 1: Interactive Wireframe Hotspots (Left) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-800 bg-[#0d0d10]">
          <div>
            <span className="text-[10px] font-mono uppercase text-gray-500 tracking-widest block mb-4">
              01 // STRUCTURAL HOTSPOTS
            </span>

            <div className="space-y-3">
              {hotspots.map((hs, idx) => {
                const isActive = activeHotspot === idx;
                return (
                  <button
                    key={hs.id}
                    onClick={() => setActiveHotspot(idx)}
                    className={`w-full text-left p-3.5 border transition-all flex items-start gap-3.5 ${
                      isActive
                        ? 'bg-neutral-900 border-white text-white shadow-xs'
                        : 'bg-transparent border-neutral-800 text-gray-400 hover:border-neutral-700 hover:text-gray-200'
                    }`}
                  >
                    <span className={`w-5 h-5 font-mono text-[10px] border flex items-center justify-center shrink-0 mt-0.5 ${
                      isActive ? 'bg-white text-black font-bold border-white' : 'border-neutral-700 text-gray-500'
                    }`}>
                      0{idx + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-medium tracking-wide text-white">
                          {hs.title}
                        </strong>
                        {isActive && (
                          <span className="text-[9px] font-mono text-[#8A9A5B] uppercase tracking-wider">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        {hs.subtitle}
                      </p>
                      <div className="mt-2 text-[10px] font-mono text-gray-500 bg-black/40 px-2 py-0.5 inline-block border border-neutral-800">
                        {hs.spec}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick formula link */}
          {onExploreProduct && (
            <div className="pt-6 mt-6 border-t border-neutral-800">
              <button
                onClick={() => onExploreProduct(activeFormula)}
                className="w-full py-3 bg-white hover:bg-gray-200 text-black text-[10px] font-mono uppercase tracking-[0.2em] font-bold transition-colors flex items-center justify-center gap-2"
              >
                <span>View Full Formulation Certificate</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Column 2: 2D Pipette Physics Dispenser (Center/Right) */}
        <div className="lg:col-span-4 p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-neutral-800 relative bg-[#070708] overflow-hidden">
          <div className="absolute top-4 left-4 font-mono text-[9px] text-neutral-500 tracking-widest uppercase">
            PHYSICS STAGE // 60 FPS
          </div>

          <div className="relative w-full max-w-[260px] aspect-[3/4] flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>

          {/* Dispense Trigger Button */}
          <div className="w-full max-w-[240px] pt-4">
            <button
              id="dispense-droplet-btn"
              onClick={triggerDispense}
              disabled={isDispensing}
              className={`w-full py-3 border text-[10px] font-mono uppercase tracking-[0.25em] font-bold transition-all flex items-center justify-center gap-2 ${
                isDispensing
                  ? 'bg-neutral-800 text-gray-400 border-neutral-700 cursor-not-allowed'
                  : 'bg-black text-white border-white hover:bg-white hover:text-black shadow-md active:scale-98'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 text-[#8A9A5B]" />
              <span>{isDispensing ? 'Dispensing...' : 'Dispense 0.05ml Drop'}</span>
            </button>

            <div className="flex items-center justify-between text-[9px] font-mono text-gray-500 mt-2 px-1">
              <span>DROPS: {dropletCount}</span>
              <span>VOL: {(dropletCount * 0.05).toFixed(2)} ML</span>
            </div>
          </div>
        </div>

        {/* Column 3: Live Clinical Telemetry & Diagnostics (Right) */}
        <div className="lg:col-span-3 p-6 flex flex-col justify-between bg-[#0a0a0c]">
          <div>
            <span className="text-[10px] font-mono uppercase text-gray-500 tracking-widest block mb-4">
              02 // LAB TELEMETRY
            </span>

            <div className="space-y-4">
              <div className="p-3 bg-neutral-900/80 border border-neutral-800">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block mb-1">
                  Active Molecule
                </span>
                <strong className="text-xs text-white font-mono block">
                  {activeFormula === 'clarify' ? 'C7H6O3 (Salicylic Acid)' : 'C6H6N2O (Niacinamide)'}
                </strong>
                <span className="text-[10px] text-[#8A9A5B] font-mono">
                  {activeFormula === 'clarify' ? 'Purity > 99.8% BP/USP' : 'Purity > 99.4% Cosmetic Grade'}
                </span>
              </div>

              <div className="p-3 bg-neutral-900/80 border border-neutral-800">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block mb-1">
                  Equilibrium Target pH
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold font-mono text-white">
                    {activeFormula === 'clarify' ? '3.80' : '5.50'}
                  </span>
                  <span className="text-[9px] font-mono text-gray-500">± 0.2 pH Units</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-900/80 border border-neutral-800">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block mb-1">
                  Preservative Integrity
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Eco-Certified Phenoxyethanol Matrix
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 border border-neutral-800 text-[10px] font-mono text-gray-400 mt-6">
            <span className="text-white block mb-0.5">● NOVELIS PROTOCOL #01</span>
            100% Vegan • Cruelty-Free • Non-Oxidizing Formula
          </div>
        </div>

      </div>

    </div>
  );
};
