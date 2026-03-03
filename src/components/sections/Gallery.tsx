"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { galleryItems } from "@/lib/content";

// Generative wireframe SVG placeholder that "draws" itself
function WireframePlaceholder({ index }: { index: number }) {
  const shapes = [
    // Enclosure
    <g key="enc" strokeWidth="1.5" fill="none" stroke="currentColor">
      <rect x="20" y="30" width="60" height="40" rx="3" className="wireframe-path" />
      <rect x="30" y="40" width="20" height="10" rx="1" className="wireframe-path" />
      <circle cx="70" cy="45" r="5" className="wireframe-path" />
      <line x1="25" y1="75" x2="75" y2="75" className="wireframe-path" />
    </g>,
    // Gear
    <g key="gear" strokeWidth="1.5" fill="none" stroke="currentColor">
      <circle cx="50" cy="50" r="20" className="wireframe-path" />
      <circle cx="50" cy="50" r="8" className="wireframe-path" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1={50 + 18 * Math.cos((angle * Math.PI) / 180)}
          y1={50 + 18 * Math.sin((angle * Math.PI) / 180)}
          x2={50 + 25 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 25 * Math.sin((angle * Math.PI) / 180)}
          className="wireframe-path"
        />
      ))}
    </g>,
    // Bracket
    <g key="bracket" strokeWidth="1.5" fill="none" stroke="currentColor">
      <path d="M20 30 L80 30 L80 50 L60 50 L60 70 L40 70 L40 50 L20 50 Z" className="wireframe-path" />
      <circle cx="30" cy="40" r="4" className="wireframe-path" />
      <circle cx="70" cy="40" r="4" className="wireframe-path" />
    </g>,
    // Connector
    <g key="conn" strokeWidth="1.5" fill="none" stroke="currentColor">
      <ellipse cx="50" cy="35" rx="20" ry="10" className="wireframe-path" />
      <line x1="30" y1="35" x2="30" y2="65" className="wireframe-path" />
      <line x1="70" y1="35" x2="70" y2="65" className="wireframe-path" />
      <ellipse cx="50" cy="65" rx="20" ry="10" className="wireframe-path" />
    </g>,
    // Housing
    <g key="housing" strokeWidth="1.5" fill="none" stroke="currentColor">
      <polygon points="50,20 80,40 80,70 50,80 20,70 20,40" className="wireframe-path" />
      <line x1="50" y1="20" x2="50" y2="80" className="wireframe-path" />
      <line x1="20" y1="40" x2="80" y2="40" className="wireframe-path" />
    </g>,
    // Guide
    <g key="guide" strokeWidth="1.5" fill="none" stroke="currentColor">
      <rect x="25" y="25" width="50" height="50" rx="5" className="wireframe-path" />
      <path d="M35 50 Q50 30 65 50 Q50 70 35 50" className="wireframe-path" />
      <circle cx="50" cy="50" r="3" className="wireframe-path" />
    </g>,
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full text-accent/30"
      style={{ filter: "drop-shadow(0 0 8px rgba(14, 165, 233, 0.1))" }}
    >
      {shapes[index % shapes.length]}
    </svg>
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gal-heading",
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

      // Diagonal stagger
      const cards = gsap.utils.toArray<HTMLElement>(".gal-card");
      cards.forEach((card, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const delay = (row + col) * 0.1;

        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".gal-grid",
              start: "top 85%",
            },
          }
        );
      });

      // Wireframe draw animation
      const paths = sectionRef.current!.querySelectorAll(".wireframe-path");
      paths.forEach((path) => {
        const el = path as SVGGeometryElement;
        if (el.getTotalLength) {
          const length = el.getTotalLength();
          gsap.set(el, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(el, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: el.closest(".gal-card"),
              start: "top 85%",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="gal-heading text-center mb-16" style={reducedMotion ? undefined : { opacity: 0 }}>
          <p className="font-mono text-accent text-sm tracking-wider mb-3">
            OUR WORK
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Featured <span className="text-accent">prints</span>
          </h2>
        </div>

        <div className="gal-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="gal-card group relative bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-400"
              style={reducedMotion ? undefined : { opacity: 0 }}
            >
              {/* Placeholder wireframe */}
              <div className="aspect-[4/3] bg-gradient-to-br from-card to-background p-8 relative overflow-hidden">
                <WireframePlaceholder index={i} />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </div>

              <div className="p-5">
                <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <div className="flex gap-2">
                  <span className="text-xs font-mono bg-accent/10 text-accent px-2 py-0.5 rounded">
                    {item.material}
                  </span>
                  <span className="text-xs font-mono bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
                    {item.industry}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
