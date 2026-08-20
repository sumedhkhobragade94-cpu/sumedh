import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlaskConical, Sparkles, RefreshCw, Zap, ShieldCheck, Activity, Droplets, Layers } from 'lucide-react';

type SimulationMode = 'bha_pore' | 'niacinamide_barrier' | 'dropper_lab';

export const MolecularMotionGraphic: React.FC = () => {
  const [activeMode, setActiveMode] = useState<SimulationMode>('bha_pore');
  const [dropletCount, setDropletCount] = useState<number>(3);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [poreClearingProgress, setPoreClearingProgress] = useState<number>(78);
  const [backendAnalysis, setBackendAnalysis] = useState<any>(null);
  const [isLoadingBackend, setIsLoadingBackend] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fetch live backend calculation for compatibility
  const fetchBackendSimulation = async (mode: SimulationMode) => {
    setIsLoadingBackend(true);
    try {
      const primaryActive = mode === 'bha_pore' ? 'salicylic_acid' : 'niacinamide';
      const secondaryActive = mode === 'bha_pore' ? 'niacinamide' : 'zinc_pca';

      const res = await fetch('/api/lab/simulate-compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ primaryActive, secondaryActive })
      });
      const data = await res.json();
      if (data.success) {
        setBackendAnalysis(data.data);
      }
    } catch (e) {
      console.error('Backend simulation fetch error:', e);
    } finally {
      setIsLoadingBackend(false);
    }
  };

  useEffect(() => {
    fetchBackendSimulation(activeMode);
  }, [activeMode]);

  // 2D Canvas Motion Physics Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 600;
      height = canvas.height = 360;
    };
    window.addEventListener('resize', handleResize);

    // Particle structures
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      type: 'active' | 'sebum' | 'lipid' | 'splash';
      life?: number;
      maxLife?: number;
    }

    const particles: Particle[] = [];
    const numParticles = activeMode === 'bha_pore' ? 55 : activeMode === 'niacinamide_barrier' ? 70 : 40;

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        if (activeMode === 'bha_pore') {
          // Salicylic Acid diving into pore
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: Math.random() * 1.8 + 0.5,
            radius: Math.random() * 3 + 2,
            color: Math.random() > 0.4 ? '#4F6D54' : '#8A9A5B',
            alpha: Math.random() * 0.7 + 0.3,
            type: 'active'
          });
        } else if (activeMode === 'niacinamide_barrier') {
          // Niacinamide weaving grid barrier
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 2.5 + 1.5,
            color: Math.random() > 0.3 ? '#8A9A5B' : '#111111',
            alpha: Math.random() * 0.6 + 0.4,
            type: 'lipid'
          });
        } else {
          // Dropper lab ambient particles
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 2 + 1,
            color: '#8A9A5B',
            alpha: Math.random() * 0.5 + 0.2,
            type: 'active'
          });
        }
      }
    };

    initParticles();

    // Droplet physics on click/dispense
    const splashes: Particle[] = [];
    let dropperDropletY = -20;
    let isDropping = false;

    const triggerDrop = () => {
      dropperDropletY = 40;
      isDropping = true;
    };

    // Render loop
    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Background geometric lab grid
      ctx.strokeStyle = 'rgba(0,0,0,0.03)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (activeMode === 'bha_pore') {
        // Draw 2D Pore Canal
        const poreCenterX = width / 2;
        const poreTopWidth = 140;
        const poreBottomWidth = 60;
        const poreDepth = height - 40;

        // Pore silhouette
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(poreCenterX - poreTopWidth / 2, 70);
        ctx.bezierCurveTo(
          poreCenterX - poreTopWidth / 2 + 20, 160,
          poreCenterX - poreBottomWidth / 2, 220,
          poreCenterX - poreBottomWidth / 2, poreDepth
        );
        ctx.lineTo(poreCenterX + poreBottomWidth / 2, poreDepth);
        ctx.bezierCurveTo(
          poreCenterX + poreBottomWidth / 2, 220,
          poreCenterX + poreTopWidth / 2 - 20, 160,
          poreCenterX + poreTopWidth / 2, 70
        );
        ctx.closePath();
        ctx.fillStyle = 'rgba(138, 154, 91, 0.05)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(138, 154, 91, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Epidermal surface layers (Top lines)
        ctx.strokeStyle = 'rgba(17, 17, 17, 0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 70);
        ctx.lineTo(poreCenterX - poreTopWidth / 2, 70);
        ctx.moveTo(poreCenterX + poreTopWidth / 2, 70);
        ctx.lineTo(width, 70);
        ctx.stroke();

        // Sebum clusters in the pore bottom
        const sebumRadius = 24 * (1 - (poreClearingProgress - 50) / 100);
        ctx.beginPath();
        ctx.arc(poreCenterX, poreDepth - 25, Math.max(8, sebumRadius), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 163, 115, 0.25)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(212, 163, 115, 0.6)';
        ctx.stroke();

        // BHA Active Nanoparticles Penetration
        particles.forEach((p) => {
          p.y += p.vy;
          p.x += Math.sin(tick * 0.05 + p.y * 0.02) * 0.8;

          // Funnel into pore
          if (p.y > 70 && p.y < poreDepth) {
            const currentPoreWidth = poreTopWidth - (p.y - 70) * ((poreTopWidth - poreBottomWidth) / (poreDepth - 70));
            const minX = poreCenterX - currentPoreWidth / 2 + 5;
            const maxX = poreCenterX + currentPoreWidth / 2 - 5;
            if (p.x < minX) p.x = minX + 2;
            if (p.x > maxX) p.x = maxX - 2;
          }

          if (p.y > height) {
            p.y = 0;
            p.x = Math.random() * width;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        });

      } else if (activeMode === 'niacinamide_barrier') {
        // Draw Stratum Corneum Lipid Bilayer Mesh
        const rows = 5;
        const cols = Math.floor(width / 45);
        const cellWidth = width / cols;
        const startY = 90;

        ctx.strokeStyle = 'rgba(138, 154, 91, 0.2)';
        ctx.lineWidth = 1;

        // Brick-and-mortar skin barrier cells
        for (let r = 0; r < rows; r++) {
          const offsetX = (r % 2) * (cellWidth / 2);
          for (let c = -1; c <= cols; c++) {
            const bx = c * cellWidth + offsetX;
            const by = startY + r * 36;
            
            // Cell brick
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(bx + 3, by + 3, cellWidth - 6, 28);
            ctx.strokeRect(bx + 3, by + 3, cellWidth - 6, 28);

            // Ceramide lipid synthesis glow pulses
            const pulse = Math.sin(tick * 0.04 + r * 0.5 + c * 0.3) * 0.5 + 0.5;
            ctx.fillStyle = `rgba(138, 154, 91, ${pulse * 0.18})`;
            ctx.fillRect(bx + 3, by + 3, cellWidth - 6, 28);
          }
        }

        // Connecting lipid bonds
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          p1.x += p1.vx;
          p1.y += p1.vy;

          if (p1.x < 0 || p1.x > width) p1.vx *= -1;
          if (p1.y < 50 || p1.y > height - 40) p1.vy *= -1;

          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
          ctx.fillStyle = p1.color;
          ctx.fill();

          // Connect nearby particles with ceramide bridges
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if (dist < 45) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(138, 154, 91, ${1 - dist / 45})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }

      } else {
        // Dropper Lab Mode: Pipette & Droplet Fluid Surface Tension
        const centerX = width / 2;

        // Draw Pipette Glass Tip
        ctx.fillStyle = '#f8f8f8';
        ctx.strokeStyle = '#111111';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - 24, 0);
        ctx.lineTo(centerX - 24, 40);
        ctx.lineTo(centerX - 8, 80);
        ctx.lineTo(centerX - 8, 100);
        ctx.lineTo(centerX + 8, 100);
        ctx.lineTo(centerX + 8, 80);
        ctx.lineTo(centerX + 24, 40);
        ctx.lineTo(centerX + 24, 0);
        ctx.fill();
        ctx.stroke();

        // Amber/Green liquid inside pipette
        ctx.fillStyle = 'rgba(138, 154, 91, 0.45)';
        ctx.beginPath();
        ctx.moveTo(centerX - 20, 20);
        ctx.lineTo(centerX - 6, 75);
        ctx.lineTo(centerX - 6, 96);
        ctx.lineTo(centerX + 6, 96);
        ctx.lineTo(centerX + 6, 75);
        ctx.lineTo(centerX + 20, 20);
        ctx.fill();

        // Droplet formation & drop
        if (isDropping) {
          dropperDropletY += 7.5; // Droplet falling speed

          // Teardrop shape
          ctx.fillStyle = '#8A9A5B';
          ctx.beginPath();
          ctx.arc(centerX, dropperDropletY, 6.5, 0, Math.PI);
          ctx.lineTo(centerX, dropperDropletY - 14);
          ctx.closePath();
          ctx.fill();

          // Droplet impact on skin canvas
          const skinSurfaceY = height - 60;
          if (dropperDropletY >= skinSurfaceY) {
            isDropping = false;
            dropperDropletY = 105;

            // Spawn 12 splash particles
            for (let s = 0; s < 12; s++) {
              const angle = Math.random() * Math.PI - Math.PI;
              const speed = Math.random() * 4 + 2;
              splashes.push({
                x: centerX,
                y: skinSurfaceY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: Math.random() * 2.5 + 1.5,
                color: '#8A9A5B',
                alpha: 1,
                type: 'splash',
                life: 0,
                maxLife: 30
              });
            }
          }
        } else {
          // Pendant drop hanging from pipette tip
          const pendantRadius = 5 + Math.sin(tick * 0.08) * 1.2;
          ctx.fillStyle = '#8A9A5B';
          ctx.beginPath();
          ctx.arc(centerX, 106, pendantRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Render Splashes and Ripples
        for (let i = splashes.length - 1; i >= 0; i--) {
          const sp = splashes[i];
          sp.life = (sp.life || 0) + 1;
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vy += 0.15; // gravity
          sp.alpha = 1 - (sp.life / (sp.maxLife || 30));

          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(138, 154, 91, ${sp.alpha})`;
          ctx.fill();

          if (sp.life >= (sp.maxLife || 30)) {
            splashes.splice(i, 1);
          }
        }

        // Skin layer at bottom with ripple waves
        const skinSurfaceY = height - 60;
        ctx.strokeStyle = 'rgba(17,17,17,0.2)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, skinSurfaceY);
        ctx.lineTo(width, skinSurfaceY);
        ctx.stroke();

        // Expanding circular ripple
        const rippleR = (tick * 1.5) % 90;
        const rippleAlpha = 1 - rippleR / 90;
        ctx.strokeStyle = `rgba(138, 154, 91, ${rippleAlpha * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(centerX, skinSurfaceY, rippleR, rippleR * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Periodic automatic drop in dropper lab mode
    let dropInterval: NodeJS.Timeout;
    if (activeMode === 'dropper_lab') {
      dropInterval = setInterval(() => {
        triggerDrop();
      }, 2200);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (dropInterval) clearInterval(dropInterval);
    };
  }, [activeMode, poreClearingProgress]);

  return (
    <div className="w-full bg-white border border-gray-100 shadow-sm overflow-hidden text-[#111]">
      {/* HUD Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#8A9A5B] animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#111]">
            2D Clinical Bio-Active Visualizer
          </span>
          <span className="hidden sm:inline text-[9px] uppercase tracking-widest text-gray-400 bg-white px-2 py-0.5 border border-gray-200">
            Real-Time Kinetic Simulation
          </span>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-gray-200">
          <button
            onClick={() => setActiveMode('bha_pore')}
            className={`px-3 py-1.5 text-[9px] uppercase font-bold tracking-widest transition-all ${
              activeMode === 'bha_pore'
                ? 'bg-black text-white'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            BHA Pore Clearance
          </button>
          <button
            onClick={() => setActiveMode('niacinamide_barrier')}
            className={`px-3 py-1.5 text-[9px] uppercase font-bold tracking-widest transition-all ${
              activeMode === 'niacinamide_barrier'
                ? 'bg-black text-white'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Barrier Synthesis
          </button>
          <button
            onClick={() => setActiveMode('dropper_lab')}
            className={`px-3 py-1.5 text-[9px] uppercase font-bold tracking-widest transition-all ${
              activeMode === 'dropper_lab'
                ? 'bg-black text-white'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Pipette Viscosity
          </button>
        </div>
      </div>

      {/* Interactive Canvas Canvas Viewport */}
      <div className="relative w-full h-[360px] bg-[#fcfcfc] overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Live HUD Floating Overlays */}
        <div className="absolute top-4 left-4 pointer-events-none space-y-2">
          {activeMode === 'bha_pore' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-xs border border-gray-200 p-3 shadow-2xs max-w-xs"
            >
              <div className="text-[9px] uppercase font-bold tracking-widest text-[#8A9A5B]">
                Active: Salicylic Acid 2% (BHA)
              </div>
              <div className="text-xs font-mono font-bold text-neutral-900 mt-0.5">
                Follicular pH: 3.8 – 4.2
              </div>
              <div className="text-[10px] text-gray-500 mt-1">
                Lipid-soluble active dissolving sebum blockage in pore canal.
              </div>
            </motion.div>
          )}

          {activeMode === 'niacinamide_barrier' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-xs border border-gray-200 p-3 shadow-2xs max-w-xs"
            >
              <div className="text-[9px] uppercase font-bold tracking-widest text-[#8A9A5B]">
                Active: Niacinamide 10% + Zinc 1%
              </div>
              <div className="text-xs font-mono font-bold text-neutral-900 mt-0.5">
                TEWL Barrier Fortification: +42%
              </div>
              <div className="text-[10px] text-gray-500 mt-1">
                Strengthening stratum corneum lipid bilayers &amp; calming redness.
              </div>
            </motion.div>
          )}

          {activeMode === 'dropper_lab' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-xs border border-gray-200 p-3 shadow-2xs max-w-xs"
            >
              <div className="text-[9px] uppercase font-bold tracking-widest text-[#8A9A5B]">
                Laboratory Pipette Standard
              </div>
              <div className="text-xs font-mono font-bold text-neutral-900 mt-0.5">
                Dose: 0.05 ml / Micro-Droplet
              </div>
              <div className="text-[10px] text-gray-500 mt-1">
                High-surface tension water matrix for fast epidermal absorption.
              </div>
            </motion.div>
          )}
        </div>

        {/* Live Metric Badges Bottom Right */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          <div className="bg-white/95 border border-gray-200 px-3 py-1.5 text-right shadow-2xs">
            <span className="text-[8px] uppercase tracking-widest text-gray-400 block">Molecular Weight</span>
            <span className="text-xs font-mono font-bold text-neutral-900">
              {activeMode === 'bha_pore' ? '138.12 g/mol' : activeMode === 'niacinamide_barrier' ? '122.12 g/mol' : '30 ml Pure'}
            </span>
          </div>

          <div className="bg-white/95 border border-gray-200 px-3 py-1.5 text-right shadow-2xs">
            <span className="text-[8px] uppercase tracking-widest text-gray-400 block">Efficacy Index</span>
            <span className="text-xs font-mono font-bold text-[#8A9A5B]">
              {backendAnalysis ? `${backendAnalysis.safetyScore}% Optimal` : '98% Optimal'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Backend Verification Panel */}
      <div className="p-6 bg-white border-t border-gray-100 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left: Scientific explanation from Backend */}
        <div className="md:col-span-8 space-y-1.5">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#8A9A5B]" />
            <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-gray-400">
              Express Clinical Server Analysis:
            </span>
          </div>
          <p className="text-xs text-neutral-800 leading-relaxed font-medium">
            {backendAnalysis?.recommendation ||
              'Formulated at biocompatible pH levels to maximize active transdermal permeability without compromising barrier homeostasis.'}
          </p>
          <div className="text-[10px] text-gray-500 font-serif italic serif-font">
            Mechanism: {backendAnalysis?.scientificMechanism || 'Stimulates cellular desquamation and epidermal lipid matrix synthesis.'}
          </div>
        </div>

        {/* Right: Manual Interactive Simulation Trigger */}
        <div className="md:col-span-4 flex flex-col gap-2">
          {activeMode === 'bha_pore' && (
            <div>
              <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-1">
                <span>Pore Clarity</span>
                <span>{poreClearingProgress}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={poreClearingProgress}
                onChange={(e) => setPoreClearingProgress(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>
          )}

          {activeMode === 'dropper_lab' && (
            <button
              onClick={() => {
                setDropletCount((prev) => prev + 1);
              }}
              className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
            >
              <Droplets className="w-3 h-3 text-[#8A9A5B]" />
              <span>Dispense Droplet #{dropletCount}</span>
            </button>
          )}

          <button
            onClick={() => fetchBackendSimulation(activeMode)}
            disabled={isLoadingBackend}
            className="w-full py-2 border border-gray-200 hover:border-black text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <RefreshCw className={`w-3 h-3 ${isLoadingBackend ? 'animate-spin' : ''}`} />
            <span>{isLoadingBackend ? 'Recalculating...' : 'Refresh Server Assay'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
