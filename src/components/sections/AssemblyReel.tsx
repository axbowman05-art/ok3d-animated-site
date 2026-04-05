"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const clips = [
  { dir: "01", label: "Mounting Bracket", frames: 120 },
  { dir: "02", label: "Sensor Mount", frames: 120 },
  { dir: "03", label: "Electronics Enclosure", frames: 120 },
  { dir: "04", label: "CNC Fixture", frames: 120 },
  { dir: "05", label: "Robotic Gripper", frames: 120 },
];

// Last X% of each clip's scroll zone holds on final frame (0.0–1.0)
const HOLD_RATIO = 0.2;

// Scroll height per clip in vh — increase to slow down, decrease to speed up
const ZONE_VH = 600;

export default function AssemblyReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[][]>([]);
  const activeClipRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const reducedMotion = useReducedMotion();

  // Preload frames — clip 0 first, rest lazy after
  useEffect(() => {
    let cancelled = false;
    framesRef.current = clips.map(() => []);

    const loadClip = (ci: number, onDone?: () => void) => {
      let count = 0;
      const total = clips[ci].frames;
      for (let f = 1; f <= total; f++) {
        const img = new Image();
        img.src = `/frames/${clips[ci].dir}/${String(f).padStart(4, "0")}.jpg`;
        const onSettle = () => {
          if (cancelled) return;
          count++;
          if (count === total && onDone) onDone();
        };
        img.onload = onSettle;
        img.onerror = onSettle;
        framesRef.current[ci].push(img);
      }
    };

    // Load clip 0 first — show canvas as soon as it's ready
    loadClip(0, () => {
      if (cancelled) return;
      setLoaded(true);
      // Load remaining clips in background
      for (let ci = 1; ci < clips.length; ci++) loadClip(ci);
    });

    return () => {
      cancelled = true;
      framesRef.current = [];
    };
  }, []);

  // Draw a frame to canvas
  const drawFrame = (clipIndex: number, frameIndex: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current[clipIndex];
    if (!canvas || !frames.length) return;
    const img = frames[Math.min(frameIndex, frames.length - 1)];
    if (!img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = "saturate(90%) brightness(97%)";
    // Crop bottom 6% only
    const srcH = Math.floor(img.naturalHeight * 0.94);
    ctx.drawImage(img, 0, 0, img.naturalWidth, srcH, 0, 0, canvas.width, canvas.height);
  };

  // Set up scroll triggers after loaded
  useEffect(() => {
    if (!loaded || reducedMotion) return;

    // Draw first frame immediately
    drawFrame(0, 0);

    const ctx = gsap.context(() => {
      const totalVh = clips.length * ZONE_VH;

      const updateReel = (progress: number) => {
        const totalClips = clips.length;
        const rawPos = progress * totalClips;
        const clipIndex = Math.min(Math.floor(rawPos), totalClips - 1);
        const clipProgress = Math.min(rawPos - clipIndex, 1);
        const animProgress = Math.min(clipProgress / (1 - HOLD_RATIO), 1);
        const frameIndex = Math.floor(animProgress * clips[clipIndex].frames);

        if (clipIndex !== activeClipRef.current) {
          activeClipRef.current = clipIndex;
          setActiveIndex(clipIndex);
        }
        drawFrame(clipIndex, frameIndex);
      };

      // Single trigger for pin + per-clip progress
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalVh}vh`,
        pin: stickyRef.current,
        pinSpacing: true,
        onUpdate: (self) => updateReel(self.progress),
        // Lock to last frame when scrolling past the end
        onLeave: () => updateReel(1),
        // Lock to first frame when scrolling back above the section
        onLeaveBack: () => updateReel(0),
      });

      // Fade heading in
      gsap.fromTo(
        ".reel-heading",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loaded, reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-mono text-accent text-sm tracking-wider mb-3">WHAT WE BUILD</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            From idea to <span className="text-accent">assembled part</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {clips.map((clip) => (
              <div key={clip.dir} className="bg-card border border-border rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400">{clip.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ overflow: "hidden" }}
    >
      <div
        ref={stickyRef}
        className="h-screen w-full flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden"
      >
        {/* Heading */}
        <div className="reel-heading text-center mb-6 z-10 px-6" style={{ opacity: 0 }}>
          <p className="font-mono text-accent text-sm tracking-wider mb-2">WHAT WE BUILD</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            From idea to <span className="text-accent">assembled part</span>
          </h2>
        </div>

        {/* Canvas */}
        <div className="relative w-full max-w-4xl px-6" style={{ aspectRatio: "16/9" }}>
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="w-full h-full rounded-xl object-cover"
            style={{ display: loaded ? "block" : "none" }}
          />
          {!loaded && (
            <div className="absolute inset-0 rounded-xl bg-card border border-border flex items-center justify-center">
              <p className="font-mono text-accent text-sm tracking-wider animate-pulse">LOADING...</p>
            </div>
          )}

          {/* Glow border */}
          <div className="absolute inset-0 rounded-xl ring-1 ring-accent/20 pointer-events-none" />
          <div className="absolute inset-0 rounded-xl shadow-[0_0_60px_rgba(0,116,255,0.15)] pointer-events-none" />
        </div>

        {/* Label + dots */}
        <div className="mt-6 flex flex-col items-center gap-3 z-10">
          <p className="font-mono text-accent text-sm tracking-wider">
            {clips[activeIndex].label}
          </p>
          <div className="flex gap-2">
            {clips.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === activeIndex ? "#0074FF" : "#333",
                  transform: i === activeIndex ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
