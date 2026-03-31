"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { galleryItems } from "@/lib/content";

const STLViewer = dynamic(() => import("@/components/ui/STLViewer"), {
  ssr: false,
});

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
              {/* 3D STL viewer */}
              <div className="aspect-[4/3] bg-gradient-to-br from-card to-background relative overflow-hidden">
                {item.modelUrl ? (
                  <STLViewer modelUrl={item.modelUrl} />
                ) : null}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />
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
