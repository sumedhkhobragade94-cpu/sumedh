import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Layers, Scan, Sparkles, Activity, ShieldCheck, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

interface SkinBarrierComparison2DProps {
  initialMode?: 'bha_pore' | 'niacinamide_matrix';
}

export const SkinBarrierComparison2D: React.FC<SkinBarrierComparison2DProps> = ({
  initialMode = 'bha_pore'
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [activeMode, setActiveMode] = useState<'bha_pore' | 'niacinamide_matrix'>(initialMode);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameId = useRef<number | null>(null);

  // Handle Dragging
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(clamped);
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) handleMove(e.touches[0].clientX);
    };
    const onMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging, handleMove]);

  // 2D High-Contrast Monochrome Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };

    window.addEventListener('resize', handleResize);

    let t = 0;

    // Generate background cellular particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      type: 'debris' | 'lipid' | 'active';
    }> = [];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 3 + 1.5,
        type: i % 3 === 0 ? 'debris' : i % 3 === 1 ? 'lipid' : 'active'
      });
    }

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, width, height);

      const splitX = (sliderPos / 100) * width;

      // 1. LEFT SIDE: "CONGESTED / UNTREATED" (Dark Charcoal to Pitch Black with red/chaotic markers)
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, splitX, height);
      ctx.clip();

      // Background
      ctx.fillStyle = '#0f0f11';
      ctx.fillRect(0, 0, splitX, height);

      // Grid lines
      ctx.strokeStyle = '#222226';
      ctx.lineWidth = 1;
      const gridSize = 28;
      for (let x = 0; x < splitX; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(splitX, y);
        ctx.stroke();
      }

      if (activeMode === 'bha_pore') {
        // Clogged Pore Funnel (Chaotic, blocked with black/red particles)
        const poreCenterX = Math.min(splitX * 0.6, 200);
        
        // Blocked Canal
        ctx.fillStyle = '#1e1c20';
        ctx.beginPath();
        ctx.moveTo(poreCenterX - 50, 0);
        ctx.quadraticCurveTo(poreCenterX - 15, height * 0.45, poreCenterX - 8, height);
        ctx.lineTo(poreCenterX + 8, height);
        ctx.quadraticCurveTo(poreCenterX + 15, height * 0.45, poreCenterX + 50, 0);
        ctx.closePath();
        ctx.fill();

        // Sebum Blockage Core
        ctx.fillStyle = 'rgba(210, 80, 80, 0.4)';
        ctx.beginPath();
        ctx.arc(poreCenterX, height * 0.35 + Math.sin(t * 2) * 4, 22, 0, Math.PI * 2);
        ctx.fill();

        // Chaotic Trap Particles
        for (let i = 0; i < 20; i++) {
          const px = poreCenterX + Math.cos(i + t) * (12 + (i % 6));
          const py = height * 0.35 + Math.sin(i * 1.5 + t) * (12 + (i % 6));
          ctx.fillStyle = i % 2 === 0 ? '#ff6b6b' : '#888888';
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Warning Label
        ctx.fillStyle = '#ff6b6b';
        ctx.font = '9px monospace';
        ctx.fillText('⚡ HYPER-SEBUM BLOCKAGE', 20, 35);
        ctx.fillStyle = '#666';
        ctx.fillText('Pore Canal Diameter: Trapped (0.02mm)', 20, 50);
      } else {
        // Broken Lipid Bilayer (Fissures, loose tiles)
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 1.5;
        for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 6; col++) {
            const bx = 30 + col * 38 + Math.sin(t + col) * 3;
            const by = 80 + row * 45 + (col % 2 === 0 ? 8 : -8);
            ctx.strokeRect(bx, by, 30, 16);
          }
        }
        ctx.fillStyle = '#ff6b6b';
        ctx.font = '9px monospace';
        ctx.fillText('⚡ STRIPPED LIPID BILAYER (TEWL High)', 20, 35);
        ctx.fillStyle = '#666';
        ctx.fillText('Ceramide Gap: Severe Moisture Evaporation', 20, 50);
      }

      ctx.restore();

      // 2. RIGHT SIDE: "NOVELIS BIO-ACTIVE PURITY" (Crisp Clean White/Silver with High-Tech Molecular Alignment)
      ctx.save();
      ctx.beginPath();
      ctx.rect(splitX, 0, width - splitX, height);
      ctx.clip();

      // Clean Light Studio Background
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(splitX, 0, width - splitX, height);

      // Clean Precision Grid
      ctx.strokeStyle = '#e9ecef';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(splitX, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (activeMode === 'bha_pore') {
        // Clear, Decongested Follicle Canal
        const poreCenterX = Math.max(splitX + (width - splitX) * 0.4, splitX + 40);

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(poreCenterX - 45, 0);
        ctx.quadraticCurveTo(poreCenterX - 20, height * 0.45, poreCenterX - 14, height);
        ctx.lineTo(poreCenterX + 14, height);
        ctx.quadraticCurveTo(poreCenterX + 20, height * 0.45, poreCenterX + 45, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#8A9A5B';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Downward Flow of 2% Salicylic Acid Micro-Spheres
        for (let i = 0; i < 14; i++) {
          const sy = ((t * 40 + i * 25) % (height + 20)) - 10;
          const sx = poreCenterX + Math.sin(sy * 0.05 + i) * 6;
          
          ctx.fillStyle = '#8A9A5B';
          ctx.beginPath();
          ctx.arc(sx, sy, 3, 0, Math.PI * 2);
          ctx.fill();

          // Particle glow ring
          ctx.strokeStyle = 'rgba(138, 154, 91, 0.4)';
          ctx.beginPath();
          ctx.arc(sx, sy, 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Precision Active Diagnostic
        ctx.fillStyle = '#111111';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('✓ CLEARED FOLICULAR PASSAGEWAY', width - 240, 35);
        ctx.fillStyle = '#8A9A5B';
        ctx.font = '9px monospace';
        ctx.fillText('Lipid Dissolution: 99.4% Active Clearance', width - 240, 50);
      } else {
        // Tight, Harmonious Hexagonal Ceramide Bilayer
        ctx.strokeStyle = '#111111';
        ctx.fillStyle = '#ffffff';
        ctx.lineWidth = 1.5;

        for (let row = 0; row < 5; row++) {
          for (let col = 0; col < 8; col++) {
            const bx = width - 320 + col * 36;
            const by = 70 + row * 40 + (col % 2 === 0 ? 0 : 18);
            if (bx + 30 > splitX) {
              ctx.fillRect(bx, by, 32, 22);
              ctx.strokeRect(bx, by, 32, 22);

              // Ceramide anchor point
              ctx.fillStyle = '#8A9A5B';
              ctx.beginPath();
              ctx.arc(bx + 16, by + 11, 2, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = '#ffffff';
            }
          }
        }

        // Barrier Reinforced Label
        ctx.fillStyle = '#111111';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('✓ FORTIFIED STRATUM CORNEUM', width - 240, 35);
        ctx.fillStyle = '#8A9A5B';
        ctx.font = '9px monospace';
        ctx.fillText('Niacinamide Ceramide Synthesis: +88%', width - 240, 50);
      }

      ctx.restore();

      // 3. DIVIDER SCANNER LINE (High-Contrast White / Black Laser with glow)
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.moveTo(splitX, 0);
      ctx.lineTo(splitX, height);
      ctx.stroke();

      // Outer laser shadow
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Center Scan Node
      ctx.fillStyle = '#111111';
      ctx.beginPath();
      ctx.arc(splitX, height / 2, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('< >', splitX, height / 2);

      ctx.restore();

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [sliderPos, activeMode]);

  return (
    <div className="w-full bg-white border border-gray-200 overflow-hidden shadow-xs">
      
      {/* Top Header & Protocol Switcher */}
      <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#fafafa]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-black text-white flex items-center justify-center">
            <Scan className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
              Interactive 2D Cellular Micro-Scan
            </h3>
            <span className="text-[10px] text-gray-500 font-mono">
              Drag scanner to compare untreated vs. active NOVELIS substrate
            </span>
          </div>
        </div>

        {/* Mode Buttons */}
        <div className="inline-flex p-1 bg-gray-200/70 border border-gray-300">
          <button
            onClick={() => setActiveMode('bha_pore')}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeMode === 'bha_pore'
                ? 'bg-black text-white shadow-xs'
                : 'text-neutral-700 hover:text-black'
            }`}
          >
            2% BHA Follicle Action
          </button>
          <button
            onClick={() => setActiveMode('niacinamide_matrix')}
            className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeMode === 'niacinamide_matrix'
                ? 'bg-black text-white shadow-xs'
                : 'text-neutral-700 hover:text-black'
            }`}
          >
            10% Niacinamide Lipid Mesh
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className="relative w-full h-[360px] cursor-ew-resize select-none overflow-hidden bg-black"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Floating Side Tags */}
        <div className="absolute top-4 left-4 pointer-events-none z-10">
          <span className="px-2.5 py-1 bg-black/80 backdrop-blur-xs border border-white/20 text-white font-mono text-[9px] uppercase tracking-widest">
            ● UNTREATED / CONGESTED
          </span>
        </div>

        <div className="absolute top-4 right-4 pointer-events-none z-10">
          <span className="px-2.5 py-1 bg-white/95 backdrop-blur-xs border border-black/20 text-black font-mono text-[9px] uppercase tracking-widest font-bold">
            ✓ NOVELIS BIO-ACTIVE COMPLIANT
          </span>
        </div>

        {/* Bottom Helper Bar */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none z-10">
          <span className="px-3 py-1 bg-black/70 backdrop-blur-xs text-white/80 font-mono text-[9px] uppercase tracking-widest border border-white/10 flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-[#8A9A5B]" />
            Slide left/right to adjust clinical penetration ratio
          </span>
        </div>
      </div>

      {/* Bottom Live Metrics Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 bg-white border-t border-gray-100 text-xs">
        <div className="p-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 font-mono text-xs font-bold text-neutral-900">
            -84%
          </div>
          <div>
            <strong className="block text-[11px] uppercase tracking-wider text-neutral-900">
              Sebum Stagnation
            </strong>
            <span className="text-[10px] text-gray-500">Lipophilic BHA dissolves sebum plugs within 48 hours</span>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 font-mono text-xs font-bold text-[#8A9A5B]">
            +92%
          </div>
          <div>
            <strong className="block text-[11px] uppercase tracking-wider text-neutral-900">
              Ceramide Cohesion
            </strong>
            <span className="text-[10px] text-gray-500">Niacinamide tightens epidermal intercellular bridges</span>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 font-mono text-xs font-bold text-neutral-900">
            pH 3.8
          </div>
          <div>
            <strong className="block text-[11px] uppercase tracking-wider text-neutral-900">
              Bio-Compatible Acid
            </strong>
            <span className="text-[10px] text-gray-500">Active free-acid fraction tuned for zero barrier irritation</span>
          </div>
        </div>
      </div>

    </div>
  );
};
