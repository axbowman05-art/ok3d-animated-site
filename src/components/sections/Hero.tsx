"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SplitText from "@/components/ui/SplitText";
import GlowOrb from "@/components/ui/GlowOrb";
import GridPattern from "@/components/ui/GridPattern";
import Button from "@/components/ui/Button";
import { heroContent } from "@/lib/content";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax fade on scroll
      gsap.to(contentRef.current, {
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

      // Initial animations
      gsap.fromTo(
        ".hero-pre",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-ctas",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.0, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-industries",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-grid",
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="hero-grid">
        <GridPattern />
      </div>

      {/* Glow orbs */}
      <GlowOrb
        color="#0ea5e9"
        size={500}
        className="top-1/4 -right-32 opacity-40"
      />
      <GlowOrb
        color="#8b5cf6"
        size={400}
        className="-bottom-20 -left-32 opacity-30"
        />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-background pointer-events-none" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p
          className="hero-pre font-mono text-accent text-sm tracking-[0.3em] mb-6"
          style={reducedMotion ? undefined : { opacity: 0 }}
        >
          {heroContent.preHeadline}
        </p>

        <SplitText
          as="h1"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          delay={0.4}
        >
          {heroContent.headline}
        </SplitText>

        <p
          className="hero-sub text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={reducedMotion ? undefined : { opacity: 0 }}
        >
          {heroContent.subheadline}
        </p>

        <div
          className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          style={reducedMotion ? undefined : { opacity: 0 }}
        >
          <Button href="/quote" size="lg" magnetic>
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

        {/* Industry strip */}
        <div
          className="hero-industries flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          style={reducedMotion ? undefined : { opacity: 0 }}
        >
          {heroContent.industries.map((industry, i) => (
            <span
              key={i}
              className="text-xs font-mono text-gray-500 uppercase tracking-wider"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 rounded-full border-2 border-gray-600 flex justify-center">
          <div className="w-1 h-2 bg-gray-500 rounded-full mt-1.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
