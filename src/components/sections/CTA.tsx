"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SplitText from "@/components/ui/SplitText";
import GlowOrb from "@/components/ui/GlowOrb";
import Button from "@/components/ui/Button";
import { ctaContent, siteConfig } from "@/lib/content";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-sub",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".cta-button",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".cta-fallback",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Spotlight gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,116,255,0.08)_0%,_transparent_70%)]" />

      <GlowOrb
        color="#0074FF"
        size={600}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <SplitText
          as="h2"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
        >
          {ctaContent.headline}
        </SplitText>

        <p
          className="cta-sub text-lg text-gray-400 mb-10 leading-relaxed"
          style={reducedMotion ? undefined : { opacity: 0 }}
        >
          {ctaContent.subheadline}
        </p>

        <div
          className="cta-button flex flex-col sm:flex-row items-center justify-center gap-4"
          style={reducedMotion ? undefined : { opacity: 0 }}
        >
          <Button
            href="/quote"
            size="lg"
            magnetic
            className="shadow-lg shadow-cta/30 animate-pulse-glow"
          >
            {ctaContent.ctaText}
          </Button>
          <a
            href="https://calendly.com/ok3dinc/3d-print-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg border border-accent text-accent hover:bg-accent/10 transition-all duration-200 active:scale-[0.97]"
          >
            Schedule a Consultation
          </a>
        </div>

        <p
          className="cta-fallback text-sm text-gray-500 mt-8"
          style={reducedMotion ? undefined : { opacity: 0 }}
        >
          {ctaContent.fallback}{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-accent hover:underline"
          >
            {siteConfig.email}
          </a>
        </p>
      </div>
    </section>
  );
}
