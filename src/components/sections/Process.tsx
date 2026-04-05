"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  CubeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { processSteps } from "@/lib/content";

const iconMap = {
  chat: ChatBubbleLeftRightIcon,
  review: MagnifyingGlassIcon,
  print: CubeIcon,
  deliver: TruckIcon,
};

const stepVisuals = [
  // 01 Describe
  <div key="describe" className="bg-background border border-border rounded-xl p-6 w-full space-y-3">
    <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">Your Request</p>
    <div className="bg-card border border-border rounded-lg px-4 py-3 text-sm text-gray-300 leading-relaxed">
      &ldquo;I need a mounting bracket, about 3 inches wide, needs to hold 2 lbs, outdoor use&rdquo;
    </div>
    <div className="flex items-center gap-2 pt-1">
      <span className="w-2 h-2 rounded-full bg-cta animate-pulse" />
      <span className="text-xs text-gray-500">No file needed — plain English is fine</span>
    </div>
  </div>,
  // 02 Review & Quote
  <div key="review" className="bg-background border border-border rounded-xl p-6 w-full space-y-3">
    <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">Estimated Quote</p>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between text-gray-400"><span>Material</span><span className="text-gray-200">PETG</span></div>
      <div className="flex justify-between text-gray-400"><span>Quantity</span><span className="text-gray-200">10 parts</span></div>
      <div className="flex justify-between text-gray-400"><span>Tolerance</span><span className="text-gray-200">±0.2mm</span></div>
      <div className="h-px bg-border my-2" />
      <div className="flex justify-between font-semibold"><span className="text-gray-300">Estimate</span><span className="text-cta">$45 – $60</span></div>
    </div>
    <div className="flex items-center gap-2 pt-1">
      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      <span className="text-xs text-gray-500">Response within 24 hours</span>
    </div>
  </div>,
  // 03 Print
  <div key="print" className="bg-background border border-border rounded-xl p-6 w-full space-y-3">
    <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">Print Settings</p>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between text-gray-400"><span>Layer Height</span><span className="text-gray-200">0.2mm</span></div>
      <div className="flex justify-between text-gray-400"><span>Infill</span><span className="text-gray-200">40%</span></div>
      <div className="flex justify-between text-gray-400"><span>Supports</span><span className="text-gray-200">Auto</span></div>
      <div className="flex justify-between text-gray-400"><span>Tolerance</span><span className="text-gray-200">±0.2mm</span></div>
      <div className="h-px bg-border my-2" />
      <div className="flex justify-between text-gray-400"><span>Inspection</span><span className="text-green-400">Passed ✓</span></div>
    </div>
  </div>,
  // 04 Deliver
  <div key="deliver" className="bg-background border border-border rounded-xl p-6 w-full space-y-3">
    <p className="text-xs font-mono text-accent tracking-wider uppercase mb-4">Shipment Status</p>
    <div className="space-y-3 text-sm">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
        <span className="text-gray-300">Order confirmed</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
        <span className="text-gray-300">Printed &amp; inspected</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" />
        <span className="text-gray-200 font-medium">In transit</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-border flex-shrink-0" />
        <span className="text-gray-600">Delivered</span>
      </div>
    </div>
    <div className="h-px bg-border" />
    <p className="text-xs text-gray-500">Est. arrival: 5–7 business days</p>
  </div>,
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proc-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".proc-heading", start: "top 85%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".proc-step").forEach((step) => {
        gsap.fromTo(
          step,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 85%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="process" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="proc-heading text-center mb-16"
          style={reducedMotion ? undefined : { opacity: 0 }}
        >
          <p className="font-mono text-accent text-sm tracking-wider mb-3">
            HOW IT WORKS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            From idea to <span className="text-accent">finished part</span>
          </h2>
        </div>

        <div className="space-y-8">
          {processSteps.map((step, i) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            return (
              <div
                key={step.number}
                className="proc-step grid md:grid-cols-2 gap-8 items-center bg-card border border-border rounded-2xl p-8 md:p-10"
                style={reducedMotion ? undefined : { opacity: 0 }}
              >
                {/* Left: text */}
                <div>
                  <div className="font-mono text-7xl md:text-8xl font-bold text-gray-800/30 leading-none mb-[-1rem] select-none">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5 mt-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>

                {/* Right: visual */}
                <div>
                  {stepVisuals[i]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
