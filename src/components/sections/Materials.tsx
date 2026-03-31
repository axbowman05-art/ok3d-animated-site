"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { materials } from "@/lib/content";

export default function Materials() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mat-heading",
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

      gsap.fromTo(
        ".mat-card",
        { y: 50, opacity: 0, rotateY: 15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mat-grid",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".mat-stripe",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".mat-grid",
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
      id="materials"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mat-heading text-center mb-16" style={reducedMotion ? undefined : { opacity: 0 }}>
          <p className="font-mono text-accent text-sm tracking-wider mb-3">
            MATERIALS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            The right material for{" "}
            <span className="text-accent">every application</span>
          </h2>
        </div>

        {/* Desktop grid */}
        <div className="mat-grid hidden md:grid md:grid-cols-5 gap-4">
          {materials.map((mat) => (
            <div
              key={mat.name}
              className="mat-card group relative bg-card border border-border rounded-xl p-6 overflow-hidden hover:-translate-y-1 hover:border-accent/30 transition-all duration-400"
              style={reducedMotion ? undefined : { opacity: 0, perspective: "800px" }}
            >
              {/* Color stripe */}
              <div
                className="mat-stripe absolute top-0 left-0 right-0 h-1 origin-left"
                style={{
                  background: mat.color,
                  ...(reducedMotion ? {} : { transform: "scaleX(0)" }),
                }}
              />

              {/* Radial tint */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${mat.colorClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative">
                {/* Color swatch dot */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: mat.color }}
                  />
                  <h3 className="text-lg font-bold">{mat.name}</h3>
                </div>

                <ul className="space-y-1.5 mb-4">
                  {mat.properties.map((prop) => (
                    <li
                      key={prop}
                      className="text-sm text-gray-400 flex items-center gap-2"
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: mat.color }}
                      />
                      {prop}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-gray-500">{mat.useCases}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-hide">
          {materials.map((mat) => (
            <div
              key={mat.name}
              className="snap-start flex-shrink-0 w-64 bg-card border border-border rounded-xl p-6 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: mat.color }}
              />
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: mat.color }}
                />
                <h3 className="text-lg font-bold">{mat.name}</h3>
              </div>
              <ul className="space-y-1.5 mb-4">
                {mat.properties.map((prop) => (
                  <li key={prop} className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: mat.color }} />
                    {prop}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500">{mat.useCases}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
