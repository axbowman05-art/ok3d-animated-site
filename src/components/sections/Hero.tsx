"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SplitText from "@/components/ui/SplitText";
import BlueprintGrid from "@/components/ui/BlueprintGrid";
import GlowOrb from "@/components/ui/GlowOrb";
import Button from "@/components/ui/Button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import TypeWriter from "@/components/ui/TypeWriter";
import { heroContent } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

function GeometricShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  color = "0, 116, 255",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    // Entrance
    const enterTween = gsap.fromTo(
      ref.current,
      { opacity: 0, y: -120, rotation: rotate - 12 },
      {
        opacity: 1,
        y: 0,
        rotation: rotate,
        duration: 2,
        delay,
        ease: "power3.out",
      }
    );

    // Floating loop
    const floatTween = gsap.to(ref.current.querySelector(".shape-inner")!, {
      y: 15,
      duration: 10 + Math.random() * 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      enterTween.kill();
      floatTween.kill();
    };
  }, [delay, rotate, reducedMotion]);

  return (
    <div
      ref={ref}
      className={`absolute ${className}`}
      style={reducedMotion ? { transform: `rotate(${rotate}deg)` } : { opacity: 0 }}
    >
      <div className="shape-inner relative" style={{ width, height }}>
        <div
          className="absolute inset-0 rounded-full backdrop-blur-[2px]"
          style={{
            background: `linear-gradient(135deg, rgba(${color}, 0.12) 0%, transparent 70%)`,
            border: `1.5px solid rgba(${color}, 0.15)`,
            boxShadow: `0 8px 32px rgba(${color}, 0.08), inset 0 0 40px rgba(${color}, 0.05)`,
          }}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !contentRef.current) return;

    // Parallax fade on scroll
    const scrollTween = gsap.to(contentRef.current, {
      y: 100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "60% top",
        scrub: true,
      },
    });

    // Entrance timeline
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      sectionRef.current.querySelector(".hero-badge"),
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
      0.2
    );

    tl.fromTo(
      sectionRef.current.querySelector(".hero-accent"),
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
      0.7
    );

    tl.fromTo(
      sectionRef.current.querySelector(".hero-sub"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.9
    );

    tl.fromTo(
      sectionRef.current.querySelector(".hero-ctas"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      1.0
    );

    tl.fromTo(
      sectionRef.current.querySelector(".hero-stats"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      1.2
    );

    tl.fromTo(
      sectionRef.current.querySelector(".hero-industries"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      1.4
    );

    return () => {
      tl.kill();
      scrollTween.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Blueprint grid background */}
      <BlueprintGrid />

      {/* Geometric shapes */}
      <GeometricShape
        delay={0.3}
        width={500}
        height={120}
        rotate={12}
        color="0, 116, 255"
        className="left-[-8%] md:left-[-3%] top-[18%] md:top-[22%]"
      />
      <GeometricShape
        delay={0.5}
        width={400}
        height={100}
        rotate={-15}
        color="255, 221, 0"
        className="right-[-4%] md:right-[2%] top-[68%] md:top-[72%]"
      />
      <GeometricShape
        delay={0.4}
        width={250}
        height={70}
        rotate={-8}
        color="0, 116, 255"
        className="left-[6%] md:left-[12%] bottom-[8%] md:bottom-[12%]"
      />
      <GeometricShape
        delay={0.6}
        width={180}
        height={50}
        rotate={20}
        color="255, 221, 0"
        className="right-[12%] md:right-[18%] top-[8%] md:top-[12%]"
      />
      <GeometricShape
        delay={0.7}
        width={140}
        height={40}
        rotate={-22}
        color="0, 42, 94"
        className="left-[22%] md:left-[28%] top-[4%] md:top-[8%]"
      />

      {/* Glow orbs */}
      <GlowOrb
        color="#0074FF"
        size={500}
        className="top-1/4 -right-32 opacity-30"
      />
      <GlowOrb
        color="#FFDD00"
        size={350}
        className="-bottom-20 -left-32 opacity-30"
      />
      <GlowOrb
        color="#0074FF"
        size={300}
        className="top-[60%] left-1/2 -translate-x-1/2 opacity-20"
      />

      {/* Bottom fade only — keep grid visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/70 pointer-events-none" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-8"
          style={reducedMotion ? undefined : { opacity: 0 }}
        >
          <span className="w-2 h-2 rounded-full bg-cta animate-pulse" />
          <TypeWriter
            text={heroContent.preHeadline}
            speed={50}
            delay={300}
            className="text-sm text-muted font-mono tracking-wide"
          />
        </div>

        {/* Headline with gradient accent */}
        <div className="mb-6">
          <SplitText
            as="h1"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            delay={0.4}
            scrollTrigger={false}
          >
            {heroContent.headline}
          </SplitText>
          <span
            className="hero-accent block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] bg-gradient-to-r from-accent via-white to-cta bg-clip-text text-transparent"
            style={{ opacity: 0 }}
          >
            {heroContent.headlineAccent}
          </span>
        </div>

        <p
          className="hero-sub text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
          style={reducedMotion ? undefined : { opacity: 0 }}
        >
          {heroContent.subheadline}
        </p>

        <div
          className="hero-ctas flex flex-col items-center justify-center gap-4 mb-16"
          style={reducedMotion ? undefined : { opacity: 0 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/quote" size="lg" magnetic className="animate-glow-pulse">
              {heroContent.ctaPrimary}
            </Button>
            <Button
              onClick={() =>
                document
                  .getElementById("gallery")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              variant="secondary"
              size="lg"
              magnetic
            >
              {heroContent.ctaSecondary}
            </Button>
          </div>
          {/* TODO: replace with real Calendly link */}
          <a
            href="https://calendly.com/ok3dinc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:text-accent/80 transition-colors"
          >
            or schedule a free consultation →
          </a>
        </div>

        {/* Stats row */}
        <div
          className="hero-stats grid grid-cols-3 gap-8 max-w-lg mx-auto mb-16"
          style={{ opacity: 0 }}
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              <AnimatedCounter end={6} suffix="+" duration={1.5} />
            </div>
            <div className="text-xs font-mono text-muted mt-1 uppercase tracking-wider">Materials</div>
          </div>
          <div className="text-center border-x border-border/30">
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              ±<AnimatedCounter end={0.2} suffix="mm" duration={1.5} decimals={1} />
            </div>
            <div className="text-xs font-mono text-muted mt-1 uppercase tracking-wider">Tolerance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              <AnimatedCounter end={5} duration={1.5} />-<AnimatedCounter end={7} duration={1.8} />
              <span className="text-lg"> day</span>
            </div>
            <div className="text-xs font-mono text-muted mt-1 uppercase tracking-wider">Turnaround</div>
          </div>
        </div>

        {/* Industry strip */}
        <div
          className="hero-industries flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          style={reducedMotion ? undefined : { opacity: 0 }}
        >
          {heroContent.industries.map((industry, i) => (
            <span
              key={i}
              className="text-xs font-mono text-muted/60 uppercase tracking-wider px-3 py-1 rounded-full border border-transparent hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all duration-300 cursor-default"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
