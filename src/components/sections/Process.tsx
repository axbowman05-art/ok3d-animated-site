"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { processSteps, processMobileFallback } from "@/lib/content";
import {
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  CubeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  upload: ArrowUpTrayIcon,
  review: MagnifyingGlassIcon,
  print: CubeIcon,
  deliver: TruckIcon,
};

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (reducedMotion || isMobile || !sectionRef.current || !trackRef.current)
      return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        ".proc-heading",
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

      // Horizontal scroll
      const panels = gsap.utils.toArray<HTMLElement>(".proc-panel");
      const totalWidth = trackRef.current!.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Panel content fade in
      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelector(".proc-content"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById("proc-scroll") || undefined,
              start: "left 80%",
              toggleActions: "play none none none",
              horizontal: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  // Mobile vertical fallback
  if (isMobile) {
    return (
      <section id="process" className="py-24 px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-accent text-sm tracking-wider mb-3">
            HOW IT WORKS
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            {processMobileFallback}
          </h2>
        </div>

        <div className="relative max-w-md mx-auto">
          {/* Connecting line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          {processSteps.map((step) => {
            const Icon = iconMap[step.icon];
            return (
              <div key={step.number} className="relative pl-16 pb-12 last:pb-0">
                <div className="absolute left-0 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center z-10">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="font-mono text-5xl font-bold text-gray-800 absolute -top-2 right-0">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-hidden"
    >
      {/* Heading - visible before pin */}
      <div className="proc-heading text-center pt-24 pb-16" style={reducedMotion ? undefined : { opacity: 0 }}>
        <p className="font-mono text-accent text-sm tracking-wider mb-3">
          HOW IT WORKS
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          From file to <span className="text-accent">finished part</span>
        </h2>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex h-[70vh]">
        {processSteps.map((step) => {
          const Icon = iconMap[step.icon];
          return (
            <div
              key={step.number}
              className="proc-panel flex-shrink-0 w-screen h-full flex items-center justify-center px-12"
            >
              <div className="proc-content max-w-lg">
                {/* Watermark number */}
                <div className="font-mono text-[8rem] md:text-[12rem] font-bold text-gray-800/20 leading-none mb-[-2rem] md:mb-[-3rem] select-none">
                  {step.number}
                </div>

                <div className="relative">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress line */}
      <div className="absolute bottom-8 left-12 right-12 h-0.5 bg-border rounded-full">
        <div
          ref={progressRef}
          className="h-full bg-accent rounded-full transition-none"
          style={{ width: "0%" }}
        />
      </div>
    </section>
  );
}
