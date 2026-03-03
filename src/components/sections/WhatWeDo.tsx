"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { capabilities } from "@/lib/content";
import {
  CubeIcon,
  CogIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  cube: CubeIcon,
  precision: CogIcon,
  clock: ClockIcon,
};

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section heading
      gsap.fromTo(
        ".wwd-heading",
        { y: 40, opacity: 0 },
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

      // Cards stagger
      gsap.fromTo(
        ".wwd-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".wwd-cards",
            start: "top 85%",
          },
        }
      );

      // Card top bars animate width
      gsap.fromTo(
        ".wwd-bar",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".wwd-cards",
            start: "top 85%",
          },
        }
      );

      // Icons bounce in
      gsap.fromTo(
        ".wwd-icon",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          delay: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".wwd-cards",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="wwd-heading text-center mb-16" style={reducedMotion ? undefined : { opacity: 0 }}>
          <p className="font-mono text-accent text-sm tracking-wider mb-3">
            WHAT WE DO
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Engineering-grade printing,{" "}
            <span className="text-accent">built to spec</span>
          </h2>
        </div>

        <div className="wwd-cards grid md:grid-cols-3 gap-6">
          {capabilities.map((cap) => {
            const Icon = iconMap[cap.icon];
            return (
              <div
                key={cap.title}
                className="wwd-card group relative bg-card border border-border rounded-xl p-8 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-400"
                style={reducedMotion ? undefined : { opacity: 0 }}
              >
                {/* Top accent bar */}
                <div
                  className="wwd-bar absolute top-0 left-6 right-6 h-0.5 bg-accent origin-left"
                  style={reducedMotion ? undefined : { transform: "scaleX(0)" }}
                />

                <div className="wwd-icon relative w-12 h-12 mb-6" style={reducedMotion ? undefined : { opacity: 0 }}>
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg" />
                  <div className="relative w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">{cap.title}</h3>

                <div className="font-mono text-2xl font-bold text-accent mb-3">
                  {cap.icon === "precision" ? (
                    <>
                      <span className="text-gray-400">&#177;</span>
                      <AnimatedCounter
                        end={cap.statNumber}
                        decimals={1}
                      />
                      <span>{cap.statSuffix}</span>
                    </>
                  ) : cap.icon === "cube" ? (
                    <>
                      <AnimatedCounter end={cap.statNumber} />
                      <span>{cap.statSuffix}</span>
                    </>
                  ) : (
                    <span>{cap.stat}</span>
                  )}
                </div>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
