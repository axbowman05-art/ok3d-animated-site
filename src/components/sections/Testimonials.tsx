"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap-utils";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { testimonials } from "@/lib/content";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [current, setCurrent] = useState(0);

  // Mobile auto-rotate
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".test-heading",
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
        ".test-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".test-cards",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const TestimonialCard = ({
    t,
    isCenter,
  }: {
    t: (typeof testimonials)[0];
    isCenter: boolean;
  }) => (
    <div
      className={`test-card bg-card border border-border rounded-xl p-8 transition-all duration-500 ${
        isCenter
          ? "md:scale-105 md:border-accent/20 md:shadow-lg md:shadow-accent/5"
          : "md:opacity-80"
      }`}
      style={reducedMotion ? undefined : { opacity: 0 }}
    >
      {/* Decorative quote */}
      <div className="font-serif text-6xl text-accent/20 leading-none mb-2">
        &ldquo;
      </div>

      <p className="text-gray-300 leading-relaxed mb-6">{t.quote}</p>

      <div className="h-px bg-accent/20 mb-4" />

      <div>
        <p className="font-semibold text-sm">{t.author}</p>
        <p className="text-gray-500 text-sm">
          {t.role}, {t.company}
        </p>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="test-heading text-center mb-16" style={reducedMotion ? undefined : { opacity: 0 }}>
          <p className="font-mono text-accent text-sm tracking-wider mb-3">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Trusted by <span className="text-accent">engineers</span>
          </h2>
        </div>

        {/* Desktop: 3 cards with depth stagger */}
        <div className="test-cards hidden md:grid md:grid-cols-3 gap-6 items-start">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} isCenter={i === 1} />
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard
                t={testimonials[current]}

                isCenter
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() =>
                setCurrent(
                  (c) => (c - 1 + testimonials.length) % testimonials.length
                )
              }
              className="p-2 text-gray-500 hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-accent w-6" : "bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setCurrent((c) => (c + 1) % testimonials.length)
              }
              className="p-2 text-gray-500 hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
