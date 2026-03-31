"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxImageProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxImage({
  children,
  speed = 0.3,
  className = "",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: () => speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed, reducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
