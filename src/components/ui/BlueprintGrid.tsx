"use client";

import { useEffect, useRef } from "react";

interface LightParticle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  brightness: number;
  direction: "horizontal" | "vertical";
  progress: number;
  color: { r: number; g: number; b: number };
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: { r: number; g: number; b: number };
}

interface IntersectionFlash {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  brightness: number;
}

interface BlueprintGridProps {
  className?: string;
}

const BLUE = { r: 0, g: 116, b: 255 };
const GOLD = { r: 255, g: 221, b: 0 };

export default function BlueprintGrid({ className = "" }: BlueprintGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lights: LightParticle[] = [];
    const pulses: PulseWave[] = [];
    const flashes: IntersectionFlash[] = [];
    let lastTime = 0;
    let elapsed = 0;
    const GRID_SIZE = 48;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createLight = (): LightParticle => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const isHorizontal = Math.random() > 0.5;
      // 80% blue, 20% gold
      const color = Math.random() < 0.8 ? BLUE : GOLD;

      if (isHorizontal) {
        const y = Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE;
        const goRight = Math.random() > 0.5;
        return {
          x: goRight ? 0 : width,
          y,
          targetX: goRight ? width : 0,
          targetY: y,
          speed: 0.4 + Math.random() * 1.0,
          brightness: 0.7 + Math.random() * 0.3,
          direction: "horizontal",
          progress: 0,
          color,
        };
      } else {
        const x = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
        const goDown = Math.random() > 0.5;
        return {
          x,
          y: goDown ? 0 : height,
          targetX: x,
          targetY: goDown ? height : 0,
          speed: 0.4 + Math.random() * 1.0,
          brightness: 0.7 + Math.random() * 0.3,
          direction: "vertical",
          progress: 0,
          color,
        };
      }
    };

    const drawGrid = (width: number, height: number, time: number) => {
      // Grid lines with subtle breathing
      const breathe = 0.08 + Math.sin(time * 0.0005) * 0.03;
      ctx.strokeStyle = `rgba(0, 116, 255, ${breathe})`;
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Intersection dots with staggered pulse
      for (let x = 0; x <= width; x += GRID_SIZE) {
        for (let y = 0; y <= height; y += GRID_SIZE) {
          const phase = (x + y) * 0.01 + time * 0.001;
          const pulse = 0.15 + Math.sin(phase) * 0.08;
          const radius = 1.5 + Math.sin(phase) * 0.5;
          ctx.fillStyle = `rgba(0, 116, 255, ${pulse})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawLights = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      lights.forEach((light) => {
        const currentX =
          light.direction === "horizontal"
            ? light.x + (light.targetX - light.x) * light.progress
            : light.x;
        const currentY =
          light.direction === "vertical"
            ? light.y + (light.targetY - light.y) * light.progress
            : light.y;
        const { r, g, b } = light.color;

        // Check for intersection flash
        const nearGridX = Math.abs(currentX % GRID_SIZE) < 3 || Math.abs(currentX % GRID_SIZE - GRID_SIZE) < 3;
        const nearGridY = Math.abs(currentY % GRID_SIZE) < 3 || Math.abs(currentY % GRID_SIZE - GRID_SIZE) < 3;
        if (nearGridX && nearGridY && Math.random() < 0.3) {
          const snapX = Math.round(currentX / GRID_SIZE) * GRID_SIZE;
          const snapY = Math.round(currentY / GRID_SIZE) * GRID_SIZE;
          if (snapX >= 0 && snapX <= width && snapY >= 0 && snapY <= height) {
            flashes.push({
              x: snapX,
              y: snapY,
              life: 0,
              maxLife: 400 + Math.random() * 200,
              brightness: 0.6 + Math.random() * 0.4,
            });
          }
        }

        // Outer glow — larger
        const gradient = ctx.createRadialGradient(
          currentX, currentY, 0,
          currentX, currentY, 30
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${light.brightness * 0.7})`);
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${light.brightness * 0.2})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 30, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${light.brightness})`;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // White-hot center
        ctx.fillStyle = `rgba(255, 255, 255, ${light.brightness * 0.5})`;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 1, 0, Math.PI * 2);
        ctx.fill();

        // Trail
        const trailLength = 90;
        const trailGradient = ctx.createLinearGradient(
          light.direction === "horizontal"
            ? currentX - (light.targetX > light.x ? trailLength : -trailLength)
            : currentX,
          light.direction === "vertical"
            ? currentY - (light.targetY > light.y ? trailLength : -trailLength)
            : currentY,
          currentX,
          currentY
        );
        trailGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        trailGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${light.brightness * 0.35})`);

        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (light.direction === "horizontal") {
          const startX = currentX - (light.targetX > light.x ? trailLength : -trailLength);
          ctx.moveTo(startX, currentY);
          ctx.lineTo(currentX, currentY);
        } else {
          const startY = currentY - (light.targetY > light.y ? trailLength : -trailLength);
          ctx.moveTo(currentX, startY);
          ctx.lineTo(currentX, currentY);
        }
        ctx.stroke();
      });
    };

    const drawPulses = () => {
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const progress = p.radius / p.maxRadius;
        const alpha = p.opacity * (1 - progress);
        const { r, g, b } = p.color;

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const drawFlashes = () => {
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        const progress = f.life / f.maxLife;
        const alpha = f.brightness * (1 - progress);
        const radius = 4 + progress * 8;

        const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, radius);
        gradient.addColorStop(0, `rgba(0, 116, 255, ${alpha * 0.8})`);
        gradient.addColorStop(0.5, `rgba(0, 116, 255, ${alpha * 0.2})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(f.x, f.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = (currentTime: number) => {
      const deltaTime = Math.min(currentTime - lastTime, 50);
      lastTime = currentTime;
      elapsed += deltaTime;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);
      drawGrid(width, height, elapsed);

      // Update particles
      for (let i = lights.length - 1; i >= 0; i--) {
        lights[i].progress += lights[i].speed * deltaTime * 0.0008;
        if (lights[i].progress >= 1) {
          lights.splice(i, 1);
        }
      }

      // Update pulse waves
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].radius += deltaTime * 0.15;
        if (pulses[i].radius >= pulses[i].maxRadius) {
          pulses.splice(i, 1);
        }
      }

      // Update intersection flashes
      for (let i = flashes.length - 1; i >= 0; i--) {
        flashes[i].life += deltaTime;
        if (flashes[i].life >= flashes[i].maxLife) {
          flashes.splice(i, 1);
        }
      }

      // Spawn lights
      if (Math.random() < 0.04 && lights.length < 12) {
        lights.push(createLight());
      }

      // Spawn pulse waves from random intersections
      if (Math.random() < 0.005 && pulses.length < 3) {
        const px = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
        const py = Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE;
        pulses.push({
          x: px,
          y: py,
          radius: 0,
          maxRadius: 120 + Math.random() * 80,
          opacity: 0.15 + Math.random() * 0.1,
          color: Math.random() < 0.7 ? BLUE : GOLD,
        });
      }

      drawLights();
      drawPulses();
      drawFlashes();

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
