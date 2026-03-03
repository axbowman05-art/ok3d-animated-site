"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  trigger?: boolean;
}

export default function SplitText({
  children,
  className = "",
  as: Tag = "h1",
  delay = 0,
  stagger = 0.02,
  trigger = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !trigger || !containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".split-char");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, stagger, trigger, reducedMotion]);

  const words = children.split(" ");

  return (
    <Tag ref={containerRef as React.Ref<never>} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="split-char inline-block"
              style={reducedMotion ? undefined : { opacity: 0 }}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
